# Portfolio Design System — design.md

> Visual direction locked from the reference design (Ibrahim Memon portfolio PDF): a dark, glowing, glassmorphic "designer-engineer" aesthetic — deep violet backgrounds, soft purple ambient light, glass cards, an illustrated avatar hero, and a typewriter-style role line. This document is the token system + component spec to hand to the vibe-coding platform alongside `portfolio-context.md`.

---

## 1. Direction Summary

- **Mood:** Dark, calm, premium, slightly playful — a personal "studio at night" feel rather than a corporate dark-mode.
- **Signature elements carried over from the reference:**
  1. A soft radial purple glow behind the hero avatar/illustration.
  2. A hand-drawn-style callout label pointing at the avatar ("Hello! I am ...").
  3. A typewriter-animated role line with a blinking cursor.
  4. Glassmorphic cards (translucent, blurred, thin light border) for Work Experience and Projects.
  5. A centered "orbit badge" — logo mark with rotating concentric rings — used as a section divider between Hero/Highlights and Projects.
  6. Alternating left/right layout for featured project rows (browser-frame mockup + text block).
- **What changes for Mayank's content:** no Figma/Adobe tool-icon strip (replace with his actual tech stack icons — Java, Spring, React, MySQL, MongoDB, AWS, Git, Postman). Avatar illustration should reflect a developer context (laptop + code, not a design tool). "Work Experience" grid becomes a single role card (he has one role) sized generously rather than a 2×2 grid — grid pattern reserved for **Academics & Skills** instead where it fits better (skill category cards).

---

## 2. Color System

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#120A1F` | Page background (near-black violet) |
| `--bg-elevated` | `#1B1030` | Section backgrounds, nav bar |
| `--glow-primary` | `#7C3AED` | Radial ambient glow, primary accent |
| `--glow-soft` | `#8B5CF6` | Secondary glow layer, gradient blends |
| `--accent` | `#A78BFA` | Links, highlighted words, active states |
| `--accent-bright` | `#C4B5FD` | Hover states, cursor blink, small highlights |
| `--card-glass` | `rgba(139, 92, 246, 0.08)` | Glass card fill |
| `--card-border` | `rgba(255, 255, 255, 0.10)` | Glass card border |
| `--text-primary` | `#F5F3FA` | Headlines, primary body copy |
| `--text-muted` | `#B4A9CC` | Secondary copy, captions |
| `--text-faint` | `#7C7295` | Tertiary labels, metadata |
| `--button-primary-bg` | `#8B5CF6` | Primary CTA fill |
| `--button-primary-text` | `#120A1F` | Primary CTA text |

**Ambient glow rule:** every hero/section-break should carry one soft radial-gradient glow (`--glow-primary` → transparent, ~600–800px diameter, low opacity ~25–35%), never more than one glow source per viewport to avoid muddiness.

---

## 3. Typography

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / Headlines | **Sora** | 600–700 | Big hero statement, section titles |
| Body | **Inter** | 400–500 | Paragraphs, card copy |
| Handwritten callout | **Caveat** | 500 | "Hello! I am..." style annotation labels only — used sparingly, max once per page |
| Mono / meta / typewriter line | **JetBrains Mono** | 400–500 | The animated role line ("Full Stack Developer.|"), timestamps, tags |

**Type scale (desktop):**
- Hero headline: 48–56px / 1.1 line-height
- Section title: 28–32px
- Card title: 18–20px
- Body: 15–16px / 1.7 line-height
- Caption / meta: 12–13px, letter-spacing 0.04em, uppercase where used as a label

**Rule:** only one handwritten-font instance per page (the greeting callout on Home). Never use it for body copy or buttons — it's an accent, not a system face.

---

## 4. Layout & Grid

- Max content width: **1140px**, centered, generous side padding (24px mobile / 80px+ desktop).
- Vertical rhythm: large section gaps (~120–160px desktop) — the reference design breathes; don't compress it into a dense SaaS-landing layout.
- Hero: single-column, centered-left text with avatar illustration positioned upper-left, glow centered behind it.
- Work Experience (Home preview) / Academics & Skills grid: **2-column card grid** on desktop, stacking to 1-column on mobile (≤768px).
- Featured Projects: **alternating row layout** — image/mockup on one side, text block on the other, flipping side each row. On mobile, image always stacks above text.
- Center **orbit-badge divider** between major sections (e.g., between Home hero block and Projects preview) — full-width row, badge centered, ~140px tall including glow.

---

## 5. Component Specs

