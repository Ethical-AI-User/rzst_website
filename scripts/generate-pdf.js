/**
 * RZST Flagship PDF Generator
 * ============================
 * Generates rzst-flagship-full.pdf by combining:
 *   1. flagship-proposal.html
 *   2. technical-vault.html
 *
 * Uses Puppeteer (headless Chromium) to ensure:
 *   - Full CSS rendering (dark sections, gradients, print overrides)
 *   - MathJax equations fully rendered before capture
 *   - Selectable text (not image-based)
 *
 * Usage:
 *   cd scripts && node generate-pdf.js
 *
 * Output:
 *   ../rzst-flagship-full.pdf
 */

const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

// ── Configuration ──────────────────────────────────────────────────────────────
const BASE_URL = 'https://www.rzst.org';
const FLAGSHIP_URL = `${BASE_URL}/flagship-proposal.html`;
const VAULT_URL    = `${BASE_URL}/technical-vault.html`;
const OUTPUT_PATH  = path.resolve(__dirname, '..', 'rzst-flagship-full.pdf');

const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Capture a single page as a PDF buffer.
 * Waits for network idle AND (if MathJax is present) for mjx-container elements.
 */
async function capturePage(browser, url, waitForMath = false) {
  console.log(`  → Opening: ${url}`);
  const page = await browser.newPage();

  // Emulate print media so @media print rules apply
  await page.emulateMediaType('print');

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  if (waitForMath) {
    console.log('  → Waiting for MathJax to render...');
    try {
      await page.waitForSelector('mjx-container', { timeout: 15000 });
      // Extra settle time for MathJax post-processing
      await new Promise(r => setTimeout(r, 2000));
      console.log('  → MathJax render confirmed.');
    } catch (e) {
      console.warn('  ⚠ MathJax selector not found — proceeding anyway.');
    }
  } else {
    // Small settle for fonts and animations
    await new Promise(r => setTimeout(r, 1500));
  }

  const buffer = await page.pdf(PDF_OPTIONS);
  await page.close();
  console.log(`  ✓ Captured: ${url}`);
  return buffer;
}

// ── Main ───────────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   RZST Flagship PDF Generator            ║');
  console.log('╚══════════════════════════════════════════╝\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let flagshipBuffer, vaultBuffer;

  try {
    console.log('Step 1: Capturing flagship-proposal.html...');
    flagshipBuffer = await capturePage(browser, FLAGSHIP_URL, false);

    console.log('\nStep 2: Capturing technical-vault.html (with MathJax wait)...');
    vaultBuffer = await capturePage(browser, VAULT_URL, true);
  } finally {
    await browser.close();
  }

  console.log('\nStep 3: Merging PDFs with pdf-lib...');
  const mergedPdf = await PDFDocument.create();

  const flagship = await PDFDocument.load(flagshipBuffer);
  const vault    = await PDFDocument.load(vaultBuffer);

  const flagshipPages = await mergedPdf.copyPages(flagship, flagship.getPageIndices());
  flagshipPages.forEach(p => mergedPdf.addPage(p));

  const vaultPages = await mergedPdf.copyPages(vault, vault.getPageIndices());
  vaultPages.forEach(p => mergedPdf.addPage(p));

  // Set document metadata
  mergedPdf.setTitle('RZST Flagship Proposal: Architecture & Synthesis');
  mergedPdf.setAuthor('RZST — Resistance Systems Translational');
  mergedPdf.setSubject('Open-Source Architectural Blueprint for Federated Causal AI in Translational Medicine');
  mergedPdf.setKeywords(['RZST', 'D-CLEF', 'FedECA', 'federated learning', 'causal inference', 'translational medicine']);
  mergedPdf.setCreationDate(new Date());

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(OUTPUT_PATH, mergedBytes);

  const sizeKB = Math.round(mergedBytes.length / 1024);
  const totalPages = flagship.getPageCount() + vault.getPageCount();

  console.log(`\n✅ PDF generated successfully!`);
  console.log(`   Output: ${OUTPUT_PATH}`);
  console.log(`   Pages:  ${totalPages} (${flagship.getPageCount()} flagship + ${vault.getPageCount()} vault)`);
  console.log(`   Size:   ${sizeKB} KB\n`);
})();
