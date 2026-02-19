"use client";

import Link from "next/link";
import {
  GithubLogo,
  XLogo,
  YoutubeLogo,
  ChatTeardropText,
  DiscordLogo,
} from "@phosphor-icons/react";
import { ArrowUpRight } from "@phosphor-icons/react";

const ACCENT = "#FB5130";

type LinkItem = {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
  delay: number;
};

const links: LinkItem[] = [
  {
    label: "github",
    href: "https://github.com/saltjsx",
    description: "find my code here",
    icon: GithubLogo,
    delay: 80,
  },
  {
    label: "twitter",
    href: "https://x.com/saltjsx",
    description: "idk follow me i guess",
    icon: XLogo,
    delay: 160,
  },
  {
    label: "youtube",
    href: "https://youtube.com/@saltjsx",
    description: "i make videos(sometimes)",
    icon: YoutubeLogo,
    delay: 240,
  },
  {
    label: "portal",
    href: "https://tryportal.app/dm/salt",
    description: "you can message me here as well",
    icon: ChatTeardropText,
    delay: 320,
  },
  {
    label: "discord",
    href: "https://clovr.dev/discord",
    description: "the clovr discord community",
    icon: DiscordLogo,
    delay: 400,
  },
];

export default function Links() {
  return (
    <div className="flex min-h-screen items-center px-10 py-16">
      <div className="w-full max-w-md">
        {/* Section label */}
        <div
          className="home-fadein mb-1 text-[10px] tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)", animationDelay: "100ms" }}
        >
          links
        </div>

        {/* Link buttons */}
        <ul className="flex flex-col gap-0">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <li
                key={i}
                className="home-fadein border-b border-border last:border-b-0"
                style={{ animationDelay: `${link.delay}ms` }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center gap-3 py-3 transition-colors hover:bg-transparent"
                >
                  {/* Icon button */}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-border transition-colors group-hover:border-transparent"
                    style={{
                      borderRadius: 0,
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = ACCENT;
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }}
                  >
                    <Icon size={14} weight="fill" />
                  </span>

                  {/* Text */}
                  <span className="flex flex-1 items-baseline gap-2">
                    <span
                      className="text-sm font-medium text-foreground transition-colors group-hover:underline group-hover:underline-offset-3"
                      style={{
                        // @ts-expect-error CSS custom property
                        "--tw-text-opacity": 1,
                        textDecorationColor: ACCENT,
                      }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {link.description}
                    </span>
                  </span>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={10}
                    weight="bold"
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: ACCENT }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer tick */}
        <div
          className="home-fadein mt-8 text-[10px] tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)", animationDelay: "500ms" }}
        >
          © {new Date().getFullYear()}
        </div>
      </div>

      <style>{`
        @keyframes homeFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .home-fadein {
          opacity: 0;
          animation: homeFadeIn 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
}
