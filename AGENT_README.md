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
- `js/script.js` — Minimal JavaScript (smooth scrolling, dynamic data fetching)
- `data/research.json` — Dynamic data source for research/initiative cards
- `images/` — Contains brand assets (`rzst-cruciform.png`, `rzst-wordmark.jpg`, `rzst-hero.mp4`)

---

## 2. Recent Improvements (Phases 2–5)

The website has been modernized to improve performance, accessibility, and maintainability without introducing a build tool.

**Phase 2: Performance Optimizations**
- **Preconnect:** Added `<link rel="preconnect">` for Google Fonts.
- **Preload:** Added `<link rel="preload">` for the critical above-the-fold hero wordmark image.
- **Lazy Loading:** Added `loading="lazy"` to below-the-fold images (e.g., the Human Conductor diagram).
- **Defer Scripts:** Added the `defer` attribute to all `<script src="js/script.js">` tags to prevent render-blocking.

**Phase 3: Accessibility Enhancements**
- **Skip Link:** Added a visually hidden "Skip to main content" link at the top of every page for keyboard/screen-reader users.
- **Focus Styles:** Implemented a global `:focus-visible` CSS rule to provide clear, high-contrast focus rings for keyboard navigation without affecting mouse users.
- **ARIA Labels:** Added descriptive `aria-label` attributes to navigation links, CTA buttons, and the hero video.

**Phase 4: JavaScript & Animation Improvements**
- **Event Delegation:** Replaced per-element click listeners for smooth scrolling with a single event-delegated listener on the `document`.
- **Modern Syntax:** Replaced legacy `var` declarations with `const` and `let`.
- **Entrance Animations:** Added `@keyframes` fade-in animations for hero content and `will-change: transform` to hover-animated cards to hint GPU compositing and prevent layout repaints.

**Phase 5: Dynamic Research Data**
- **Data Separation:** Extracted the "Current Initiatives" cards on the homepage into a JSON file (`data/research.json`).
- **Dynamic Rendering:** Refactored `script.js` to fetch the JSON data and dynamically render the cards into the `#research-cards` container.
- **Graceful Degradation:** Implemented loading indicators and error handling to ensure the page does not break if the fetch fails.

---

## 3. How to Add New Content

The architecture is designed to support easy content updates without requiring deep CSS or JavaScript knowledge.

### How to Add a New Research Entry
1. Open `data/research.json`.
2. Add a new JSON object to the array following this schema:
   ```json
   {
     "title": "Your New Title",
     "description": "Short description of the initiative.",
     "link": "path-to-page.html",
     "linkText": "Read More →",
     "external": false
   }
   ```
   *(Set `"external": true` if the link points to an external site or PDF, which will automatically add `target="_blank" rel="noopener"`).*
3. Save the file. The homepage will automatically fetch and render the new card.

### How to Add New Images
1. Place the new image file in the `images/` directory.
2. Reference it in the HTML using `<img src="images/your-image.png" alt="Descriptive alt text">`.
3. If the image is below the fold, always add `loading="lazy"`.

### How to Add or Reorder Modules (Sections)
1. To move a section, simply cut and paste the entire `<section>` block in the HTML file.
2. To add a new section, follow the established pattern:
   - Choose a background variant: `<section class="section-light">` or `<section class="section-dark">`.
   - Wrap the content in `<div class="container">`.
   - Use existing grid classes for layout (e.g., `<div class="vector-grid">` for feature cards).

### How to Edit the Sitewide Navigation Bar
Because this is a static site without a templating engine or build tool, the `<nav>` block is hardcoded into every HTML file.
1. **To add, remove, or rename a link:** You **must** apply the exact same change to the `<nav>` block in **all 7 HTML files** (`index.html`, `about.html`, `flagship-proposal.html`, `founder.html`, `methods.html`, `privacy-policy.html`, `regulatory-synthetic-arms.html`).
2. **Active State:** The current page should have `class="active"` on its corresponding `<a>` tag. When copying and pasting nav blocks across files, ensure you move the `class="active"` to the correct link for that specific page.
3. **CTA Button:** The final link in the nav uses `class="btn-nav"`. Ensure its `aria-label` accurately describes its destination.

---

## 4. CSS Architecture & Modification

All styling lives in `css/style.css`. Specificity is managed through class chaining and CSS custom properties. **Do not use `!important` or inline `style="..."` attributes.**

### Global Colour Changes
To change colours across the entire website simultaneously, modify the variables in the `:root` block at the top of `css/style.css`:
```css
:root {
    --primary-color:    #1E293B;   /* Slate navy */
    --accent-color:     #0066FF;   /* Electric Blue */
    --accent-hover:     #38BDF8;   /* Sky Blue */
    --gradient-flow: linear-gradient(90deg, #0066FF 0%, #38BDF8 100%);
    /* ... */
}
```
*(Note: Hover states for primary buttons are hardcoded to reverse the gradient flow and must be updated manually if `--gradient-flow` is changed).*

### Responsive Design
All media queries use `min-width` (mobile-first). Base styles are written for mobile (≥320px), and layout expands at `560px`, `768px`, and `992px`. When adding new components, write the base styles first, then add overrides in the designated media query section at the bottom of `style.css`.

---

## 5. Local Development & Testing

Because the site uses plain HTML/CSS/JS without a build tool, you can run it locally with minimal setup.

**To view the site:**
Simply open `index.html` in any modern web browser.

**Important Note on Dynamic Data (Phase 5):**
Because the homepage now uses `fetch()` to load `data/research.json`, opening `index.html` directly via the `file://` protocol may trigger a CORS (Cross-Origin Resource Sharing) error in some browsers, preventing the research cards from loading.
To test the dynamic data locally, serve the directory using a simple local web server. For example, if you have Python installed, run:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 6. Rollback Instructions

If you need to revert the Phase 2–5 changes and return to the Phase 1 state (static HTML cards, no fetch, no accessibility/performance enhancements), follow these steps:

1. **Using Git (Recommended):**
   If the repository is tracked via Git, you can revert to the Phase 1 commit:
   ```bash
   git checkout fe261c9
   ```
   *(Replace `fe261c9` with the actual Phase 1 commit hash if different).*

2. **Manual Reversion:**
   - **HTML:** Remove `defer` from script tags, remove `loading="lazy"`, remove `aria-label` attributes, remove the `.skip-link` anchor, and remove the `preconnect`/`preload` links in the `<head>`.
   - **CSS:** Delete sections 30, 31, and 32 from the bottom of `css/style.css`.
   - **JS:** Restore the `js/script.js.phase1.bak` backup file (if created) or manually revert `script.js` to use the `forEach` loop for smooth scrolling and remove the `fetch()` logic.
   - **Data:** Delete the `data/` directory.
   - **Homepage Cards:** Manually paste the static HTML for the three research cards back into the `#research-cards` container in `index.html`.

---

## 7. Agent Directives for Future Enhancements

When tasked with modifying the site, adhere to these rules:
1. **Maintain the Aesthetic:** Do not introduce rounded, playful, or "soft" design elements. The site must remain sharp, technical, and authoritative.
2. **Preserve Semantic HTML:** Ensure all new markup uses proper semantic tags (`<article>`, `<aside>`, `<figure>`, `<blockquote>`).
3. **Accessibility:** Ensure sufficient colour contrast and maintain ARIA labels where appropriate.
4. **No Build Tools:** This project is maintained as raw HTML/CSS/JS. Do not introduce Webpack, Vite, Sass, or Tailwind unless explicitly instructed by the user.
