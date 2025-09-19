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
  icon?: string; // emoji or asset path (string from imported asset)
  category?: string; // optional grouping for future use
  internal?: boolean; // mark if it's an internal site route
}

// Example set. Replace with your real links.
// To use an SVG/logo asset, import it below and set icon: importedAsset.src
// e.g. import githubIcon from "../assets/links/github.svg"; icon: githubIcon.src
import githubIcon from "../assets/links/github.svg";
import twitterIcon from "../assets/links/twitter.svg";
import youtubeIcon from "../assets/links/youtube.svg";
// You can also import your site logo and reuse: e.g.
// import siteLogo from "../assets/salt red.png"; // then icon: siteLogo.src
export const links: LinkEntry[] = [
  {
    slug: "github",
    url: "https://github.com/saltjsx",
    title: "GitHub",
    description: "find my code here",
  icon: githubIcon.src
  },
  {
    slug: "twitter",
    url: "https://x.com/saltjsx",
    title: "Twitter",
    description: "idk follow me i guess",
  icon: twitterIcon.src,
  },
  {
    slug: "youtube",
    url: "https://youtube.com/@saltjsx",
    title: "YouTube",
    description: "i make videos(sometimes)",
  icon: youtubeIcon.src,
  },
];

// Helper to find a link by slug (used by redirect route)
export function findLink(slug: string): LinkEntry | undefined {
  return links.find(l => l.slug.toLowerCase() === slug.toLowerCase());
}
