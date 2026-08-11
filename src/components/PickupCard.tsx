import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

/* ====== 类型定义 ====== */

export interface PickupItem {
  id: string
  code: string          // 取件码，如 "1-2-304"
  company: string       // 快递公司名称
  location: string      // 取件点
  createdAt: number     // 创建时间戳
}

interface PickupData {
  active: PickupItem[]    // 待取件
  history: PickupItem[]   // 已取件
}

/* ====== 预设快递公司 ====== */

const COURIER_COMPANIES = [
  '中通快递',
  '圆通快递',
  '申通快递',
  '韵达快递',
  '顺丰速运',
  '京东物流',
  '极兔速递',
  '邮政EMS',
  '德邦快递',
  '菜鸟速递',
]

const PICKUP_LOCATIONS = [
  '丰巢快递柜 · A区',
  '菜鸟驿站 · B栋',
  '小区门卫室',
  '公司前台',
  '快递超市 · C座',
]

/* ====== 工具函数 ====== */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

/* ====== 组件 ====== */

export default function PickupCard() {
  const [data, setData] = useLocalStorage<PickupData>('pickup-data', {
    active: [],
    history: [],
  })

  const [showForm, setShowForm] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // 表单状态
  const [code, setCode] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState(PICKUP_LOCATIONS[0])

  /* ---- 添加取件码 ---- */
  const handleAdd = () => {
    const trimmedCode = code.trim()
    const trimmedCompany = company.trim()
    if (!trimmedCode || !trimmedCompany) return

    const newItem: PickupItem = {
      id: generateId(),
      code: trimmedCode,
      company: trimmedCompany,
      location,
      createdAt: Date.now(),
    }

    setData((prev) => ({
      ...prev,
      active: [newItem, ...prev.active],
    }))

    // 重置表单
    setCode('')
    setCompany('')
    setLocation(PICKUP_LOCATIONS[0])
    setShowForm(false)
  }

  /* ---- 标记已取 ---- */
  const handlePickup = (id: string) => {
    setData((prev) => {
      const item = prev.active.find((i) => i.id === id)
      if (!item) return prev
      return {
        active: prev.active.filter((i) => i.id !== id),
        history: [item, ...prev.history],
      }
    })
  }

  /* ---- 删除记录 ---- */
  const handleDelete = (id: string, isHistory: boolean) => {
    setData((prev) => ({
      ...prev,
      [isHistory ? 'history' : 'active']: prev[isHistory ? 'history' : 'active'].filter(
        (i) => i.id !== id
      ),
    }))
  }

  /* ---- 清空历史 ---- */
  const handleClearHistory = () => {
    setData((prev) => ({ ...prev, history: [] }))
  }

  /* ---- 计算时间描述 ---- */
  const timeAgo = (ts: number): string => {
    const diff = Date.now() - ts
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours} 小时前`
    const days = Math.floor(hours / 24)
    return `${days} 天前`
  }

  return (
    <div>
      {/* ---- 标题栏 ---- */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">📦 快递取件码</h2>
        <div className="flex items-center gap-2">
          {/* 历史按钮 */}
          {data.history.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                showHistory
                  ? 'bg-purple-100 text-purple-500'
                  : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              已取 ({data.history.length})
            </button>
          )}
          {/* 添加按钮 */}
          <button
            onClick={() => setShowForm(!showForm)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
              showForm
                ? 'bg-gray-200 text-gray-500'
                : 'bg-purple-50 text-purple-500 hover:bg-purple-100'
            }`}
          >
            {showForm ? '收起' : '+ 添加'}
          </button>
        </div>
      </div>

      {/* ---- 添加表单 ---- */}
      {showForm && (
        <div className="dash-card bg-macaron-purple/30 mb-3 space-y-3 animate-[fadeIn_0.2s_ease-out]">
          {/* 快递公司 */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">快递公司</label>
            <div className="flex flex-wrap gap-1.5">
              {COURIER_COMPANIES.slice(0, 6).map((c) => (
                <button
                  key={c}
                  onClick={() => setCompany(c)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    company === c
                      ? 'bg-purple-400 text-white'
                      : 'bg-white/70 text-gray-500 hover:bg-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="或手动输入快递公司…"
              className="mt-2 w-full text-sm bg-white/60 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-gray-300"
            />
          </div>

          {/* 取件码 */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">取件码</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="例如：1-2-304"
              className="w-full text-sm font-mono tracking-wider bg-white/60 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-gray-300"
            />
          </div>

          {/* 取件点 */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">取件点</label>
            <div className="flex flex-wrap gap-1.5">
              {PICKUP_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    location === loc
                      ? 'bg-purple-400 text-white'
                      : 'bg-white/70 text-gray-500 hover:bg-white'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* 确认按钮 */}
          <button
            onClick={handleAdd}
            disabled={!code.trim() || !company.trim()}
            className="w-full py-2.5 rounded-xl bg-purple-400 text-white font-medium text-sm
                       hover:bg-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            添加取件码
          </button>
        </div>
      )}

      {/* ---- 待取件列表 ---- */}
      {data.active.length === 0 ? (
        <div className="dash-card bg-gray-50/80 text-center py-8">
          <span className="text-3xl block mb-2">📭</span>
          <p className="text-sm text-gray-400">暂无待取快递</p>
          <p className="text-xs text-gray-300 mt-1">点击"+ 添加"录入取件码</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.active.map((item) => (
            <div
              key={item.id}
              className="dash-card bg-macaron-purple/40 group cursor-pointer
                         hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              onClick={() => handlePickup(item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 勾选圆圈 */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-purple-300 flex items-center justify-center
                               flex-shrink-0 group-hover:bg-purple-400 group-hover:border-purple-400 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-700">{item.company}</p>
                      <span className="text-[10px] bg-white/60 text-gray-400 px-1.5 py-0.5 rounded">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {timeAgo(item.createdAt)}录入
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="pickup-code text-lg tracking-[0.3em] py-2 px-3 bg-white/70 rounded-lg">
                    {item.code}
                  </div>
                  {/* 删除按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(item.id, false)
                    }}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1"
                    title="删除"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- 已取件历史 ---- */}
      {showHistory && data.history.length > 0 && (
        <div className="mt-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">📋 已取记录</h3>
            <button
              onClick={handleClearHistory}
              className="text-xs text-gray-300 hover:text-red-400 transition-colors"
            >
              清空
            </button>
          </div>
          <div className="space-y-2">
            {data.history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-lg">✅</span>
                  <div>
                    <p className="text-sm text-gray-400 line-through">{item.company}</p>
                    <p className="text-xs text-gray-300">
                      {item.location} · {timeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300 font-mono line-through">
                    {item.code}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id, true)}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1"
                    title="删除"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
