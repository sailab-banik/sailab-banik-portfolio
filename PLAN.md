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
  certificates/*.jpeg                certificate scans, cropped to ~4:3
src/app/icon.png                     favicon, Next.js file convention
src/app/opengraph-image.tsx          1200x630 share card, generated at build
assets/fonts/*.ttf                   static Bricolage cuts, for next/og only
content/profile.json                 name, role, one-line statement, all external links
content/projects.json                project entries
content/experience.json              roles grouped by company
content/articles.json                selected Medium articles
content/certificates.json            certificates and awards
content/sections.json                section titles and their one-line leads
content/stack.json                   the toolkit, grouped
```

External links (LinkedIn, GitHub, LeetCode, Medium, email) live in
`profile.json` under a `links` object and are read through
`src/lib/content.ts`. No URL is hardcoded in a component, including the header.

The resume PDF stays in `public/` rather than an external host so the link never
rots. Name the file with your name in it — it keeps its identity in someone's
downloads folder.

## Design direction

The page is a document about someone who builds document systems, so the ground
is a paper stock rather than a neutral grey. Beyond that the design is
near-monochrome and lets scale, not colour, carry hierarchy.

### Colour

Six tokens, one accent, no gradients as decoration.

| Token     | Light     | Dark      | Role                                  |
|-----------|-----------|-----------|---------------------------------------|
| `paper`   | `#eeefe8` | `#0f100b` | page ground, a paper stock            |
| `surface` | `#f7f8f2` | `#191a13` | the only raised panel                 |
| `ink`     | `#15160f` | `#eceee1` | primary text                          |
| `slate`   | `#6a6c60` | `#8d8f81` | secondary text                        |
| `edge`    | `#dadbd0` | `#272920` | 1px borders and hairlines             |
| `signal`  | `#3b2fe0` | `#9a90ff` | anything interactive, and focus rings |

`signal` means one thing: this is interactive. Links, the primary button, focus
rings. Never a background wash, never over the photography.

There is no second accent. An earlier pass carried an amber highlighter under
every measured figure; it read as decoration rather than emphasis and made the
page look less considered, not more. Project outcomes now separate themselves by
scale alone, which is enough. Do not reintroduce a colour whose only job is to
draw the eye.

### Type

Two families, used for clearly separate jobs.

- **Bricolage Grotesque** (variable, `next/font/google`) for the name, headings,
  labels, figures, and all UI. Width and optical-size axes let one family cover
  a 300px lockup down to 13px UI without a second sans.
- **Newsreader** for running prose — the statement, summaries, and About.

No monospace anywhere. Data labels and figures use Bricolage with
`font-variant-numeric: tabular-nums`, which is what a monospace face was going
to be borrowed for.

```
display   clamp(2.5rem, calc(26vw - 1.3rem), 18.8rem)  wght 800, wdth 78
h2        clamp(1.5rem, 3vw, 2rem)                     wght 650, wdth 92
figure    clamp(1.5rem, 3vw, 2.125rem)                 wght 700, tabular
h3        1.375rem                                     wght 600
lead      clamp(1.125rem, 1.9vw, 1.5rem)               Newsreader
body      1.0625rem / 1.7                              Newsreader, max 68ch
ui        0.875rem / 1.45                              Bricolage
meta      0.8125rem                                    Bricolage, slate
```

The display size is not a taste call: `Sailab Banik` advances 3.758em at
wdth 78, and the content column is `100vw - 80px` until it caps at 1160px, so
`26vw - 1.3rem` is the size at which the name spans the column. Below `md` the
gutter drops to 24px, so a media query re-solves it as `26.4vw - 0.8rem` —
without that the name stops visibly short of the rule beneath it. Changing the
name, the width axis, or the tracking invalidates both coefficients.

No all-caps labels, no eyebrow text above headings, no arrow glyphs appended to
link text, no `01 / 02 / 03` markers on things that are not sequences.

### Layout

Content max-width 1240px; prose max-width 68ch regardless of container.
Section spacing `clamp(5.5rem, 11vh, 9rem)`.

Every section between the hero and the footer is a `Section`: a 12-column grid
whose left three columns hold a **sticky rail** with the section title and a
one-line lead, and whose right nine columns hold the content. The title stays in
the margin while its content scrolls, so it is still there to read against at
the bottom of a long section. Below `md` the rail stacks above the content.

The footer is deliberately not a `Section`. Contact is not another topic to be
indexed in a margin; it is the end of the page and the one thing it should do is
invite a reply. It runs full width with no rail.

```
┌──────────────────────────────────────────────────┐
│ SB                     in gh lc md   [ Resume ]  │  sticky, 64px, blurred
├──────────────────────────────────────────────────┤
│                                                  │
│  SAILAB BANIK ═══════════════════════════        │  fills the column
│  ─────────────────────────────────────────────   │  shared top edge
│  Statement, Newsreader, 34ch       ╭──────────╮  │
│                                    │ portrait │  │
│  [ Download resume ] [ LinkedIn ]  │          │  │
│  Software Engineer in Chennai, India ╰────────╯  │
│  (below md the portrait spans the gutters, so it │
│   shares both edges with the name and the rule)  │
├──────────────────────────────────────────────────┤
│ Experience │ [logo] ZF Group                     │
│  (sticky)  │        Chennai, India               │
│            │  ├── Software Engineer II  2024 —   │
│            │  │   one paragraph                  │
│            │  └── Graduate Engineer Trainee      │
├──────────────────────────────────────────────────┤
│ Work       │ PrimeAI       ZF Group, internal    │
│  (sticky)  │ two sentences of prose              │
│            │ React  Redux  FastAPI  Postgres     │
│            │ Teams onboarded ············ 5+     │
│            │ Less manual review ········· 60%    │
├──────────────────────────────────────────────────┤
│ Writing    │ Article title ↗         Publication │
│  (sticky)  │ one line                      date  │
│            │ (four rows, whole row links)        │
├──────────────────────────────────────────────────┤
│ Credentials│ ┌───────┐ ┌───────┐ ┌───────┐       │
│  (sticky)  │ │ scan  │ │ scan  │ │ scan  │       │
├──────────────────────────────────────────────────┤
│ About      │ one paragraph, 58ch                 │
│  (sticky)  │ ───────────────────────────────     │
│            │ Languages   Interface   Services    │
├──────────────────────────────────────────────────┤
├──────────────────────────────────────────────────┤
│  Happy to talk about engineering work, AI        │
│  systems, or anything else on this page.         │
│                                                  │
│  sailabbanik24@gmail.com                         │
│  ──────────────────────────────────────────────  │
│  in gh lc md  Resume        Sailab Banik, Chennai│
└──────────────────────────────────────────────────┘
```

**Extraction rows** carry the project outcomes: label left, a leader, and the
measured value right in tabular figures. This is the vernacular of the product
itself, and it replaces the stat-card treatment that every portfolio reaches
for.

A flow strip once sat between the stack list and the outcomes, naming the stages
each system runs. It was removed: unlabelled, it did not communicate what it
was, and the prose summary above it already says how the system works. Do not
add it back without a reason it can be read without a caption.

Article titles carry an **outbound mark**: a solid disc with the arrow knocked
out of it, in `src/components/outbound-mark.tsx`. It is there because these rows
are whole-row links to another site, and nothing else in the row says so. The
arrow points out rather than along — a `→` would say "continue", which is both
the wrong claim and the commonest tell of a generated page. Nothing internal
gets one.

At rest the disc is `edge` with an `ink` arrow. On hover it takes `signal` with
the arrow in `paper`, and the arrow swaps: the one in place leaves through the
top-right corner as its replacement arrives from the bottom-left, both clipped
by the disc so neither is ever seen outside it. That swap is the whole reason
the mark is a disc and not a glyph — it gives the hover somewhere to happen.
Under reduced motion the replacement is not rendered and the arrow in place
stays put; the colour change still answers the hover.

Three things about it are load-bearing:

- It is sized in `em` and dropped 0.28em below the baseline, so it centres on
  the cap height (0.66em in Bricolage) rather than sitting on the line.
- The last word of the title and the mark are held in a `whitespace-nowrap`
  span. Chrome breaks between text and an atomic inline even across a
  non-breaking space, which strands the mark alone on a line — the NBSP was
  tried first and does not hold.
- It sits outside the underlined spans, so the hover rule stops at the word
  instead of striking through the disc.

Cards survive in exactly one place — Credentials — because there the card holds
a scan. Writing is rows, not cards, and `surface` is now used only by those
cards and the company mark in Experience.

Mobile: the header keeps the name plus LinkedIn, GitHub, and Resume; the other
two move to the footer. The name still spans the column, the portrait sits
right under the rule, and everything else is single column.

### The one bold element

The hero lockup. `Sailab Banik` set on one line at up to 300px, wght 800,
wdth 78, spanning the full content column. Nothing else on the page is allowed
to compete with it.

A hairline rule runs the full width beneath the name, and both the statement and
the portrait hang from it. The photograph is set *with* the type, on the same
line, rather than layered over it. An earlier pass had the cut-out rising into
the name so the letters passed behind the silhouette — it was the more clever
composition and the worse one, because nothing in it aligned to anything.

Both columns hang from the rule, and the text block is **centred** against the
portrait. The text is always the shorter of the two, so matching one edge only
moves the mismatch to the other: an earlier pass aligned their tops, which left
the photograph hanging 150px below the meta line, and the pass after that pinned
the buttons to the bottom with `mt-auto`, which closed that but opened 90px
between the statement and the buttons. Centring puts roughly 75px above and
below instead, where it reads as air rather than as a gap.

The centring is optical, not box-to-box. The cut-out carries about 6%
transparent headroom above the hair and the first line of Newsreader carries
0.285em of leading above its cap; both are trimmed, so what gets centred is the
block you can see rather than the boxes. Those numbers are tied to this asset
and this face — re-crop the cut-out or change the statement's family or
line-height and both trims need re-measuring.

The spacing between the statement and the buttons stays at 36px at every width.
The portrait is sized around the text, not the reverse: five columns from `md`
up, which at 1280 and above puts it at 455px.

The one dark-mode adjustment: a black polo against `paper` at `#0f100b` loses
the shoulders, so `.portrait` carries a soft `drop-shadow` rim, reading as a rim
light rather than an effect. Light mode needs nothing and gets nothing.

### Motion

One orchestrated moment: on load the name rises out of a clipped line box and
the portrait, statement, buttons, and meta line fade up behind it on a stagger.
Nothing else moves on its own — no scroll-triggered section fades, no hover
lift on cards. Interaction gets a border or underline change and nothing more.
The whole sequence sits inside `prefers-reduced-motion: no-preference`, and the
page still ships no client JavaScript.

### Principles

1. The resume is the destination for detail. Experience on the page is grouped
   by company — one logo, one location, a short paragraph per role — never a
   dated bullet dump duplicating the PDF.
2. One accent, and it means "interactive". Hierarchy comes from scale and
   space, not from a second colour.
3. Structure earns its keep: a border, a rail, or a timeline must separate
   genuinely different content, never decorate. The Experience timeline exists
   because roles at one employer are a real sequence; projects are not, so they
   get no numbering.
4. Quality floor, unannounced: visible focus rings that follow the element's
   own radius, keyboard-reachable links, 4.5:1 contrast minimum, respects
   reduced motion, works at 320px.

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
  outcomes: { label: string; value: string }[]   // label left, value right
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

type StackGroup = {
  group: string          // "Languages", "AI systems", ...
  items: string[]
}

type SectionCopy = {
  title: string          // the rail heading
  lead: string           // one or two lines under it, first person
}
```

Section headings and their leads live in `content/sections.json`, keyed by the
section id, so a rail title is content like everything else. `Section` reads it
by name; components never hold the copy.

The leads are written in first person and say something about the work or the
person. They are not captions describing the page — "Explainers on the parts of
the stack people skip" is meta-commentary; "I write things down to understand
them properly" is the same section doing branding. Keep them in the second
register.

`contact` is the exception in how it is used, not how it is written. The footer
renders `contact.lead` as its visible heading, in the serif, because a small
"Get in touch" label sitting above the email address would be an eyebrow. The
`title` survives as an `sr-only` heading so the landmark still has a plain name.

`content/stack.json` is deliberately short and holds only tools that appear
somewhere else on the page or in the resume. It is a scan aid for engineers,
not a keyword list — anything added to it should be true of real work.

Three projects. Four is already too many for this page.

Four articles, chosen for distinct subjects rather than recency. They render as
rows, not cards: `surface` is used for exactly two things, the credential cards
and the company mark in Experience.

Certificate scans are cropped to a common landscape ratio near 4:3 before they
go in, so all three fill the card frame at the same size instead of one
letterboxing against the others. The cards are not links — the scan on the card
is the whole of what there is to see. Anything committed under `public/` is
publicly reachable, so confirm a document is shareable before adding it.

There are no project screenshots and none are planned. A project shows what it
is (prose), what it is built from (`stack`), and what it moved (`outcomes`); a
screenshot of an internal tool would add none of those.

## Tokens in Tailwind v4

No JS config. Tokens go in `src/app/globals.css`, and the indirection matters:
the palette is declared as raw custom properties on `:root`, and `@theme inline`
references those properties rather than restating the hex.

```css
@import "tailwindcss";

:root {
  --paper: #eeefe8;
  --ink: #15160f;
  /* surface, slate, edge, signal */
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #0f100b;
    --ink: #eceee1;
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

