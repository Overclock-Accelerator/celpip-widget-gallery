# CELPIP Widget Gallery — Project Context

> Persistent project context. Read this first in any new session.

---

## 1. What this is

Repo `celpip-widget-gallery` is the **Phase 1 deliverable workspace** for the Overclock ↔ Prometric (CELPIP) engagement: a modular component library + sample microsite gallery built on Next.js 16, that becomes the foundation for a full celpip.ca rebuild in Phase 3.

Purpose right now: build the widget catalog and 10 sample microsites we can show Prometric to anchor the Phase 1 scope and gather feedback.

---

## 2. Engagement overview

**Statement of Work**: `CELPIP_Overclock_SOW_3-31-26.pdf` (project root) — signed March 31, 2026. **18 weeks**, three phases, $25K each ($75K total). Phase-level termination flexibility.

| Phase | Description | Fee |
|---|---|---|
| **Phase 1 — Microsite Infrastructure** *(current)* | Component library, Sanity CMS config, AI page builder, 5 sample microsites, content-team training | $25,000 |
| **Phase 2 — Design Refinement + Marketing Integration** | 3–5 design variants per key widget, image-gen style guide, Braze beacon integration, GTM container, Sendgrid | $25,000 |
| **Phase 3 — celpip.ca Rebuild** | Full migration to Next.js + Sanity + Azure, dynamic API-driven modules, SEO redirect map | $25,000 |

### Phase 1 deliverables (what we owe at end of phase)
- Deployed component library with **10–15 production-ready widgets**
- Sanity CMS configured (schema, roles, draft→publish workflow, MCP integration)
- **5 sample microsites** spanning audience segments (e.g., India, Philippines, Australia, Latin America, Middle East)
- AI page-builder workflow operational (marketer describes microsite → generated structure + copy)
- Content-team training (up to 3 people) + workflow documentation
- All code in client GitHub repo

> **Scope decision (resolved 2026-05-01):** SOW says 5 sample microsites; **we are building 10 for the initial Zoom demo** to give Prometric "volume of consideration" — lots of variation to ooh and ahh at. The extra 5 are sales-demo overhead, not Phase 1 deliverable inflation.

---

## 3. Stakeholders & Contacts

| Role | Name | Org | Email |
|---|---|---|---|
| Overclock primary | Ahmed Haque (Managing Partner) | Zap Learning, LLC d/b/a Overclock Accelerator | ahmed@overclockaccelerator.com |
| Prometric primary | Jay Chakrapani (CTO) | Prometric LLC | jay.chakrapani@prometric.com |
| Operating subsidiary | — | Paragon Testing Enterprises (Prometric subsidiary that runs CELPIP) | — |

**Audience for the microsites** (per brand guide):
- Test takers: Canadian, Australian, Overseas (India, China, Philippines, Bangladesh, Pakistan, Nigeria)
- Partners: Immigration agents, score users (universities/accreditors), prep partners

---

## 4. Technical stack

### Current (this repo)
- **Next.js 16.2.4** + React 19 + Tailwind v4 + TypeScript
- ⚠️ Next 16 has **breaking changes vs. training data**. AGENTS.md mandates reading `node_modules/next/dist/docs/` before writing routing/layout code. `node_modules` is **not yet installed** — `npm install` first.
- Fonts: Poppins (headings) + IBM Plex Sans (body), loaded via Google Fonts in `globals.css`
- Single-page sidebar gallery currently at `/`. No routing yet beyond root.

### Phase 3 target stack
- Next.js + **Sanity CMS** (headless, with MCP integration so Claude/Cursor/Copilot can read & write content)
- **Azure** hosting (or client-preferred)
- **Cloudflare** CDN + DDoS
- **Braze** for B2C lead capture, **Salesforce** for B2B leads, **Zoom** for webinar registration
- **GTM** container with: GA, Microsoft Clarity, Google Ads pixel, Meta Ads pixel, Geotargetly, CookieYes, Braze SDK
- **Sendgrid** for transactional confirmations
- **Userway** accessibility widget (carried over)

---

## 5. Brand

### What's in scope (Phase 1)
**Current CELPIP brand** — Poppins/IBM Plex Sans typography, navy/green accent palette. Per SOW §3.A.i: *"Material visual redesign (new brand identity, logo, or design system) is not included."*

| Color | Hex | Use |
|---|---|---|
| Navy | `#0B2341` | Primary surface, text |
| Navy-light | `#153A5C` | Hover, dividers |
| Green | `#00A651` | Primary CTA, accent |
| Green-light | `#00C764` | CTA hover |
| Teal | `#17FFDC` | Highlight, on-dark accent |
| Gold | `#FFBD17` | Reserved accent |

