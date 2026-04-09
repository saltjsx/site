import Link from "next/link";

const NAV = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "blog", href: "/blog" },
  { label: "links", href: "/links" },
];

export function RetroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        backgroundColor: "#000000",
        color: "#c0c0c0",
        minHeight: "100vh",
        padding: "40px",
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      {/* Nav bar */}
      <nav style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: "#6699ff",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            [{item.label}]
          </Link>
        ))}
      </nav>

      <hr style={{ border: "none", borderTop: "1px dashed #444", margin: "16px 0" }} />

      {children}
    </div>
  );
}

export function RetroHr() {
  return <hr style={{ border: "none", borderTop: "1px dashed #444", margin: "16px 0" }} />;
}

export function RetroLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#6699ff", textDecoration: "underline" }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={{ color: "#6699ff", textDecoration: "underline" }}>
      {children}
    </Link>
  );
}
