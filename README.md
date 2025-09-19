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

---

## 🎞 Motion & Animation System

The site uses a unified, tokenized motion layer (see `globals.css`) to keep animations subtle and consistent.

### Tokens

Defined in `:root`:

- Durations: `--motion-duration-{xs,sm,md,lg}` = 120–420ms
- Easing: `--motion-ease-standard`, `--motion-ease-emphasized`, `--motion-ease-in`, `--motion-ease-out`
- Stagger interval: `--stagger-interval`

### Utility Classes

- `anim-base` – establishes initial opacity 0 + will-change
- `anim-fade` – fades in
- `anim-fade-up` – fade + upward translate (10px)
- `anim-fade-scale` – fade + slight translate + micro scale
- `stagger-fade-up` – apply to a parent; its direct children get sequential delays (up to first 10)

Add a custom delay via inline style: `style="--delay:300ms"` on an element with an `anim-*` class.

### Hover / Interaction

Component transitions use tokenized durations and eased transforms (mild elevation: translateY(-4px)).

### Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables all entrance animations and resets opacity.

### Gradient / Continuous Motion

Long-running gradient animations slowed (`--gradient-duration: 16s`) for calmer feel.

### Adding a New Pattern

Prefer composing with existing keyframes. If truly new, add a keyframe + corresponding utility under the unified section. Avoid per-component bespoke keyframes.
