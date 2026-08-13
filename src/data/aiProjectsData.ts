export type Platform = 'bilibili' | 'xiaohongshu' | 'douyin' | 'github' | 'v2ex' | 'sspai'

export interface AIProject {
  id: number
  title: string
  platform: Platform
  cover: string
  /** 来自 Supabase 的高清封面（优先级高于 cover） */
  cover_url?: string
  tag: string
  highlights: string
  webUrl: string
  appUrl: string
  /** 来自 Supabase 的真实视频链接（优先级高于 webUrl） */
  video_url?: string
}

/* ====== 30 条爆款 AI 项目数据池 ====== */

export const aiProjects: AIProject[] = [
  // ==================== 哔哩哔哩 (10条) ====================
  {
    id: 1,
    title: '不需要显卡！用 DeepSeek 10分钟搭建专属 AI 智能体',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/aiagent1/400/300',
    tag: '#AI智能体',
    highlights: '零硬件门槛，DeepSeek API + Dify 可视化编排，手把手教你部署自己的 AI 助手。',
    webUrl: 'https://search.bilibili.com/all?keyword=DeepSeek+%E6%90%AD%E5%BB%BAAI%E6%99%BA%E8%83%BD%E4%BD%93+Dify',
    appUrl: 'https://search.bilibili.com/all?keyword=DeepSeek+%E6%90%AD%E5%BB%BAAI%E6%99%BA%E8%83%BD%E4%BD%93+Dify',
  },
  {
    id: 2,
    title: '零基础也能玩！ComfyUI 一键生成赛博朋克小姐姐',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/comfyui/400/300',
    tag: '#AI绘画',
    highlights: 'ComfyUI 节点式工作流全拆解，附带现成模板，拖拽连线就能出大片级画作。',
    webUrl: 'https://search.bilibili.com/all?keyword=ComfyUI+%E4%B8%80%E9%94%AE%E7%94%9F%E6%88%90+AI%E7%BB%98%E7%94%BB+%E6%95%99%E7%A8%8B',
    appUrl: 'https://search.bilibili.com/all?keyword=ComfyUI+%E4%B8%80%E9%94%AE%E7%94%9F%E6%88%90+AI%E7%BB%98%E7%94%BB+%E6%95%99%E7%A8%8B',
  },
  {
    id: 3,
    title: '我把 ChatGPT 接进了《我的世界》，AI 开始自己建城堡了',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/minecraftai/400/300',
    tag: '#AI应用',
    highlights: '用 Minecraft Bot API + GPT-4o 让 AI 在游戏里自主规划、建造、对话，效果炸裂。',
    webUrl: 'https://search.bilibili.com/all?keyword=ChatGPT+%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C+AI+%E5%BB%BA%E5%9F%8E%E5%A0%A1',
    appUrl: 'https://search.bilibili.com/all?keyword=ChatGPT+%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C+AI+%E5%BB%BA%E5%9F%8E%E5%A0%A1',
  },
  {
    id: 4,
    title: '用 Claude Code 写了个自动抢课脚本，室友全来求我',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/claudecode/400/300',
    tag: '#ClaudeCode',
    highlights: 'Claude Code Agent 模式自动监控选课系统、识别空位、一键抢课，附完整代码讲解。',
    webUrl: 'https://search.bilibili.com/all?keyword=Claude+Code+%E8%87%AA%E5%8A%A8%E6%8A%A2%E8%AF%BE+%E8%84%9A%E6%9C%AC',
    appUrl: 'https://search.bilibili.com/all?keyword=Claude+Code+%E8%87%AA%E5%8A%A8%E6%8A%A2%E8%AF%BE+%E8%84%9A%E6%9C%AC',
  },
  {
    id: 5,
    title: 'SD3.5 实测：AI 画手终于不崩了，附最佳参数配置',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/sd35/400/300',
    tag: '#AI绘画',
    highlights: 'Stable Diffusion 3.5 对手部、文字、多人场景的生成质量跨越式提升，实测对比 + 调参指南。',
    webUrl: 'https://search.bilibili.com/all?keyword=SD3.5+AI%E7%BB%98%E7%94%BB+%E5%AE%9E%E6%B5%8B+%E5%8F%82%E6%95%B0',
    appUrl: 'https://search.bilibili.com/all?keyword=SD3.5+AI%E7%BB%98%E7%94%BB+%E5%AE%9E%E6%B5%8B+%E5%8F%82%E6%95%B0',
  },
  {
    id: 6,
    title: 'AI 给黑白老照片上色修复，过程太治愈了',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/oldphoto/400/300',
    tag: '#AI影像',
    highlights: '用 DeOldify + GFPGAN 一键还原 60 年前的全家福，看完泪目，附本地部署教程。',
    webUrl: 'https://search.bilibili.com/all?keyword=AI+%E8%80%81%E7%85%A7%E7%89%87+%E4%B8%8A%E8%89%B2+%E4%BF%AE%E5%A4%8D+DeOldify',
    appUrl: 'https://search.bilibili.com/all?keyword=AI+%E8%80%81%E7%85%A7%E7%89%87+%E4%B8%8A%E8%89%B2+%E4%BF%AE%E5%A4%8D+DeOldify',
  },
  {
    id: 7,
    title: 'DeepSeek-R1 本地部署全流程，开源模型跑出 GPT-4 级推理',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/deepseek/400/300',
    tag: '#开源大模型',
    highlights: 'Ollama + Open WebUI 傻瓜式部署，32B 模型在家用 RTX 4090 上流畅推理，数学能力惊人。',
    webUrl: 'https://search.bilibili.com/all?keyword=DeepSeek-R1+%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+Ollama+Open+WebUI',
    appUrl: 'https://search.bilibili.com/all?keyword=DeepSeek-R1+%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+Ollama+Open+WebUI',
  },
  {
    id: 8,
    title: 'AI 自动剪辑 Vlog 全流程！剪映 + AI 工作流效率提升 10 倍',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/aivlog/400/300',
    tag: '#AI剪辑',
    highlights: 'AI 自动识别高光片段、生成字幕、匹配 BGM、一键包装，日更 up 主的终极生产力工具。',
    webUrl: 'https://search.bilibili.com/all?keyword=AI+%E8%87%AA%E5%8A%A8%E5%89%AA%E8%BE%91+Vlog+%E5%89%AA%E6%98%A0+%E5%B7%A5%E4%BD%9C%E6%B5%81',
    appUrl: 'https://search.bilibili.com/all?keyword=AI+%E8%87%AA%E5%8A%A8%E5%89%AA%E8%BE%91+Vlog+%E5%89%AA%E6%98%A0+%E5%B7%A5%E4%BD%9C%E6%B5%81',
  },
  {
    id: 9,
    title: '我用 AI 生成了一整本连环画，B站首发全过程',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/comicai/400/300',
    tag: '#AI创作',
    highlights: 'ChatGPT 写剧本 → Midjourney 出图 → Canva 排版，一个人就是一家出版社，全程 3 小时。',
    webUrl: 'https://search.bilibili.com/all?keyword=AI+%E7%94%9F%E6%88%90+%E8%BF%9E%E7%8E%AF%E7%94%BB+ChatGPT+Midjourney',
    appUrl: 'https://search.bilibili.com/all?keyword=AI+%E7%94%9F%E6%88%90+%E8%BF%9E%E7%8E%AF%E7%94%BB+ChatGPT+Midjourney',
  },
  {
    id: 10,
    title: 'Suno AI 作曲全网最全教程：不会乐理也能出一首原创歌',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/sunoai/400/300',
    tag: '#AI音乐',
    highlights: '从歌词 Prompt 到曲风控制到后期混音，手把手教你用 Suno v4 做出能发网易云的歌。',
    webUrl: 'https://search.bilibili.com/all?keyword=Suno+AI+%E4%BD%9C%E6%9B%B2+%E6%95%99%E7%A8%8B+%E9%9F%B3%E4%B9%90',
    appUrl: 'https://search.bilibili.com/all?keyword=Suno+AI+%E4%BD%9C%E6%9B%B2+%E6%95%99%E7%A8%8B+%E9%9F%B3%E4%B9%90',
  },

  // ==================== 小红书 (10条) ====================
  {
    id: 11,
    title: '打工人神器！用 AI 自动生成周报，老板以为我天天加班',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/weeklyai/400/300',
    tag: '#效率工具',
    highlights: 'Notion AI + 自定义模板，输入关键词自动扩写成一篇逻辑清晰、亮点满满的周报。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%91%A8%E6%8A%A5+Notion+%E6%95%88%E7%8E%87%E5%B7%A5%E5%85%B7',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%91%A8%E6%8A%A5+Notion+%E6%95%88%E7%8E%87%E5%B7%A5%E5%85%B7',
  },
  {
    id: 12,
    title: '用 ChatGPT 做日本自由行攻略，闺蜜看了直接抄作业',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/japantrip/400/300',
    tag: '#旅行规划',
    highlights: '告诉 ChatGPT 预算、天数、偏好，它出交通路线 + 餐厅推荐 + 避雷清单，比旅行社还细。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=ChatGPT+%E6%97%A5%E6%9C%AC%E8%87%AA%E7%94%B1%E8%A1%8C%E6%94%BB%E7%95%A5+AI',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=ChatGPT+%E6%97%A5%E6%9C%AC%E8%87%AA%E7%94%B1%E8%A1%8C%E6%94%BB%E7%95%A5+AI',
  },
  {
    id: 13,
    title: '小红书封面不用愁，AI 一键生成高级感日杂排版',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/coverai/400/300',
    tag: '#AI设计',
    highlights: 'Canva AI + Recraft 双工具配合，输入标题自动出 3 款封面备选，点击率提升 200%。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%B0%81%E9%9D%A2%E8%AE%BE%E8%AE%A1+Canva+%E6%97%A5%E6%9D%82%E6%8E%92%E7%89%88',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%B0%81%E9%9D%A2%E8%AE%BE%E8%AE%A1+Canva+%E6%97%A5%E6%9D%82%E6%8E%92%E7%89%88',
  },
  {
    id: 14,
    title: '程序员男友用 AI 给我做了个经期提醒小程序，甜哭了',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/periodai/400/300',
    tag: '#AI编程',
    highlights: 'Cursor + Claude 半小时从零到上线，带推送提醒、情绪记录和暖心文案，附源码。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=Cursor+Claude+%E5%B0%8F%E7%A8%8B%E5%BA%8F+AI%E7%BC%96%E7%A8%8B',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=Cursor+Claude+%E5%B0%8F%E7%A8%8B%E5%BA%8F+AI%E7%BC%96%E7%A8%8B',
  },
  {
    id: 15,
    title: '社恐福音！用 AI 模拟面试 30 场，拿到字节 offer',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/interviewai/400/300',
    tag: '#AI求职',
    highlights: 'ChatGPT 语音模式模拟真实面试官，针对岗位 JD 出题、追问、给改进建议，越练越自信。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E6%A8%A1%E6%8B%9F%E9%9D%A2%E8%AF%95+ChatGPT+%E6%B1%82%E8%81%8C',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E6%A8%A1%E6%8B%9F%E9%9D%A2%E8%AF%95+ChatGPT+%E6%B1%82%E8%81%8C',
  },
  {
    id: 16,
    title: 'AI 帮我搭配一周穿搭，同事问我是不是换了造型师',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/outfitai/400/300',
    tag: '#AI穿搭',
    highlights: '上传衣橱照片，AI 识别单品 + 分析色系 + 生成一周 7 套组合，还能根据天气调整。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E6%90%AD%E9%85%8D%E7%A9%BF%E6%90%AD+%E8%A1%A3%E6%A9%B1%E7%AE%A1%E7%90%86',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E6%90%AD%E9%85%8D%E7%A9%BF%E6%90%AD+%E8%A1%A3%E6%A9%B1%E7%AE%A1%E7%90%86',
  },
  {
    id: 17,
    title: '0 元学 AI！这 5 个免费课程让我从零到独立做项目',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/freeai/400/300',
    tag: '#AI学习',
    highlights: '吴恩达入门课 + 李沐论文精读 + Fast.ai 实战 +  Kaggle 竞赛 + 阿里云免费算力，全免费。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%85%8D%E8%B4%B9AI%E5%AD%A6%E4%B9%A0%E8%AF%BE%E7%A8%8B+%E5%90%B4%E6%81%A9%E8%BE%BE+%E6%9D%8E%E6%B2%90',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=%E5%85%8D%E8%B4%B9AI%E5%AD%A6%E4%B9%A0%E8%AF%BE%E7%A8%8B+%E5%90%B4%E6%81%A9%E8%BE%BE+%E6%9D%8E%E6%B2%90',
  },
  {
    id: 18,
    title: 'AI 分析我一年消费记录，发现了一个月省 2000 的秘密',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/moneyai/400/300',
    tag: '#AI理财',
    highlights: '导出微信/支付宝账单，ChatGPT Code Interpreter 自动归类、可视化、找出不该花的"拿铁因子"。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%88%86%E6%9E%90%E6%B6%88%E8%B4%B9+%E7%90%86%E8%B4%A2+ChatGPT',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%88%86%E6%9E%90%E6%B6%88%E8%B4%B9+%E7%90%86%E8%B4%A2+ChatGPT',
  },
  {
    id: 19,
    title: '手残党也能画头像，AI 帮你生成专属二次元形象',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/avatarai/400/300',
    tag: '#AI绘画',
    highlights: '上传 3 张自拍 → AI 训练 LoRA → 生成 10 种风格的二次元头像，闺蜜以为花了 500 块约稿。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E7%94%9F%E6%88%90%E4%BA%8C%E6%AC%A1%E5%85%83%E5%A4%B4%E5%83%8F+LoRA+%E7%BA%A6%E7%A8%BF',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E7%94%9F%E6%88%90%E4%BA%8C%E6%AC%A1%E5%85%83%E5%A4%B4%E5%83%8F+LoRA+%E7%BA%A6%E7%A8%BF',
  },
  {
    id: 20,
    title: '下班后靠 AI 做副业月入 5000+，真实经验全分享',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/sidejob/400/300',
    tag: '#AI副业',
    highlights: 'AI 写小红书文案 + 自动生成配图 + 接商单，完整 SOP 公开，在家就能做。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%89%AF%E4%B8%9A+%E5%B0%8F%E7%BA%A2%E4%B9%A6+%E5%86%99%E6%96%87%E6%A1%88+%E9%85%8D%E5%9B%BE',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E5%89%AF%E4%B8%9A+%E5%B0%8F%E7%BA%A2%E4%B9%A6+%E5%86%99%E6%96%87%E6%A1%88+%E9%85%8D%E5%9B%BE',
  },

  // ==================== 抖音 (10条) ====================
  {
    id: 21,
    title: '3 秒生成一张海报！这个 AI 工具比设计师还快',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/posterai/400/300',
    tag: '#AI设计',
    highlights: 'Ideogram 3.0 文字渲染能力炸裂，输入文案直接出带完美排版的海报，电商主图必备。',
    webUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%90%E6%B5%B7%E6%8A%A5+Ideogram+%E8%AE%BE%E8%AE%A1',
    appUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%90%E6%B5%B7%E6%8A%A5+Ideogram+%E8%AE%BE%E8%AE%A1',
  },
  {
    id: 22,
    title: 'AI 数字人直播带货，一个人一台电脑搞定全场',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/digitalhuman/400/300',
    tag: '#数字人',
    highlights: 'HeyGen + 抖音直播伴侣，AI 数字人 24 小时不间断带货，成本从月薪 2 万降到电费。',
    webUrl: 'https://www.douyin.com/search/AI+%E6%95%B0%E5%AD%97%E4%BA%BA+%E7%9B%B4%E6%92%AD%E5%B8%A6%E8%B4%A7+HeyGen',
    appUrl: 'https://www.douyin.com/search/AI+%E6%95%B0%E5%AD%97%E4%BA%BA+%E7%9B%B4%E6%92%AD%E5%B8%A6%E8%B4%A7+HeyGen',
  },
  {
    id: 23,
    title: '用 AI 做表情包发到群里，被疯狂转发 999+',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/memeai/400/300',
    tag: '#AI趣味',
    highlights: '一个 Prompt 生成 10 张魔性表情包，精准戳中打工人笑点，群聊社交货币轻松拿捏。',
    webUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%90%E8%A1%A8%E6%83%85%E5%8C%85+%E6%90%9E%E7%AC%91',
    appUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%90%E8%A1%A8%E6%83%85%E5%8C%85+%E6%90%9E%E7%AC%91',
  },
  {
    id: 24,
    title: 'AI 语音克隆太真了！用我的声音给我妈打电话她没听出来',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/voiceclone/400/300',
    tag: '#AI语音',
    highlights: 'Fish Audio 开源模型，10 秒录音就能克隆任何人声，附使用注意事项和伦理边界讨论。',
    webUrl: 'https://www.douyin.com/search/AI+%E8%AF%AD%E9%9F%B3%E5%85%8B%E9%9A%86+Fish+Audio+%E5%BC%80%E6%BA%90',
    appUrl: 'https://www.douyin.com/search/AI+%E8%AF%AD%E9%9F%B3%E5%85%8B%E9%9A%86+Fish+Audio+%E5%BC%80%E6%BA%90',
  },
  {
    id: 25,
    title: '废片秒变大片！AI 修图一键换天、去路人、补像素',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/photoai/400/300',
    tag: '#AI修图',
    highlights: 'Magnific AI + Photoshop AI 版强强联手，旅行照阴天变夕阳、路人自动消失、模糊变 4K。',
    webUrl: 'https://www.douyin.com/search/AI+%E4%BF%AE%E5%9B%BE+Magnific+Photoshop+%E6%8D%A2%E5%A4%A9',
    appUrl: 'https://www.douyin.com/search/AI+%E4%BF%AE%E5%9B%BE+Magnific+Photoshop+%E6%8D%A2%E5%A4%A9',
  },
  {
    id: 26,
    title: 'AI 帮你写短视频脚本，条条都有爆款基因',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/scriptai/400/300',
    tag: '#AI文案',
    highlights: '输入赛道和风格，AI 分析近期爆款结构后生成"黄金前 3 秒 + 冲突 + 反转"完整脚本。',
    webUrl: 'https://www.douyin.com/search/AI+%E5%86%99%E7%9F%AD%E8%A7%86%E9%A2%91%E8%84%9A%E6%9C%AC+%E7%88%86%E6%AC%BE',
    appUrl: 'https://www.douyin.com/search/AI+%E5%86%99%E7%9F%AD%E8%A7%86%E9%A2%91%E8%84%9A%E6%9C%AC+%E7%88%86%E6%AC%BE',
  },
  {
    id: 27,
    title: '用 AI 分析前任聊天记录，发现了惊人规律',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/chatanalyze/400/300',
    tag: '#AI分析',
    highlights: '导出微信聊天记录，AI 情感分析 + 高频词统计 + 时间线可视化，评论区已炸锅。',
    webUrl: 'https://www.douyin.com/search/AI+%E5%88%86%E6%9E%90%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95+%E6%83%85%E6%84%9F%E5%88%86%E6%9E%90',
    appUrl: 'https://www.douyin.com/search/AI+%E5%88%86%E6%9E%90%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95+%E6%83%85%E6%84%9F%E5%88%86%E6%9E%90',
  },
  {
    id: 28,
    title: 'AI 算命火了！输入生日出运势，程序员揭秘背后原理',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/fortuneai/400/300',
    tag: '#AI揭秘',
    highlights: '所谓"AI 算命"本质是大模型套了玄学 Prompt，带你拆解 Prompt 模板，自己也能写一个。',
    webUrl: 'https://www.douyin.com/search/AI+%E7%AE%97%E5%91%BD+%E5%8E%9F%E7%90%86+Prompt+%E6%8F%AD%E7%A7%98',
    appUrl: 'https://www.douyin.com/search/AI+%E7%AE%97%E5%91%BD+%E5%8E%9F%E7%90%86+Prompt+%E6%8F%AD%E7%A7%98',
  },
  {
    id: 29,
    title: '这个 AI 视频翻译工具让我看懂了所有外网教程',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/translateai/400/300',
    tag: '#AI翻译',
    highlights: 'HeyGen Video Translate 保留原声线 + 自动口型同步 + 中文字幕，YouTube 变成中文网。',
    webUrl: 'https://www.douyin.com/search/AI+%E8%A7%86%E9%A2%91%E7%BF%BB%E8%AF%91+HeyGen+%E5%8F%A3%E5%9E%8B%E5%90%8C%E6%AD%A5',
    appUrl: 'https://www.douyin.com/search/AI+%E8%A7%86%E9%A2%91%E7%BF%BB%E8%AF%91+HeyGen+%E5%8F%A3%E5%9E%8B%E5%90%8C%E6%AD%A5',
  },
  {
    id: 30,
    title: 'AI 一键生成 3D 模型，游戏开发者效率神器',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/3dai/400/300',
    tag: '#AI 3D',
    highlights: 'Meshy AI + Tripo 3D，上传 2D 图片或文字描述，几分钟生成带贴图的可商用 3D 模型。',
    webUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%903D%E6%A8%A1%E5%9E%8B+Meshy+Tripo',
    appUrl: 'https://www.douyin.com/search/AI+%E7%94%9F%E6%88%903D%E6%A8%A1%E5%9E%8B+Meshy+Tripo',
  },

  // ==================== 额外补充 (3条混搭) ====================
  {
    id: 31,
    title: 'Cursor + Claude 双剑合璧，不会写代码也能做个人网站',
    platform: 'bilibili',
    cover: 'https://picsum.photos/seed/websiteai/400/300',
    tag: '#AI编程',
    highlights: 'Cursor Agent 模式 + Claude Code 联合作战，自然语言描述需求，10 分钟上线个人主页。',
    webUrl: 'https://search.bilibili.com/all?keyword=Cursor+Claude+%E4%B8%AA%E4%BA%BA%E7%BD%91%E7%AB%99+AI%E7%BC%96%E7%A8%8B',
    appUrl: 'https://search.bilibili.com/all?keyword=Cursor+Claude+%E4%B8%AA%E4%BA%BA%E7%BD%91%E7%AB%99+AI%E7%BC%96%E7%A8%8B',
  },
  {
    id: 32,
    title: '用 AI 读完了我收藏 3 年都没翻的 PDF，精华全在这了',
    platform: 'xiaohongshu',
    cover: 'https://picsum.photos/seed/pdfai/400/300',
    tag: '#AI阅读',
    highlights: 'NotebookLM + Claude，上传 50 篇论文自动生成播客式摘要 + 知识图谱，信息焦虑终结者。',
    webUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E8%AF%BBPDF+NotebookLM+Claude+%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1',
    appUrl: 'https://www.xiaohongshu.com/search_result?keyword=AI+%E8%AF%BBPDF+NotebookLM+Claude+%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1',
  },
  {
    id: 33,
    title: 'AI 做 PPT 太离谱了，3 分钟做完我 3 小时的工作',
    platform: 'douyin',
    cover: 'https://picsum.photos/seed/pptai/400/300',
    tag: '#AI办公',
    highlights: 'Gamma + Beautiful.ai，输入大纲自动生成设计感十足的演示文稿，支持实时协作和导出 PPTX。',
    webUrl: 'https://www.douyin.com/search/AI+%E5%81%9APPT+Gamma+Beautiful+%E6%BC%94%E7%A4%BA%E6%96%87%E7%A8%BF',
    appUrl: 'https://www.douyin.com/search/AI+%E5%81%9APPT+Gamma+Beautiful+%E6%BC%94%E7%A4%BA%E6%96%87%E7%A8%BF',
  },
]

/* ====== 每日 Hash 算法 ====== */

/**
 * 基于 YYYY-MM-DD 的确定性 Hash，保证同一天返回同一个项目
 */
function hashDate(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    const ch = dateStr.charCodeAt(i)
    hash = ((hash << 5) - hash) + ch
    hash |= 0 // 转 32 位整数
  }
  return Math.abs(hash)
}

/**
 * 根据当天日期获取今日推荐项目
 */
export function getTodayProject(): AIProject {
  const today = new Date()
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const idx = hashDate(dateStr) % aiProjects.length
  return aiProjects[idx]
}

/**
 * 随机获取一个项目（"换一换"用，避免与当前重复）
 */
export function getRandomProject(excludeId?: number): AIProject {
  const pool = excludeId != null ? aiProjects.filter((p) => p.id !== excludeId) : aiProjects
  return pool[Math.floor(Math.random() * pool.length)]
}
