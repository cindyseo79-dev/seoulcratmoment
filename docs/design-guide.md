# Claude Code Handoff Spec — Seoul Craft Moment v4 Final

A modern, clean, discovery-first Korean craft experience-to-commerce service for foreign visitors in Seoul. React + Vite, one page, English. Must read instantly as a working service to discover, ask, and reserve Korean craft experiences.

**Not** a spa, **not** wellness, **not** tea brand, **not** lifestyle intro, **not** SaaS, **not** shopping mall, **not** beige.

Benchmark names are internal only. They must never appear anywhere in the actual page UI. The site is an original brand: **Seoul Craft Moment**.

> ⚠️ Priority rule: This design-guide.md is the **highest-priority** reference. Where it conflicts with `docs/prd.md`, follow this file.

---

## Core Service Flow

Discover craft experience → Ask or reserve → Join workshop → Make handmade object → Take it home → Discover related handmade objects

---

## Final Design Direction

- Clean white background
- Vivid blue CTA
- Service-style Hero with a search / discovery box
- Category browse
- Experience cards
- Craft object cards
- Clear ask / reserve flow
- CSS placeholder / object mockups that read as if real images exist
- English landing page a foreign visitor understands instantly

### Must NOT feel like

- Spa brand
- Wellness brand
- Tea brand
- Beige craft-intro site
- Traditional tourist brochure
- SaaS dashboard
- Shopping mall
- Plain brand-intro site

---

## 1. CSS Color Variables

Use only these CSS variables:

```css
:root {
  --bg: #FFFFFF;
  --bg-soft: #F6F8FC;
  --bg-blue: #EEF4FF;
  --surface: #FFFFFF;

  --ink: #111827;
  --muted: #5B6472;
  --line: #E5EAF2;

  --primary: #2563EB;
  --primary-dark: #1D4ED8;
  --primary-light: #DBEAFE;

  --accent: #FF6B4A;
  --accent-soft: #FFF1EC;

  --success-soft: #EAF7F1;
  --dark-band: #101827;
}
```

---

## Build Order

1. docs/design-guide.md — create / overwrite
2. src/components — create folder
3. React components
4. App.jsx
5. App.css
6. index.css cleanup
7. Runnable state

---

## Page Sections (implemented)

1. Header — logo, nav, blue "Reserve" CTA
2. Hero — service headline + discovery/search box + category quick-chips + blue primary CTA
3. Category Browse — Korean craft material categories as clickable cards
4. Experience Concept — 3 value cards (Local Materials / Small Group / Take-Home Object)
5. Craft Programs — experience cards with CSS image mockups, duration/price meta, Reserve + Ask actions
6. From Experience to Object — horizontal making-to-keeping flow
7. Curated Handmade Objects — craft object cards with CSS mockups (business-expansion only, no real commerce)
8. Private Group Sessions — options + Ask CTA
9. Final CTA — dark band, blue + accent actions
10. Footer

---

## Materials / Categories

Hanji · Ceramic · Mother-of-Pearl · Knot & Textile · Tea · Scent
