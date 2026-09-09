# PLAN.md

Design and build plan for the portfolio. Read alongside CLAUDE.md, which holds
repo conventions. This file holds product and design decisions.

## Brief

A single-page, responsive portfolio for a software developer. Not an online
resume: the resume is a download, not the page. The page should read as a small,
confident product — minimal in content, deliberate in styling. Header carries
social links only, with LinkedIn emphasised; no section nav.

Audience: hiring managers and engineers who will spend under ninety seconds
here. Primary job: make them download the resume or open LinkedIn.

## Where assets live

```
public/
  resume/sailab-banik-resume.pdf     linked from header and footer
  images/profile_picture.png         original headshot, kept as the source crop
  images/portrait.png                hero portrait, cropped tight to the subject
  images/projects/<slug>.webp        16:9, 1600px wide
  og.png                             1200x630, generated once
src/app/icon.png                     favicon, Next.js file convention
content/profile.json                 name, role, one-line statement, all external links
content/projects.json                project entries
content/experience.json              roles grouped by company
content/articles.json                selected Medium articles
```

External links (LinkedIn, GitHub, LeetCode, Medium, email) live in
`profile.json` under a `links` object and are read through
`src/lib/content.ts`. No URL is hardcoded in a component, including the header.

The resume PDF stays in `public/` rather than an external host so the link never
rots. Name the file with your name in it — it keeps its identity in someone's
downloads folder.

## Design direction

### Colour

Cool paper, ink, and one saturated blue. Six values, no gradients as decoration.

| Token       | Light     | Dark      | Role                             |
|-------------|-----------|-----------|----------------------------------|
| `paper`     | `#F2F3F5` | `#0E1116` | page background                  |
| `ink`       | `#101418` | `#EDEFF2` | primary text                     |
| `slate`     | `#6E7680` | `#8B939D` | secondary text, hairlines        |
| `signal`    | `#2233F0` | `#5A68FF` | links, focus rings, the one accent |
| `surface`   | `#FFFFFF` | `#161B22` | raised panels                    |
| `edge`      | `#DDDFE3` | `#232A33` | 1px borders                      |

`signal` appears sparingly: interactive text and focus rings. It is never used
as a background wash, and never as a filter over the photography.

### Type

Two families, used for clearly separate jobs.

- **Bricolage Grotesque** (variable, `next/font/google`) for the name, headings,
  labels, and all UI. Its width and optical-size axes let one family cover
  120px display down to 13px UI without a second sans.
- **Newsreader** (`next/font/google`) for running prose — the About paragraph and
  project descriptions only.

Scale, modular at 1.333 from a 16px base:

```
display   clamp(3.5rem, 11vw, 8.5rem)   wght 800, wdth 85, tracking -0.04em
h2        clamp(1.75rem, 4vw, 2.6rem)   wght 700, tracking -0.02em
h3        1.3rem                        wght 600
body      1.0625rem / 1.65              Newsreader, max 68ch
ui        0.875rem / 1.4                Bricolage, wght 500
meta      0.8125rem                     Bricolage, slate
```

No all-caps labels, no eyebrow text above headings, no single accented word
inside a headline. The one emphasis on the page — the years of experience in
the statement - is made by switching to Bricolage inside the Newsreader prose,
never by colouring a word.

### Layout

Single column, left-aligned, on a 12-column grid with generous outer margin.
Content max-width 1180px; prose max-width 68ch regardless of container.
Vertical rhythm in multiples of 8px, section spacing `clamp(6rem, 12vh, 10rem)`.

```
┌──────────────────────────────────────────────┐
│ SB                    in  gh  lc  md  Resume │  sticky, 64px, blurred paper
├──────────────────────────────────────────────┤
│                                              │
│  SAILAB                    ┌──────────────┐  │
│  BANIK                     │              │  │
│                            │   portrait   │  │
│  One line on what you      │              │  │
│  build and why.            │              │  │
│                            └──────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│  Experience                                  │
│  [logo] Company    Role         dates        │
│         Location   One paragraph per role    │
├──────────────────────────────────────────────┤
│  Work                                        │
│  ┌────────────────────────────────────────┐  │
│  │ Title            stack   stack   stack │  │
│  │ Two lines of prose.  outcomes   links  │  │
│  └────────────────────────────────────────┘  │
│  (three entries, full-width, stacked)        │
├──────────────────────────────────────────────┤
│  Writing                                     │
│  ┌───────────────────┐ ┌───────────────────┐ │
│  │ Article title     │ │ Article title     │ │
│  │ One line          │ │ One line          │ │
│  │ Publication, date │ │ Publication, date │ │
│  └───────────────────┘ └───────────────────┘ │
│  (four cards, two columns, whole card links) │
├──────────────────────────────────────────────┤
│  About — one short paragraph, 68ch           │
├──────────────────────────────────────────────┤
│  Email address, large. Social row. Resume.   │
└──────────────────────────────────────────────┘
```

