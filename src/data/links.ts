// Central place to manage external/internal links used on the Links page
// and dynamic redirect route at /go/[slug].  
// Add / edit / remove items below. A rebuild / dev HMR will pick them up.
// slug: used in /go/<slug> redirect
// url: destination URL
// title: display heading
// description: short supporting text (optional)
// icon: you can use:
//   - an emoji string (e.g. "🐦")
//   - a path to an imported image / svg asset (import at top & reference)
//   - later we could extend to a component name.

export interface LinkEntry {
  slug: string;
  url: string;
  title: string;
  description?: string;
  icon?: string; // emoji or asset path
  category?: string; // optional grouping for future use
  internal?: boolean; // mark if it's an internal site route
}

// Example set. Replace with your real links.
export const links: LinkEntry[] = [
  {
    slug: "github",
    url: "https://github.com/saltjsx",
    title: "GitHub",
    description: "find my code here",
    icon: "🐙"
  },
  {
    slug: "x",
    url: "https://x.com/",
    title: "Twitter",
    description: "idk follow me i guess",
    icon: "🐦"
  },
  {
    slug: "yt",
    url: "https://youtube.com/@saltjsx",
    title: "YouTube",
    description: "i make videos(sometimes)",
    icon: "🧪",
  },
];

// Helper to find a link by slug (used by redirect route)
export function findLink(slug: string): LinkEntry | undefined {
  return links.find(l => l.slug.toLowerCase() === slug.toLowerCase());
}
