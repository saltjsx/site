import Link from "next/link";
import { zenblog } from "@/lib/zenblog";
import type { Post } from "zenblog/types";

const ACCENT = "#FB5130";

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
    <div className="flex min-h-screen items-center px-10 py-16">
      <div className="w-full max-w-md">
        {/* Header label */}
        <div
          className="home-fadein mb-1 text-[10px] tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)", animationDelay: "0ms" }}
        >
          blog
        </div>

        {/* Posts list */}
        <ul className="flex flex-col gap-0">
          {posts.length === 0 ? (
            <li
              className="home-fadein border-b border-border py-4 last:border-b-0"
              style={{ animationDelay: "80ms" }}
            >
              <span className="text-sm text-muted-foreground">
                no posts yet.
              </span>
            </li>
          ) : (
            posts.map((post, i) => (
              <li
                key={post.slug}
                className="home-fadein border-b border-border last:border-b-0"
                style={{ animationDelay: `${80 + i * 80}ms` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 transition-opacity hover:opacity-60"
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm leading-snug text-foreground"
                      style={{ fontWeight: 500 }}
                    >
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {post.excerpt}
                      </span>
                    )}
                  </div>
                  <span
                    className="shrink-0 text-[10px] tracking-widest uppercase pt-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {formatDate(post.published_at)}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div
          className="home-fadein mt-8 text-[10px] tracking-widest uppercase"
          style={{
            color: "var(--muted-foreground)",
            animationDelay: `${80 + (posts.length + 1) * 80}ms`,
          }}
        >
          © {new Date().getFullYear()}
        </div>
      </div>

      <style>{`
        @keyframes homeFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .home-fadein {
          opacity: 0;
          animation: homeFadeIn 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
}
