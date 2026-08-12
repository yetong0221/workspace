import { useState } from 'react'
import type { AIProject } from '../data/aiProjectsData'
import { getRandomProject } from '../data/aiProjectsData'
import { useToast } from './Toast'
import { useTodos } from '../hooks/useTodos'

/* ====== 平台配置 ====== */

const platformConfig: Record<string, { label: string; badge: string; gradient: string; icon: string }> = {
  bilibili: {
    label: 'B站',
    badge: 'bg-pink-100 text-pink-600',
    gradient: 'from-pink-400/20 via-rose-200/30 to-macaron-pink/50',
    icon: '📺',
  },
  xiaohongshu: {
    label: '小红书',
    badge: 'bg-red-100 text-red-600',
    gradient: 'from-red-400/20 via-rose-200/30 to-macaron-peach/50',
    icon: '📕',
  },
  douyin: {
    label: '抖音',
    badge: 'bg-gray-800 text-gray-100',
    gradient: 'from-gray-400/20 via-slate-200/30 to-gray-100/50',
    icon: '🎵',
  },
}

/* ====== 工具函数 ====== */

/** 在新标签页中打开链接 */
function openLink(url: string) {
  window.open(url, '_blank')
}

/** 复制到剪贴板 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  }
}

/* ====== 组件 ====== */

interface Props {
  project: AIProject
  onRefresh: (next: AIProject) => void
}

export default function AIProjectCard({ project, onRefresh }: Props) {
  const toast = useToast()
  const { addTodo, isInTodo } = useTodos()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const cfg = platformConfig[project.platform] ?? platformConfig.bilibili
  const inTodo = isInTodo(project.id)

  // 优先使用 Supabase 字段
  const coverSrc = project.cover_url || project.cover
  const linkUrl = project.video_url || project.webUrl

  /* ---- 换一换 ---- */
  const handleRefresh = () => {
    const next = getRandomProject(project.id)
    onRefresh(next)
  }

  /* ---- 打开链接 ---- */
  const handleOpen = () => {
    window.open(linkUrl, '_blank')
  }

  /* ---- 复制链接 ---- */
  const handleCopy = async () => {
    const ok = await copyToClipboard(project.webUrl)
    if (ok) {
      toast.show('链接已复制，快去分享给朋友吧 ✨', '🔗')
    } else {
      toast.show('复制失败，请手动复制链接', '⚠️')
    }
  }

  /* ---- 加入待办 ---- */
  const handleAddTodo = () => {
    if (inTodo) {
      toast.show('已经在待办列表里啦~', '📋')
      return
    }
    const ok = addTodo(project)
    if (ok) {
      toast.show('已加入我的待办，记得去学习哦~', '⭐')
    }
  }

  return (
    <div className="ai-card-enter" style={{ animationDelay: '0.05s' }}>
      {/* ---- 标题栏 ---- */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800 flex items-center gap-1.5">
          🤖 每日 AI 爆款玩法
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-xs text-purple-400 bg-purple-50
                     hover:bg-purple-100 active:scale-95 px-3 py-1.5 rounded-full
                     transition-all duration-200 font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          换一换
        </button>
      </div>

      {/* ---- 卡片主体 ---- */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${cfg.gradient}
                    shadow-sm border border-white/60 active:scale-[0.98] transition-transform duration-200`}
      >
        {/* ---- 封面图 ---- */}
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          {!coverSrc || imgError ? (
            /* 无封面或加载失败 → 占位 */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-5xl">
              {cfg.icon}
              <span className="text-xs text-gray-400 mt-1">
                {!coverSrc ? '暂无封面' : '封面加载失败'}
              </span>
            </div>
          ) : !imgLoaded ? (
            /* 加载中 → 骨架屏 */
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
          ) : null}
          {/* 封面图（仅当有 URL 且未报错时才渲染，避免 src="" 警告） */}
          {coverSrc && !imgError && (
            <img
              src={coverSrc}
              alt={project.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          {/* 封面上的平台徽章 */}
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-sm backdrop-blur-sm ${cfg.badge}`}>
              {cfg.icon} {cfg.label}
            </span>
          </div>
        </div>

        {/* ---- 文字内容区 ---- */}
        <div className="p-4 space-y-3">
          {/* 标签 */}
          <span className="inline-block text-[10px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
            {project.tag}
          </span>

          {/* 标题 */}
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
            {project.title}
          </h3>

          {/* 亮点描述 */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {project.highlights}
          </p>

          {/* ---- 操作按钮组 ---- */}
          <div className="flex items-center gap-2 pt-1">
            {/* 主按钮：去 App 探索 */}
            <button
              onClick={handleOpen}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         bg-purple-400 text-white text-xs font-medium
                         hover:bg-purple-500 active:scale-[0.97] transition-all duration-200 shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              去探索
            </button>

            {/* 复制链接 */}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl
                         bg-white/70 text-gray-500 text-xs font-medium
                         hover:bg-white hover:text-gray-700 active:scale-[0.97] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              复制
            </button>

            {/* 加入待办 */}
            <button
              onClick={handleAddTodo}
              disabled={inTodo}
              className={`flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl text-xs font-medium
                         transition-all duration-200 active:scale-[0.97]
                         ${inTodo
                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                           : 'bg-white/70 text-amber-500 hover:bg-white hover:text-amber-600'
                         }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={inTodo ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {inTodo ? '已添加' : '待办'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
