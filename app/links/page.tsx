import { RetroLayout } from "../components/RetroLayout";

const links = [
  { label: "github", href: "https://github.com/saltjsx", description: "find my code here" },
  { label: "twitter", href: "https://x.com/saltjsx", description: "idk follow me i guess" },
  { label: "youtube", href: "https://youtube.com/@saltjsx", description: "i make videos(sometimes)" },
  { label: "portal", href: "https://tryportal.app/dm/salt", description: "you can message me here as well" },
  { label: "discord", href: "https://clovr.dev/discord", description: "the clovr discord community" },
];

export default function Links() {
  return (
    <RetroLayout>
      <h1 style={{ color: "#fff", fontSize: "16px", marginBottom: "16px" }}>
        &gt;&gt; links
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
        {links.map((link) => (
          <div key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6699ff", textDecoration: "underline" }}
            >
              {link.label}
            </a>
            <span style={{ color: "#666" }}> - {link.description}</span>
          </div>
        ))}
      </div>
    </RetroLayout>
  );
}