### Out of scope (do not apply to Phase 1)
A *future* brand direction exists in `~/Downloads/CELPIP_webbranding/` — `CELPIP_BrandGuide_2026.pdf` (calls itself 2025), `CELPIP New.tokens 1.json` (5,365-line Figma Tokens export), `reg-components.png`. **Different palette** (`#0A1023` navy, `#16DFA5` Prometric Green, plus burgundy / deep green / bright blue / purple / aqua). Treat this as Phase 2+ direction — **do not migrate Phase 1 work to it without explicit instruction**.

### Voice & tone (always apply)
- "The Supportive Expert" — calm, competent guide. *"You've got this. And we've got you."*
- 4 voice pillars: Clear and Supportive · Expert and Trustworthy · Human and Encouraging · Global and Inclusive
- **Never give immigration advice** (IRCC/DHA contract violation) — link to IRCC/DHA sites instead
- European spelling, grade 5–7 readability, active voice

---

## 6. Widget library — SOW Appendix A is canonical

Always anchor to **Appendix A of the SOW** for what counts as a widget. The client wants strict alignment.

### Appendix A taxonomy
**Foundational Content Types**: Buttons, CTAs, Forms, Vanity Metrics, Features & Highlights
**Page-Level Modules**: Hero, Rich text block, Image gallery, FAQ accordion, Testimonial quotes, Testimonial videos, Resource list, Score Alignment Chart
**Dynamic / API-Driven** *(Phase 3 — needs registration API)*: Exam Booking Search, Exam Listing, Test Centre Map, Prep Materials Listing, Webinar List, Score User Search, Prep Programs & Agents Search

### Current state of `src/components/widgets/`
| SOW module | File | Variants |
|---|---|---|
| Buttons | ❌ missing | — |
| CTAs | `CTA.tsx` | A bold green / B navy w/ accent / C card-with-icon |
| Forms | `Forms.tsx` | A simple lead / B inline / C B2B contact |
| Vanity Metrics | `VanityMetrics.tsx` | A clean row / B navy w/ dividers / C metric cards |
| Features & Highlights | `FeatureHighlights.tsx` | A icon grid / B navy horizontal cards |
| Hero | `Hero.tsx` | A gradient / B split / **C form-in-header (campaign template)** |
| Rich text block | ❌ missing | — |
| Image gallery | ❌ missing | — |
| FAQ | `FAQ.tsx` | A simple accordion / B category tabs |
| Testimonial quotes | `Testimonials.tsx` (A, B) | A cards / B spotlight |
| Testimonial videos | `Testimonials.tsx` (C) — bundled, may want to split | C video placeholder |
| Resource list | `ResourceList.tsx` | A card grid / B filtered list |
| Score Alignment Chart | `ScoreChart.tsx` | A interactive table |

**Helper**: `VariantLabel.tsx` — pill that labels each variant in the gallery.

### Gaps to close (Phase 1)
1. **Buttons** — standalone catalog with style/size/state variants (per Appendix A "with accessibility labels, style variants")
2. **Rich text block** — typography component for long-form copy
3. **Image gallery** — grid/lightbox/carousel variants
4. *(Optional)* Split Testimonial videos into its own file for clean Appendix A alignment

Hitting these brings us to **12 widgets** — inside the 10–15 deliverable target.

---

## 7. Microsite plan — 10 sites, all using existing widgets

