# PLAN.md

Design and build plan for the portfolio. Read alongside CLAUDE.md, which holds
repo conventions. This file holds product and design decisions.

## Brief

A single-page, responsive portfolio for a software developer, aimed at hiring
managers and engineers who will spend under ninety seconds here. Primary job:
make them open the resume, email, or open LinkedIn. The resume is the PDF,
not a section of the page: everything on it is already said by Experience,
Projects, Toolbox, and Credentials.

The page is dressed as the developer's own working environment: a terminal in
the hero, experience as a commit log, projects as running systems. The conceit
holds only
where it carries real information; every number in it comes from the resume.

## Where assets live

```
assets/design/                       exported design mockup (gitignored), the reference
public/
  resume/sailab_banik_resume_<mmddyy>_masked.pdf  linked from header, hero, resume, footer
  images/profile_picture.png         original headshot, shown in the hero
src/app/icon.png                     favicon, Next.js file convention
src/app/opengraph-image.tsx          1200x630 share card, generated at build
assets/fonts/*.ttf                   static Geist cuts, for next/og only
content/profile.json                 name, headline, statement, status, all external links
content/nav.json                     header tabs, one per section id
content/terminal.json                the hero terminal session
content/experience.json              roles and branches as commits
content/projects.json                projects, each with the panel that shows it running
content/articles.json                selected Medium articles
content/certificates.json            certificates and awards
content/sections.json                section headings, leads, shell paths, actions
content/stack.json                   the toolbox, grouped
```

External links (LinkedIn, GitHub, LeetCode, Medium, email) live in
`profile.json` under `links` and are read through `src/lib/content.ts`. No URL
is hardcoded in a component.

The resume is built from `assets/resume/sailab-banik-resume.tex` by
`assets/resume/build.sh`, which produces two PDFs dated with the build day's
mmddyy: `public/resume/sailab_banik_resume_<mmddyy>_masked.pdf` with the phone
number masked, and `assets/resume/sailab_banik_resume_<mmddyy>.pdf` with the
real one. Only the masked one is committed and linked; the build deletes the
previous one and repoints `profile.resume` at the new file. The real number
lives in `assets/resume/phone.local`, and both that file and the full PDF are
gitignored. The full PDF is kept out of `public/` entirely, because anything
there is served at its own URL whether or not the page links to it. The source is under `assets/`, not
`public/`, for the same reason. Build it with tectonic; `\pdfgentounicode` is
guarded because that primitive is pdfTeX-only and tectonic runs XeTeX. The
face is ResumeSans from `assets/resume/fonts/`, a renamed Source Sans Pro whose
hyphen glyph maps only to U+002D, so ATS parsers read hyphens as hyphens rather
than U+2011; `make_fonts.py` there regenerates it.

The resume PDF stays in `public/` rather than an external host so the link never
rots. Name the file with your name in it — it keeps its identity in someone's
downloads folder.


## Design direction

The reference is `assets/design/Main.dc.html`. Values in this section are
taken from it; when they disagree with the code, the mockup wins unless a
decision below says otherwise.

### Colour

Dark only. One ground, two raised steps, and one accent.

| Token        | Value     | Role                                          |
|--------------|-----------|-----------------------------------------------|
| `canvas`     | `#0e110f` | page ground                                   |
| `raised`     | `#141815` | panels, cards, secondary buttons              |
| `raised-2`   | `#1a1f1c` | chips, bar tracks, hover                      |
| `line`       | `#252b27` | 1px borders and hairlines                     |
| `fg`         | `#e8eae3` | primary text                                  |
| `muted`      | `#a2aaa3` | secondary text                                |
| `faint`      | `#7e877f` | meta, mono labels                             |
| `amber`      | `#f5b942` | primary action, active tab, focus, emphasis   |
| `green`      | `#86d39a` | added lines, measured results, "ok" states    |
| `blue`       | `#9dbdff` | hashes, branches, queued jobs                 |
| `red`        | `#f08c7a` | rejected jobs only                            |
| `dusk`       | `#4a5a7a` | the "other" series in a chart                 |

