# scottascott.github.io

Personal site for Scott Wang — résumé, work history, and projects, deployed at [scottascott.github.io](https://scottascott.github.io).

A single-page, dark-editorial-fintech-themed site with a WebGL hero effect, scroll-driven reveal animations, a bento-style project grid, and light/dark theming.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), statically exported
- React 19 + TypeScript
- Tailwind CSS 4
- [Framer Motion](https://motion.dev) for scroll-linked reveals
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [Three.js](https://threejs.org) for the WebGL hero name effect
- Deployed to GitHub Pages via GitHub Actions

## Features

- Dark / light theme toggle (persisted to `localStorage`, no flash on load)
- WebGL shader masked to the hero name, theme-aware color and intensity
- Scroll-triggered reveal and parallax-style text animations
- Bento-grid Projects section — tile size (wide / tall / standard) auto-picked from each project video's aspect ratio, `grid-flow-dense` packing
- Project preview videos: hover-to-play with a poster fallback on desktop, tap-to-play-then-navigate on mobile
- Alpha-channel (transparent background) WebM video previews for Side Projects, with an MP4 + blend-mode fallback for browsers without VP9 alpha support
- Responsive layout throughout, including a mobile nav menu and auto-fit project grid

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export to ./out
npm run lint
```

Content (résumé, experience, projects) lives in [`src/lib/data.ts`](src/lib/data.ts) — most updates are just editing that file.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds a static export (`output: "export"` in `next.config.ts`) and publishes it to GitHub Pages.

## Structure

```
src/
  app/            root layout, global styles, the single page (page.tsx)
  components/     NavBar, ThemeToggle, ColorBends (WebGL hero), BentoProjectCard,
                  AlphaVideo, PopupLink, Reveal / RevealText (scroll animations), ...
  lib/data.ts     all site content — profile, experience, projects, side projects
public/
  videos/         project preview videos (mp4 + poster jpgs)
  videos/alpha/   transparent-background WebM previews
  videos/posters/ poster frames for the bento project cards
```