Four hand-written rules live below the tokens because they do not express as
utilities: `.type-display`, `.type-h2`, and `.type-figure` set
`font-variation-settings` for the width and optical-size axes (and tabular
figures), and `.portrait` carries the dark-mode rim. The hero reveal keyframes
and the mobile `--text-display` override sit with them.

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

## The share card

`src/app/opengraph-image.tsx` generates the 1200x630 card at build time with
`next/og`, so there is no `og.png` to keep in sync with the page. It is the
hero lockup again: paper ground, the name at the width of the card, the
statement with the years set in the heavier weight, and a rule over the role and
location.

`next/og` rasterises with satori, which needs static font instances, so two
Bricolage cuts live in `assets/fonts/` and are read with `node:fs` at module
scope. The variable font `next/font/google` loads for the page cannot be used
here. Two satori quirks are worth knowing before editing the file: children of
a flex container each become their own text run, so a trailing space is
trimmed — the statement carries an explicit spacer element rather than relying
on whitespace — and every `div` with more than one child needs an explicit
`display: flex`.

## Still open

Three things are known-incomplete. None of them are structural.

- **LeetCode URL is a guess.** `profile.json` carries
  `leetcode.com/u/sailab-banik/`, which was never confirmed — it is not in the
  resume. Verify or remove the link.
- **No repo or live links on the projects.** `Project.repo` and `Project.live`
  are typed and rendered; the URLs were never supplied, so nothing renders.
- **`metadataBase` has no real domain.** It falls back to
  `VERCEL_PROJECT_PRODUCTION_URL`, correct on Vercel, wrong once there is a
  custom domain.

`content/stack.json` lists only tools evidenced elsewhere on the page, so it is
narrower than the real toolkit. Extend it with what is actually true.

Also unverified: Lighthouse has not been run.

## Done when

- Loads under 1.5s on a cold Vercel edge hit; Lighthouse 95+ on all four.
- Resume downloads from header and footer.
- Every external link opens in a new tab with `rel="noreferrer"`.
- Tab order reaches every link with a visible ring.
- Nothing on the page is a placeholder.
