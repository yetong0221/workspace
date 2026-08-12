import { useState } from 'react'
import Dashboard from './components/Dashboard'
import { ToastProvider } from './components/Toast'

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
