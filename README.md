# whistler

[![ci](https://github.com/geocoug/whistler/actions/workflows/deploy.yml/badge.svg)](https://github.com/geocoug/whistler/actions/workflows/deploy.yml)
[![website status](https://img.shields.io/website.svg?down_color=red&down_message=down&up_color=green&up_message=up&url=http%3A%2F%2Fwhistler.geocoug.com)](https://whistler.geocoug.com)

Live Whistler Blackcomb cams, snow & weather conditions, Sea-to-Sky avalanche bulletin, border wait times, and highway cams.

Built with [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/). Static output deployed via `rsync` over SSH.

## Features

- **Conditions dashboard** — current temp, wind, new snow, freezing level, and sunset times from [Open-Meteo](https://open-meteo.com).
- **7-day snow & temperature chart** — hand-rolled SVG, no chart library.
- **Live mountain cams** — 9 Whistler/Blackcomb cams with:
  - drag-and-drop reordering (persisted to `localStorage`)
  - star-to-favorite (favorites float to the top)
  - expand-to-lightbox
- **Avalanche Canada bulletin** for Sea-to-Sky.
- **Mountain map** — Leaflet + OpenTopoMap with cam markers.
- **Mountain reports** — linkouts to WB's official snow/lift/grooming pages.
- **Travel page**:
  - WSDOT border wait times
  - US border cams (WSDOT)
  - Canada border cams (DriveBC)
  - Sea-to-Sky Hwy 99 cams (DriveBC, Vancouver → Whistler)
- **PWA** — installable with an offline shell via service worker.
- **Dark / light themes** with no-flash pre-paint apply.

## Local development

Requires Node 20+ (CI uses 22).

```bash
npm install
npm run dev     # starts http://localhost:4321
```

Build a production bundle to `dist/`:

```bash
npm run build
npm run preview # serves the built output locally
```

## Project layout

```
.
├── astro.config.mjs
├── public/               # copied as-is to the site root
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.webmanifest
│   └── sw.js
└── src/
    ├── components/       # Astro components (Nav, Footer, cards, cam grids…)
    ├── data/             # typed static data (cam lists, API config)
    ├── layouts/Base.astro
    ├── pages/            # index.astro, travel.astro — one file per route
    ├── scripts/          # shared client-side scripts (theme, lightbox, PWA)
    └── styles/global.css # Tailwind import + alpine design tokens
```

### Adding a cam

Mountain cams live in [`src/data/cams.ts`](./src/data/cams.ts). Add an entry
and it appears automatically in the grid and on the map (if its `id` has a
matching coordinate in [`src/components/TrailMap.astro`](./src/components/TrailMap.astro)).

Border / highway cams live in [`src/data/borderCams.ts`](./src/data/borderCams.ts).

### Theming

Design tokens are defined as CSS variables in
[`src/styles/global.css`](./src/styles/global.css) and wired into Tailwind v4
via its `@theme` block. The light theme is toggled with
`<html data-theme="light">` and persisted in `localStorage` under the key
`whistler-theme`.

## API notes

- **Open-Meteo** (weather & snow chart): no key required.
- **Avalanche Canada** (`api.avalanche.ca`): public endpoint; the UI
  degrades gracefully if the request fails.
- **WSDOT** (border wait times + US border cams): the access key lives in
  [`src/data/borderCams.ts`](./src/data/borderCams.ts) and is intentionally
  shipped client-side for now. Treat it as public. To tighten this, move the
  fetches behind a small proxy (e.g. a Cloudflare Worker or Netlify function)
  and read the key from an env var.
- **DriveBC** snapshots: direct JPG URLs, polled every 60 s with a
  cache-busting query string.

## Deployment

Pushes to `main` trigger
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which:

1. Checks out the repo
2. Installs dependencies (`npm ci`) with Node 22
3. Builds the site (`npm run build`)
4. `rsync`s `dist/` to the target server

Required repo secrets:

| Secret | Purpose |
| --- | --- |
| `SSH_KEY` | Private SSH key used by rsync |
| `HOST` | Deploy host |
| `USERNAME` | SSH user |
| `TARGET_DIRECTORY` | Remote path to deploy into |

To run the workflow manually, use **Actions → Deploy to Server →
Run workflow**.
