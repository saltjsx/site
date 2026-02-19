"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";

const ACCENT = "#FB5130";

type Section = {
  label: string;
  items: { content: React.ReactNode; delay: number }[];
  delay: number;
};

export default function About() {
  const sections: Section[] = [
    {
      label: "intro",
      delay: 0,
      items: [
        {
          content: (
            <span>
              hiya, i&apos;m{" "}
              <span style={{ color: ACCENT, fontWeight: 700, letterSpacing: "-0.02em" }}>
                salt
              </span>
              . a software dev based in hell(australia).
            </span>
          ),
          delay: 80,
        },
        {
          content: (
            <span>
              i love writing code, design(occasionally), and public transit.
            </span>
          ),
          delay: 160,
        },
      ],
    },
    {
      label: "what i do",
      delay: 280,
      items: [
        {
          content: (
            <span>
              i&apos;m the cto @{" "}
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
              , building the best design agent possible
            </span>
          ),
          delay: 360,
        },
        {
          content: (
            <span>
              i also work on{" "}
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
              on the side, an oss slack alternative
            </span>
          ),
          delay: 440,
        },
      ],
    },
    {
      label: "hobbies",
      delay: 560,
      items: [
        {
          content: (
            <span>i play friendslop games w/ my friends sometimes.</span>
          ),
          delay: 640,
        },
        {
          content: (
            <span>
              i also enjoy watching and making youtube videos(also sometimes).
            </span>
          ),
          delay: 720,
        },
        {
          content: (
            <span>other than that, i just make random bs on the internet :)</span>
          ),
          delay: 800,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen items-center px-10 py-16">
      <div className="w-full max-w-md">
        {sections.map((section, si) => (
          <div key={si} className="mb-6 last:mb-0">
            {/* Section label */}
            <div
              className="home-fadein mb-1 text-[10px] tracking-widest uppercase"
              style={{
                color: "var(--muted-foreground)",
                animationDelay: `${section.delay + 100}ms`,
              }}
            >
              {section.label}
            </div>

            {/* Section items */}
            <ul className="flex flex-col gap-0">
              {section.items.map((item, ii) => (
                <li
                  key={ii}
                  className="home-fadein flex items-center border-b border-border py-4 last:border-b-0"
                  style={{ animationDelay: `${item.delay + 100}ms` }}
                >
                  <span className="text-sm leading-relaxed text-foreground">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer tick */}
        <div
          className="home-fadein mt-8 text-[10px] tracking-widest uppercase"
          style={{
            color: "var(--muted-foreground)",
            animationDelay: "900ms",
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
