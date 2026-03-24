/* ==========================================================================
   RZST Website -- Main Script
   --------------------------------------------------------------------------
   Phase 4 improvements (2026-03):
     - Event delegation: single listener on document replaces per-element
       listeners for smooth-scroll anchor clicks.
     - No var: all declarations use const or let.
   Phase 5 improvements (2026-03):
     - fetch() loads data/research.json and renders research cards
       dynamically into #research-cards on index.html.
     - Loading indicator and graceful error fallback included.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------------------------
       Phase 4 -- Smooth Scroll via Event Delegation
       -----------------------------------------------------------------------
       A single click listener on the document handles all anchor links
       (href="#..."). This replaces the previous per-element forEach loop,
       reducing memory usage and automatically covering dynamically-added
       links (e.g., research cards rendered by Phase 5 fetch).
    ----------------------------------------------------------------------- */
    document.addEventListener('click', (e) => {
        // Walk up the DOM from the click target to find an <a> element
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        // Dynamically measure the sticky header height at click time so the
        // offset is always correct regardless of viewport size or whether the
        // header has stacked to a taller mobile layout.
        const header = document.querySelector('header');
        const headerOffset = header ? header.getBoundingClientRect().height : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });

    /* -----------------------------------------------------------------------
       Phase 5 -- Dynamic Research Cards
       -----------------------------------------------------------------------
       Fetches data/research.json and renders card HTML into #research-cards.
       Graceful degradation: if the container or fetch fails, nothing breaks.
       The JSON schema for each entry:
         {
           "title":       "Card heading",
           "description": "Short subtitle / description",
           "link":        "URL or relative path",
           "linkText":    "Link label (e.g. 'Read the Abstract (PDF) ->')",
           "external":    true | false   (adds target="_blank" rel="noopener")
         }
    ----------------------------------------------------------------------- */
    const researchContainer = document.getElementById('research-cards');
    if (!researchContainer) return; // Only runs on pages that have the container

    fetch('data/research.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then((entries) => {
            // Clear the loading indicator
            researchContainer.innerHTML = '';
            researchContainer.setAttribute('aria-busy', 'false');

            if (!Array.isArray(entries) || entries.length === 0) {
                researchContainer.innerHTML =
                    '<p class="research-error">No research entries found.</p>';
                return;
            }

            // Build and inject card HTML for each entry
            const fragment = document.createDocumentFragment();
            entries.forEach((entry) => {
                const card = document.createElement('div');
                card.className = 'card card-linked';

                const externalAttrs = entry.external
                    ? 'target="_blank" rel="noopener"'
                    : '';

                card.innerHTML =
                    '<h3>' + escapeHtml(entry.title) + '</h3>' +
                    '<p>' + escapeHtml(entry.description) + '</p>' +
                    '<a href="' + escapeHtml(entry.link) + '" class="card-link" ' + externalAttrs + '>' +
                        escapeHtml(entry.linkText) +
                    '</a>';

                fragment.appendChild(card);
            });
            researchContainer.appendChild(fragment);
        })
        .catch((err) => {
            // Graceful error: show a message but do not break the page
            console.warn('RZST: Could not load research.json --', err.message);
            researchContainer.setAttribute('aria-busy', 'false');
            researchContainer.innerHTML =
                '<p class="research-error">Research entries could not be loaded. ' +
                'Please check back later.</p>';
        });
});

/* ---------------------------------------------------------------------------
   Utility: escapeHtml
   ---------------------------------------------------------------------------
   Prevents XSS when injecting JSON string values into innerHTML.
   Only used for data sourced from research.json.
--------------------------------------------------------------------------- */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