Amber is the only accent. Green, blue, and red are status colours from the
diff and terminal vernacular and only ever mark state, never decoration. The
full token list, including the `sunken` terminal ground, is in
`globals.css`.

### Type

Geist for everything, Geist Mono for anything that would appear in a terminal:
paths, hashes, dates, metrics, chips, labels, the tabs. Mono carries the
slashed zero. Hierarchy is weight 600 at large sizes with tight negative
tracking, never a second family.

```
h1        72px / 1.02, -0.035em, 600      44px below 640
contact   64px / 1.05, -0.035em, 600      40px below 640
h2        40px / 1.1,  -0.03em,  600      30px below 640
project   30px, -0.025em, 600
role      22px / 1.4, 500                 18px below 640
body      16px / 1.55; lede 17px
mono      12-13.5px
```

### Layout

Content max-width 1240px with 40px gutters, 16px below 640. Sections are
104px top and bottom (72px below 640), separated by a full-bleed 1px rule.
One column below 980px.

```
┌────────────────────────────────────────────────────────┐
│ [sb] sailab.dev   about.md experience.log ...  [Resume]│ sticky, 56px
├────────────────────────────────────────────────────────┤
│ [photo] (o Full-stack and AI)    ┌ ~/sailab — zsh ───┐ │
│         Chennai · IST            │ ➜ ~ whoami        │ │
│ Sailab Banik                     │ ...               │ │
│ headline, emphasis in amber      │ ✓ ... 20+ teams   │ │
│ statement                        └───────────────────┘ │
│ [View resume] [Email me] [in][gh][md][lc]              │
├────────────────────────────────────────────────────────┤
│ Experience                         git log --graph main│
│ ● a3f9c21 (HEAD → main) Oct 2024 — present             │
│ │ Software Engineer II   ┌ diff: + text ... metric ┐   │
│ ╰○ 7be04d2 (poc/drawing-extraction) 2026 — present     │
│ ○ 19c6e0f Aug 2023 — Sep 2024 (Budding Star Award)     │
├────────────────────────────────────────────────────────┤
│ Projects                                 ls ~/projects │
│ path / name / summary / chips / links │ live panel     │
├────────────────────────────────────────────────────────┤
│ Toolbox (grouped chips)  │ Writing (dated rows)        │
│ [credential] [credential] [credential] [education]     │
├────────────────────────────────────────────────────────┤
│ ./contact.sh --subject "hello"                         │
│ Working on something with LLMs? Let's talk.            │
│ email, buttons, colophon                               │
└────────────────────────────────────────────────────────┘
```

Below 640 the header shows only the current tab and the resume button keeps
its icon alone; experience metrics drop under their line; the queue lanes
stack and lose their arrows.

### Components worth knowing

- **Header tabs** are the only scroll-driven state. A section is current once
  its top passes 120px from the viewport top; at the very bottom of the page
  the last tab wins, because the footer is too short to reach that line.
- **Terminal** types itself out once on load: each line is clipped open with a
  stepped `clip-path` animation, a command or output every 0.7s, check lines
  every 0.4s, then an idle prompt with a blinking caret. The delays are
  computed from line order. It is `role="img"` with a plain-text label; the
  same facts are in Experience for anyone who cannot see it.
- **Experience** is a commit graph. Roles are commits on main; the
  drawing extraction proof of concept is drawn as a branch with a curved
  connector because it is separate, ongoing work not yet merged into
  production. The first commit's node is filled
  (`HEAD`). Change rows alternate a faint green wash.
- **Project panels** show each system doing its job rather than a screenshot:
  ContextDesk Lab's cache hit against the model call (measured numbers),
  FocusTrack's week split into execution and preparation with the weekly
  report it writes, QueueLens's jobs moving producer to Redis to workers.
  The FocusTrack and QueueLens panels are drawn from made-up data and say so
  with an "illustrative data" tag. The FocusTrack report text must agree with
  the bars it sits under (66% execution, Thursday the preparation-heavy day).
