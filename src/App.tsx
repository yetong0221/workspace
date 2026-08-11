import { useState, useMemo, useCallback } from 'react'
import PickupCard from './components/PickupCard'
import AIProjectCard from './components/AIProjectCard'
import { ToastProvider } from './components/Toast'
import { getTodayHealthTip } from './data/healthTips'
import { getTodayProject } from './data/aiProjectsData'
import type { AIProject } from './data/aiProjectsData'

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

/* ====== 图标组件 —— 使用 SVG ====== */

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function IconHealth({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconPackage({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function IconUser({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

/* ====== 导航项 ====== */

type NavTab = 'home' | 'health' | 'package' | 'profile'

interface NavItemProps {
  label: string
  tab: NavTab
  active: boolean
  icon: React.ReactNode
  onClick: () => void
}

function NavItem({ label, active, icon, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`nav-item ${active ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

/* ====== Dashboard 页面 ====== */

function Dashboard() {
  // 当日数据
  const todayTip = useMemo(() => getTodayHealthTip(), [])

  // AI 项目：每日 Hash 选取，支持手动换一换
  const [currentProject, setCurrentProject] = useState<AIProject>(() => getTodayProject())

  const handleRefreshProject = useCallback((next: AIProject) => {
    setCurrentProject(next)
  }, [])

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

      {/* ---- 🤖 每日 AI 爆款玩法（大图封面卡片） ---- */}
      <AIProjectCard project={currentProject} onRefresh={handleRefreshProject} />

      {/* ---- 每日健康贴士（每日轮播） ---- */}
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

      {/* ---- 快递取件码（交互组件） ---- */}
      <PickupCard />
    </div>
  )
}

/* ====== 占位页面 ====== */

function PlaceholderPage({ title, emoji }: { title: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-300">
      <span className="text-6xl mb-4">{emoji}</span>
      <p className="text-gray-400">{title}</p>
    </div>
  )
}

/* ====== App 主体 ====== */

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home')

  const tabs: { tab: NavTab; label: string; icon: (a: boolean) => React.ReactNode }[] = [
    { tab: 'home',    label: '首页', icon: (a) => <IconHome active={a} /> },
    { tab: 'health',  label: '健康', icon: (a) => <IconHealth active={a} /> },
    { tab: 'package', label: '快递', icon: (a) => <IconPackage active={a} /> },
    { tab: 'profile', label: '我的', icon: (a) => <IconUser active={a} /> },
  ]

  return (
    <ToastProvider>
      <div className="relative min-h-dvh flex flex-col">
        {/* ---- 页面内容 ---- */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <Dashboard />}
          {activeTab === 'health' && <PlaceholderPage title="健康管理" emoji="💪" />}
          {activeTab === 'package' && <PlaceholderPage title="我的快递" emoji="📦" />}
          {activeTab === 'profile' && <PlaceholderPage title="个人中心" emoji="👤" />}
        </div>

        {/* ---- 底部导航栏 ---- */}
        <nav className="bottom-nav">
          {tabs.map(({ tab, label, icon }) => (
            <NavItem
              key={tab}
              tab={tab}
              label={label}
              active={activeTab === tab}
              icon={icon(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </nav>
      </div>
    </ToastProvider>
  )
}

export default App
