#!/usr/bin/env python3
"""
AI 爆款内容自动抓取 + DeepSeek 筛选 + Supabase 入库

用法：
  1. 在 .env.local 中配置 DEEPSEEK_API_KEY
  2. pip install -r scripts/requirements.txt
  3. python scripts/fetch_ai_posts.py
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import sys
import time
import traceback
from datetime import datetime, timezone
from typing import Any

import feedparser
import requests
from dotenv import load_dotenv
from supabase import Client, create_client

# ============================================================
#  日志
# ============================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ============================================================
#  加载环境变量
# ============================================================
load_dotenv(".env.local")

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL", "").rstrip("/").replace("/rest/v1", "")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY", "")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")

if not DEEPSEEK_API_KEY:
    log.error("❌ 未设置 DEEPSEEK_API_KEY，请在 .env.local 中添加")
    sys.exit(1)
if not SUPABASE_URL or not SUPABASE_KEY:
    log.error("❌ Supabase 环境变量未配置（VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY）")
    sys.exit(1)

# ============================================================
#  客户端
# ============================================================
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================
#  请求会话（统一超时与 UA）
# ============================================================
session = requests.Session()
session.headers.update({
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    )
})
REQUEST_TIMEOUT = 15  # 秒


# ============================================================
#  辅助函数
# ============================================================
def stable_id(url: str) -> int:
    """根据 URL 生成稳定的整数 ID。"""
    return int(hashlib.md5(url.encode()).hexdigest()[:12], 16) % 10_000_000


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ============================================================
#  数据源抓取器（每个返回 dict 列表）
# ============================================================

def fetch_bilibili_popular() -> list[dict[str, Any]]:
    """
    B站热门（RSSHub）→ 提取科技/AI 相关视频。
    """
    candidates: list[dict[str, Any]] = []
    urls = [
        "https://rsshub.app/bilibili/popular/all",
        "https://rsshub.rssforever.com/bilibili/popular/all",
    ]
    for url in urls:
        try:
            resp = session.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            feed = feedparser.parse(resp.content)
            for entry in feed.entries[:15]:
                title = entry.get("title", "")
                link = entry.get("link", "")
                desc = entry.get("summary", "") or entry.get("description", "")
                # 尝试提取封面
                cover = ""
                if "media_thumbnail" in entry:
                    cover = entry.media_thumbnail[0].get("url", "")
                candidates.append({
                    "id": stable_id(link),
                    "title": title,
                    "platform": "bilibili",
                    "cover_url": cover,
                    "video_url": link,
                    "summary": desc[:300] if desc else "",
                    "tag": "#AI科技",
                })
            log.info("  ✅ B站 RSS  获得 %d 条", len(candidates))
            break
        except Exception as exc:
            log.warning("  ⚠️ B站 RSS 失败 (%s): %s", url, exc)
    return candidates


def fetch_github_trending() -> list[dict[str, Any]]:
    """
    GitHub Trending AI 仓库（gitser.cn 镜像 API）。
    """
    candidates: list[dict[str, Any]] = []
    urls = [
        "https://api.gitser.cn/github/trending?since=daily",
        "https://api.github.com/search/repositories?q=topic:artificial-intelligence&sort=stars&order=desc&per_page=10",
    ]
    for url in urls:
        try:
            resp = session.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            data = resp.json()

            # 两种响应格式归一化
            items: list[dict[str, Any]] = []
            if isinstance(data, list):
                items = data
            elif isinstance(data, dict):
                items = data.get("items") or data.get("repos") or []

            for repo in items[:10]:
                name = repo.get("name") or repo.get("full_name") or repo.get("title", "")
                full_name = repo.get("full_name") or ""
                # 跳转链接必须使用 html_url（网页地址），绝不能使用 API 的 url 字段
                url_repo = repo.get("html_url") or (
                    f"https://github.com/{full_name}" if full_name else f"https://github.com/{name}"
                )
                desc = repo.get("description") or repo.get("desc") or ""
                lang = repo.get("language") or ""
                stars = repo.get("stars") or repo.get("stargazers_count") or 0

                # 只保留与 AI 相关的
                title_lower = (name + " " + desc).lower()
                ai_keywords = ["ai", "llm", "gpt", "machine-learning", "deep-learning",
                               "neural", "nlp", "transformer", "claude", "chatgpt",
                               "rag", "agent", "stable-diffusion", "langchain"]
                if not any(kw in title_lower for kw in ai_keywords):
                    continue

                candidates.append({
                    "id": stable_id(url_repo),
                    "title": f"{name} ⭐{stars}" + (f" [{lang}]" if lang else ""),
                    "platform": "github",
                    "cover_url": "",
                    "video_url": url_repo,
                    "summary": (desc or "一个热门 AI 开源项目")[:300],
                    "tag": "#AI开源",
                })
            log.info("  ✅ GitHub   获得 %d 条", len(candidates))
            break
        except Exception as exc:
            log.warning("  ⚠️ GitHub API 失败 (%s): %s", url, exc)
    return candidates


def fetch_v2ex_hot() -> list[dict[str, Any]]:
    """
    V2EX 热门讨论 — JavaScript/AI 节点。
    """
    candidates: list[dict[str, Any]] = []
    urls = [
        "https://rsshub.app/v2ex/topics/latest",
        "https://www.v2ex.com/feed/tab/hot.json",
    ]
    for url in urls:
        try:
            resp = session.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            # 尝试 JSON 格式
            if url.endswith(".json"):
                data = resp.json()
                items = data if isinstance(data, list) else data.get("items", [])
                for item in items[:15]:
                    title = item.get("title", "")
                    link = item.get("url") or item.get("link", "")
                    desc = item.get("content") or item.get("body", "")
                    if not any(kw in (title + desc).lower()
                               for kw in ["ai", "gpt", "llm", "claude", "chatgpt",
                                           "deepseek", "copilot", "cursor"]):
                        continue
                    candidates.append({
                        "id": stable_id(link),
                        "title": title,
                        "platform": "v2ex",
                        "cover_url": "",
                        "video_url": link,
                        "summary": desc[:300] if desc else title,
                        "tag": "#AI讨论",
                    })
                log.info("  ✅ V2EX     获得 %d 条", len(candidates))
                break
            else:
                # RSS 格式
                feed = feedparser.parse(resp.content)
                for entry in feed.entries[:15]:
                    title = entry.get("title", "")
                    link = entry.get("link", "")
                    desc = entry.get("summary", "") or entry.get("description", "")
                    if not any(kw in (title + desc).lower()
                               for kw in ["ai", "gpt", "llm", "claude", "chatgpt",
                                           "deepseek", "copilot", "cursor"]):
                        continue
                    candidates.append({
                        "id": stable_id(link),
                        "title": title,
                        "platform": "v2ex",
                        "cover_url": "",
                        "video_url": link,
                        "summary": desc[:300] if desc else title,
                        "tag": "#AI讨论",
                    })
                log.info("  ✅ V2EX     获得 %d 条", len(candidates))
                break
        except Exception as exc:
            log.warning("  ⚠️ V2EX API 失败 (%s): %s", url, exc)
    return candidates


def fetch_sspai_ai() -> list[dict[str, Any]]:
    """
    少数派 RSS → AI 相关文章。
    """
    candidates: list[dict[str, Any]] = []
    try:
        resp = session.get("https://sspai.com/feed", timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)
        for entry in feed.entries[:20]:
            title = entry.get("title", "")
            link = entry.get("link", "")
            desc = entry.get("summary", "") or entry.get("description", "")
            if not any(kw in (title + desc).lower()
                       for kw in ["ai", "gpt", "llm", "claude", "chatgpt",
                                   "deepseek", "copilot", "cursor", "人工智能"]):
                continue
            candidates.append({
                "id": stable_id(link),
                "title": title,
                "platform": "sspai",
                "cover_url": "",
                "video_url": link,
                "summary": desc[:300] if desc else title,
                "tag": "#AI工具",
            })
        log.info("  ✅ 少数派   获得 %d 条", len(candidates))
    except Exception as exc:
        log.warning("  ⚠️ 少数派 RSS 失败: %s", exc)
    return candidates


# ============================================================
#  聚合所有来源
# ============================================================
def fetch_all_candidates() -> list[dict[str, Any]]:
    log.info("📡 开始抓取候选内容...")
    all_candidates: list[dict[str, Any]] = []

    for fetcher in (fetch_bilibili_popular, fetch_github_trending,
                    fetch_v2ex_hot, fetch_sspai_ai):
        try:
            all_candidates.extend(fetcher())
        except Exception as exc:
            log.warning("  ⚠️ 抓取器异常: %s", exc)

    # 按 URL 去重
    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for c in all_candidates:
        key = c["video_url"]
        if key not in seen:
            seen.add(key)
            unique.append(c)

    log.info("📊 去重后共 %d 条候选", len(unique))
    return unique


# ============================================================
#  DeepSeek AI 主编筛选
# ============================================================
DEEPSEEK_PROMPT = """你是一个资深 AI 趋势猎手和爆款内容主编。

