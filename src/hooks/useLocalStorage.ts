import { useState, useEffect, useCallback } from 'react'

/**
 * 封装 localStorage 的 React Hook
 * 数据持久化存储，刷新不丢失
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 初始化：从 localStorage 读取
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // 当数据变化时，写回 localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // 存储空间满时静默失败
    }
  }, [key, storedValue])

  // 提供类似 setState 的更新函数
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        return next
      })
    },
    []
  )

  return [storedValue, setValue] as const
}
