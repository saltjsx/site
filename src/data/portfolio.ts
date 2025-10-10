import todoList from "../assets/todolist.png";
import quickbuck from "../assets/quickbuck.png";
import aimodel from "../assets/aimodel.png";


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
    url: "https://quickbuck.zout.pw",
    title: "quickbuck", 
    description: "quickbuck is a finance game that i made to play with my friends",
    image: quickbuck,
  },
  {
    url: "https://todo.zout.pw",
    title: "todo list", 
    description: "it's literally just a todo list",
    image: todoList,
  },{
    url: "https://aimodelprices.vercel.app/",
    title: "AI Model Prices",
    description: "see the prices of different ai models, straight from openrouter",
    image: aimodel,
  },
];