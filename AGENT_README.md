# RZST Website — AI Agent Analysis Guide

This document provides context, architectural details, and specific instructions for AI agents tasked with analyzing, modifying, or enhancing the RZST website.

## 1. Project Background & Architecture

The RZST website (`www.rzst.org`) serves as the digital infrastructure and public-facing proposal for a domain-agnostic multi-agent orchestration engine. Its flagship use case focuses on translational medicine—specifically, replacing physical placebos in neurodegenerative trials with mathematically rigorous synthetic control arms using federated learning (D-CLEF) and causal inference (FedECA).

**Core Design Philosophy:**
The site is built as a static HTML/CSS architecture without heavy JavaScript frameworks. It relies on semantic HTML5 and a single global stylesheet (`css/style.css`). The design language is highly technical, utilizing a "dark mode by default" aesthetic with stark contrasts, cyan/violet neon accents, and monospace typography for mathematical elements.

**File Structure:**
- `index.html` — Main landing page (Domain-Agnostic Multi-Agent Orchestration)
- `flagship-proposal.html` — Deep dive into the D-CLEF architecture and proof-of-concept
- `founder.html` — Editorial/manifesto page from the founder
- `regulatory-synthetic-arms.html` — Methodological whitepaper on FedECA and IPTW
- `privacy-policy.html` — Standard privacy policy
- `css/style.css` — The single global stylesheet controlling all visual design
- `js/script.js` — Minimal JavaScript (primarily for mobile navigation toggles)
- `images/` — Contains brand assets (`rzst-cruciform.png`, `rzst-wordmark.jpg`, `rzst_variant_monochrome.png`)

---

## 2. The Design System & Typography

The site utilizes two primary Google Fonts:
- **Inter** (Weights: 300, 400, 600, 700) — Used for all body copy and standard UI elements.
- **Space Grotesk** (Weights: 400, 600, 700) — Used for all headings (`h1`–`h6`), logos, step numbers, and mathematical equations to provide a technical, "blueprint" aesthetic.

### Section Alternation
The site relies heavily on alternating background colours to separate content blocks. This is achieved via utility classes applied to `<section>` tags:
- `<section class="section-dark">` — Black background (`#0A0A0A`) with white/light-grey text.
- `<section class="section-light">` — White/off-white background (`#f8fafc` or `#FFFFFF`) with dark text.

---

## 3. How to Modify Colours

The website's colour system is centrally managed via CSS Custom Properties (CSS Variables) defined in the `:root` pseudo-class at the very top of `css/style.css`. 

### A. Global Colour Changes (Recommended)
To change colours across the entire website simultaneously, you must modify the variables in the `:root` block in `css/style.css` (Lines 4–19).

**Current Global Variables:**
```css
:root {
    color-scheme: light;
    --primary-color: #0A0A0A;       /* Deep black */
    --secondary-color: #141414;     /* Slightly lighter black for cards/blocks */
    --accent-color: #0DC6DE;        /* Cyan */
    --accent-hover: #591D8E;        /* Deep Violet */
    --bg-light: #f8fafc;            /* Off-white for light sections */
    --bg-dark: #0A0A0A;             /* Deep black for dark sections */
    --text-light: #FFFFFF;          /* Pure white text */
    --text-dark: #0A0A0A;           /* Deep black text */
    --text-muted: #A0A0A0;          /* Grey text for secondary info */
    --border-color: #1e1e1e;        /* Dark grey for borders */
    
    /* The signature RZST gradient used on primary buttons and major headlines */
    --gradient-flow: linear-gradient(90deg, #06FFFE 0%, #003CA0 50%, #571B97 100%);
    
    /* Explicit accent aliases */
    --cyan-accent: #0DC6DE;
    --violet-accent: #591D8E;
}
```

**Instructions for AI Agents:**
If the user requests a "new colour scheme" or "change the primary accent colour to green", you should **only** update these `:root` variables. The rest of the CSS is engineered to inherit from these tokens.

### B. Page-Specific or Component-Specific Colour Changes
While the site relies on global variables, certain complex components have hardcoded colours or gradients applied directly in their specific CSS blocks or via inline styles in the HTML.

**1. Inline Styles in HTML:**
Some specific callouts and plain-English translations use inline styles to override the global CSS. If you need to change these, you must edit the HTML files directly.
*Example from `founder.html`:*
```html
<em style="color: #591D8E;">In plain English: We propose an architecture...</em>
```

**2. Complex Gradients in CSS:**
Certain hero sections and callout boxes use hardcoded gradients that do not rely on the `--gradient-flow` variable. To modify these, you must locate their specific classes in `css/style.css`.
*Examples:*
- **Hero Backgrounds:** `.hero` (Line 242) uses `linear-gradient(135deg, #0A0A0A 0%, #0d0d1a 100%)`.
- **Dramatic Intro Background:** `.blueprint-intro` (Line 371) uses `linear-gradient(160deg, #000000 0%, #050510 40%, #0a0520 100%)`.
- **Bioethics Callout:** `.bioethics-callout` (Line 830) uses `linear-gradient(135deg, rgba(13,198,222,0.08), rgba(87,27,151,0.06))`.

**3. Hover States on Buttons:**
The primary button hover state is hardcoded to reverse the gradient flow. If you change `--gradient-flow`, you must also manually update the hover state in `css/style.css` (Line 194):
```css
.btn-primary:hover {
    background: linear-gradient(90deg, #571B97 0%, #003CA0 50%, #06FFFE 100%);
    /* ... */
}
```

---

## 4. Agent Directives for Enhancements

When analyzing this repository and recommending enhancements, adhere to the following directives:

1. **Preserve the Architecture:** Do not recommend migrating to React, Vue, or heavy JS frameworks unless explicitly requested. The static HTML/CSS nature of this site is intentional for maximum speed, security, and simplicity.
2. **Maintain the Tone:** The copy is written in a highly academic, slightly dramatic, and deeply technical tone. Any proposed copy changes must match this "AI Methods Producer" persona.
3. **Respect Mobile Fixes:** The CSS contains extensive media queries (`@media (max-width: 768px)`, etc.) specifically engineered to prevent horizontal overflow on mobile devices (particularly regarding long mathematical equations and large wordmark images). Do not remove these safeguards.
4. **Governed Autonomy:** When proposing changes, provide the user with the exact code blocks to replace, clearly explaining *why* the change improves the site's UX, accessibility, or aesthetic coherence.
