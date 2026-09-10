# Nexus Studios — Web3 Gaming Showcase & Publisher Template

A production-ready, high-performance landing page and interactive game showcase built for modern Web3 gaming studios, decentralized publishers, and game franchises.

---

## ⚡ Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & CSS Keyframe Suites
- **Icons:** Lucide React
- **Language:** TypeScript

---

## ✨ Features

- **Shared-Element Radial Morph Carousel:** Circular thumbnail selection expanding smoothly into cinematic full-bleed backgrounds without layout jumps.
- **Obsidian Dark Aesthetic:** Designed with a rich `#0A0B0E` canvas, cyan highlights, and glassmorphic navigation overlays.
- **Web3 Wallet State Management:** Interactive "Connect Node" action supporting simulated authentication, loading states, and truncate-formatted addresses.
- **Modular Data Layer:** Typed metadata schema (`projects.ts`) defining engine specifications, contract standards, TPS metrics, and release status.
- **Click-to-Dismiss Dropdowns:** Outside-click dismissable navigation menus built for clean UX.
- **Self-Contained Local Assets:** Zero external CDN dependencies; all game artwork is pre-configured in `/public/games/`.

---

## 📁 Project Structure

```text
├── public/
│   └── games/                # Local game showcase assets
├── src/
│   ├── app/
│   │   ├── layout.tsx        # App root layout
│   │   └── page.tsx          # Main interactive stage & morph engine
│   ├── components/
│   │   ├── CardDeck/         # Bottom circular navigation deck
│   │   ├── Header/           # Navigation bar, studio brand & wallet button
│   │   ├── HeroHeadline/     # Title, genre badges, CTAs & animations
│   │   ├── MorphOverlay/     # Shared-element expanding layer
│   │   ├── GamesHub/         # Filterable catalog modal
│   │   └── Ecosystem/        # Network architecture overlay
│   └── data/
│       └── projects.ts       # Structured studio game directory & specs