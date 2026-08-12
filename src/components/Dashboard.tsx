import { useState, useMemo, useCallback, useEffect } from 'react'
import PickupCard from './PickupCard'
import AIProjectCard from './AIProjectCard'
import { getTodayHealthTip } from '../data/healthTips'
import { getTodayProject, getRandomProject } from '../data/aiProjectsData'
import type { AIProject } from '../data/aiProjectsData'
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

/** 将 Supabase 行数据映射为 AIProject 格式 */
function mapRowToProject(row: Record<string, unknown>): AIProject {
  return {
    id: (row.id as number) ?? 0,
    title: (row.title as string) ?? '',
    platform: (row.platform as AIProject['platform']) ?? 'bilibili',
    cover: (row.cover_url as string) ?? '',
    cover_url: (row.cover_url as string) ?? '',
    tag: (row.tag as string) || '#AI工具',
    highlights: (row.summary as string) ?? '',
    webUrl: (row.video_url as string) ?? '',
    appUrl: (row.video_url as string) ?? '',
    video_url: (row.video_url as string) ?? '',
  }
}

/* ====== Dashboard 页面 ====== */

export default function Dashboard() {
  // 当日健康贴士（本地 Mock）
  const todayTip = useMemo(() => getTodayHealthTip(), [])

  // AI 项目状态：从 Supabase 拉取，失败则降级 Mock
  const [project, setProject] = useState<AIProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(false)

  /** 从 Supabase 获取今日推荐 */
  const fetchFromSupabase = useCallback(async () => {
    setLoading(true)
    setUsingMock(false)

    // 🔍 调试：打印环境变量
    console.log('🔧 [DEBUG] VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('🔧 [DEBUG] VITE_SUPABASE_ANON_KEY 前20位:', import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 20) + '...')

    try {
      console.log('🔧 [DEBUG] 开始 Supabase 查询...')
      const { data, error } = await supabase
        .from('ai_trending_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      console.log('🔧 [DEBUG] Supabase 返回 — data:', data)
      console.log('🔧 [DEBUG] Supabase 返回 — error:', error)
      console.log('🔧 [DEBUG] Supabase 返回 — data.length:', data?.length)

      if (error) throw error

      if (data && data.length > 0) {
        console.log('✅ [DEBUG] 使用 Supabase 云端数据:', data[0].title)
        setProject(mapRowToProject(data[0]))
        return
      }

      // 数据库为空 → 降级
      console.info('📭 Supabase 表中暂无数据，使用本地 Mock')
      setProject(getTodayProject())
      setUsingMock(true)
    } catch (err) {
      console.error('❌ [DEBUG] Supabase 查询失败，降级到本地 Mock')
      console.error('❌ [DEBUG] 错误详情:', err)
      if (err instanceof Error) {
        console.error('❌ [DEBUG] 错误消息:', err.message)
        console.error('❌ [DEBUG] 错误堆栈:', err.stack)
      }
      setProject(getTodayProject())
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // 组件挂载时拉取
  useEffect(() => {
    fetchFromSupabase()
  }, [fetchFromSupabase])

  /** 换一换（仅 Mock 模式下生效，Supabase 只有 1 条最新记录） */
  const handleRefresh = useCallback(
    (next: AIProject) => {
      if (usingMock) {
        setProject(next)
      } else {
        // Supabase 模式：重新拉取
        fetchFromSupabase()
      }
    },
    [usingMock, fetchFromSupabase]
  )

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
          <div className="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
              <div className="flex gap-2 pt-1">
                <div className="flex-1 h-9 bg-gray-100 rounded-xl animate-pulse" />
                <div className="w-14 h-9 bg-gray-100 rounded-xl animate-pulse" />
                <div className="w-12 h-9 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : project ? (
        <AIProjectCard
          project={project}
          onRefresh={handleRefresh}
        />
      ) : null}

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
