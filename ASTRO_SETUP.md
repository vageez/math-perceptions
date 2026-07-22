# Astro Setup Specification

## Grade 10 Visualization Study Guide

**Status:** Implementation handoff  
**Recommended stack:** Astro + Starlight  
**Primary goal:** Make each Grade 10 math unit easy to navigate, review, and study on a phone or computer.

---

## 1. Product rule

The website exists to help a Grade 10 student pass math.

Every technical decision must support at least one of these outcomes:

- find the right unit quickly;
- recognize the type of exam question;
- understand the concept visually;
- recall the formula or first step;
- practise and check an answer.

Do not add publishing complexity, dashboards, accounts, or abstractions during the first version.

## 2. Why Astro Starlight

Use **Starlight**, Astro's documentation-site toolkit, rather than assembling a documentation interface from raw Astro components.

It provides the useful parts of a study guide immediately:

- file-based Markdown pages;
- a unit sidebar;
- search;
- previous/next navigation;
- responsive mobile layout;
- accessible typography;
- dark and light themes;
- room for custom diagrams and interactive components later.

The existing Markdown remains the source of truth.

## 3. Repository decision

Create the Astro application inside a `site/` directory:

```text
math-grade10/
├── site/                         # Astro + Starlight application
├── docs/                         # Current source files; retain during migration
├── review/                       # Reviewer handoffs; never published
├── PCPM Grade 10 Classification Matrix.csv
├── PCPM Grade 10 Classification Matrix.xlsx
├── Primitive Cognitive Patterns of Mathematics (PCPM).pdf
└── ASTRO_SETUP.md
```

Why use `site/`:

- the current study content and research files remain undisturbed;
- the site can be built, replaced, or deployed independently;
- migration can be verified before any old file is archived;
- reviewer-only documents stay outside the public content collection.

When deploying, configure the hosting service's project root as `site/`.

## 4. Canonical unit sections

Use the current Grade10Math.com sequence as the public unit order:

| Order | Section slug | Section label |
|---:|---|---|
| 1 | `unit-1-linear-relations` | Unit 1 — Linear Relations |
| 2 | `unit-2-analytic-geometry` | Unit 2 — Analytic Geometry |
| 3 | `unit-3-trigonometry` | Unit 3 — Trigonometry |
| 4 | `unit-4-similarity-congruency` | Unit 4 — Similarity & Congruency |
| 5 | `unit-5-functions` | Unit 5 — Functions |
| 6 | `unit-6-statistics` | Unit 6 — Statistics |

This ordering should be treated as canonical unless the student's school provides a different course outline.

## 5. Target site structure

```text
site/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── assets/
    │   └── diagrams/
    │       ├── unit-1/
    │       ├── unit-2/
    │       ├── unit-3/
    │       ├── unit-4/
    │       ├── unit-5/
    │       └── unit-6/
    ├── components/
    │   └── study/                # Optional MDX components added only when needed
    ├── content/
    │   └── docs/
    │       ├── index.md
    │       ├── unit-1-linear-relations/
    │       │   ├── index.md
    │       │   ├── cartesian-plane.md
    │       │   ├── slope.md
    │       │   ├── equation-of-a-line.md
    │       │   ├── types-of-lines.md
    │       │   ├── systems-of-equations.md
    │       │   ├── formula-sheet.md
    │       │   ├── vocabulary.md
    │       │   └── exam-checklist.md
    │       ├── unit-2-analytic-geometry/
    │       │   └── index.md
    │       ├── unit-3-trigonometry/
    │       │   └── index.md
    │       ├── unit-4-similarity-congruency/
    │       │   └── index.md
    │       ├── unit-5-functions/
    │       │   └── index.md
    │       └── unit-6-statistics/
    │           └── index.md
    ├── content.config.ts
    └── styles/
        └── custom.css
```

### Published versus internal files

`unit1-review.md` is an editorial handoff, not student material. Move it to:

```text
review/unit-1-review.md
```

Do not place review specifications, source audits, or answer-authoring notes in `site/src/content/docs/`.

## 6. Bootstrap the site

Run these commands from `/Users/angelovagenas/Documents/math-grade10`:

```sh
npm create astro@latest -- --template starlight site
cd site
npm install
```

Then confirm the untouched starter works:

```sh
npm run dev
```

Do not migrate content until the starter opens successfully.

## 7. Add math rendering

The current pages use `$...$` and `$$...$$` notation. Configure KaTeX so formulas render as mathematics rather than plain text.

Install:

```sh
npm install @astrojs/markdown-remark remark-math rehype-katex katex
```

