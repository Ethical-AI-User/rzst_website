document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    // Root Cause fix: use the actual rendered header height instead of a
    // hard-coded 80px offset. On mobile the header stacks to two rows
    // (logo + nav), making it taller than 80px — the old value caused
    // anchor targets to scroll behind the sticky header on small screens.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Dynamically measure the sticky header height at click time
                // so the offset is always correct regardless of viewport size
                // or whether the header has stacked to a taller mobile layout.
                const header = document.querySelector('header');
                const headerOffset = header ? header.getBoundingClientRect().height : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
