import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { zenblog } from "@/lib/zenblog";

const ACCENT = "#FB5130";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

  return (
    <div className="flex min-h-screen justify-center px-10 py-16">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <div
          className="home-fadein mb-8"
          style={{ animationDelay: "0ms" }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft size={10} weight="bold" />
            blog
          </Link>
        </div>

        {/* Post header */}
        <div
          className="home-fadein mb-6"
          style={{ animationDelay: "80ms" }}
        >
          <h1
            className="text-sm font-medium leading-snug text-foreground"
          >
            {post.title}
          </h1>
          <div
            className="mt-2 text-[10px] tracking-widest uppercase"
            style={{ color: "var(--muted-foreground)" }}
          >
            {formatDate(post.published_at)}
            {post.tags && post.tags.length > 0 && (
              <>
                {" · "}
                {post.tags.map((t) => t.name).join(", ")}
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="home-fadein mb-6 border-t border-border"
          style={{ animationDelay: "120ms" }}
        />

        {/* Post content */}
        <div
          className="home-fadein prose-zout"
          style={{ animationDelay: "160ms" }}
          dangerouslySetInnerHTML={{ __html: post.html_content }}
        />

        {/* Footer */}
        <div
          className="home-fadein mt-12 text-[10px] tracking-widest uppercase"
          style={{
            color: "var(--muted-foreground)",
            animationDelay: "240ms",
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

        /* Blog post content styling — matches app's monospace/minimal aesthetic */
        .prose-zout {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--foreground);
        }
        .prose-zout p {
          margin-bottom: 1rem;
        }
        .prose-zout p:last-child {
          margin-bottom: 0;
        }
        .prose-zout h1,
        .prose-zout h2,
        .prose-zout h3,
        .prose-zout h4 {
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }
        .prose-zout h1 { font-size: 1rem; }
        .prose-zout h2 { font-size: 0.9375rem; }
        .prose-zout h3, .prose-zout h4 { font-size: 0.875rem; }
        .prose-zout a {
          color: ${ACCENT};
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: ${ACCENT};
          transition: opacity 0.15s ease;
        }
        .prose-zout a:hover {
          opacity: 0.6;
        }
        .prose-zout strong {
          font-weight: 700;
          color: var(--foreground);
        }
        .prose-zout em {
          font-style: italic;
        }
        .prose-zout code {
          font-family: inherit;
          font-size: 0.8125rem;
          background: var(--muted);
          color: ${ACCENT};
          padding: 0.1em 0.35em;
          border-radius: 3px;
        }
        .prose-zout pre {
          background: var(--sidebar);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          font-size: 0.8125rem;
          line-height: 1.6;
        }
        .prose-zout pre code {
          background: none;
          color: var(--foreground);
          padding: 0;
        }
        .prose-zout ul,
        .prose-zout ol {
          margin-bottom: 1rem;
          padding-left: 1.25rem;
        }
        .prose-zout ul { list-style-type: disc; }
        .prose-zout ol { list-style-type: decimal; }
        .prose-zout li {
          margin-bottom: 0.25rem;
        }
        .prose-zout blockquote {
          border-left: 2px solid ${ACCENT};
          padding-left: 1rem;
          margin-left: 0;
          margin-bottom: 1rem;
          color: var(--muted-foreground);
          font-style: italic;
        }
        .prose-zout img {
          max-width: 100%;
          border-radius: 4px;
          margin: 1rem 0;
        }
        .prose-zout hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
