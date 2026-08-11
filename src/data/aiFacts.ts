export interface AIFact {
  id: number
  title: string
  category: string
  summary: string
  detail: string
  icon: string
}

export const aiFacts: AIFact[] = [
  {
    id: 1,
    title: 'Claude Code 能在终端里帮你改 Bug',
    category: 'Claude Code',
    summary: '一条指令，它直接读代码、写代码、跑测试，像有个 AI 同事坐在你旁边 Pair Programming。',
    detail: '在终端里输入 `claude "修复登录页面的 token 过期问题"`，Claude Code 会自动搜索相关文件、分析 root cause、写出修复代码并运行测试。它不是 Chat——它是 Agent，会主动执行 Bash 命令、读写文件、甚至 git commit。2025 年 Anthropic 将其开源为 Claude Code SDK，任何人都能嵌入自己的工作流。',
    icon: '🖥️',
  },
  {
    id: 2,
    title: '用 Claude Code Workflow 同时审 50 个文件',
    category: 'Claude Code',
    summary: '不是一个个看——是同时派几十个 Agent 并行审查，5 分钟内出完整报告。',
    detail: 'Workflow（原 Ultracode）是 Claude Code 的多 Agent 编排引擎。你可以写一段 JS 脚本定义 pipeline：先并行扫描所有改动的文件，再让每个 Agent 从"正确性""安全""性能"三个维度独立评审，最后用一个 judge agent 合并结果。50 个文件的 Code Review 从 2 小时缩短到 5 分钟。',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'ChatGPT Canvas：不只是聊天，是协作白板',
    category: 'ChatGPT',
    summary: 'OpenAI 把 ChatGPT 从对话框变成了可视化编辑器，写文档、改代码都有实时预览。',
    detail: 'Canvas 是 ChatGPT 的内置编辑模式，当你让它写长文或代码时会自动触发。右侧是生成结果，你可以直接选中某一段落让它"改短一点"或"换成更正式的语气"，而不需要重新生成整篇。代码模式下还能一键 review、添加日志、翻译到其他语言。相当于 Google Docs + AI 的合体。',
    icon: '🎨',
  },
  {
    id: 4,
    title: 'Gemini Deep Research：10 分钟产出一篇万字调研报告',
    category: 'Gemini',
    summary: '你给一个选题，它自动搜索几十个网页、交叉验证、组织引用，输出带参考文献的完整报告。',
    detail: 'Gemini 的 Deep Research 功能会先根据你的问题分解出多个子问题，然后并行搜索网页，阅读每篇文章后提取关键信息，再交叉比对不同来源的一致性。最后自动生成结构清晰的万字长文，每个论断都附有引用链接。特别适合竞品分析、行业研究和学术文献综述。',
    icon: '🔬',
  },
  {
    id: 5,
    title: 'Cursor 的 Tab 键比你想象的聪明',
    category: 'Cursor',
    summary: '它不是简单的代码补全——它能预测你接下来要改的 3-5 行，包括跨文件的联动修改。',
    detail: 'Cursor 基于自定义模型，不只是补全当前行。它分析你最近的编辑模式、git diff 和项目上下文，预判你的下一步编辑。比如你在改一个组件的 props 类型，它会自动提示你需要同步修改的调用方。开发者统计按 Tab 接受的代码中，超过 60% 是多行编辑而非单行补全。',
    icon: '↹',
  },
  {
    id: 6,
    title: 'GitHub Copilot Agent 模式：从"补全"到"自主执行"',
    category: 'Copilot',
    summary: 'Copilot 不再只给建议——它能自己读错误日志、定位问题、写 PR 描述。',
    detail: '2025 年 GitHub Copilot 推出了 Agent 模式（代号 Project Padawan）。你可以 assign 一个 Issue 给它，它会自动：阅读相关代码 → 制定修改计划 → 生成代码变更 → 运行测试 → 创建 Pull Request 并写描述。人类只需要 Review 和 Merge。微软内部已用于 30% 的日常维护任务。',
    icon: '🤖',
  },
  {
    id: 7,
    title: 'v0.dev：对着截图说话就能生成页面',
    category: 'Vercel',
    summary: '上传一张设计稿或手绘线框图，v0 直接输出可运行的 React + Tailwind 代码。',
    detail: 'Vercel 的 v0 是面向前端开发的 AI 工具。你可以：1）上传 Figma 截图让它生成像素级还原的组件；2）用自然语言描述"给我一个带搜索和分页的数据表格"；3）在对话中逐步迭代——"把按钮颜色改成马卡龙紫"。它输出的是真实可运行的 Next.js/React 代码，不是原型图。',
    icon: '🖼️',
  },
  {
    id: 8,
    title: 'Claude Code 的 Memory 系统：越用越懂你',
    category: 'Claude Code',
    summary: '它会记住你的偏好、项目规则和踩过的坑，下次不用再说一遍。',
    detail: 'Claude Code 的 Memory 功能自动将你的偏好、项目约定和重要决策持久化为文件。比如你说过一次"我们的 API 用 REST 风格，错误码统一用 snake_case"，它会记住并在后续所有代码生成中遵循。还能手动写入 CLAUDE.md 作为项目级 System Prompt，整个团队共享。',
    icon: '🧠',
  },
  {
    id: 9,
    title: 'ChatGPT Code Interpreter：让 AI 直接跑代码',
    category: 'ChatGPT',
    summary: '上传 CSV，说一句"帮我分析用户留存"，它就能写 Python、画图、得出结论。',
    detail: 'Code Interpreter（现称 Advanced Data Analysis）给 ChatGPT 配备了一个沙箱 Python 环境。你上传几百 MB 的 Excel 或 CSV 文件，它自动：清洗数据 → 统计分析 → 生成可视化图表 → 给出业务建议。不需要你会写 pandas 或 matplotlib——但如果你会，可以审查和修改它生成的代码。',
    icon: '📊',
  },
  {
    id: 10,
    title: 'Gemini 在 Gmail 里帮你写邮件摘要',
    category: 'Gemini',
    summary: '一个长邮件线程 30 封来回——Gemini 5 秒总结出关键结论和你的待办事项。',
    detail: 'Google 将 Gemini 深度集成到了 Workspace 全家桶。在 Gmail 侧边栏点一下"总结此线程"，它提取关键决策、待办和截止日期。在 Google Docs 里能根据你的大纲扩写全文。更有用的是"帮我找上周张三发的那封关于预算审批的邮件"——自然语言搜索代替了你翻几十页收件箱。',
    icon: '📧',
  },
  {
    id: 11,
    title: 'Bolt.new：浏览器里用 AI 搭全栈应用',
    category: 'Bolt',
    summary: '在浏览器里说一句话，AI 自动安装依赖、写前后端代码、部署上线——全程不需要本地环境。',
    detail: 'StackBlitz 出品的 Bolt.new 让你在浏览器中通过对话创建完整的全栈项目。它基于 WebContainer 技术，直接在浏览器里跑 Node.js，所以你写完代码就能即时预览。支持 React、Vue、Next.js、Express 等主流框架，还能一键部署到 Netlify 或 Cloudflare。最适合快速做原型和 MVP。',
    icon: '⚡',
  },
  {
    id: 12,
    title: 'Claude Code 的自定义 Slash Command',
    category: 'Claude Code',
    summary: '把重复工作封装成 `/deploy`、`/review` 这样的命令，团队复用效率翻倍。',
    detail: 'Claude Code 支持用 Markdown 文件定义自定义 Slash Command（Skill）。你可以写一个 `/deploy` 命令：自动跑 lint → 跑测试 → build → 推送 Docker 镜像 → 通知 Slack。或者 `/oncall`：拉取最近的告警日志 → 分析异常模式 → 给出排查步骤。技能文件可以提交到 git 仓库，整组共享。',
    icon: '⚙️',
  },
  {
    id: 13,
    title: 'OpenAI o3/o4：会"思考"的推理模型',
    category: 'ChatGPT',
    summary: '遇到复杂数学或编程题时，它会在内部"自言自语"几分钟，然后给出远超普通模型的答案。',
    detail: 'o3/o4 是 OpenAI 的推理系列模型，特点是在回答前进行大量内部 Chain-of-Thought 推理。在 Codeforces 编程竞赛中 o3 达到了相当于人类 Expert 级别的评级（前 5%）。它会自己尝试多种解法、验证正确性、甚至自我纠错——所有推理过程你都能看到，不是黑箱。适合数学证明、算法设计和逻辑推理。',
    icon: '🧩',
  },
  {
    id: 14,
    title: 'Cline + MCP：让 AI 连接你的所有工具',
    category: '工具链',
    summary: '通过 MCP 协议，一个 AI 助手就能操作数据库、查 API 文档、发 Slack 消息——打通所有 SaaS。',
    detail: 'MCP（Model Context Protocol）是 Anthropic 推出的开放协议，让 AI 能安全地调用外部工具。比如 Cline（VS Code 插件）通过 MCP 连接了你的 PostgreSQL 数据库、Jira 看板和 Figma 设计稿。你只需说"根据 Figma 设计生成 SQL 建表语句"，AI 就能读设计稿 → 推断字段 → 写 SQL → 直接执行。协议开源，已有 200+ 工具支持。',
    icon: '🔌',
  },
  {
    id: 15,
    title: 'Replit Agent：面向非程序员的 App 生成器',
    category: 'Replit',
    summary: '不懂代码也能做 App——描述你的想法，AI 从零搭建、部署到公网，你只管提修改意见。',
    detail: 'Replit Agent 的目标用户是非技术背景的人。你可以说"帮我做一个读书打卡小程序，能扫码添加书籍、记录每日阅读页数、生成月度统计图"。Agent 会：1）选择技术栈（通常是 Next.js + SQLite）；2）生成完整前后端代码；3）自动部署到 replit.app 域名；4）截屏给你看效果。不满意就继续对话迭代，全程不需要碰代码。',
    icon: '🚀',
  },
]

/**
 * 根据当天日期返回一条 AI 知识（每天自动轮播）
 */
export function getTodayAIFact(): AIFact {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return aiFacts[dayOfYear % aiFacts.length]
}
