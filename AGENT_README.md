# RZST Website — Agent Architecture Guide

This document provides context, architectural details, and specific instructions for AI agents tasked with analyzing, modifying, or enhancing the RZST website.

## 1. Project Background & Architecture

The RZST website (www.rzst.org) serves as the digital infrastructure and public-facing proposal for a domain-agnostic multi-agent orchestration engine. Its flagship use case focuses on translational medicine—specifically, replacing physical placebos in neurodegenerative trials with mathematically rigorous synthetic control arms using federated learning (D-CLEF) and causal inference (FedECA).

**Core Design Philosophy:**
The site is built as a static HTML/CSS architecture without heavy JavaScript frameworks. It relies on semantic HTML5 and a single global stylesheet (`css/style.css`). The design language is highly technical, utilizing a clean, modern aesthetic with stark contrasts, electric blue accents, and monospace typography for mathematical elements.

**File Structure:**
- `index.html` — Main landing page (Domain-Agnostic Multi-Agent Orchestration). Simplified hero with static image and conversion-optimized CTA.
- `flagship-proposal.html` — Deep dive into the D-CLEF architecture and proof-of-concept. Includes infographics, witty reader notes, and open-source academic CTAs.
- `technical-vault.html` — Contains Biostatistical Proofs, Sovereignty & GDPR, and Biological Loop Closure. Uses MathJax for LaTeX rendering.
- `regulatory-synthetic-arms.html` — Methodological whitepaper on FedECA and IPTW.
- `privacy-policy.html` — Standard privacy policy.
- `_about.html.hidden` — Consolidated page containing About RZST, Methods, and Founder's Note. **Currently hidden from public view and navigation.**
- `css/style.css` — The single global stylesheet controlling all visual design, including comprehensive `@media print` rules.
- `js/script.js` — Minimal JavaScript (smooth scrolling, dynamic data fetching).
- `data/research.json` — Dynamic data source for research/initiative cards.
- `images/` — Contains brand assets (`rzst-cruciform.png`, `rzst-wordmark.jpg`) and infographics (`flagship-infographic-01.png`, `flagship-infographic-02.png`).
- `_checkpoints/` — Directory containing backup files created before major structural changes.

## 2. Recent Improvements (Phases 2–7)

The website has been modernized to improve performance, accessibility, printability, and maintainability without introducing a build tool.

**Phase 2: Performance Optimizations**
- Preconnect: Added `<link rel="preconnect">` for Google Fonts.
- Preload: Added `<link rel="preload">` for critical above-the-fold assets.
- Lazy Loading: Added `loading="lazy"` to below-the-fold images (removed from print-critical infographics).
- Defer Scripts: Added the `defer` attribute to all `<script>` tags.

**Phase 3: Accessibility Enhancements**
- Skip Link: Added a visually hidden "Skip to main content" link.
- Focus Styles: Implemented a global `:focus-visible` CSS rule.
- ARIA Labels: Added descriptive `aria-label` attributes to navigation links and CTA buttons.

**Phase 4: JavaScript & Animation Improvements**
- Event Delegation: Replaced per-element click listeners with a single event-delegated listener.
- Modern Syntax: Replaced legacy `var` declarations with `const` and `let`.
- Entrance Animations: Added `@keyframes` fade-in animations and `will-change: transform`.

**Phase 5: Dynamic Research Data**
- Data Separation: Extracted "Current Initiatives" into `data/research.json`.
- Dynamic Rendering: Refactored `script.js` to fetch and render JSON data.

**Phase 6: Print & PDF Optimizations**
- Print Stylesheets (`@media print`): Comprehensive print block in `css/style.css`.
- Diagnostic Fixes Applied:
  - `overflow: visible` on `.blueprint-intro` to prevent blank first pages.
  - Reset dark inner card backgrounds to transparent.
  - Added `page-break-after: avoid` to prevent orphaned headings.
  - Reset `-webkit-text-fill-color: transparent` on gradient text.
  - Used `initial` instead of `unset` for vendor-prefixed clip properties.

**Phase 7: Content Restructuring & Technical Vault**
- Homepage Simplification: Removed video, switched to static image, added conversion-optimized subtext, and enlarged the primary CTA button.
- Technical Vault: Created `technical-vault.html` with MathJax rendering for LaTeX formulas (e.g., FedAvg, IPTW) and injected the E-Value Bounding defense mechanism.
- Navigation Streamlining: Reduced sitewide nav to a single "Flagship Proposal" CTA button. The "About" page was hidden (`_about.html.hidden`).
- Content Injections: Added Sovereignty & Ethics section, witty reader notes, and replaced commercial CTAs with open-source academic invitations in `flagship-proposal.html`.

## 3. How to Add New Content

**How to Add a New Research Entry**
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
*(Set `"external": true` if the link points to an external site or PDF).*

**How to Add New Images**
1. Place the new image file in the `images/` directory.
2. Reference it in the HTML using `<img src="images/your-image.png" alt="Descriptive alt text">`.
3. If the image is below the fold and not critical for print, add `loading="lazy"`.

**How to Add or Reorder Modules (Sections)**
- To move a section, cut and paste the entire `<section>` block.
- To add a new section:
  1. Choose a background variant: `<section class="section-light">` or `<section class="section-dark">`.
  2. Wrap the content in `<div class="container">`.
  3. Use existing grid classes for layout (e.g., `<div class="vector-grid">`).

