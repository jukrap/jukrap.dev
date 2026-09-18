# Web document PDFs

The six files in `public/documents/` are snapshots of the public desktop web
documents, not the older separately typeset PDF files. Each web document page
becomes one PDF page with its natural height. Text and links remain selectable.

After changing document content, CSS, fonts, or images:

1. Build the site and run the production server locally. Private contact mode
   must not be enabled.
2. Set `PDF_RENDERER` to an installed Chromium executable. Optionally set
   `DOCUMENT_ORIGIN` (defaults to `http://127.0.0.1:3100`). Run
   `node scripts/generate-document-pdfs.mjs`.
3. Inspect all six PDFs before publishing. Check text extraction against the
   web document, embedded fonts, links, public contacts, page count, and visual
   clipping. Restart the preview server after adding new public assets.
4. Commit the verified PDFs with their related document changes.

The exporter obtains the server-rendered public HTML and its styles/assets,
embeds assets locally, removes the alternate print stylesheet, and measures
the desktop layout at 1440px. It freezes the resolved layout before performing
offline PDF conversion. It uses an isolated renderer profile under ignored
`output/pdf/web-documents/`, never a personal browser profile. The final files
have no dependency on the viewer's browser, OS print settings, or local server.

`output/pdf/web-documents/manifest.json` records file and source snapshot hashes.
Only the six verified PDF files belong in `public/documents/`; snapshots and
renderer profiles remain local. The website serves these PDFs as attachments
with `X-Robots-Tag: noindex, nofollow, noarchive`.
