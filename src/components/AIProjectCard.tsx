import type { AIProject } from '../data/aiProjectsData'
import { useToast } from './Toast'
import { useTodos } from '../hooks/useTodos'

/* ====== 平台配置 ====== */

interface PlatformStyle {
  label: string
  badge: string
  gradient: string
  icon: string
}

const platformConfig: Record<string, PlatformStyle> = {
  bilibili: {
    label: 'B站',
    badge: 'bg-pink-100 text-pink-600',
    gradient: 'from-pink-50 via-white to-rose-50',
    icon: '📺',
  },
  github: {
    label: 'GitHub',
    badge: 'bg-gray-800 text-white',
    gradient: 'from-slate-100 via-white to-slate-50',
    icon: '🐙',
  },
  sspai: {
    label: '少数派',
    badge: 'bg-orange-100 text-orange-600',
    gradient: 'from-orange-50 via-white to-amber-50',
    icon: '🔖',
  },
  v2ex: {
    label: 'V2EX',
    badge: 'bg-blue-100 text-blue-600',
    gradient: 'from-blue-50 via-white to-sky-50',
    icon: '💬',
  },
  xiaohongshu: {
    label: '小红书',
    badge: 'bg-red-100 text-red-600',
    gradient: 'from-red-50 via-white to-rose-50',
    icon: '📕',
  },
  douyin: {
    label: '抖音',
    badge: 'bg-gray-800 text-gray-100',
    gradient: 'from-gray-100 via-white to-slate-50',
    icon: '🎵',
  },
}

/* ====== 工具函数 ====== */

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
  /** 当前展示索引（0 起），用于「n/N」提示 */
  index: number
  /** 候选总数 */
  total: number
  /** 切换到下一条 */
  onRefresh: () => void
}

export default function AIProjectCard({ project, index, total, onRefresh }: Props) {
  const toast = useToast()
  const { addTodo, isInTodo } = useTodos()

  const cfg = platformConfig[project.platform] ?? platformConfig.bilibili
  const inTodo = isInTodo(project.id)

  // 跳转链接：优先 Supabase 的 video_url
  const linkUrl = project.video_url || project.webUrl || project.appUrl

  /* ---- 打开链接 ---- */
  const handleOpen = () => {
    if (!linkUrl) {
      toast.show('暂无可用链接', '⚠️')
      return
    }
    window.open(linkUrl, '_blank')
  }

  /* ---- 复制链接 ---- */
  const handleCopy = async () => {
    const ok = await copyToClipboard(linkUrl)
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
        <div className="flex items-center gap-2">
          {total > 1 && (
            <span className="text-[10px] text-gray-400 tabular-nums">
              {index + 1}/{total}
            </span>
          )}
          <button
            onClick={onRefresh}
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
      </div>

      {/* ---- 卡片主体（纯文字） ---- */}
      <div
        key={linkUrl || String(project.id)}
        className={`ai-card-enter relative rounded-2xl overflow-hidden border border-white/70
                    bg-gradient-to-br ${cfg.gradient} shadow-sm`}
      >
        {/* 装饰柔光斑 */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/60 blur-2xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-white/50 blur-3xl" />
        {/* 超大平台图标水印 */}
        <div className="pointer-events-none absolute right-2 bottom-1 text-8xl leading-none opacity-[0.08] select-none">
          {cfg.icon}
        </div>

        <div className="relative p-5">
          {/* 顶行：平台徽章 + 标签 */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold shadow-sm ${cfg.badge}`}>
              <span>{cfg.icon}</span>
              <span>{cfg.label}</span>
            </span>
            <span className="text-[11px] font-medium text-gray-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {project.tag}
            </span>
          </div>

          {/* 标题 */}
          <h3 className="text-base font-bold text-gray-800 leading-snug">
            {project.title}
          </h3>

          {/* 摘要 */}
          <p className="mt-2.5 text-xs text-gray-500 leading-relaxed line-clamp-3">
            {project.highlights}
          </p>

          {/* 分隔线 */}
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200/70 to-transparent" />

          {/* ---- 操作按钮组 ---- */}
          <div className="mt-4 flex items-center gap-2">
            {/* 主按钮：去探索 */}
            <button
              onClick={handleOpen}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-semibold
                         hover:from-purple-500 hover:to-pink-500 active:scale-[0.97] transition-all duration-200 shadow-sm"
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