**How to Edit the Sitewide Navigation Bar**
Because this is a static site, the `<nav>` block is hardcoded into every HTML file.
The navigation currently consists of a single CTA button. The canonical nav block is:
```html
<nav role="navigation" aria-label="Primary navigation">
    <ul>
        <li><a href="flagship-proposal.html" class="btn-nav" aria-label="View the RZST flagship proposal">Flagship Proposal</a></li>
    </ul>
</nav>
```
- **To add, remove, or rename a link:** You must apply the exact same change to the `<nav>` block in all active HTML files.
- **Active State:** The current page should have `class="active"` on its corresponding `<a>` tag.

**How to Edit Mathematical Formulas (Technical Vault)**
- `technical-vault.html` uses MathJax 3 (loaded via CDN) to render LaTeX.
- Inline math is wrapped in `\\( ... \\)`.
- Block math is wrapped in `\\[ ... \\]`.
- Do not use `$` or `$$` delimiters, as they are not configured by default.

**How to Add Defense Mechanisms**
Use the following HTML structure for biostatistical defense mechanisms (e.g., E-Value Bounding):
```html
<div class="defense-mechanism" style="margin-top: 2.5rem; padding: 1.5rem; border-left: 4px solid #3b82f6; background-color: rgba(59, 130, 246, 0.05);">
    <h4 style="margin-top: 0; font-family: 'Space Grotesk', sans-serif; color: #1e293b;">Defense Title</h4>
    <p style="margin-bottom: 1rem;"><strong>Vulnerability Addressed:</strong> Description.</p>
    <p style="margin-bottom: 0;"><strong>Proposed Structural Defense:</strong> Description.</p>
</div>
```

**How to Regenerate the Flagship PDF**
If you make significant content changes to `flagship-proposal.html` or `technical-vault.html`, you must regenerate the static PDF.
1. Ensure you are in the sandbox environment.
2. Run the Puppeteer generation script:
```bash
cd scripts
npm install
node generate-pdf.js
```
3. The script will capture both pages from the live site, wait for MathJax to render, and output a combined `rzst-flagship-full.pdf` in the repository root.
4. Commit and push the updated PDF.

> **Important — Manual Cover Page:** The current `rzst-flagship-full.pdf` (as of April 2026) includes a professionally designed cover page that was manually injected using Adobe Acrobat after the Puppeteer script ran. The Puppeteer script alone does **not** reproduce this cover. If you regenerate the PDF via the script, the cover page will be missing. After running the script, the cover page must be re-injected manually (or a new cover must be prepended using `pdf-lib` or equivalent) before committing the updated file.

## 4. CSS Architecture & Modification

All styling lives in `css/style.css`. Specificity is managed through class chaining and CSS custom properties. Do not use `!important` or inline `style="..."` attributes. *(Note: `!important` is selectively permitted ONLY inside the `@media print` block).*

**Global Colour Changes**
Modify the variables in the `:root` block at the top of `css/style.css`:
```css
:root {
    --primary-color:    #1E293B;   /* Slate navy */
    --accent-color:     #0066FF;   /* Electric Blue */
    --accent-hover:     #38BDF8;   /* Sky Blue */
    --gradient-flow: linear-gradient(90deg, #0066FF 0%, #38BDF8 100%);
}
```

**Responsive Design**
All media queries use `min-width` (mobile-first). Base styles are written for mobile (≥320px), and layout expands at 560px, 768px, and 992px.

## 5. Local Development & Testing

To view the site, open `index.html` in any modern web browser.

**Important Note on Dynamic Data (Phase 5):**
Because the homepage uses `fetch()` to load `data/research.json`, opening `index.html` directly via the `file://` protocol may trigger a CORS error.
To test locally, serve the directory using a simple local web server:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

## 6. Rollback Instructions

If you need to revert recent changes, use Git to checkout a previous stable commit or restore from the `_checkpoints/` directory.

**Using Git (Recommended):**
- To revert to the Phase 1 state: `git checkout fe261c9`
- To revert to the state before the print CSS diagnostic fixes: `git checkout 8ee7908`

**Using Checkpoints:**
Check the `_checkpoints/` directory for backup files (e.g., `style.css.bak`, `flagship-proposal.html.bak`) created before major structural changes. Copy them back to their original locations to restore that state.

## 7. Agent Directives for Future Enhancements

When tasked with modifying the site, adhere to these rules:
- **Maintain the Aesthetic:** Do not introduce rounded, playful, or "soft" design elements. The site must remain sharp, technical, and authoritative.
- **Preserve Semantic HTML:** Ensure all new markup uses proper semantic tags.
- **Accessibility & Printability:** Ensure sufficient colour contrast, maintain ARIA labels, and test that new components print cleanly without breaking the `@media print` logic.
- **No Build Tools:** This project is maintained as raw HTML/CSS/JS. Do not introduce Webpack, Vite, Sass, or Tailwind unless explicitly instructed by the user.
- **Tone Compliance:** Ensure all content uses simulation-framing language ("we propose to deploy," "is engineered to") with zero active-deployment verbs for regulatory compliance.
