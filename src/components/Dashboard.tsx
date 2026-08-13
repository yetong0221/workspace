import { useState, useMemo, useCallback, useEffect } from 'react'
import PickupCard from './PickupCard'
import AIProjectCard from './AIProjectCard'
import { getTodayHealthTip } from '../data/healthTips'
import type { AIProject, Platform } from '../data/aiProjectsData'
import supabase from '../lib/supabase'

/* ====== 工具函数 ====== */

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 6) return '夜深了 🌙'
  if (h < 9) return '早上好 ☀️'
  if (h < 12) return '上午好 🌤️'
  if (h < 14) return '中午好 ☀️'
  if (h < 18) return '下午好 🌻'
  return '晚上好 🌙'
}

/** 平台白名单，用于把 Supabase 返回的字符串精确归一化 */
const KNOWN_PLATFORMS: Platform[] = [
  'bilibili',
  'github',
  'v2ex',
  'sspai',
  'xiaohongshu',
  'douyin',
]

function normalizePlatform(value: unknown): Platform {
  if (typeof value === 'string' && (KNOWN_PLATFORMS as string[]).includes(value)) {
    return value as Platform
  }
  return 'bilibili'
}

/** 将 Supabase 行数据映射为 AIProject 格式 */
function mapRowToProject(row: Record<string, unknown>): AIProject {
  const platform = normalizePlatform(row.platform ?? row.source)
  const link = (row.video_url as string) ?? (row.url as string) ?? ''
  return {
    id: (row.id as number) ?? 0,
    title: (row.title as string) ?? '',
    platform,
    cover: (row.cover_url as string) ?? '',
    cover_url: (row.cover_url as string) ?? '',
    tag: (row.tag as string) || '#AI工具',
    highlights: (row.summary as string) ?? '',
    webUrl: link,
    appUrl: link,
    video_url: link,
  }
}

/* ====== Dashboard 页面 ====== */

export default function Dashboard() {
  // 当日健康贴士（本地 Mock）
  const todayTip = useMemo(() => getTodayHealthTip(), [])

  // AI 项目状态：仅使用 Supabase 真实数据
  const [projects, setProjects] = useState<AIProject[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  /** 从 Supabase 获取爆款列表（仅真实数据，无本地 Mock 兜底） */
  const fetchFromSupabase = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const { data, error } = await supabase
        .from('ai_trending_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      // 映射并按链接去重（数据库可能存在历史重复行）
      const seen = new Set<string>()
      const deduped: AIProject[] = []
      for (const row of (data ?? []) as Record<string, unknown>[]) {
        const p = mapRowToProject(row)
        const key = p.video_url || p.webUrl || p.appUrl
        if (key && seen.has(key)) continue
        if (key) seen.add(key)
        deduped.push(p)
      }

      setProjects(deduped)
      setCurrentIndex(0)
    } catch (err) {
      console.error('❌ Supabase 查询失败:', err)
      setError(true)
      setProjects([])
      setCurrentIndex(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // 组件挂载时拉取
  useEffect(() => {
    fetchFromSupabase()
  }, [fetchFromSupabase])

  // 当前展示项目
  const project = projects[currentIndex] ?? null

  /** 换一换：按顺序切换到下一条，循环 */
  const handleRefresh = useCallback(() => {
    setCurrentIndex((i) => (projects.length > 1 ? (i + 1) % projects.length : i))
  }, [projects.length])

  // 根据健康贴士类别选择底色
  const tipColors: Record<string, string> = {
    '饮水': 'bg-macaron-blue/50',
    '作息': 'bg-macaron-purple/40',
    '经期': 'bg-macaron-pink/50',
    '运动': 'bg-macaron-mint/50',
    '饮食': 'bg-macaron-yellow/50',
    '心理': 'bg-macaron-peach/50',
  }

  return (
    <div className="px-4 pt-6 pb-24 space-y-5">
      {/* ---- 顶部欢迎 ---- */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{getGreeting()}</p>
          <h1 className="text-xl font-semibold text-gray-800 mt-0.5">欢迎回来，小明</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-macaron-purple flex items-center justify-center text-lg">
          👤
        </div>
      </div>

      {/* ---- 🤖 每日 AI 爆款玩法 ---- */}
      {loading ? (
        <div className="ai-card-enter">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 flex items-center gap-1.5">
              🤖 每日 AI 爆款玩法
            </h2>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="flex gap-2 pt-1">
              <div className="flex-1 h-9 bg-gray-100 rounded-xl animate-pulse" />
              <div className="w-14 h-9 bg-gray-100 rounded-xl animate-pulse" />
              <div className="w-12 h-9 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      ) : project ? (
        <AIProjectCard
          project={project}
          index={currentIndex}
          total={projects.length}
          onRefresh={handleRefresh}
        />
      ) : (
        /* 无数据 / 加载失败的空状态 */
        <div className="ai-card-enter">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 flex items-center gap-1.5">
              🤖 每日 AI 爆款玩法
            </h2>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-8 text-center">
            <p className="text-3xl mb-2">{error ? '⚠️' : '🔍'}</p>
            <p className="text-sm text-gray-400">
              {error ? '内容加载失败，请稍后重试' : '暂无内容，稍后再来看看～'}
            </p>
            {error && (
              <button
                onClick={fetchFromSupabase}
                className="mt-4 text-xs text-purple-400 bg-purple-50 hover:bg-purple-100
                           px-4 py-2 rounded-full font-medium transition-colors"
              >
                重新加载
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---- 每日健康贴士 ---- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">💡 每日健康贴士</h2>
          <span className="text-[10px] bg-purple-50 text-purple-400 px-2 py-0.5 rounded-full">
            每日更新
          </span>
        </div>

        <div className={`dash-card ${tipColors[todayTip.category] || 'bg-macaron-mint/50'}`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">{todayTip.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-700 text-sm">{todayTip.title}</h3>
                <span className="text-[10px] bg-white/50 text-gray-400 px-1.5 py-0.5 rounded-full">
                  {todayTip.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                {todayTip.detail}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 italic">
                💬 {todayTip.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- 快递取件码 ---- */}
      <PickupCard />
    </div>
  )
}
