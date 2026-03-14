import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "tool", label: "AI 工具" },
  { key: "news", label: "行业资讯" },
  { key: "product", label: "社区产品" },
]

export default function Home() {
  const [articles, setArticles] = useState<any[]>([])
  const [category, setCategory] = useState("all")
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
    const saved = localStorage.getItem("bookmarks")
    if (saved) setBookmarks(JSON.parse(saved))
  }, [category])

  async function fetchArticles() {
    setLoading(true)
    let query = supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    if (category !== "all") {
      query = query.eq("category", category)
    }

    const { data } = await query
    setArticles(data || [])
    setLoading(false)
  }

  function toggleBookmark(id: string) {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id]
    setBookmarks(updated)
    localStorage.setItem("bookmarks", JSON.stringify(updated))
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px", fontFamily: "system-ui, sans-serif" }}>

      {/* 顶部导航 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>🔥 AI Forge · 造物社</h1>
        <a href="/login" style={{ fontSize: 14, color: "#555", textDecoration: "none" }}>登录</a>
      </div>

      {/* 分类筛选 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              border: "1px solid",
              borderColor: category === cat.key ? "#000" : "#ddd",
              background: category === cat.key ? "#000" : "#fff",
              color: category === cat.key ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      {loading ? (
        <p style={{ color: "#999", textAlign: "center", padding: 40 }}>加载中...</p>
      ) : articles.length === 0 ? (
        <p style={{ color: "#999", textAlign: "center", padding: 40 }}>暂无内容</p>
      ) : (
        articles.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              background: "#fff",
            }}
          >
            {/* 分类标签 */}
            <span style={{
              fontSize: 12,
              padding: "2px 10px",
              borderRadius: 10,
              background: item.category === "tool" ? "#e8f4fd" : item.category === "news" ? "#fef3e2" : "#e8fdf0",
              color: item.category === "tool" ? "#1a6fa8" : item.category === "news" ? "#a86a00" : "#1a7a40",
              marginBottom: 10,
              display: "inline-block",
            }}>
              {item.category === "tool" ? "AI 工具" : item.category === "news" ? "行业资讯" : "社区产品"}
            </span>

            {/* 标题 */}
            <h2
              onClick={() => window.location.href = `/article/${item.id}`}
              style={{ fontSize: 17, fontWeight: 600, margin: "8px 0", cursor: "pointer", lineHeight: 1.4 }}
            >
              {item.title}
            </h2>

            {/* 编辑推荐语 */}
            {item.summary && (
              <p style={{ fontSize: 14, color: "#555", margin: "0 0 12px", lineHeight: 1.6 }}>
                💬 {item.summary}
              </p>
            )}

            {/* 底部：时间 + 收藏 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#aaa" }}>
                {item.published_at ? new Date(item.published_at).toLocaleDateString("zh-CN") : ""}
              </span>
              <button
                onClick={() => toggleBookmark(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 20,
                  padding: 0,
                }}
              >
                {bookmarks.includes(item.id) ? "🔖" : "🤍"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}