Mobile: header collapses to monogram plus LinkedIn, GitHub, and Resume; the
other two move to the footer. Portrait sits above the name block, capped at 62vh.
Work entries stay full-width — no horizontal scroll, no carousel.

### The one bold element

The display lockup. The name is set at up to 8.5rem in Bricolage at wght 800,
wdth 85, stacked on two lines and tracked to -0.04em. Nothing else on the page
is allowed to compete with it.

The portrait is left alone: the photograph as shot, squared off with a 1rem
radius and the same `edge` hairline that divides the sections, so the one
picture on the page belongs to the same system as everything around it. No
mask, no filter, no colour treatment.

Everything stays still. No scroll-triggered fades on sections, no hover lift on
work entries — only a border colour change on focus and hover. The page ships
no interactive client JavaScript.

### Principles

1. The resume is the destination for detail. Experience on the page is grouped
   by company — one logo, one location, a short paragraph per role — never a
   dated bullet dump duplicating the PDF.
2. One accent, one screen of copy, nothing in motion. Cut anything else.
3. Structure earns its keep: a border or divider must separate genuinely
   different kinds of content, never decorate.
4. Quality floor, unannounced: visible focus rings, keyboard-reachable links,
   4.5:1 contrast minimum, respects reduced motion, works at 320px.

## Content model

```ts
// src/lib/content.ts
type Profile = {
  name: string
  role: string
  statement: string        // one sentence, under 140 chars
  emphasis: string         // the substring of statement to set in the sans face
  email: string
  location: string
  links: {
    linkedin: string
    github: string
    leetcode: string
    medium: string
  }
  resume: string           // "/resume/sailab-banik-resume.pdf"
  portrait: string
}

type Project = {
  slug: string
  title: string
  summary: string          // two sentences max
  stack: string[]
  image: string
  repo?: string
  live?: string
}
```

```ts
type Experience = {
  company: string
  logo: string             // key into the marks in src/components/logos.tsx
  url: string
  location: string
  roles: { title: string; period: string; summary: string }[]
}
```

```ts
type Article = {
  title: string
  publication: string
  date: string
  url: string
  summary: string        // one line
}
```

Three projects. Four is already too many for this page.

Four articles, chosen for distinct subjects rather than recency. `surface` is
the card background — the only place in the design a raised panel is used.

Project screenshots do not exist yet, so `image` is optional and work entries
currently lead with `outcomes` — the measured result of each project — instead.

## Tokens in Tailwind v4

No JS config. Tokens go in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-paper: #F2F3F5;
  --color-ink: #101418;
  --color-slate: #6E7680;
  --color-signal: #2233F0;
  --color-surface: #FFFFFF;
  --color-edge: #DDDFE3;
  --font-display: var(--font-bricolage);
  --font-prose: var(--font-newsreader);
}
```

Dark values under `@media (prefers-color-scheme: dark)`, matching the scaffold's
existing approach. Delete the `body { font-family: Arial }` rule that
`create-next-app` leaves behind.

## Build order

1. Tokens and fonts in `globals.css` and `layout.tsx`; remove template metadata
   and the Arial override. Add real `title`, `description`, and OpenGraph.
2. `content/*.json` and `src/lib/content.ts` with the types above.
3. `Header` — monogram, social row, resume link. Sticky, backdrop blur.
4. `Hero` — name, statement, portrait. Duotone static first, cursor window after
   it renders correctly.
5. `Work` — three entries from `projects.json`, `next/image` with explicit
   dimensions and `priority` on the first.
6. `Experience` grouped by company, `Writing` cards, then `About` and `Footer`.
7. Accessibility and responsive pass at 320, 768, 1280, 1920. Then Lighthouse.
8. CI workflow: lint, typecheck, build on pull requests.

## Done when

- Loads under 1.5s on a cold Vercel edge hit; Lighthouse 95+ on all four.
- Resume downloads from header and footer.
- Every external link opens in a new tab with `rel="noreferrer"`.
- Tab order reaches every link with a visible ring.
- Nothing on the page is a placeholder.