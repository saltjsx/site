import Link from "next/link";
import { notFound } from "next/navigation";
import { RetroLayout, RetroHr } from "../../components/RetroLayout";
import { zenblog } from "@/lib/zenblog";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    const res = await zenblog.posts.get({ slug });
    post = res.data;
  } catch {
    notFound();
  }

  const readTime = estimateReadTime(post.html_content);

  return (
    <RetroLayout>
      <div style={{ maxWidth: "640px" }}>
        {/* Back link */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/blog"
            style={{ color: "#6699ff", textDecoration: "underline", fontSize: "12px" }}
          >
            &lt;&lt; back to blog
          </Link>
        </div>

        {/* Title */}
        <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, lineHeight: 1.4, marginBottom: "12px" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ color: "#666", fontSize: "12px", marginBottom: "8px", display: "flex", gap: "12px" }}>
          <span>{formatDate(post.published_at)}</span>
          <span>~{readTime} min read</span>
          {post.tags && post.tags.length > 0 && (
            <span>{post.tags.map((t) => t.name).join(", ")}</span>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{ color: "#999", fontSize: "14px", lineHeight: 1.6, marginBottom: "8px", fontStyle: "italic" }}>
            {post.excerpt}
          </p>
        )}

        <RetroHr />

        {/* Content */}
        <div
          className="retro-prose"
          dangerouslySetInnerHTML={{ __html: post.html_content }}
        />

        <RetroHr />

        {/* Footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "8px" }}>
          <Link
            href="/blog"
            style={{ color: "#6699ff", textDecoration: "underline" }}
          >
            &lt;&lt; all posts
          </Link>
          <a
            href="#"
            style={{ color: "#666", textDecoration: "underline" }}
          >
            back to top
          </a>
        </div>
      </div>

      <style>{`
        .retro-prose {
          font-size: 15px;
          line-height: 1.9;
          color: #d0d0d0;
          letter-spacing: 0.01em;
        }
        .retro-prose p {
          margin-bottom: 20px;
        }
        .retro-prose p:last-child { margin-bottom: 0; }
        .retro-prose h1 {
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          margin-top: 36px;
          margin-bottom: 12px;
        }
        .retro-prose h2 {
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          margin-top: 32px;
          margin-bottom: 10px;
        }
        .retro-prose h3, .retro-prose h4 {
          color: #eee;
          font-weight: 600;
          font-size: 15px;
          margin-top: 28px;
          margin-bottom: 8px;
        }
        .retro-prose a {
          color: #6699ff;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .retro-prose a:hover { color: #88bbff; }
        .retro-prose strong { color: #fff; font-weight: 700; }
        .retro-prose em { font-style: italic; color: #ccc; }
        .retro-prose code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          color: #00cc00;
          background: #111;
          padding: 0.15em 0.4em;
          border-radius: 3px;
          border: 1px solid #222;
        }
        .retro-prose pre {
          background: #0a0a0a;
          border: 1px solid #333;
          border-left: 3px solid #6699ff;
          padding: 16px;
          overflow-x: auto;
          margin: 24px 0;
          font-size: 13px;
          line-height: 1.7;
        }
        .retro-prose pre code {
          background: none;
          border: none;
          padding: 0;
          color: #d0d0d0;
        }
        .retro-prose ul, .retro-prose ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .retro-prose ul { list-style-type: disc; }
        .retro-prose ol { list-style-type: decimal; }
        .retro-prose li {
          margin-bottom: 8px;
          line-height: 1.7;
        }
        .retro-prose li::marker { color: #666; }
        .retro-prose blockquote {
          border-left: 3px solid #6699ff;
          padding: 12px 16px;
          margin: 24px 0;
          background: #0a0a0a;
          color: #999;
          font-style: italic;
          line-height: 1.7;
        }
        .retro-prose blockquote p { margin-bottom: 8px; }
        .retro-prose blockquote p:last-child { margin-bottom: 0; }
        .retro-prose img {
          max-width: 100%;
          margin: 24px 0;
          border: 1px solid #333;
        }
        .retro-prose hr {
          border: none;
          border-top: 1px dashed #444;
          margin: 32px 0;
        }
        .retro-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 13px;
        }
        .retro-prose th {
          border-bottom: 1px solid #444;
          padding: 8px 12px;
          text-align: left;
          color: #fff;
          font-weight: 600;
        }
        .retro-prose td {
          border-bottom: 1px solid #222;
          padding: 8px 12px;
        }
      `}</style>
    </RetroLayout>
  );
}
