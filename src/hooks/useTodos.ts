import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { AIProject } from '../data/aiProjectsData'

export interface TodoItem {
  id: string
  projectId: number
  title: string
  tag: string
  platform: string
  webUrl: string
  appUrl: string
  createdAt: number
  done: boolean
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('ai-todos', [])

  const activeTodos = todos.filter((t) => !t.done)
  const doneTodos = todos.filter((t) => t.done)

  /** 将一个 AI 项目加入待办 */
  const addTodo = useCallback(
    (project: AIProject) => {
      // 去重：同一 projectId 且未完成的不重复添加
      const exists = todos.some((t) => t.projectId === project.id && !t.done)
      if (exists) return false

      const item: TodoItem = {
        id: genId(),
        projectId: project.id,
        title: project.title,
        tag: project.tag,
        platform: project.platform,
        webUrl: project.webUrl,
        appUrl: project.appUrl,
        createdAt: Date.now(),
        done: false,
      }
      setTodos((prev) => [item, ...prev])
      return true
    },
    [todos, setTodos]
  )

  /** 标记完成 */
  const markDone = useCallback(
    (id: string) => {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: true } : t)))
    },
    [setTodos]
  )

  /** 删除 */
  const removeTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((t) => t.id !== id))
    },
    [setTodos]
  )

  /** 检查某个项目是否已在待办中 */
  const isInTodo = useCallback(
    (projectId: number) => {
      return todos.some((t) => t.projectId === projectId && !t.done)
    },
    [todos]
  )

  return { todos, activeTodos, doneTodos, addTodo, markDone, removeTodo, isInTodo }
}
