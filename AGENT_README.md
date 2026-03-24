# RZST Website — Agent Architecture Guide

This document provides context, architectural details, and specific instructions for AI agents tasked with analyzing, modifying, or enhancing the RZST website.

## 1. Project Background & Architecture

The RZST website (`www.rzst.org`) serves as the digital infrastructure and public-facing proposal for a domain-agnostic multi-agent orchestration engine. Its flagship use case focuses on translational medicine—specifically, replacing physical placebos in neurodegenerative trials with mathematically rigorous synthetic control arms using federated learning (D-CLEF) and causal inference (FedECA).

**Core Design Philosophy:**
The site is built as a static HTML/CSS architecture without heavy JavaScript frameworks. It relies on semantic HTML5 and a single global stylesheet (`css/style.css`). The design language is highly technical, utilizing a clean, modern aesthetic with stark contrasts, electric blue accents, and monospace typography for mathematical elements.

**File Structure:**
- `index.html` — Main landing page (Domain-Agnostic Multi-Agent Orchestration)
- `flagship-proposal.html` — Deep dive into the D-CLEF architecture and proof-of-concept
- `founder.html` — Editorial/manifesto page from the founder
- `methods.html` — Technical breakdown of the orchestration engine
- `regulatory-synthetic-arms.html` — Methodological whitepaper on FedECA and IPTW
- `privacy-policy.html` — Standard privacy policy
- `css/style.css` — The single global stylesheet controlling all visual design
- `js/script.js` — Minimal JavaScript (primarily for smooth scrolling and header offset)
- `images/` — Contains brand assets (`rzst-cruciform.png`, `rzst-wordmark.jpg`, `rzst-hero.mp4`)

---

## 2. The Design System & Typography

The site utilizes two primary Google Fonts:
- **Inter** (Weights: 300, 400, 600, 700) — Used for all body copy and standard UI elements.
- **Space Grotesk** (Weights: 400, 600, 700) — Used for all headings (`h1`–`h6`), logos, step numbers, and mathematical equations to provide a technical, "blueprint" aesthetic.

### Fluid Typography
The site uses CSS `clamp()` functions for fluid typography on all major headings, ensuring smooth scaling across all viewport sizes without requiring complex media queries.

### Section Alternation
The site relies heavily on alternating background colours to separate content blocks. This is achieved via utility classes applied to `<section>` tags:
- `<section class="section-dark">` — Slate navy background (`#1E293B`) with white/light-grey text.
- `<section class="section-light">` — White/off-white background (`#FFFFFF` or `#f8fafc`) with dark text.

---

## 3. CSS Architecture (Phase 1 Refactor)

As of Phase 1, the CSS architecture has been completely consolidated and modernized.

**Key Architectural Rules:**
1. **No Inline Styles:** All `style="..."` attributes and per-page `<style>` blocks have been eliminated. All styling lives in `css/style.css`.
2. **No `!important`:** Specificity is managed through proper class chaining and CSS custom properties. Do not use `!important`.
3. **Mobile-First Media Queries:** All media queries use `min-width`. Base styles are written for mobile (≥320px), and layout expands at `560px`, `768px`, and `992px`.

### How to Add New Sections
To add a new section to any page, follow these steps:

1. **Choose a background variant:**
   - Light section: add class `section-light` to your `<section>`
   - Dark section: add class `section-dark` to your `<section>`
2. **Wrap content:** Use `<div class="container">` inside the section for max-width and centering.
3. **Use existing card grids:**
   - `.vector-grid` / `.vector-card` — general feature cards
   - `.kies-grid` / `.kies-card` — dark-background cards
   - `.feature-cards` / `.card` — initiative cards (dark bg)
4. **Custom Components:** If you need a page-specific component, add a clearly labelled section at the bottom of `style.css` (before the media queries) and prefix your class names with the page slug (e.g., `.my-page-hero`).
5. **Responsiveness:** Follow the mobile-first pattern. Write base styles for mobile, then add `min-width` overrides in the designated media query section at the bottom of `style.css`.

---

## 4. How to Modify Colours

The website's colour system is centrally managed via CSS Custom Properties (CSS Variables) defined in the `:root` pseudo-class at the very top of `css/style.css`. 

### Global Colour Changes
To change colours across the entire website simultaneously, modify the variables in the `:root` block in `css/style.css`.

**Current Global Variables:**
```css
:root {
    color-scheme: light;
    --primary-color:    #1E293B;   /* Slate navy — primary dark surface */
    --secondary-color:  #334155;   /* Mid-slate — dark section cards */
    --accent-color:     #0066FF;   /* Electric Blue — primary accent */
    --accent-hover:     #38BDF8;   /* Sky Blue — hover / secondary accent */
    --bg-light:         #FFFFFF;
    --bg-dark:          #1E293B;
    --text-light:       #F8FAFC;   /* Off-white — on dark surfaces */
    --text-dark:        #0F172A;   /* Deep slate — on light surfaces */
    --text-muted:       #64748B;   /* Slate grey — secondary text */
    --border-color:     #E2E8F0;
    
    /* Signature gradient (Electric Blue → Sky Blue) */
    --gradient-flow: linear-gradient(90deg, #0066FF 0%, #38BDF8 100%);
}
```

### Hover States and Complex Gradients
Certain hero sections and callout boxes use hardcoded gradients that do not rely on the `--gradient-flow` variable. To modify these, you must locate their specific classes in `css/style.css` (e.g., `.blueprint-intro`, `.bioethics-callout`).

The primary button hover state is hardcoded to reverse the gradient flow. If you change `--gradient-flow`, you must also manually update the hover state in `css/style.css`:
```css
.btn-primary:hover {
    background: linear-gradient(90deg, #38BDF8 0%, #0066FF 100%);
}
```

---

## 5. Agent Directives for Enhancements

When tasked with modifying the site, adhere to these rules:
1. **Maintain the Aesthetic:** Do not introduce rounded, playful, or "soft" design elements. The site must remain sharp, technical, and authoritative.
2. **Preserve Semantic HTML:** Ensure all new markup uses proper semantic tags (`<article>`, `<aside>`, `<figure>`, `<blockquote>`).
3. **Accessibility:** Ensure sufficient colour contrast and maintain ARIA labels where appropriate.
4. **No Build Tools:** This project is maintained as raw HTML/CSS/JS. Do not introduce Webpack, Vite, Sass, or Tailwind unless explicitly instructed by the user.