Configure the current Astro Markdown processor in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [
    starlight({
      title: 'Grade 10 Math Study Guide',
      description: 'A visual, exam-focused Grade 10 mathematics study guide.',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Start Here', link: '/' },
        {
          label: 'Unit 1 — Linear Relations',
          items: [{ autogenerate: { directory: 'unit-1-linear-relations' } }],
        },
        {
          label: 'Unit 2 — Analytic Geometry',
          collapsed: true,
          items: [{ autogenerate: { directory: 'unit-2-analytic-geometry' } }],
        },
        {
          label: 'Unit 3 — Trigonometry',
          collapsed: true,
          items: [{ autogenerate: { directory: 'unit-3-trigonometry' } }],
        },
        {
          label: 'Unit 4 — Similarity & Congruency',
          collapsed: true,
          items: [{ autogenerate: { directory: 'unit-4-similarity-congruency' } }],
        },
        {
          label: 'Unit 5 — Functions',
          collapsed: true,
          items: [{ autogenerate: { directory: 'unit-5-functions' } }],
        },
        {
          label: 'Unit 6 — Statistics',
          collapsed: true,
          items: [{ autogenerate: { directory: 'unit-6-statistics' } }],
        },
      ],
    }),
  ],
});
```

Add KaTeX and study-guide styles in `src/styles/custom.css`:

```css
@import 'katex/dist/katex.min.css';

:root {
  --sl-color-accent-low: #dbeafe;
  --sl-color-accent: #2563eb;
  --sl-color-accent-high: #172554;
  --study-unit-1: #2563eb;
  --study-success: #15803d;
  --study-warning: #b45309;
}

.sl-markdown-content {
  font-size: 1.05rem;
  line-height: 1.7;
}

.sl-markdown-content table {
  width: 100%;
}

.sl-markdown-content img.hero-diagram {
  display: block;
  width: min(100%, 64rem);
  margin-inline: auto;
}

.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding-block: 0.5rem;
}
```

If the installed Astro version changes the Markdown processor API, follow the version's official Markdown configuration and retain the same `remark-math` → `rehype-katex` processing goal.

## 8. Content collection configuration

The Starlight template should provide `src/content.config.ts`. It must use Starlight's loader and schema:

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
```

Do not create one content collection per unit. All student pages belong to the Starlight `docs` collection; directories create the unit sections.

## 9. Frontmatter contract

Every published page must begin with YAML frontmatter.

### Unit landing page

```yaml
---
title: Unit 1 — Linear Relations
description: Learn to read, graph, compare, and solve straight-line relationships.
sidebar:
  label: Start Unit 1
  order: 0
---
```

### Concept page

```yaml
---
title: Slope
description: Recognize and calculate the steepness and direction of a line.
sidebar:
  order: 20
---
```

### Unit review page

```yaml
---
title: Exam Checklist
description: Check whether you are ready for a Unit 1 test.
sidebar:
  label: Exam Checklist
  order: 80
---
```

### Unit 1 sidebar order

| File | Order |
|---|---:|
| `index.md` | 0 |
| `cartesian-plane.md` | 10 |
| `slope.md` | 20 |
| `equation-of-a-line.md` | 30 |
| `types-of-lines.md` | 40 |
| `systems-of-equations.md` | 50 |
| `formula-sheet.md` | 60 |
| `vocabulary.md` | 70 |
| `exam-checklist.md` | 80 |

Use gaps of 10 so another page can be inserted later without renumbering everything.

## 10. Page sections

Each concept page should preserve this student-facing sequence:

```text
1. Question the page answers
2. Hero diagram or mental picture
3. Think of… layman's analogy
4. Mathematical meaning
5. Formula or key rules
6. Worked example
7. When you see… think… recognition table
8. Common exam mistakes
9. Quick check with hidden answers
10. Mission complete checklist
```

Use Starlight asides for short signals:

```md
:::tip[When you see two points]
Think slope formula.
:::

:::caution[Common mistake]
Keep the subtraction order the same for x and y.
:::
```

Avoid filling every page with decorative callouts. The hero visual and worked example remain the focus.

## 11. Diagram and asset rules

### First migration

Keep the current portable text diagrams so no educational content is lost.

### Visual replacement

Replace each text diagram with an SVG or optimized image only after its educational accuracy is reviewed.

Store processed diagrams in:

```text
site/src/assets/diagrams/unit-1/
```

Reference them from Markdown using relative paths so Astro can optimize and validate them where supported.

Every diagram must have:

- a useful text alternative;
- readable labels on a phone;
- sufficient colour contrast;
- no meaning communicated by colour alone;
- vocabulary labels pointing directly to the relevant object;
- no decorative detail that competes with the math.

Use `.md` for ordinary study pages. Change a page to `.mdx` only when it genuinely needs a reusable Astro component or interactive control.

## 12. Unit 1 migration map

Copy first; do not delete the originals during migration.

