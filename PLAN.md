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
  images/portrait-cutout.png         hero portrait, background removed, alpha fade
  images/projects/<slug>.webp        16:9, 1600px wide — not created yet
  og.png                             1200x630, generated once — not created yet
src/app/icon.png                     favicon, Next.js file convention
content/profile.json                 name, role, one-line statement, all external links
content/projects.json                project entries
content/experience.json              roles grouped by company
content/articles.json                selected Medium articles
content/certificates.json            certificates and awards
  certificates/*.jpeg                certificate scans, cropped to ~4:3
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
│  Credentials                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│  │  scan   │ │  scan   │ │  scan   │         │
│  │ Title   │ │ Title   │ │ Title   │         │
│  │ Issuer  │ │ Issuer  │ │ Issuer  │         │
│  └─────────┘ └─────────┘ └─────────┘         │
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

The portrait is a cut-out: the studio background is removed so the subject
stands directly on the page with no frame, no radius and no hairline, and the
shoulder fade is baked into the file's alpha rather than masked in CSS.

The one adjustment is for dark mode. A black polo against `paper` at `#0E1116`
loses the shoulders entirely, so the cut-out carries a soft `drop-shadow` rim
in `ink` at 20% — enough to separate the silhouette, reading as a rim light
rather than as an effect. Light mode needs nothing and gets nothing.

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
  about: string            // one paragraph, the About section
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
  context: string          // "ZF Group, internal platform" / "Personal project"
  summary: string          // two sentences max
  stack: string[]
  outcomes: string[]       // the measured result, one per line
  image?: string
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
type Certificate = {
  title: string
  detail: string           // one line on what it covered
  issuer: string
  date: string
  image: string            // the scan, shown whole and linked full size
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
the card background, shared by the article and credential cards — the only
place in the design a raised panel is used.

Certificate scans are cropped to a common landscape ratio near 4:3 before they
go in, so all three fill the card frame at the same size instead of one
letterboxing against the others. The cards are not links — the scan on the card
is the whole of what there is to see. Anything committed under `public/` is
publicly reachable, so confirm a document is shareable before adding it.

Project screenshots do not exist yet, so `image` is optional and work entries
currently lead with `outcomes` — the measured result of each project — instead.

## Tokens in Tailwind v4

No JS config. Tokens go in `src/app/globals.css`, and the indirection matters:
the palette is declared as raw custom properties on `:root`, and `@theme inline`
references those properties rather than restating the hex.

```css
@import "tailwindcss";

:root {
  --paper: #f2f3f5;
  --ink: #101418;
  /* slate, signal, surface, edge */
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #0e1116;
    --ink: #edeff2;
  }
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --font-sans: var(--font-bricolage);
  --font-serif: var(--font-newsreader);
}
```

Writing the hex straight into `@theme inline` looks equivalent and is not: the
media query would override a raw property nothing reads, and dark mode would
never switch. The same block also carries the type scale (`--text-display` and
friends), `--spacing-section`, and `--container-page`.

Two hand-written classes live below the tokens because they do not express as
utilities: `.type-display` and `.type-h2` set `font-variation-settings` for the
width and optical-size axes, and `.portrait` feathers the hero photograph.

## Build order

Built in this order; kept as a record of why the pieces depend on each other.

1. Tokens and fonts in `globals.css` and `layout.tsx`; real `title`,
   `description`, and OpenGraph metadata.
2. `content/*.json` and `src/lib/content.ts` with the types above.
3. `Header` — monogram, social row, resume link. Sticky, backdrop blur.
4. `Hero` — name, statement, portrait.
5. `Work` — three entries from `projects.json`.
6. `Experience` grouped by company, `Writing` and `Credentials` cards, then
   `About` and `Footer`.
7. Accessibility and responsive pass at 320, 768, 1280, 1920.
8. CI workflow: lint, build, typecheck on pull requests and pushes to main.

## Still open

Four things are known-incomplete. None of them are structural.

- **LeetCode URL is a guess.** `profile.json` carries
  `leetcode.com/u/sailab-banik/`, which was never confirmed — it is not in the
  resume. Verify or remove the link.
- **No repo or live links on the projects.** `Project.repo` and `Project.live`
  are typed and rendered; the URLs were never supplied, so nothing renders.
- **No `og.png`.** Metadata is wired for OpenGraph but has no image.
- **`metadataBase` has no real domain.** It falls back to
  `VERCEL_PROJECT_PRODUCTION_URL`, correct on Vercel, wrong once there is a
  custom domain.

Also unverified: Lighthouse has not been run.

## Done when

- Loads under 1.5s on a cold Vercel edge hit; Lighthouse 95+ on all four.
- Resume downloads from header and footer.
- Every external link opens in a new tab with `rel="noreferrer"`.
- Tab order reaches every link with a visible ring.
- Nothing on the page is a placeholder.
