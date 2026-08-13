import { useState, useCallback, createContext, useContext } from 'react'
import type { ReactNode } from 'react'

/* ====== 类型 ====== */

interface ToastItem {
  id: number
  message: string
  icon?: string
}

interface ToastCtx {
  show: (message: string, icon?: string) => void
}

/* ====== Context ====== */

const ToastContext = createContext<ToastCtx>({ show: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

/* ====== Provider ====== */

let _nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = useCallback((message: string, icon = '✅') => {
    const id = ++_nextId
    setToasts((prev) => [...prev, { id, message, icon }])
    // 2.5 秒后自动消失
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  // 手动关闭
  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Toast 渲染层 */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => dismiss(t.id)}
            className="pointer-events-auto flex items-center gap-2 bg-gray-800/90 text-white text-sm
                       px-4 py-2.5 rounded-full shadow-lg backdrop-blur-sm
                       animate-[slide-up-fade_0.3s_ease-out_both] cursor-pointer
                       active:scale-95 transition-transform"
          >
            <span>{t.icon}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
