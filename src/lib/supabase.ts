import { createClient } from '@supabase/supabase-js'

// ⚠️ supabase-js 会自动拼接 /rest/v1/，URL 中不能包含该路径
const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string) || ''
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase 环境变量未配置，将使用本地 Mock 数据。\n' +
    '请在 .env.local 中填入 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。'
  )
}

/**
 * Supabase 客户端实例。
 * 当环境变量未配置时，createClient 仍会创建实例，
 * 但调用方应捕获异常并降级到 Mock 数据。
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export default supabase