请从以下候选内容中，筛选出 **1 条** 对普通用户或开发者最有趣、最具实用价值的爆款 AI 玩法/项目。

规则：
- 剔除纯广告、无意义新闻、低质量水贴。
- 优先选择有实操性、可复现、或有启发的 AI 玩法/教程/开源项目。
- 为该内容重写一个吸引眼球的爆款中文标题（≤30字）。
- 用中文写一句精华摘要（≤100字），突出最亮眼的部分。
- 写一个简短的标签（如 #AI绘画、#效率工具、#开源大模型）。
- 如果候选内容都没有合适的，也要选出相对最好的一条。

请**只输出**以下标准 JSON，不要有任何其它文字：
{{
  "title": "爆款标题",
  "platform": "bilibili | github | v2ex | sspai",
  "cover_url": "原始封面URL或空字符串",
  "video_url": "原始链接URL",
  "summary": "一句话精华摘要",
  "tag": "#标签"
}}

候选列表：
{candidates_json}
"""


def deepseek_curate(candidates: list[dict[str, Any]]) -> dict[str, Any] | None:
    """
    将候选列表发给 DeepSeek，返回筛选后的单条 JSON。
    使用 requests 直连 API 以避免 OpenAI SDK 兼容问题。
    """
    if not candidates:
        log.warning("⚠️ 没有候选内容，跳过 DeepSeek 筛选")
        return None

    subset = candidates[:20]
    candidates_json = json.dumps(subset, ensure_ascii=False, indent=2)
    log.info("🤖 发送 %d 条候选给 DeepSeek 主编筛选...", len(subset))

    try:
        resp = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": "你是一个专业的 AI 内容主编。只输出 JSON，不要有任何解释。"},
                    {"role": "user", "content": DEEPSEEK_PROMPT.format(candidates_json=candidates_json)},
                ],
                "temperature": 0.6,
                "max_tokens": 1024,
            },
            timeout=60,
        )
        resp.raise_for_status()
        body = resp.json()

        raw = body["choices"][0]["message"]["content"] or ""
        log.info("📝 DeepSeek 返回（前 300 字）：%s", raw[:300])

        # 提取 JSON（可能被 ``` 包裹）
        json_str = raw.strip()
        if json_str.startswith("```"):
            json_str = json_str.split("\n", 1)[-1]
            if json_str.endswith("```"):
                json_str = json_str[:-3]
            json_str = json_str.strip()

        result = json.loads(json_str)
        log.info("✅ DeepSeek 筛选完成：%s", result.get("title", ""))
        return result

    except json.JSONDecodeError as exc:
        log.error("❌ DeepSeek 返回无法解析为 JSON：%s", exc)
        log.error("   原始内容：%s", raw if "raw" in dir() else "(无)")
        return None
    except requests.RequestException as exc:
        log.error("❌ DeepSeek API 网络请求失败：%s", exc)
        if hasattr(exc, "response") and exc.response is not None:
            log.error("   响应体：%s", exc.response.text[:500])
        return None
    except Exception as exc:
        log.error("❌ DeepSeek API 调用异常：%s", exc)
        log.error("   堆栈：%s", traceback.format_exc())
        return None


# ============================================================
#  入库 Supabase
# ============================================================
def insert_to_supabase(post: dict[str, Any]) -> bool:
    """
    将筛选结果插入 ai_trending_posts 表。
    """
    row = {
        "title": post.get("title", ""),
        "platform": post.get("platform", "bilibili"),
        "cover_url": post.get("cover_url", ""),
        "video_url": post.get("video_url", ""),
        "summary": post.get("summary", ""),
        "tag": post.get("tag", "#AI工具"),
        "created_at": now_iso(),
    }

    log.info("💾 写入 Supabase：%s", row["title"])

    try:
        result = supabase.table("ai_trending_posts").insert(row).execute()
        if hasattr(result, "error") and result.error:
            log.error("❌ Supabase 写入失败：%s", result.error)
            return False
        log.info("✅ 入库成功！")
        return True
    except Exception as exc:
        log.error("❌ Supabase 写入异常：%s", exc)
        return False


# ============================================================
#  主流程
# ============================================================
def main() -> None:
    log.info("=" * 60)
    log.info("🚀 AI 爆款内容抓取流水线启动")
    log.info("=" * 60)

    # 1. 抓取候选
    candidates = fetch_all_candidates()
    if not candidates:
        log.error("❌ 所有数据源均抓取失败，终止")
        sys.exit(1)

    # 2. DeepSeek 筛选
    curated = deepseek_curate(candidates)
    if not curated:
        log.error("❌ DeepSeek 筛选失败，终止")
        sys.exit(1)

    # 3. 入库
    success = insert_to_supabase(curated)
    if not success:
        log.error("❌ 入库失败")
        sys.exit(1)

    log.info("=" * 60)
    log.info("🎉 流水线完成！已入库：%s", curated.get("title"))
    log.info("=" * 60)


if __name__ == "__main__":
    main()