| Current source | Astro destination |
|---|---|
| `docs/unit-1-linear-relations/index.md` | `site/src/content/docs/unit-1-linear-relations/index.md` |
| `docs/unit-1-linear-relations/cartesian-plane.md` | `site/src/content/docs/unit-1-linear-relations/cartesian-plane.md` |
| `docs/unit-1-linear-relations/slope.md` | `site/src/content/docs/unit-1-linear-relations/slope.md` |
| `docs/unit-1-linear-relations/equation-of-a-line.md` | `site/src/content/docs/unit-1-linear-relations/equation-of-a-line.md` |
| `docs/unit-1-linear-relations/types-of-lines.md` | `site/src/content/docs/unit-1-linear-relations/types-of-lines.md` |
| `docs/unit-1-linear-relations/systems-of-equations.md` | `site/src/content/docs/unit-1-linear-relations/systems-of-equations.md` |
| `docs/unit-1-linear-relations/formula-sheet.md` | `site/src/content/docs/unit-1-linear-relations/formula-sheet.md` |
| `docs/unit-1-linear-relations/vocabulary.md` | `site/src/content/docs/unit-1-linear-relations/vocabulary.md` |
| `docs/unit-1-linear-relations/exam-checklist.md` | `site/src/content/docs/unit-1-linear-relations/exam-checklist.md` |
| `docs/unit-1-linear-relations/unit1-review.md` | `review/unit-1-review.md` — not published |

After copying:

1. Add frontmatter to every published file.
2. Convert internal `.md` links to clean site routes such as `/unit-1-linear-relations/slope/`.
3. Confirm formulas render.
4. Confirm `<details>` answer blocks work.
5. Confirm sidebar order.
6. Run all validation commands.
7. Keep the original `docs/` directory until review approval.

## 13. Home page requirements

The home page at `site/src/content/docs/index.md` should be student-oriented, not a project README.

It must contain:

- the title **Grade 10 Math Study Guide**;
- one sentence explaining that the guide is visual and exam-focused;
- a prominent **Start Unit 1** link;
- one card or link for each unit;
- a short “How to use this guide” sequence;
- no contributor, architecture, or research information.

Until a unit is ready, label it **Coming soon** instead of publishing an empty section that looks complete.

## 14. URL contract

Keep predictable URLs:

```text
/
/unit-1-linear-relations/
/unit-1-linear-relations/cartesian-plane/
/unit-1-linear-relations/slope/
/unit-1-linear-relations/equation-of-a-line/
/unit-1-linear-relations/types-of-lines/
/unit-1-linear-relations/systems-of-equations/
/unit-1-linear-relations/formula-sheet/
/unit-1-linear-relations/vocabulary/
/unit-1-linear-relations/exam-checklist/
```

Once published, do not rename a slug casually. Stable URLs make bookmarks, review notes, and printed QR codes reliable.

## 15. Validation commands

Run from `site/`:

```sh
npm run dev
npm run build
npm run preview
```

The implementation is acceptable only when:

- the production build finishes without errors;
- all Unit 1 pages appear in the intended order;
- every internal link works;
- formulas render on desktop and mobile widths;
- diagrams do not overflow the page;
- hidden answers open and close;
- search finds “slope,” “parallel,” “perpendicular,” and “elimination”;
- the exam checklist is usable by keyboard;
- reviewer-only files are not reachable from the public site.

## 16. Migration phases

### Phase A — Shell

- Create the Starlight project in `site/`.
- Add math rendering and minimal custom CSS.
- Create the student-facing home page.

### Phase B — Unit 1

- Copy Unit 1 student pages.
- Move the review handoff outside published content.
- Add frontmatter and clean links.
- Build and visually check every page.

### Phase C — Review

- Run the expert Unit 1 review.
- Correct content and visual issues.
- Treat approved Unit 1 pages as the pattern for later units.

### Phase D — Remaining units

- Build one complete unit at a time.
- Add its directory to the sidebar.
- Publish only after content and build validation.

## 17. Definition of done

The Astro setup is complete when a student can:

1. open the home page;
2. enter Unit 1 with one click;
3. move through the lessons in the correct order;
4. read all diagrams and formulas on a phone;
5. reveal quick-check answers;
6. search for an unfamiliar term;
7. finish on the formula sheet and exam checklist;
8. understand what to study next without adult guidance.

The website shell is successful only if it makes studying simpler than opening the raw Markdown files.

## 18. Official implementation references

- [Starlight: Getting Started](https://starlight.astro.build/getting-started/)
- [Starlight: Project Structure](https://starlight.astro.build/guides/project-structure/)
- [Starlight: Pages](https://starlight.astro.build/guides/pages/)
- [Starlight: Sidebar Navigation](https://starlight.astro.build/guides/sidebar/)
- [Starlight: Authoring Markdown](https://starlight.astro.build/guides/authoring-content/)
- [Astro: Content Collections](https://docs.astro.build/en/guides/content-collections/)

Use these current official references during implementation rather than copying configuration from an older third-party tutorial.
