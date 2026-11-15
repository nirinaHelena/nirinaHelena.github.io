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
const REPORT = "/projects/heather/report.html";
// Text a visitor can read or hear: page text (collapsed blocks opened), title, alt texts, labels, meta contents.
const visibleText = () => {
  document.querySelectorAll("details").forEach((d) => { d.open = true; });
  const attrs = Array.from(document.querySelectorAll("[alt], [aria-label], [title], meta[content]")).map((e) => [e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("title"), e.getAttribute("content")].join(" "));
  return document.title + "\n" + document.body.innerText + "\n" + attrs.join("\n");
};
const todoIn = (text) => text.match(/.{0,30}TODO.{0,30}/g) || [];
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
    for (const lang of ["fr", "en"]) for (const theme of ["light", "dark"]) combos.push([p, v, lang, theme]);
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
    const todos = todoIn(await page.evaluate(visibleText));
    check(todos.length === 0, `${p} ${v} ${lang} ${theme}: no visible "TODO"`, `${todos.length} ${todos.join(" | ")}`);
    if (p === "index") {
      // Construction mode: the placeholders (BirdIA tags, LinkedIn line, CV links) are out of the page. The photo is there.
      const todo = await page.evaluate(() => {
        const out = { counts: {}, where: [], cards: document.querySelectorAll("#experience .card").length };
        out.photo = Array.from(document.querySelectorAll(".hero img, .hero-photo")).map((i) => ({ src: i.getAttribute("src"), alt: i.alt, natural: i.naturalWidth, width: Math.round(i.getBoundingClientRect().width) }));
        out.hidden = {
          birdiaTags: Array.from(document.querySelectorAll("#experience .card")).filter((c) => c.querySelector("h3").textContent === "BirdIA").map((c) => c.querySelectorAll(".tags").length).join(),
          contactItems: document.querySelectorAll("#contact .contact-list li").length,
          cv: document.querySelectorAll('a[href$=".pdf"]').length,
          linkedin: /linkedin/i.test(document.getElementById("contact").textContent),
        };
        ["home", "about", "experience", "projects", "skills", "education", "contact"].forEach((id) => {
          out.counts[id] = (document.getElementById(id).textContent.match(/TODO/g) || []).length;
        });
        document.querySelectorAll("main [data-i18n]").forEach((el) => {
          if (/TODO/.test(el.textContent)) out.where.push(el.getAttribute("data-i18n"));
        });
        out.meta = ['meta[name="description"]', 'meta[property="og:description"]'].map((q) => document.querySelector(q).getAttribute("content"));
        const href = (q) => { const a = document.querySelector(q); return a && a.getAttribute("href"); };
        out.heather = href('#about [data-i18n="about.p2"] a');
        out.heatherEdu = href('#education [data-i18n="edu.gda.desc"] a');
        const mail = document.querySelector('#contact a[href^="mailto:"]');
        out.mail = mail && [mail.getAttribute("href"), mail.textContent];
        // Cards of a same row have the same height.
        out.rows = ["#experience", "#skills", "#education"].map((q) => {
          const rows = {};
          document.querySelectorAll(q + " .card").forEach((c) => { const r = c.getBoundingClientRect(); (rows[Math.round(r.top)] = rows[Math.round(r.top)] || []).push(Math.round(r.height)); });
          const list = Object.values(rows);
          return { sel: q, cols: Math.max(...list.map((r) => r.length)), cards: list.reduce((n, r) => n + r.length, 0), even: list.every((r) => r.every((h) => h === r[0])) };
        });
        return out;
      });
      const c = todo.counts;
      const total = Object.values(c).reduce((a, b) => a + b, 0);
      check(total === 0 && todo.where.length === 0 && todo.cards === 4, `index ${v} ${lang} ${theme}: no "TODO" in any section, 4 experience cards`, `total=${total} at [${todo.where}] cards=${todo.cards}`);
      const hd = todo.hidden;
      check(hd.birdiaTags === "0" && hd.contactItems === 2 && hd.cv === 0 && !hd.linkedin,
        `index ${v} ${lang} ${theme}: placeholders hidden (BirdIA tags, LinkedIn line, CV links)`, JSON.stringify(hd));
      // Home photo: one image, its file is in the repository and loads, its alt text is written.
      const ph = todo.photo[0];
      const wantAlt = lang === "fr" ? "Portrait de Nirina Helena" : "Portrait of Nirina Helena";
      check(todo.photo.length === 1 && !!ph.src && fs.existsSync(path.join(REPO, ph.src)) && ph.natural > 0 && ph.width > 0 &&
        ph.alt.trim().length > 0 && !/TODO/i.test(ph.alt) && ph.alt === wantAlt,
        `index ${v} ${lang} ${theme}: home photo present, file exists, alt text written`, JSON.stringify(todo.photo));
      check(todo.heather === "projects/heather/index.html" && todo.heatherEdu === "projects/heather/index.html" &&
        todo.mail && todo.mail[0] === "mailto:helenarandrianaly@gmail.com" && todo.mail[1].endsWith("helenarandrianaly@gmail.com"),
        `index ${v} ${lang} ${theme}: Heather links (About, Education) and mailto link`, `About=${todo.heather} Education=${todo.heatherEdu} mail=${todo.mail && todo.mail[0]}`);
      const wantCols = v === "desktop" ? [2, 2, 3] : [1, 1, 1];
      check(todo.rows.every((r, i) => r.even && r.cols === wantCols[i]) && todo.rows[1].cards === 4 && todo.rows[2].cards === 3,
        `index ${v} ${lang} ${theme}: card grids (experience, skills, education) have ${wantCols.join("/")} columns and even rows`,
        todo.rows.map((r) => `${r.sel}: ${r.cards} cards, ${r.cols} col, even=${r.even}`).join("; "));
      check(todo.meta.every((m) => m && m.length > 50 && !/TODO/.test(m)) && todo.meta[0] === todo.meta[1],
        `index ${v} ${lang} ${theme}: meta description and og:description are written`, `${todo.meta[0].length} chars`);
      if (v === "desktop" && lang === "fr" && theme === "light") {
        // Clip of the full-page capture, so the sticky header does not cover the section title.
        const box = await page.locator("#experience").boundingBox();
        await page.screenshot({ path: path.join(SHOTS, "crop-index-experience-desktop-fr-light.png"), fullPage: true, clip: box });
        const sk = await page.locator("#skills").boundingBox(), ed = await page.locator("#education").boundingBox();
        await page.screenshot({ path: path.join(SHOTS, "crop-index-skills-education-desktop-fr-light.png"), fullPage: true, clip: { x: sk.x, y: sk.y, width: sk.width, height: ed.y + ed.height - sk.y } });
        await page.screenshot({ path: path.join(SHOTS, "crop-index-education-desktop-fr-light.png"), fullPage: true, clip: ed });
        await page.screenshot({ path: path.join(SHOTS, "crop-index-contact-desktop-fr-light.png"), fullPage: true, clip: await page.locator("#contact").boundingBox() });
      }
    }
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
  // A local href or src must be a file of the repository (a folder counts through its index.html).
  const onDisk = (pathname) => {
    let f = path.join(REPO, decodeURIComponent(pathname));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    return fs.existsSync(f) && fs.statSync(f).isFile();
  };
  const LINK_PAGES = { ...PAGES, report: REPORT };
  for (const lang of ["en", "fr"]) for (const p of Object.keys(LINK_PAGES)) {
    await page.goto(BASE + LINK_PAGES[p]);
    await page.evaluate((l) => { localStorage.setItem("lang", l); }, lang);
    await page.reload();
    const refs = await page.evaluate(() => Array.from(document.querySelectorAll("[href], [src]")).map((e) => e.href || e.src).filter((r) => typeof r === "string" && /^https?:/.test(r)));
    let ok = 0; const bad = [];
    for (const ref of [...new Set(refs)]) {
      const u = new URL(ref);
      if (u.origin !== new URL(BASE).origin) { external.add(ref); continue; }
      const res = await ctx.request.get(u.origin + u.pathname);
      let good = res.status() === 200 && onDisk(u.pathname);
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
  for (const f of ["/assets/img/favicon.svg"]) {
    const r = await ctx.request.get(BASE + f); check(r.status() === 200, `GET ${f}`, `status=${r.status()} type=${r.headers()["content-type"]}`);
  }

  // Every image of assets/img/ (the heather/ folder apart) is used by a page, the style sheet or the script.
  {
    const dir = path.join(REPO, "assets", "img");
    const sources = ["index.html", "projects/heather/index.html", "css/style.css", "js/i18n.js"].map((f) => fs.readFileSync(path.join(REPO, f), "utf8")).join("\n");
    const images = fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile());
    const unused = images.filter((f) => !sources.includes("assets/img/" + f));
    check(images.length > 0 && unused.length === 0, "no unreferenced image in assets/img/", `${images.length} files, unreferenced=[${unused}]`);
  }

  // Construction mode: the three pages ask not to be indexed, and robots.txt closes the site.
  for (const [p, url] of Object.entries(LINK_PAGES)) {
    await page.goto(BASE + url);
    const robots = await page.evaluate(() => Array.from(document.querySelectorAll('head meta[name="robots"]')).map((m) => m.content));
    check(robots.length === 1 && /noindex/.test(robots[0]) && /nofollow/.test(robots[0]), `${p}: <meta name="robots" content="noindex, nofollow">`, JSON.stringify(robots));
  }
  {
    const r = await ctx.request.get(BASE + "/robots.txt");
    const lines = r.status() === 200 ? (await r.text()).split("\n").map((l) => l.trim()).filter(Boolean) : [];
    check(fs.existsSync(path.join(REPO, "robots.txt")) && lines.join("|") === "User-agent: *|Disallow: /", "robots.txt exists and disallows everything", `status=${r.status()} "${lines.join(" | ")}"`);
  }
  {
    await page.goto(BASE + REPORT);
    const todos = todoIn(await page.evaluate(visibleText));
    check(todos.length === 0, 'report: no visible "TODO"', `${todos.length} ${todos.join(" | ")}`);
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

  // ---------- 8. Review fixes: report content, wording, 375 px, figure links, photo, header line ----------
  console.log("\n== 8. Review fixes ==");
  {
    const ctx0 = await browser.newContext();
    // a. No Python warning, traceback or local path in the report.
    const reportText = await (await ctx0.request.get(BASE + "/projects/heather/report.html")).text();
    const banned = ["RuntimeWarning", "Traceback", "/home/"].map((w) => `${w}=${reportText.split(w).length - 1}`);
    check(banned.every((b) => b.endsWith("=0")), "report.html has no RuntimeWarning, Traceback or /home/", banned.join(" "));
    const stderrBlocks = reportText.split('data-mime-type="application/vnd.jupyter.stderr"').length - 1;
    check(stderrBlocks === 0, "report.html has no stderr output block", `${stderrBlocks}`);

    // b. French wording on the heather page.
    const cfr = await browser.newContext({ viewport: VIEWPORTS.desktop });
    await cfr.addInitScript(() => { localStorage.setItem("lang", "fr"); });
    const pfr = await cfr.newPage(); await pfr.goto(BASE + PAGES.heather);
    const frText = await pfr.evaluate(() => {
      document.querySelectorAll("details").forEach((d) => { d.open = true; });
      const attrs = Array.from(document.querySelectorAll("[alt], [aria-label], meta[content]")).map((e) => [e.getAttribute("alt"), e.getAttribute("aria-label"), e.getAttribute("content")].join(" "));
      return document.title + "\n" + document.body.innerText + "\n" + attrs.join("\n");
    });
    // "Dry rainy seasons" (SPI-6 <= -1) are "saisons des pluies déficitaires"; other uses of "sèche(s)" are fine.
    const seches = frText.match(/.{0,40}saisons? des pluies sèches?.{0,20}/gi) || [];
    check(seches.length === 0, 'heather page (FR): no "saison(s) des pluies sèche(s)"', `${seches.length} ${seches.join(" | ")}`);
    await pfr.click("#lang-toggle");
    const enText = await pfr.evaluate(() => document.body.innerText);
    const drySeason = enText.match(/.{0,40}\bdry seasons?\b.{0,20}/gi) || [];
    check(drySeason.length === 0 && /dry rainy seasons/i.test(enText), 'heather page (EN): "dry rainy season(s)", never "dry season(s)"', `${drySeason.length} ${drySeason.join(" | ")} ; "dry rainy season(s)": ${(enText.match(/dry rainy seasons?/gi) || []).length}`);
    check(/saisons des pluies déficitaires/.test(frText), 'heather page (FR): uses "saisons des pluies déficitaires"', `${(frText.match(/déficitaires?/g) || []).length} occurrences`);
    await cfr.close();

    // c. No horizontal page scroll at 375 px; tables scroll inside their own container.
    for (const p of Object.keys(PAGES)) for (const lang of ["en", "fr"]) for (const theme of ["light", "dark"]) {
      const c = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
      await c.addInitScript(([l, t]) => { localStorage.setItem("lang", l); localStorage.setItem("theme", t); }, [lang, theme]);
      const pg = await c.newPage(); await pg.goto(BASE + PAGES[p], { waitUntil: "load" });
      const r = await pg.evaluate(() => {
        document.querySelectorAll("details").forEach((d) => { d.open = true; });
        const tables = Array.from(document.querySelectorAll("table"));
        const wrapped = tables.filter((t) => { const w = t.parentElement; return w.classList.contains("table-wrap") && getComputedStyle(w).overflowX === "auto"; });
        const scrolling = tables.filter((t) => t.parentElement.scrollWidth > t.parentElement.clientWidth);
        const squeezed = tables.filter((t) => t.getBoundingClientRect().width < 400);
        return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, bodySw: document.body.scrollWidth, tables: tables.length, wrapped: wrapped.length, scrolling: scrolling.length, squeezed: squeezed.length };
      });
      check(r.sw <= r.iw && r.bodySw <= r.iw && r.wrapped === r.tables, `375 px ${p} [${lang}, ${theme}]: no horizontal page scroll`,
        `scrollWidth=${r.sw} innerWidth=${r.iw} tables=${r.tables} inScrollContainer=${r.wrapped} scrollingInside=${r.scrolling} narrowerThan400px=${r.squeezed}`);
      await c.close();
    }

    // d. Every figure of the heather page is a link to an existing PNG.
    for (const lang of ["en", "fr"]) {
      const c = await browser.newContext({ viewport: VIEWPORTS.mobile });
      await c.addInitScript((l) => { localStorage.setItem("lang", l); }, lang);
      const pg = await c.newPage(); await pg.goto(BASE + PAGES.heather);
      const figs = await pg.evaluate(() => Array.from(document.querySelectorAll("figure")).map((f) => {
        const img = f.querySelector("img"); const a = img && img.closest("a");
        const cap = a && document.getElementById(a.getAttribute("aria-describedby") || "");
        return { href: a ? a.href : null, same: a ? a.getAttribute("href") === img.getAttribute("src") : false, target: a && a.target, rel: a && a.rel, label: a && a.getAttribute("aria-label"), alt: img && img.alt, cursor: a && getComputedStyle(a).cursor, described: !!(cap && cap.textContent.trim()) };
      }));
      const hint = await pg.locator('[data-i18n="h.fig.hint"]').textContent();
      const expected = lang === "fr" ? "Ouvrir la figure en taille réelle" : "Open full-size figure";
      let ok = figs.length >= 3; const st = [];
      for (const f of figs) {
        const res = f.href ? await c.request.get(f.href) : null;
        const good = !!res && res.status() === 200 && /image\/png/.test(res.headers()["content-type"] || "") && /\.png$/.test(f.href) && f.same && f.target === "_blank" && /noopener/.test(f.rel) && f.label === expected && f.cursor === "zoom-in" && f.described && !!f.alt;
        ok = ok && good; st.push(`${f.href ? f.href.split("/").pop() : "NO LINK"}:${res ? res.status() : "-"}`);
      }
      check(ok && hint.trim().length > 0, `heather [${lang}]: every figure is a link to an existing PNG`, `${figs.length} figures ${st.join(" ")} aria-label="${figs[0] && figs[0].label}" hint="${hint.trim()}"`);
      await c.close();
    }

    // e. Home page with the photo: two columns on desktop (text, then photo); on small screens a single column, photo above the name.
    for (const [w, h] of [[375, 812], [390, 844], [639, 900], [1280, 800]]) {
      const c = await browser.newContext({ viewport: { width: w, height: h } });
      const pg = await c.newPage(); await pg.goto(BASE + "/");
      const r = await pg.evaluate(() => {
        const box = (q) => { const b = document.querySelector(q).getBoundingClientRect(); return { left: Math.round(b.left), right: Math.round(b.right), top: Math.round(b.top), bottom: Math.round(b.bottom) }; };
        const cont = box(".hero-inner"), brand = box(".brand"), h1 = box("h1"), lead = box(".lead"), actions = box(".actions"), photo = box(".hero-photo"), text = box(".hero-inner > div");
        const cs = getComputedStyle(document.querySelector(".hero-inner"));
        return { photos: document.querySelectorAll(".hero img").length, children: document.querySelector(".hero-inner").children.length, columns: cs.gridTemplateColumns.split(" ").length,
          photo, textRight: text.right, h1Top: h1.top, brandLeft: brand.left, h1Left: h1.left, leadLeft: lead.left, leadRight: lead.right, contRight: cont.right, actionsLeft: actions.left, vw: window.innerWidth, overflow: document.documentElement.scrollWidth - window.innerWidth };
      });
      // Text aligned with the brand in the header, inside the container.
      const base = r.photos === 1 && r.children === 2 && r.h1Left === r.brandLeft && r.leadLeft === r.brandLeft && r.actionsLeft === r.brandLeft && r.leadRight <= r.contRight && r.photo.right <= r.contRight && r.overflow <= 0;
      const pw = r.photo.right - r.photo.left, phh = r.photo.bottom - r.photo.top;
      if (w >= 768) {
        // Desktop: two columns, the 208 px photo to the right of the text, on the same row.
        const ok = base && r.columns === 2 && pw === 208 && phh === 208 && r.photo.left >= r.textRight && r.photo.top < r.h1Top + 208 && r.photo.bottom > r.h1Top;
        check(ok, `home ${w}px: photo on a second column, to the right of the text`, JSON.stringify(r));
      } else {
        // Small screens: one column, the 120 px photo above the name, aligned with the text.
        const ok = base && r.columns === 1 && pw === 120 && phh === 120 && r.photo.bottom <= r.h1Top && r.photo.left === r.brandLeft;
        check(ok, `home ${w}px: one column, photo above the name`, JSON.stringify(r));
      }
      await c.close();
    }

    // f. Heather page: a single line under the header (computed borders), at the top and after jumping to each section.
    for (const [vname, vp] of Object.entries(VIEWPORTS)) for (const theme of ["light", "dark"]) {
      const c = await browser.newContext({ viewport: vp, reducedMotion: "reduce" });
      await c.addInitScript((t) => { localStorage.setItem("lang", "fr"); localStorage.setItem("theme", t); }, theme);
      const pg = await c.newPage(); await pg.goto(BASE + PAGES.heather, { waitUntil: "load" });
      const measure = () => pg.evaluate(() => {
        const px = (v) => parseFloat(v) || 0;
        const header = document.querySelector(".site-header"); const hs = getComputedStyle(header);
        const inner = Array.from(header.querySelectorAll("*")).filter((e) => !e.closest("button") && e.tagName !== "BUTTON");
        const innerLines = inner.filter((e) => { const s = getComputedStyle(e); return px(s.borderTopWidth) + px(s.borderBottomWidth) > 0 || s.boxShadow !== "none"; }).map((e) => e.tagName + "." + e.className);
        const hb = header.getBoundingClientRect().bottom;
        const sticky = hs.position === "sticky";
        // Horizontal lines drawn by other elements just under the header.
        const near = [];
        document.querySelectorAll("main, main *").forEach((e) => {
          const s = getComputedStyle(e), r = e.getBoundingClientRect();
          if (r.width < window.innerWidth * 0.5) return;
          if (px(s.borderTopWidth) > 0 && r.top >= hb - 0.5 && r.top <= hb + 24) near.push(`${e.tagName}#${e.id} top +${(r.top - hb).toFixed(1)}px`);
          if (px(s.borderBottomWidth) > 0 && r.bottom >= hb - 0.5 && r.bottom <= hb + 24) near.push(`${e.tagName}#${e.id} bottom +${(r.bottom - hb).toFixed(1)}px`);
        });
        return { top: px(hs.borderTopWidth), bottom: px(hs.borderBottomWidth), shadow: hs.boxShadow, innerLines, near, sticky, hb: Math.round(hb), y: Math.round(window.scrollY) };
      });
      const m0 = await measure();
      let ok = m0.top === 0 && m0.bottom === 1 && m0.shadow === "none" && m0.innerLines.length === 0 && m0.near.length === 0;
      const notes = [`top-of-page: headerBorder=${m0.top}/${m0.bottom}px innerLines=[${m0.innerLines}] near=[${m0.near}] sticky=${m0.sticky} headerBottom=${m0.hb}px`];
      for (const id of ["summary", "question", "data", "method", "figures", "results", "act", "limits", "links"]) {
        await pg.evaluate((i) => { location.hash = "#" + i; }, id); await pg.waitForTimeout(60);
        const m = await measure();
        // When the header is not sticky it scrolls away: nothing can double it.
        const bad = m.sticky && m.near.length > 0;
        if (bad) { ok = false; notes.push(`#${id}: ${m.near.join(", ")}`); }
      }
      check(ok, `heather ${vname} ${theme}: one single line under the header`, notes.join(" ; "));
      if (vname === "desktop" && theme === "dark") {
        await pg.evaluate(() => { location.hash = "#summary"; window.scrollTo(0, 0); }); await pg.waitForTimeout(80);
        await pg.screenshot({ path: path.join(SHOTS, "crop-heather-header-dark.png"), clip: { x: 0, y: 0, width: vp.width, height: 260 } });
        await pg.evaluate(() => { location.hash = "#question"; }); await pg.waitForTimeout(80);
        await pg.screenshot({ path: path.join(SHOTS, "crop-heather-header-dark-after-scroll.png"), clip: { x: 0, y: 0, width: vp.width, height: 260 } });
        await pg.evaluate(() => { location.hash = "#act"; }); await pg.waitForTimeout(80);
        await pg.screenshot({ path: path.join(SHOTS, "crop-heather-recommandations-fr-dark.png") });
      }
      await c.close();
    }
    await ctx0.close();
  }

  await browser.close();
  console.log(`\nRESULT: ${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error("TEST SCRIPT ERROR", e); process.exit(2); });