### 5.1 Navbar
- Fixed/sticky, background `--bg-elevated` at ~70% opacity with backdrop-blur.
- Left: monogram mark (stylized "M" — echo the reference's minimal single-letter logomark treatment) linking Home.
- Right: nav links (Home / About / Academics / Projects / Experience) — `--text-muted` default, `--accent` on hover/active, small underline-slide transition.

### 5.2 Hero
- Small hand-drawn-style arrow/line connecting avatar to the "Hello! I am Mayank Kumar" callout label (Caveat font, `--accent-bright`), same device as the reference.
- Avatar: illustrated character at a laptop with a subtle code/terminal motif on the screen (in place of the reference's generic laptop) — flat/semi-3D illustration style, soft purple rim-light matching the glow.
- Headline (Sora, bold): a personality-forward line in the same spirit as "A Designer who judges a book by its cover" — e.g. **"A Developer who ships the whole stack..."** with one key word circled/underlined in `--accent` (hand-drawn circle SVG, animates in on load).
- Typewriter line directly below (JetBrains Mono): cycles through role framings, e.g. `I'm a Full Stack Developer.` / `I'm an MCA Candidate.` / `I'm building with Gemini API.` — blinking cursor, ~40ms/char type speed, pause 1.5s, backspace, next.
- Short bio paragraph (Inter, `--text-muted`), 2–3 lines max, same restrained length as reference.
- Primary CTA row: "View Projects" (filled `--button-primary-bg`) + "Download Resume" (ghost, `--card-border` outline).

### 5.3 Work Experience Card (Home / Experience page)
- Glass card: `--card-glass` fill, `--card-border` 1px border, border-radius 20px, backdrop-blur 12px.
- Icon chip top-left (small illustrated/emoji-style icon relevant to the bullet — e.g. a mentorship icon, a hackathon icon).
- Title (18px, `--text-primary`), 2-line description (`--text-muted`), "LEARN MORE →" ghost link in `--accent`.
- Since Mayank has one role, present as **one large glass card** (not a 2×2 grid) with the four bullet achievements as an internal list rather than four separate cards — OR reuse the 2×2 card grid pattern for the **Academics & Skills** page instead, one card per skill category (Languages / Frameworks / Databases / Cloud / AI-API / Tools).

### 5.4 Tech Stack Strip
- Directly reference the reference's icon-row pattern: centered statement line with one highlighted phrase (`--accent`, e.g. "cross-functional" → replace with something like "**full-stack**" or "**AI-integrated**" impact statement), followed by a horizontal row of tech logos (Java, Spring Boot, React, MySQL, MongoDB, AWS, Git, Postman) as small monochrome-on-hover-color icon chips.

### 5.5 Orbit Badge Divider
- Centered circular monogram badge (same mark as navbar logo) glowing with `--glow-primary`.
- 2–3 thin concentric ring outlines around it (`--card-border` opacity), slowly rotating at different speeds via CSS/Framer Motion (very slow, ~40–60s per rotation, decorative only).
- Small orbiting icon dots on the rings optional (code brackets `< >`, terminal icon) echoing the reference's floating glyphs.

### 5.6 Featured Project Row
- Browser-frame mockup (rounded corners, top dot-chrome bar) showing a placeholder/screenshot of the project.
- Eyebrow label "Featured Project" (`--text-faint`, uppercase, mono), project name (Sora, 24px), description paragraph, small tag icons row (tech stack used), all inside a glass panel behind the mockup+text pairing.
- Alternates side per project: BestPath (image left) → PrepRush (image right) → MedNext (image left).

### 5.7 Contact / Footer
- Centered heading + short invite line, mirroring reference tone but adapted: "I'm currently exploring full-stack and backend engineering roles — let's connect."
- Email as a prominent clickable line, social icons row (GitHub, LinkedIn, Email) below, `--text-muted` default → `--accent` hover.

---

## 6. Motion (Framer Motion)

- **Page load:** hero content fades + slides up in staggered sequence (avatar → callout arrow → headline → typewriter line → bio → CTAs), ~80ms stagger.
- **Typewriter line:** custom hook cycling role strings, matches reference's blinking-cursor style.
- **Hand-drawn circle/underline on headline keyword:** SVG path draw-on animation (stroke-dashoffset), triggers once on load, ~600ms.
- **Cards:** fade-up on scroll into view (threshold ~0.2), slight lift + border-glow brighten on hover.
- **Orbit badge:** continuous slow rotation (CSS animation, respects `prefers-reduced-motion` — freeze rings if set).
- **Project rows:** slide-in from the side they're anchored to (left row slides from left, right row from right) on scroll reveal.
- **Nav underline:** slides between links on hover/active rather than fading.

---

## 7. Iconography & Imagery

- Illustration style: flat-to-semi-3D character illustration (matches reference's avatar), used once in the Hero only — don't overuse illustrated characters elsewhere.
- Tech logos: use official simple/monochrome brand marks (recolor to `--text-muted`, shift to brand color or `--accent` on hover).
- Achievement/award badge (for the AICTE win on About page) can borrow the orbit-badge visual language at smaller scale — small glowing circular seal.

---

## 8. Responsive Notes

- Breakpoints: mobile ≤480px, tablet ≤768px, desktop ≥1024px.
- Hero avatar shrinks and moves above text on mobile (stacked, centered).
- 2-column card grids → 1 column below 768px.
- Featured project rows always stack image-above-text on mobile regardless of alternation.
- Orbit badge shrinks proportionally but stays visible (don't hide the signature element on mobile).
- Reduce glow blur radius on mobile for performance; cap backdrop-blur usage to avoid jank on low-end devices.

---

## 9. Page Mapping Reference

| Page | Key components used |
|---|---|
| Home | Navbar, Hero (avatar + typewriter + headline), Tech Stack Strip, Orbit Badge Divider, Featured Projects (2–3 rows), Contact/Footer |
| About | Navbar, narrative block (glass panel), Education timeline, Achievements (badge cards), Certifications grid, Contact/Footer |
| Academics & Skills | Navbar, 2×2/3×2 glass card grid (one per skill category), Contact/Footer |
| Projects | Navbar, full alternating Featured Project rows (all 3 projects), Contact/Footer |
| Work Experience | Navbar, single large glass Work Experience card with bullet list, Contact/Footer |

---

## 10. Constraints

- Keep the palette to the tokens above — no additional accent hues introduced ad hoc.
- One glow source per viewport; one handwritten-font usage per page; one illustrated character (Hero only).
- Respect `prefers-reduced-motion` for all decorative animation (typewriter can keep a static first string as fallback).
