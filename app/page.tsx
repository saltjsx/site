"use client";

import { RetroLayout, RetroLink } from "./components/RetroLayout";

// Generated with: figlet.textSync('saltjsx', { font: 'ANSI Shadow' })
const ASCII_ART = `
███████╗ █████╗ ██╗  ████████╗  ██╗███████╗██╗  ██╗
██╔════╝██╔══██╗██║  ╚══██╔══╝  ██║██╔════╝╚██╗██╔╝
███████╗███████║██║     ██║     ██║███████╗ ╚███╔╝
╚════██║██╔══██║██║     ██║██   ██║╚════██║ ██╔██╗
███████║██║  ██║███████╗██║╚█████╔╝███████║██╔╝ ██╗
╚══════╝╚═╝  ╚═╝╚══════╝╚═╝ ╚════╝ ╚══════╝╚═╝  ╚═╝
`.trimStart();

export default function Home() {
  return (
    <RetroLayout>
      {/* ASCII banner with diagonal shimmer */}
      <pre className="ascii-shimmer" style={{ fontSize: "14px", lineHeight: 1.2, marginBottom: "24px" }}>
        {ASCII_ART}
      </pre>

      <style>{`
        .ascii-shimmer {
          color: #888;
          background: linear-gradient(
            120deg,
            #888 0%,
            #888 25%,
            #fff 40%,
            #fff 45%,
            #888 60%,
            #888 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>

      <hr style={{ border: "none", borderTop: "1px dashed #444", margin: "16px 0" }} />

      {/* Bio */}
      <div style={{ fontSize: "14px", lineHeight: 1.7 }}>
        <p>heyo, i&apos;m <span style={{ color: "#ff6644", fontWeight: 700 }}>salt</span></p>
        <p>
          currently cto @ <RetroLink href="https://clovr.dev">clovr</RetroLink>
        </p>
        <p>
          also working on <RetroLink href="https://tryportal.app">portal</RetroLink> on the side
        </p>
        <p>based in Australia, from USA</p>
        <p>
          <RetroLink href="https://x.com/saltjsx">twitter</RetroLink> is probably the best way to reach me
        </p>
      </div>
    </RetroLayout>
  );
}
