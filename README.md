# Wijdane Daif — Artist World

A cinematic single-page site for Moroccan singer-songwriter **Wijdane Daif**, built around her 2026 releases *Slow Motion* and *Bomba*.

The design pairs an editorial black-and-ivory palette with desert warmth, Moroccan craft references, and a controlled neon accent for the *Bomba* chapter. Motion is choreographed with Lenis, GSAP, and ScrollTrigger; the content is deliberately limited to verified public information.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **GSAP 3** + ScrollTrigger for scroll choreography
- **Lenis** for smooth scrolling (desktop, motion-safe only)
- Modular plain CSS with design tokens
- No UI framework, no CSS-in-JS, no autoplay audio

## Run locally

Requires Node.js **20.19+** (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with HMR |
| `npm run build` | Type-check (`tsc --noEmit`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |

The current production build completes with no TypeScript or CSS warnings.

## Deploy

`npm run build` outputs a fully static site in `dist/`. Upload that folder to any static host (Netlify, Vercel, Cloudflare Pages, S3, nginx).

Before launch:

1. **Set the production origin.** No domain has been verified, so `index.html` intentionally has no `<link rel="canonical">` and no `og:url`. Add both, and make the Open Graph/Twitter image URLs absolute (`https://your-domain/media/og.jpg`) — social platforms cannot resolve relative image paths.
2. **Confirm image permission.** The photographs and release artwork are official promotional assets, but inclusion here is not a licence for public reuse. See [ASSET-CREDITS.md](./ASSET-CREDITS.md).
3. **Verify contact details.** No public email, phone number, or management agency is listed because none was verified. Instagram is the verified enquiry channel.
4. **Optional:** add Spotify only after an official artist URL is verified. It is intentionally absent today.

The site is a single HTML entry point, so no SPA history fallback is required. Videos are hosted by YouTube and load only after a visitor presses play.

## Experience

| Chapter | Section | Motion |
| --- | --- | --- |
| I | Hero — the name | Masked name reveal, arch clip-path, layered parallax, ambient starfield |
| II | Manifesto | Scroll-driven masked type and heritage marquee |
| III | The Artist | Portrait reveal, staggered editorial copy |
| IV | The Sound | Release panels for *Slow Motion* and *Bomba*, on-demand video modals |
| V | The Visual World | Pinned horizontal gallery on desktop; stacked gallery on mobile; keyboard lightbox |
| VI | The Roots | Rebab, Haït al-Gharbawi, caftan, riad, desert, tea |
| VII | The Invitation | Contact and verified social links |

The navigation theme switches between ink and ivory automatically as sections pass the viewport. The fixed bar condenses into a translucent pill after scrolling. A custom cursor and magnetic hovers are limited to fine pointers.

## Accessibility & motion

- `prefers-reduced-motion` disables Lenis, pins, parallax, tilt, cursor effects, and the horizontal gallery. The gallery becomes a static three-column grid on desktop.
- Dialogs trap focus, close on `Esc`, restore focus to their trigger, and lock page scroll while open.
- The mobile menu includes the fixed toggle in its focus loop.
- All interactive controls are real buttons or links; the gallery and lightbox are keyboard operable, including arrow-key navigation.
- Images have descriptive alternative text; decorative layers are hidden from assistive technology.
- A skip link targets `main`, and the page keeps a visible focus style outside the preloader.
- No audio autoplays. Video embeds are `youtube-nocookie.com` and only mount after a click.

## Content integrity

Only verified facts are used:

- Debut single **Slow Motion** (2026); follow-up **Bomba** (2026).
- Written by **Anas Saoudi & Wijdane Daif**; production/arrangement by **Karim Loukili**; *Bomba* video directed by **Hassan ElKourfti**.
- Musical and visual references: Amazigh rebab, Haït al-Gharbawi, caftan, riad, desert, tea, family.
- The single quote is labelled as translated from Arabic.
- No biography, awards, education, collaborations, or contact details have been invented.

Verified links used on the site:

- Instagram — https://www.instagram.com/wijdanedaif/
- YouTube — https://www.youtube.com/@Wijdanedaif
- TikTok — https://www.tiktok.com/@wijdane.daif
- X — https://x.com/wijdanedaif
- Apple Music — https://music.apple.com/ma/artist/wijdane-daif/1896328371
- *Slow Motion* video — https://www.youtube.com/watch?v=xtVYlHp-MhM
- *Bomba* video — https://www.youtube.com/watch?v=_imEdtAxKKg

## Project structure

```text
.
├─ assets-src/            Original press and artwork files used for derivatives
├─ images/                Working reference captures (not shipped)
├─ public/
│  ├─ media/              Responsive WebP derivatives + og.jpg
│  ├─ favicon.svg
│  └─ site.webmanifest
├─ src/
│  ├─ components/         Sections, dialogs, brand mark, motion primitives
│  ├─ context/            Lenis + ScrollTrigger integration
│  ├─ data/               Verified content, release metadata, image manifests
│  ├─ hooks/              Reduced motion, dialog focus/scroll management
│  ├─ lib/                GSAP registration
│  └─ styles/             Tokens, reset, shared utilities
├─ index.html             Metadata, fonts, JSON-LD, no-JS fallback
└─ vite.config.ts
```

## Assets, fonts, licences

See [ASSET-CREDITS.md](./ASSET-CREDITS.md) for the complete image provenance and licensing checklist.

Fonts are loaded from Google Fonts: **Instrument Serif**, **Inter Tight**, and **Aref Ruqaa** (SIL Open Font License). Interface icons are original SVGs. The Arabic seal mark and favicon are original artwork created for this project; they are not an official artist logo.
