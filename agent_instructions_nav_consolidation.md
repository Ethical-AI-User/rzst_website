# Agent Instruction Set: RZST Navigation & Content Consolidation

**Target Goal:** Streamline the RZST website navigation by reducing the menu bar to only two options: an "About" link and a "Flagship Proposal" CTA button. To achieve this without losing content, the existing `methods.html` and `founder.html` pages must be fully synthesized and compiled into the new `about.html` page.

**Context:** The RZST website is a static HTML/CSS architecture without a build tool or templating engine. All navigation blocks are hardcoded across multiple files. The CSS relies on semantic classes and a global `style.css` file.

Please execute the following phases sequentially.

---

## Phase 1: Content Extraction & Compilation

Your first objective is to merge the content of three pages into one cohesive `about.html` page.

1. **Analyze Source Files:**
   - Read `about.html` to understand its current structure (it contains a `.page-header`, `.solution`, `.ecosystem`, and `.cta` sections).
   - Read `founder.html` and extract its core content sections (e.g., `.editorial-section`, `.founder-cta`).
   - Read `methods.html` and extract its core content sections (e.g., `.methods-body`, `.methods-cta`).

2. **Compile into `about.html`:**
   - Append the extracted sections from `founder.html` and `methods.html` into the `<main id="main-content">` block of `about.html`.
   - **Important:** Do not copy the `<header>`, `<nav>`, or `<footer>` blocks from the source files. Only extract the `<section>` blocks within the `<main>` tags.
   - Add HTML `id` attributes to the newly inserted sections so they can be deep-linked (e.g., `<section id="founder" ...>` and `<section id="methods" ...>`).
   - Ensure all existing CSS classes, grids, and semantic HTML tags are preserved exactly as they were in the original files to maintain visual integrity.

---

## Phase 2: Sitewide Navigation Streamlining

With the content consolidated, you must now update the hardcoded navigation menu across the entire site.

1. **Define the New Nav Block:**
   The new `<nav>` block must be stripped down to exactly these two items:
   ```html
   <nav role="navigation" aria-label="Primary navigation">
       <ul>
           <li><a href="about.html">About</a></li>
           <li><a href="flagship-proposal.html" class="btn-nav" aria-label="View the RZST flagship proposal">Flagship Proposal</a></li>
       </ul>
   </nav>
   ```

2. **Apply Sitewide:**
   - You must manually replace the existing `<nav>` block in **all remaining HTML files**:
     - `index.html`
     - `about.html`
     - `flagship-proposal.html`
     - `privacy-policy.html`
     - `regulatory-synthetic-arms.html`
   - **Active State Management:** When pasting the nav block into `about.html`, you must add `class="active"` to the About link. When pasting into `flagship-proposal.html`, the active state is not needed on the text link since it is now a button, but ensure the button styling remains intact.

---

## Phase 3: Link Routing & Cleanup

You must ensure no broken links remain and that the repository is clean.

1. **Update Internal Links:**
   - Scan all HTML files and `data/research.json` for any `href` attributes pointing to `methods.html` or `founder.html`.
   - Update these links to point to the new anchor tags in the consolidated page (e.g., change `href="founder.html"` to `href="about.html#founder"`).

2. **Delete Obsolete Files:**
   - Safely delete `methods.html` and `founder.html` from the repository using the shell.

3. **Update Documentation:**
   - Open `AGENT_README.md`.
   - Update the "File Structure" section to remove the deleted files.
   - Update the "How to Edit the Sitewide Navigation Bar" section to reflect the new two-item menu structure.

---

## Phase 4: Verification & Commit

1. **Final Audit:**
   - Verify that `about.html` renders correctly and contains all merged content.
   - Verify that the navigation menu only shows "About" and the "Flagship Proposal" button across all remaining pages.
   - Ensure no `style="..."` attributes or `!important` declarations were accidentally introduced during the merge.

2. **Git Commit:**
   - Stage all changes, including the deleted files.
   - Create a descriptive Git commit (e.g., `feat: consolidate methods and founder into about; streamline nav`).
   - Push the changes to the remote repository.
