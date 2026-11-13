// Checks for the portfolio, run against a local server. See tests/README.md.
//
//   node test.js [base-url]            default: http://127.0.0.1:8765
//
// Optional environment variables:
//   HEATHER_DIR  path to a local checkout of the heather repository; enables the
//                checks that compare this site with it (linked files, report)
//   CHROME_EXE   path to a Chromium executable, instead of the one Playwright installs
//   SHOTS_DIR    where screenshots are written (default: tests/shots)
const { chromium } = require("playwright");
const fs = require("fs");
const http = require("http");
const path = require("path");

const REPO = path.join(__dirname, "..");
const BASE = (process.argv[2] || "http://127.0.0.1:8765").replace(/\/$/, "");
const SHOTS = process.env.SHOTS_DIR || path.join(__dirname, "shots");
const HEATHER = process.env.HEATHER_DIR || "";
const EXE = process.env.CHROME_EXE || undefined;
const I18N_FILE = path.join(REPO, "js", "i18n.js");
const PAGES = { index: "/", heather: "/projects/heather/" };
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } };

let failures = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  — " + detail : ""}`);
};

function watch(page, bag) {
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") bag.push(`console.${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => bag.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => bag.push(`requestfailed: ${r.url()} ${r.failure() && r.failure().errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) bag.push(`http ${r.status()}: ${r.url()}`); });
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    document.querySelectorAll("details").forEach((d) => { d.open = false; });
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
    await Promise.all(Array.from(document.images).map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE });
  console.log("browser:", browser.version());

  // ---------- 1. Screenshots + console + layout ----------
  console.log("\n== 1. Screenshots, console, layout ==");
  const combos = [];
  for (const p of Object.keys(PAGES)) for (const v of Object.keys(VIEWPORTS)) {
    combos.push([p, v, "fr", "light"], [p, v, "en", "light"], [p, v, "fr", "dark"]);
  }
  for (const [p, v, lang, theme] of combos) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[v], reducedMotion: "reduce" });
    await ctx.addInitScript(([l, t]) => { localStorage.setItem("lang", l); localStorage.setItem("theme", t); }, [lang, theme]);
    const page = await ctx.newPage();
    const bag = []; watch(page, bag);
    await page.goto(BASE + PAGES[p], { waitUntil: "load" });
    await scrollThrough(page);
    const info = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      theme: document.documentElement.dataset.theme,
      bg: getComputedStyle(document.body).backgroundColor,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      broken: Array.from(document.images).filter((i) => !i.naturalWidth).map((i) => i.src),
      noAlt: Array.from(document.images).filter((i) => !i.alt.trim()).length,
      empty: Array.from(document.querySelectorAll("[data-i18n]")).filter((e) => !e.textContent.trim()).length,
      figBg: Array.from(document.querySelectorAll(".figure-card")).map((e) => getComputedStyle(e).backgroundColor),
      imgFilter: Array.from(document.images).map((i) => getComputedStyle(i).filter).filter((f) => f !== "none").length,
    }));
    const name = `${p}-${v}-${lang}-${theme}.png`;
    await page.screenshot({ path: path.join(SHOTS, name), fullPage: true });
    const expectedBg = theme === "dark" ? "rgb(18, 16, 20)" : "rgb(255, 255, 255)";
    const figOk = info.figBg.every((c) => c === "rgb(255, 255, 255)") && info.imgFilter === 0;
    check(bag.length === 0 && info.lang === lang && info.theme === theme && info.bg === expectedBg && info.overflow <= 0 &&
      info.broken.length === 0 && info.noAlt === 0 && info.empty === 0 && figOk, name,
      `console=${bag.length} lang=${info.lang} theme=${info.theme} bg=${info.bg} h-overflow=${info.overflow}px brokenImg=${info.broken.length} imgNoAlt=${info.noAlt} emptyI18n=${info.empty} figureCards=${info.figBg.length} white/unfiltered=${figOk}`);
    bag.forEach((b) => console.log("      " + b));
    await ctx.close();
  }

  // ---------- 2. Internal links ----------
  console.log("\n== 2. Links ==");
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const external = new Set();
  const ids = {};
  const idsOf = async (url) => {
    if (!ids[url]) { const pg = await ctx.newPage(); await pg.goto(url); ids[url] = await pg.evaluate(() => Array.from(document.querySelectorAll("[id]")).map((e) => e.id)); await pg.close(); }
    return ids[url];
  };
  for (const lang of ["en", "fr"]) for (const p of Object.keys(PAGES)) {
    await page.goto(BASE + PAGES[p]);
    await page.evaluate((l) => { localStorage.setItem("lang", l); }, lang);
    await page.reload();
    const refs = await page.evaluate(() => Array.from(document.querySelectorAll("a[href], img[src], link[href], script[src]")).map((e) => e.href || e.src));
    let ok = 0; const bad = [];
    for (const ref of [...new Set(refs)]) {
      const u = new URL(ref);
      if (u.origin !== new URL(BASE).origin) { external.add(ref); continue; }
      const res = await ctx.request.get(u.origin + u.pathname);
      let good = res.status() === 200;
      if (good && u.hash) good = (await idsOf(u.origin + u.pathname)).includes(u.hash.slice(1));
      good ? ok++ : bad.push(`${ref} -> ${res.status()}${u.hash ? " (anchor checked)" : ""}`);
    }
    check(bad.length === 0, `internal links ${p} [${lang}]`, `${ok} ok, ${bad.length} broken ${bad.join("; ")}`);
  }
  const og = await page.evaluate(() => Array.from(document.querySelectorAll('meta[property^="og:"], meta[name="description"]')).map((m) => (m.getAttribute("property") || m.name) + "=" + m.content.slice(0, 50)));
  console.log("      meta (heather, fr):", og.join(" | "));
  // External links that point into the heather repo: check the file exists in the local checkout (in sync with origin/main).
  const repoPrefix = "https://github.com/nirinaHelena/heather/blob/main/";
  const repoFiles = [...external].filter((e) => e.startsWith(repoPrefix)).map((e) => e.slice(repoPrefix.length));
  if (HEATHER) {
    const missing = repoFiles.filter((f) => !fs.existsSync(path.join(HEATHER, f)));
    check(missing.length === 0, "heather repo file links exist in local checkout", `${repoFiles.length} files, missing: [${missing}]`);
  } else {
    console.log("SKIP  heather repo file links (set HEATHER_DIR to check them)");
  }
  console.log("      external links (listed, not requested):");
  [...external].sort().forEach((e) => console.log("        " + e));
  for (const f of ["/assets/cv/CV_FR.pdf", "/assets/cv/CV_EN.pdf", "/assets/img/favicon.svg"]) {
    const r = await ctx.request.get(BASE + f); check(r.status() === 200, `GET ${f}`, `status=${r.status()} type=${r.headers()["content-type"]}`);
  }
  await ctx.close();

  // ---------- 3. Language ----------
  console.log("\n== 3. Language ==");
  {
    const c = await browser.newContext({ locale: "en-US" });
    const pg = await c.newPage(); const bag = []; watch(pg, bag);
    await pg.goto(BASE + "/");
    const l0 = await pg.evaluate(() => [document.documentElement.lang, document.querySelector('[data-i18n="nav.about"]').textContent, localStorage.getItem("lang")]);
    check(l0[0] === "en" && l0[1] === "About" && l0[2] === null, "default follows browser (en-US)", JSON.stringify(l0));
    await pg.click("#lang-toggle");
    const l1 = await pg.evaluate(() => [document.documentElement.lang, document.querySelector('[data-i18n="nav.about"]').textContent, localStorage.getItem("lang"), document.title, document.querySelector("#lang-toggle").getAttribute("aria-label")]);
    check(l1[0] === "fr" && l1[1] === "À propos" && l1[2] === "fr", "click FR/EN -> French", JSON.stringify(l1));
    await pg.reload();
    const l2 = await pg.evaluate(() => [document.documentElement.lang, document.querySelector('[data-i18n="nav.about"]').textContent]);
    check(l2[0] === "fr" && l2[1] === "À propos", "language survives reload", JSON.stringify(l2));
    await pg.goto(BASE + "/projects/heather/");
    const l3 = await pg.evaluate(() => [document.documentElement.lang, document.querySelector("h1").textContent, document.title]);
    check(l3[0] === "fr" && l3[1].includes("Analyse climatique"), "language carries over to heather page", JSON.stringify(l3));
    await pg.click("#lang-toggle"); await pg.reload();
    const l4 = await pg.evaluate(() => [document.documentElement.lang, document.querySelector("h1").textContent]);
    check(l4[0] === "en" && l4[1].includes("Climate Analysis"), "switch back to English survives reload", JSON.stringify(l4));
    check(bag.length === 0, "no console message during language test", bag.join("; "));
    await c.close();

    const cf = await browser.newContext({ locale: "fr-FR" });
    const pf = await cf.newPage(); await pf.goto(BASE + "/");
    const lf = await pf.evaluate(() => document.documentElement.lang);
    check(lf === "fr", "default follows browser (fr-FR)", lf);
    await cf.close();
  }

  // ---------- 4. Theme ----------
  console.log("\n== 4. Theme ==");
  {
    const c = await browser.newContext({ colorScheme: "light", locale: "fr-FR" });
    const pg = await c.newPage(); const bag = []; watch(pg, bag);
    await pg.goto(BASE + "/");
    const st = () => pg.evaluate(() => { const b = document.querySelector("#theme-toggle"); return [document.documentElement.dataset.theme, b.getAttribute("aria-pressed"), b.getAttribute("aria-label"), localStorage.getItem("theme"), getComputedStyle(document.body).backgroundColor]; });
    const t0 = await st();
    check(t0[0] === "light" && t0[1] === "false" && t0[2] === "Passer au thème sombre" && t0[3] === null, "default follows system (light)", JSON.stringify(t0));
    await pg.click("#theme-toggle");
    const t1 = await st();
    check(t1[0] === "dark" && t1[1] === "true" && t1[2] === "Passer au thème clair" && t1[3] === "dark" && t1[4] === "rgb(18, 16, 20)", "click -> dark, aria-pressed and label updated", JSON.stringify(t1));
    await pg.reload();
    const t2 = await st();
    check(t2[0] === "dark" && t2[1] === "true", "theme survives reload", JSON.stringify(t2));
    await pg.goto(BASE + "/projects/heather/");
    const t3 = await st();
    check(t3[0] === "dark", "theme carries over to heather page", JSON.stringify(t3));
    await pg.click("#lang-toggle");
    const t4 = await st();
    check(t4[2] === "Switch to light theme", "theme aria-label follows the language", JSON.stringify(t4));
    check(bag.length === 0, "no console message during theme test", bag.join("; "));
    await c.close();

    const cd = await browser.newContext({ colorScheme: "dark" });
    const pd = await cd.newPage();
    // Theme must be set by the inline <head> script, before i18n.js and before first paint.
    await pd.route("**/js/i18n.js", (r) => r.abort());
    await pd.goto(BASE + "/").catch(() => {});
    const d0 = await pd.evaluate(() => [document.documentElement.dataset.theme, getComputedStyle(document.body).backgroundColor]);
    check(d0[0] === "dark" && d0[1] === "rgb(18, 16, 20)", "system dark -> dark, set by inline head script alone (i18n.js blocked)", JSON.stringify(d0));
    await cd.close();
  }

  // ---------- 5. Without JavaScript, focus, report ----------
  console.log("\n== 5. No JavaScript, focus ring, report ==");
  {
    const c = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
    for (const p of Object.keys(PAGES)) {
      const res = await c.request.get(BASE + PAGES[p]);
      const html = await res.text();
      const emptyTags = (html.match(/data-i18n="[^"]+"[^>]*><\//g) || []).length;
      const pg = await c.newPage(); await pg.goto(BASE + PAGES[p]);
      const vis = await pg.locator("#controls").isVisible();
      const h = await pg.locator("h2").first().textContent();
      const bg = await pg.locator("body").evaluate((b) => getComputedStyle(b).backgroundColor).catch(() => "n/a (js off)");
      check(emptyTags === 0 && !vis && h.trim().length > 0, `no-JS ${p}: English text present, switches hidden`, `emptyTags=${emptyTags} controlsVisible=${vis} firstH2="${h.trim()}" bg(system dark)=${bg}`);
      await pg.close();
    }
    await c.close();

    const cf = await browser.newContext({ viewport: VIEWPORTS.desktop });
    const pg = await cf.newPage(); await pg.goto(BASE + "/");
    await pg.keyboard.press("Tab");
    const f1 = await pg.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return [e.className, s.outlineStyle, s.outlineWidth, e.getBoundingClientRect().top >= 0]; });
    check(f1[0] === "skip-link" && f1[1] === "solid" && f1[3], "first Tab shows the skip link with a focus outline", JSON.stringify(f1));
    await pg.keyboard.press("Tab"); await pg.keyboard.press("Tab");
    const f2 = await pg.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return [e.id, s.outlineStyle, s.outlineWidth, s.outlineColor]; });
    check(f2[1] === "solid" && f2[2] === "3px", "keyboard focus ring on controls", JSON.stringify(f2));
    await cf.close();

  }

  // ---------- 6. report.html (copy without the two CDN scripts) vs the original ----------
  console.log("\n== 6. report.html ==");
  {
    const snapshot = async (url, shot) => {
      const c = await browser.newContext({ colorScheme: "dark", viewport: VIEWPORTS.desktop });
      const pg = await c.newPage(); const bag = []; const ext = [];
      watch(pg, bag);
      pg.on("request", (r) => { if (/^https?:/.test(r.url()) && !["127.0.0.1", "localhost"].includes(new URL(r.url()).hostname)) ext.push(r.url()); });
      await pg.goto(url, { waitUntil: "networkidle" });
      await pg.waitForTimeout(1500); // lets MathJax typeset in the original
      const d = await pg.evaluate(() => ({
        title: document.title,
        bg: getComputedStyle(document.body).backgroundColor,
        text: document.body.innerText.replace(/\s+/g, " ").trim(),
        tables: document.querySelectorAll("table").length,
        rows: document.querySelectorAll("tr").length,
        headings: document.querySelectorAll("h1,h2,h3").length,
        cells: document.querySelectorAll(".jp-Cell").length,
        images: document.images.length,
        imagesLoaded: Array.from(document.images).filter((i) => i.complete && i.naturalWidth > 0).length,
        mathjax: document.querySelectorAll(".MathJax, .MathJax_Preview, .MathJax_Display, .mjx-chtml").length,
        height: document.documentElement.scrollHeight,
        scripts: Array.from(document.scripts).map((s) => s.src).filter(Boolean),
      }));
      if (shot) await pg.screenshot({ path: path.join(SHOTS, shot), fullPage: true });
      await c.close();
      return { d, bag, ext };
    };
    const copy = await snapshot(BASE + "/projects/heather/report.html", "report-desktop-full.png");
    check(copy.d.title === "Madagascar climate risks 1981–2025 — full report", "report: new <title>", copy.d.title);
    check(copy.ext.length === 0 && copy.d.scripts.length === 0, "report: no external request, no external script", `${copy.ext.length} requests`);
    check(copy.bag.length === 0, "report: zero console/network message", `${copy.bag.length}`);
    check(copy.d.imagesLoaded === copy.d.images && copy.d.images >= 6 && copy.d.tables > 0 && copy.d.text.length > 1000, "report: text, tables and charts render", `textChars=${copy.d.text.length} tables=${copy.d.tables} images=${copy.d.imagesLoaded}/${copy.d.images}`);
    check(copy.d.bg === "rgb(255, 255, 255)", "report stays light even with system dark", copy.d.bg);
    copy.bag.forEach((b) => console.log("        copy: " + b));

    // Comparison with the original report: needs the heather checkout, and lets the
    // original load its scripts from cdnjs.
    const origFile = HEATHER && path.join(HEATHER, "reports", "madagascar_climate_report.html");
    if (!origFile || !fs.existsSync(origFile)) {
      console.log("SKIP  comparison with the original report (set HEATHER_DIR to run it)");
    } else {
    const server = http.createServer((req, res) => { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); fs.createReadStream(origFile).pipe(res); });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const orig = await snapshot(`http://127.0.0.1:${server.address().port}/`, null);
    server.close();
    const brief = (x) => `title="${x.d.title}" bg=${x.d.bg} textChars=${x.d.text.length} tables=${x.d.tables} rows=${x.d.rows} headings=${x.d.headings} cells=${x.d.cells} images=${x.d.imagesLoaded}/${x.d.images} mathjaxNodes=${x.d.mathjax} height=${x.d.height}px externalScripts=${x.d.scripts.length} externalRequests=${x.ext.length} console=${x.bag.length}`;
    console.log("      original: " + brief(orig));
    console.log("      copy:     " + brief(copy));
    check(copy.d.text === orig.d.text, "report: rendered text identical to the original (which ran MathJax)", `${copy.d.text.length} vs ${orig.d.text.length} chars`);
    check(copy.d.tables === orig.d.tables && copy.d.rows === orig.d.rows && copy.d.headings === orig.d.headings && copy.d.cells === orig.d.cells, "report: same tables, rows, headings, cells", `tables=${copy.d.tables} rows=${copy.d.rows} headings=${copy.d.headings} cells=${copy.d.cells}`);
    check(copy.d.images === orig.d.images && copy.d.imagesLoaded === copy.d.images && copy.d.images >= 6, "report: all charts load", `${copy.d.imagesLoaded}/${copy.d.images} images`);
    check(copy.d.height === orig.d.height, "report: same page height as the original", `${copy.d.height}px vs ${orig.d.height}px`);
    check(orig.d.mathjax === 0, "original report had nothing typeset by MathJax", `${orig.d.mathjax} MathJax nodes`);
    }
  }

  // ---------- 7. English text in the HTML files == I18N.en ----------
  console.log("\n== 7. HTML English text vs i18n.en ==");
  {
    const vm = require("vm");
    const sandbox = {};
    vm.runInNewContext(fs.readFileSync(I18N_FILE, "utf8"), sandbox);
    const en = sandbox.I18N.en, fr = sandbox.I18N.fr;
    const enKeys = Object.keys(en), frKeys = Object.keys(fr);
    const onlyEn = enKeys.filter((k) => !(k in fr)), onlyFr = frKeys.filter((k) => !(k in en));
    check(onlyEn.length === 0 && onlyFr.length === 0, "en and fr have the same keys", `en=${enKeys.length} fr=${frKeys.length} onlyEn=[${onlyEn}] onlyFr=[${onlyFr}]`);
    const emptyVals = [...enKeys.filter((k) => !String(en[k]).trim()), ...frKeys.filter((k) => !String(fr[k]).trim())];
    check(emptyVals.length === 0, "no empty translation", `[${emptyVals}]`);
    const todoMismatch = enKeys.filter((k) => /TODO:/.test(en[k]) !== /TODO:/.test(fr[k]));
    check(todoMismatch.length === 0, "TODO: placeholders are the same keys in en and fr", `${enKeys.filter((k) => /TODO:/.test(en[k])).length} placeholder keys, mismatches=[${todoMismatch}]`);

    const used = new Set(["theme.to_light", "theme.to_dark"]);
    const c = await browser.newContext({ javaScriptEnabled: true });
    for (const p of Object.keys(PAGES)) {
      const pg = await c.newPage();
      await pg.route("**/js/i18n.js", (r) => r.abort()); // keep the DOM exactly as written in the HTML file
      await pg.goto(BASE + PAGES[p]).catch(() => {});
      const res = await pg.evaluate((dict) => {
        const out = { compared: 0, diffs: [], keys: [] };
        const norm = (s) => s.replace(/\s+/g, " ").trim();
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const key = el.getAttribute("data-i18n"); out.keys.push(key); out.compared++;
          if (!(key in dict)) { out.diffs.push(`${key}: key missing in i18n.en`); return; }
          let expected, actual;
          if (el.tagName === "TITLE") { expected = dict[key]; actual = el.textContent; }
          else { const probe = document.createElement(el.tagName); probe.innerHTML = dict[key]; expected = probe.innerHTML; actual = el.innerHTML; }
          if (norm(expected) !== norm(actual)) out.diffs.push(`${key}: HTML="${norm(actual).slice(0, 70)}" i18n.en="${norm(expected).slice(0, 70)}"`);
        });
        ["alt", "aria-label", "content"].forEach((attr) => {
          document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
            const key = el.getAttribute(`data-i18n-${attr}`); out.keys.push(key); out.compared++;
            if (!(key in dict)) { out.diffs.push(`${key}: key missing in i18n.en`); return; }
            if (el.getAttribute(attr) !== dict[key]) out.diffs.push(`${key} [${attr}]: HTML="${el.getAttribute(attr)}" i18n.en="${dict[key]}"`);
          });
        });
        const tb = document.querySelector("#theme-toggle");
        out.compared++;
        if (tb.getAttribute("aria-label") !== dict["theme.to_dark"]) out.diffs.push(`theme.to_dark [aria-label]: HTML="${tb.getAttribute("aria-label")}"`);
        return out;
      }, en);
      res.keys.forEach((k) => used.add(k));
      check(res.diffs.length === 0, `${p}: HTML English text matches i18n.en`, `${res.compared} texts compared, ${res.diffs.length} differences`);
      res.diffs.forEach((d) => console.log("        DIFF " + d));
      await pg.close();
    }
    await c.close();
    const unused = enKeys.filter((k) => !used.has(k));
    check(unused.length === 0, "every i18n key is used in a page", `unused=[${unused}]`);
  }

  await browser.close();
  console.log(`\nRESULT: ${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error("TEST SCRIPT ERROR", e); process.exit(2); });
