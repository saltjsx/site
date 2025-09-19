# AI Assistant Project Instructions

Purpose: Personal site built with Astro 5. Focus areas: links hub (/links) + redirect helper (/go/[slug]) + basic navigation/components and visual styling.

## Architecture Overview

- Framework: Astro (islands not currently used; pure Astro components & static generation/redirects).
- Entry Points: Pages in `src/pages` (`index.astro`, `about.astro`, `portfolio.astro`, `links.astro`, dynamic redirect `go/[slug].astro`).
- Data Source: Central link metadata in `src/data/links.ts` consumed by `LinksList.astro`, `LinkItem.astro`, and redirect route.
- Components: Presentational Astro components in `src/components`. Minimal logic; styling co-located via `<style>` blocks.
- Assets: Images & SVGs in `src/assets` (and nested `svgs/`). Imported with `astro:assets` where optimization desirable (see `Navbar.astro`).
- Public Scripts: Vanilla enhancement script `public/navbar-toggle.js` (paired TypeScript source `components/navbar-toggle.ts` appears unused / candidate for consolidation).

## Redirect / Links System

- Authoritative list: `links.ts` exporting `links: LinkEntry[]` + helper `findLink(slug)` (case-insensitive matching done manually if needed).
- Display: `/links` page imports `LinksList.astro` which maps `links` into `LinkItem` cards.
- Redirects: `/go/[slug].astro` uses `getStaticPaths()` to pre-generate routes for each `links` entry. On request, if slug matches returns `Astro.redirect(url, 302)`; otherwise renders fallback HTML page with meta refresh back to `/links`.
- External vs Internal: `LinkItem.astro` wraps non-internal links with `/go/<slug>` indirection; set `internal: true` in a link entry to bypass redirect and link directly.
- Adding a link: Update `links.ts`; rebuild/HMR picks it up. Keep slugs lowercase & unique.

## Conventions & Patterns

- Type Safety: `LinkEntry` interface documents allowed fields; extend here first when adding new metadata (e.g., analytics tags, categories).
- Styling: Uses CSS variables (defined likely in `src/styles/globals.css`) and gradient/glass aesthetic; keep new component styles local unless variables are needed globally.
- Animations / Effects: Prefer lightweight CSS (see hover transitions in `LinkItem.astro`). No JS framework overhead—continue this minimal approach unless island interactivity is justified.
- Navigation Active State: `Navbar.astro` derives `currentPath` via `Astro.url.pathname`; replicate this approach for new nav link highlighting.
- Assets Import: Use `import { Image } from 'astro:assets'` for local images needing optimization (logo). Direct `<img>` or background CSS acceptable for decorative assets.

## Build & Dev Workflow

- Install: `npm install`.
- Dev server: `npm run dev` (default: http://localhost:4321).
- Production build: `npm run build` outputs to `dist/`.
- Preview build: `npm run preview` after build.
- Astro CLI passthrough: `npm run astro -- <cmd>` (e.g., `npm run astro -- add tailwind`).
- No custom test framework configured; changes are verified manually in browser.

## Adding Features Safely

- New dynamic collections: Model after `go/[slug].astro` with `getStaticPaths()`. Keep data colocated in `src/data/*.ts` to simplify generation.
- Extend link cards: Add fields to `LinkEntry`, surface in `LinkItem.astro` (guard optional display), and ensure redirect logic still functions.
- Analytics hook: Insert logging before `Astro.redirect(...)` in `[slug].astro`; avoid async blocking—fire and forget (e.g., fetch to an endpoint) then redirect.

## Potential Cleanups (Respect Scope)

- Duplicate toggle logic: Consider converting `public/navbar-toggle.js` into a compiled TS asset from `components/navbar-toggle.ts` or remove one. When acting, confirm file actually used before deleting.
- Fallback page styling duplication could be extracted if more error pages introduced—currently fine to remain inline.

## PR / Change Guidance for AI

1. Keep edits minimal & focused; do not reorganize directories without explicit request.
2. Preserve existing visual design (gradients, glass) unless task is a redesign.
3. When introducing runtime JS, prefer placing scripts in `src/components` and using `<script>` with `is:raw` or moving to an island only if hydration is required.
4. Update this file when introducing new architectural patterns (e.g., CMS integration, analytics module).

## Quick Reference

- Key Data File: `src/data/links.ts`
- Redirect Logic: `src/pages/go/[slug].astro`
- Link Card Component: `src/components/LinkItem.astro`
- Link Grid: `src/components/LinksList.astro`
- Navbar & Logo: `src/components/Navbar.astro`
- Global Styles: `src/styles/globals.css`

# NEVER RUN DEV COMMANDS

(End of instructions – keep concise and project-specific.)
