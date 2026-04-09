import Link from "next/link";
import { RetroLayout } from "../components/RetroLayout";
import { zenblog } from "@/lib/zenblog";
import type { Post } from "zenblog/types";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Blog() {
  let posts: Post[] = [];
  try {
    const res = await zenblog.posts.list();
    posts = res.data;
  } catch {
    // fallback: empty list
  }

  return (
    <RetroLayout>
      <h1 style={{ color: "#fff", fontSize: "16px", marginBottom: "16px" }}>
        &gt;&gt; blog
      </h1>

      {posts.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#666" }}>no posts yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
          {posts.map((post) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                style={{ color: "#6699ff", textDecoration: "underline" }}
              >
                {post.title}
              </Link>
              <span style={{ color: "#666" }}> - {formatDate(post.published_at)}</span>
              {post.excerpt && (
                <p style={{ color: "#888", marginLeft: "16px", marginTop: "2px" }}>
                  {post.excerpt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </RetroLayout>
  );
}
