"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Trash, Plus, SignIn } from "@phosphor-icons/react";

type ShortLink = {
  slug: string;
  url: string;
  createdAt: number;
};

const ACCENT = "#FB5130";

export default function ShortenerPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-password": password,
    }),
    [password]
  );

  const fetchLinks = useCallback(async () => {
    const res = await fetch("/api/shortener", { headers: headers() });
    if (res.ok) {
      setLinks(await res.json());
    }
  }, [headers]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/shortener", {
      headers: {
        "x-password": password,
      },
    });
    if (res.ok) {
      setAuthed(true);
      setLinks(await res.json());
      setError("");
    } else {
      setError("wrong password");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/shortener", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ slug, url }),
    });

    if (res.ok) {
      setSlug("");
      setUrl("");
      await fetchLinks();
    } else {
      const data = await res.json();
      setError(data.error);
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    await fetch("/api/shortener", {
      method: "DELETE",
      headers: headers(),
      body: JSON.stringify({ slug }),
    });
    await fetchLinks();
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
  };

  useEffect(() => {
    if (authed) fetchLinks();
  }, [authed, fetchLinks]);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <h1
            className="mb-6 text-sm font-bold"
            style={{ color: ACCENT }}
          >
            shortener
          </h1>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              autoFocus
            />
            <button
              type="submit"
              className="flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: ACCENT }}
            >
              <SignIn size={12} weight="bold" />
              enter
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-destructive">{error}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col px-10 py-16">
      <div className="w-full max-w-lg">
        <h1
          className="mb-6 text-sm font-bold"
          style={{ color: ACCENT }}
        >
          shortener
        </h1>

        {/* Create form */}
        <form onSubmit={handleCreate} className="mb-8 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="slug"
              className="h-9 w-28 shrink-0 rounded-md border border-input bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://destination.com"
              className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={loading || !slug || !url}
              className="flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ backgroundColor: ACCENT }}
            >
              <Plus size={12} weight="bold" />
              add
            </button>
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </form>

        {/* Links list */}
        <ul className="flex flex-col">
          {links.map((link) => (
            <li
              key={link.slug}
              className="flex items-center justify-between border-b border-border py-3"
            >
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-foreground">
                  /{link.slug}
                </span>
                <span className="mx-2 text-xs text-muted-foreground">→</span>
                <span className="truncate text-xs text-muted-foreground">
                  {link.url}
                </span>
              </div>
              <div className="ml-4 flex shrink-0 gap-1">
                <button
                  onClick={() => copyLink(link.slug)}
                  className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Copy link"
                >
                  <Copy size={13} />
                </button>
                <button
                  onClick={() => handleDelete(link.slug)}
                  className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                  title="Delete"
                >
                  <Trash size={13} />
                </button>
              </div>
            </li>
          ))}
          {links.length === 0 && (
            <li className="py-8 text-center text-xs text-muted-foreground">
              no links yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
