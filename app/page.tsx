"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";

const ACCENT = "#FB5130";

type LineItem = {
  content: React.ReactNode;
  delay: number;
};

export default function Home() {
  const lines: LineItem[] = [
    {
      content: (
        <span>
          heyo, i&apos;m{" "}
          <span
            style={{
              color: ACCENT,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            salt
          </span>
        </span>
      ),
      delay: 0,
    },
    {
      content: (
        <span>
          currently cto @{" "}
          <ExternalLink href="https://clovr.dev">
            <Image
              src="/clovr-color.svg"
              alt=""
              width={14}
              height={14}
              className="inline-block shrink-0"
              style={{ verticalAlign: "middle" }}
            />
            clovr
          </ExternalLink>
        </span>
      ),
      delay: 80,
    },
    {
      content: (
        <span>
          also working on{" "}
          <ExternalLink href="https://tryportal.app">
            <Image
              src="/portal.svg"
              alt=""
              width={14}
              height={14}
              className="inline-block shrink-0"
              style={{ verticalAlign: "middle" }}
            />
            portal
          </ExternalLink>{" "}
          on the side
        </span>
      ),
      delay: 160,
    },
    {
      content: (
        <span>
          based in 🇦🇺 Australia, from 🇺🇸 USA
        </span>
      ),
      delay: 240,
    },
    {
      content: (
        <span>
          <ExternalLink href="https://x.com/saltjsx">twitter</ExternalLink>{" "}
          is probably the best way to reach me
        </span>
      ),
      delay: 320,
    },
  ];

  return (
    <div className="flex min-h-screen items-center px-10 py-16">
      <div className="w-full max-w-md">
        {/* Content lines */}
        <ul className="flex flex-col gap-0">
          {lines.map((line, i) => (
            <li
              key={i}
              className="home-fadein flex items-center border-b border-border py-4 last:border-b-0"
              style={{ animationDelay: `${line.delay + 100}ms` }}
            >
              <span className="text-sm leading-relaxed text-foreground">
                {line.content}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer tick */}
        <div
          className="home-fadein mt-8 text-[10px] tracking-widest uppercase"
          style={{
            color: "var(--muted-foreground)",
            animationDelay: "500ms",
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

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 underline underline-offset-3 transition-opacity hover:opacity-60"
      style={{
        color: ACCENT,
        textDecorationColor: ACCENT,
      }}
    >
      {children}
      <ArrowUpRight size={10} weight="bold" style={{ color: ACCENT }} />
    </Link>
  );
}