- **Credentials** are text cards, four across: three certificates and the
  degree, which is the one resume fact not covered elsewhere on the page. The
  scans are no longer shown.
- **No resume section.** The mockup's preview/source viewer was built and then
  removed: it repeated the sections above it. Resume buttons open the PDF in a
  new tab rather than forcing a download, so it can be read without saving.

### Motion

Terminal typing, the cache bars growing in, the queue's flow dots, and the
caret blink. All of it sits inside `prefers-reduced-motion: no-preference`;
under reduced motion every line, bar, and dot is shown at rest. Hover is a
colour or border change and nothing more.

### Principles

1. Copy is written action, method, result: what I did, how, and the measured
   outcome, in that order, with the number in the sentence. No narration of
   internal mechanics (how models agree, prompt versions) unless it is the
   result. The PDF resume and the page say the same things.
2. Every figure on the page is one the resume backs. Illustrative data is
   labelled as such where it appears.
3. One accent, amber, for "act here" and "this is the number". Status colours
   mark state only.
4. The developer-environment dressing (paths, hashes, shell commands) is
   allowed where it labels something real, and nowhere it would need
   explaining.
5. Quality floor, unannounced: visible focus rings, keyboard-reachable links
   and tabs, 4.5:1 contrast on text, reduced motion respected, works at 320px.

## Content model

See the types in `src/lib/content.ts`; they are the schema. Notes on the ones
that are not obvious:

- `Profile.emphasis` is a substring of `headline`, set in amber.
- `Commit` covers both kinds of entry in Experience: a role has `org` (and may
  have `ref`, `diff`, `award`); a branch has `branch` and `summary`.
- `Project.panel` is a union on `kind`. Add a kind by adding a type, a
  component under `components/panels/`, and a case in `ProjectPanel`.
- `SectionCopy` has `title`, optional `lead`, and either a `path` (a shell
  command shown at the right of the heading) or an `action` (a link label).

FocusTrack's copy is grounded in its repository (`sailab-banik/FocusTrack`,
README and PLAN): sessions are categorised as execution (Build, Create, Work,
Practice) or preparation (Learn, Brainstorm, Review); reports are written
automatically once per finished day, week, or month, cite the user's own
numbers, and end with one next action; one report per period per user is
claimed in the database before the provider is called; RLS is verified by
pgTAP tests. Keep new copy about it to things the repo says.

## The share card

`src/app/opengraph-image.tsx` generates the 1200x630 card at build time with
`next/og`. It is the hero in miniature: the brand mark, the name in Geist
SemiBold, the headline with its emphasis in amber, and a mono rule line with
location and domain.

Satori needs static font instances, so Geist Regular, Geist SemiBold, and
Geist Mono Regular live in `assets/fonts/` and are read with `node:fs` at
module scope. Every `div` with more than one child needs an explicit
`display: flex`, and each flex child becomes its own text run, which is why
the headline is three spans in a wrapping flex row.

## Still open

- **LeetCode URL is a guess.** `profile.json` carries
  `leetcode.com/u/sailab-banik/`, which was never confirmed — it is not in the
  resume. Verify or remove the link.
- **"The story at sailab.dev" was not built.** The mockup's contact row links
  `https://www.sailab.dev`, which did not resolve when this was built. Add the
  button back if that site goes up.
- **The "I reply within a day" promise** in the contact lead came from the
  mockup. Keep it only if it is true.
- **Unused public files.** `public/images/portrait-cutout.png` and
  `public/certificates/*.jpeg` are no longer on the page but are still served.
- Lighthouse has not been run against this design.

`metadataBase` reads `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets to the
shortest production custom domain, so it resolves to `portfolio.sailab.dev`
without a hardcoded URL as long as that domain stays attached to the project.

## Done when

- Loads under 1.5s on a cold Vercel edge hit; Lighthouse 95+ on all four.
- The resume PDF opens from header, hero, and footer.
- Every external link opens in a new tab with `rel="noreferrer"`.
- Tab order reaches every link and tab with a visible ring.
- Nothing on the page is a placeholder.
