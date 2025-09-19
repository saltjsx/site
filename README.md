# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 🔗 Links System

The `/links` page and `/go/[slug]` redirect helper are powered by a single data file: `src/data/links.ts`.

### Add / Edit a Link

1. Open `src/data/links.ts`.
2. Add an object to the exported `links` array:
   ```ts
   {
   	 slug: "discord",
   	 url: "https://discord.gg/yourInvite",
   	 title: "Discord",
   	 description: "Chat with the community",
   	 icon: "💬" // can be emoji or later an asset path
   }
   ```
3. (Optional) Set `internal: true` if `url` points to another route in this site. Internal links skip the redirect layer.

### Redirects

Visiting `/go/<slug>` performs a server-side redirect (302) if the slug exists. Missing slugs render a simple fallback page and auto-return to `/links`.

### Icons

Currently `icon` supports:

- Emoji (simplest)
- In the future: import an SVG or image and pass its path (extend `LinkItem.astro` accordingly).

### Customize Layout

- Card markup: `src/components/LinkItem.astro`
- Grid / section layout: `src/components/LinksList.astro`

### Tracking / Analytics

Because external links route through `/go/<slug>`, you can later add basic logging or analytics inside `src/pages/go/[slug].astro` before redirecting.
