# Tests

Browser checks for the portfolio, run with [Playwright](https://playwright.dev/) against a local server.
They are not part of the site: nothing here is loaded by the pages.

## Install (once)

Requires Node.js and Python 3.

```bash
cd tests
npm install
npx playwright install chromium
```

## Run

In a first terminal, serve the site from the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

In a second terminal:

```bash
cd tests
npm test
```

The last line is `RESULT: ALL PASS`, or the number of failures (exit code 1). Screenshots are written to `tests/shots/` (ignored by git).

To also compare the site with a local checkout of the heather repository (linked files exist, `report.html` renders like the original):

```bash
HEATHER_DIR=~/Documents/heather/heather npm test
```

This comparison loads the original report once, which fetches its scripts from cdnjs.

## What is checked

1. Both pages in French and English, light and dark, at 1280 px and 390 px: no console message, no broken image, alt text everywhere, no horizontal scroll; no visible `TODO` (text, alt texts, labels, meta contents); on the home page, the photo is there (its file exists, its alt text is written), the placeholders are out of the page (BirdIA tags, LinkedIn line, CV links), the meta description is written, the Heather and e-mail links are right, and the cards of a same row have the same height.
2. Every internal link and anchor, on the two pages and the report: each local `href` and `src` answers and is a file of the repository. While the site is under construction: the three pages have `<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows everything.
3. Language: browser default, switch, kept after reload and across pages.
4. Theme: system default, switch, `aria-pressed` and label, kept after reload.
5. Pages readable without JavaScript; visible keyboard focus.
6. `projects/heather/report.html`: renders fully, no external request.
7. The English text in the HTML files is identical to `en` in `js/i18n.js`, and `en` and `fr` have the same keys.
8. Review fixes: no Python warning or local path in the report, drought wording in French and English, no horizontal page scroll at 375 px, figures link to their PNG, home page with the photo (two columns on desktop, photo above the name on small screens, text aligned with the header), a single line under the header.

## When check 7 fails

The English text exists twice: in the HTML (for visitors without JavaScript) and in `js/i18n.js`.
Edit the text in `js/i18n.js`, then copy it into the HTML files:

```bash
cd tests
npm run sync-html
```
