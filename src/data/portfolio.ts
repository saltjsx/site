import todoList from "../assets/todolist.png";
import quickbuck from "../assets/quickbuck.png";
import aimodel from "../assets/aimodel.png";
import portal from "../assets/portal.png";
import xam from "../assets/xam.png"
import spreadshift from "../assets/spreadshift.png"


// Central place to manage portfolio items used on the Portfolio page
// Add / edit / remove items below. A rebuild / dev HMR will pick them up.
// url: link to the project
// title: display heading
// description: short supporting text
// image: imported image asset (import at top & reference)
// category: optional grouping for future use

export interface PortfolioEntry {
  url: string;
  title: string;
  description: string;
  image: any; // imported image asset
  category?: string; // optional grouping
}

// Example set. Replace with your real portfolio items.
// To use an image asset, import it below and set image: importedAsset

export const portfolio: PortfolioEntry[] = [
  {
    url: "https://tryportal.app",
    title: "portal",
    description: "the open-source slack alternative",
    image: portal,
  },
  {
    url: "https://myxam.xyz",
    title: "xam",
    description: "xam is an ai-powered test creation tool for k-12",
    image: xam,
  },
  {
    url: "https://github.com/saltjsx/spreadshift",
    title: "spreadshift",
    description: "spreadshift is an even better stupid finance game(better quickbuck)",
    image: spreadshift,
  },
  {
    url: "https://github.com/saltjsx/quickbuck-v1b",
    title: "quickbuck",
    description: "quickbuck was a stupid finance game i made",
    image: quickbuck,
  },
];