### Composition rules
- **Strictly compose from the 9 (→12) Appendix A widgets.** No bespoke components per microsite.
- **3 regional + 7 layout variations** (Ahmed's directional ask).
- Each microsite = its own route (`/microsite/1` … `/microsite/10`).
- **Persistent gallery shell** wraps all 10: top bar with `← Prev | N / 10 — [title] — [tag] | Next →`, keyboard arrow support, deep-linkable.
- Use SOW page templates as the underlying frame (Home / Landing / Standard / Catalog / Resource).

### The 10 microsites (proposed, awaiting final go-ahead)

| # | Microsite | Template | Composition |
|---|---|---|---|
| 1 | **India regional** | Landing | Hero(C) → VanityMetrics → FeatureHighlights → Testimonials(A) → FAQ → CTA |
| 2 | **Philippines regional** | Landing | Hero(C) → FeatureHighlights → Testimonials → ScoreChart → Forms(A) → CTA |
| 3 | **Australia regional** | Landing | Hero(B) → ScoreChart(DHA emphasis) → Testimonials → FAQ → CTA |
| 4 | **Campaign Landing** | Landing (form-in-header) | Hero(C) → VanityMetrics → FeatureHighlights → CTA |
| 5 | **Standard Home** | Home | Hero(B) → VanityMetrics → FeatureHighlights → ScoreChart → Testimonials → FAQ → CTA |
| 6 | **Resource Hub** | Resource | Hero(A) → ResourceList(B) → Forms(B: webinar) → Forms(A: newsletter) → CTA |
| 7 | **Score Path** | Standard | Hero(A) → ScoreChart → VanityMetrics → FAQ → CTA |
| 8 | **B2B / Institutional** | Standard | Hero(B) → ScoreChart → Testimonials(C: video) → Forms(C: B2B) → CTA |
| 9 | **Prep-Focused** | Standard | Hero → FeatureHighlights → ResourceList → Testimonials → Forms(A) → CTA |
| 10 | **Testimonials-Led** | Standard | Hero(A) → Testimonials(B: spotlight) → Testimonials(A: cards) → VanityMetrics → CTA |

### Imagery
- **Hero images: real polished generations via Nano Banana** (Ahmed-confirmed). One per microsite, audience-themed.
- Testimonial avatars: stylized initials for first pass; upgrade to portrait gens after review.

---

## 8. Phase-by-phase scope summary

### Phase 1 (we are here)
Component library · Sanity CMS · AI page builder · 5 sample microsites · content team training. Mobile-first. **WCAG 2.2 AA via axe-core, zero critical automated violations.**

### Phase 2
Design refinement (3–5 polished variants per key widget via AI-assisted workflow) · image-generation style guide · Braze beacon integration · GTM container · Sendgrid. **Braze account provisioning is client's responsibility.**

### Phase 3
Full celpip.ca rebuild on Next.js + Sanity + Azure · dynamic API modules pulling from `celpip-registration.paragontesting.ca` (Exam Booking Search, Exam Listing, Test Centre Map) · SEO redirect map · 30-day post-launch bug-fix support. Client owns DNS cutover.

---

## 9. Out of scope (exclusions — say no to)

- E-commerce / checkout / test registration / payment (lives on `celpip-registration.paragontesting.ca`)
- Braze campaign creation, nurture sequence design, CRM config beyond beacon integration
- Paid media campaign creation/management (Meta, Google, influencer)
- **Formal WCAG certification or legal attestation** — automated audits only; manual certification is a separate engagement
- Content writing/copy/strategy beyond AI-generated first drafts for sample microsites
- Hosting cost subscriptions (Azure, Sanity, Cloudflare)
- Multi-language / localization
- New brand identity, logo redesign, or visual overhaul

---

## 10. Accessibility commitment

- Mobile-first build
- Target **zero critical violations** via automated WCAG 2.2 AA testing (axe-core / pa11y)
- Baseline (per SOW Appendix B, March 31, 2026 audit of existing celpip.ca homepage): **54 errors** including 18 empty links, 10 unlabeled form fields, 8 unnamed inputs, 6 contrast issues, etc. Our deliverables must measurably improve on this.

---

## 11. Key files & references

| File / location | What it is |
|---|---|
| `CELPIP_Overclock_SOW_3-31-26.pdf` (project root) | **Canonical scope doc.** Appendix A = widget catalog. Appendix B = a11y baseline. |
| `~/Downloads/CELPIP_webbranding/CELPIP_BrandGuide_2026.pdf` | **Future** brand direction (Phase 2+). Don't apply to Phase 1. |
| `~/Downloads/CELPIP_webbranding/CELPIP New.tokens 1.json` | Figma Tokens export — also future direction. |
| `~/Downloads/CELPIP_webbranding/reg-components.png` | Component design specs reference image. |
| `src/components/widgets/*.tsx` | The 9 current widgets. |
| `src/app/page.tsx` | Single-page sidebar gallery (current home). Will move to `/gallery` once microsite shell lands. |
| `src/app/globals.css` | Brand tokens + Google Font imports. |
| `https://github.com/Overclock-Accelerator/celpip-widget-gallery` | Origin remote. |

---

## 12. Working preferences (Ahmed-specific)

- Keep responses **short and dense**; no preamble or trailing summaries.
- **Flag and stop** on disagreement — don't push through.
- Medium autonomy: small reversible tasks proceed; multi-step / hard-to-reverse ask first.
- **Verify before asserting** — never claim something works without testing/screenshot/diff.
- **Surgical fixes only** — don't gut components to "fix" a bug. Fix the actual line.
- Use mode headers (NATIVE / ALGORITHM / MINIMAL) on every reply.

---

## 13. Demo strategy (today's Zoom)

- **Two surfaces, in parallel**: `/widgets` (gallery for granular reactions) and `/microsites/[id]` (10 microsites with persistent prev/next shell for big-picture reactions).
- **Goal**: convey momentum and visual progress. Lots of variation. Client reacts in-call, verbally; Ahmed captures.
- **Reaction layer is a stub for today** — 👍 / 👎 / 💬 buttons appear on every variant card and microsite shell, but are non-functional with a "coming next week" tooltip. Pitched as the async feedback mechanism we'll wire up after the call.
- **Hero imagery via Nano Banana** — 10 audience-themed images, one per microsite. Prompts checkpointed with Ahmed before generation to control credit spend.
- **Async follow-up next week**: real reaction layer (localStorage + JSON/markdown export) gets built then.

## 14. Open decisions / things to revisit

- [ ] Whether to split Testimonials videos out of `Testimonials.tsx` into its own file for clean Appendix A alignment.
- [ ] When (Phase 2?) to migrate to the 2025 brand palette — and whether to wire the existing tokens JSON into Tailwind v4 `@theme` at that time.
- [ ] Whether testimonial portraits get Nano Banana treatment in the next pass or stay stylized initials.
- [ ] **`/widgets` mobile overflow** — the gallery is desktop-only at 390px (QATester flagged). Microsite pages collapse fine. Fix in next polish pass.
- [ ] **Replace gpt-image-1 with true Nano Banana** when `REPLICATE_API_TOKEN` or `GOOGLE_API_KEY` is added to `~/.claude/.env`.

## 16. Iteration 1 (post-demo prep)

**Trigger**: Ahmed reviewed initial 10 microsites; flagged copy doesn't capture CELPIP positioning, and "widget concept is overly restrictive — need content blocks that sell value."

**In-flight changes**:
1. **Keep all 10 existing microsites as-is** — they show structural variation (the "ooh-ahh" volume).
2. **Add 10 NEW microsites** (#11-#20) authored from celpip.ca scrape and grounded in actual CELPIP positioning, voice, and value-selling copy.
3. **Add 8 conversion-stage content-block widgets** (NOT positioning — these microsites are for leads who've already chosen CELPIP and need a final push to register/pay/show up):
   - `TrustStrip` (recognized-by horizontal row, fast trust signal)
   - `MomentSpotlight` (single user moment with photo, social proof close)
   - `BookingPanel` (front-and-center sittings + "Book this date" CTA)
   - `NextStepsRoadmap` (Book → Prepare → Test → Results, 3-4 numbered steps)
   - `UrgencyBar` (slim "Next sitting in [city]: X seats left" banner)
   - `PrepStarterPack` (free practice test + study guide as lead magnet)
   - `ObjectionHandlerFAQ` ("What if I'm not ready?" with empathetic answers + soft CTAs)
   - `ReadinessQuiz` (interactive 3-question quiz → personalized "ready / almost / prep first" CTA)
4. **Pause AI ad-builder demo** (third surface). Resume after copy iteration lands.

**Audience for new microsites**: leads who **already chose CELPIP**. Past awareness/interest. Goal = convert to paid registration + showed up on test day. Wrong category for these microsites: vs-IELTS comparison, "what is CELPIP", brand origin story, score chart deep-dives.

**Source of truth for new copy**: `research/celpip-positioning.md` (in-flight scrape via Tavily + Firecrawl — pending). When it lands, filter for celpip.ca's *conversion-stage* pages (booking flow, prep resources, "ready to test?") not homepage positioning.

**Build order**:
1. Engineer G builds 5 new content-block widgets (parallel, in flight)
2. Research agent finishes celpip.ca scrape (parallel, in flight)
3. Author microsites #11-20 with real positioning + new content blocks
4. Generate any new HeroSplit imagery via gpt-image-1
5. QA pass before second demo iteration

## 15. Active build session

- **PRD (system of record)**: `~/.claude/MEMORY/WORK/20260501-150653_celpip-microsite-gallery-build/PRD.md`
- **Effort tier**: Comprehensive (72 ISC criteria including 5 anti-criteria)
- **Capabilities engaged**: Engineer (parallel), Media (Nano Banana), Designer, Architect, Explore, /simplify, /review, QATester
