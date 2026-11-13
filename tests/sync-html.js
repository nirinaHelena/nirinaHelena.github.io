// Copies the English texts of js/i18n.js into the HTML files, so that the pages
// stay readable without JavaScript and test.js section 7 passes.
// Usage: node sync-html.js        (rewrites index.html and projects/heather/index.html)
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repo = path.join(__dirname, "..");
const sandbox = {};
vm.runInNewContext(fs.readFileSync(path.join(repo, "js/i18n.js"), "utf8"), sandbox);
const en = sandbox.I18N.en, fr = sandbox.I18N.fr;

const missingFr = Object.keys(en).filter((k) => !(k in fr));
const extraFr = Object.keys(fr).filter((k) => !(k in en));
console.log("keys en:", Object.keys(en).length, "fr:", Object.keys(fr).length, "missing in fr:", missingFr, "only in fr:", extraFr);

const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const used = new Set();

for (const file of ["index.html", "projects/heather/index.html"]) {
  const p = path.join(repo, file);
  let html = fs.readFileSync(p, "utf8");
  let n = 0, unknown = [];

  html = html.replace(/(<([a-z][a-z0-9]*)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, key, _old, close) => {
    if (!(key in en)) { unknown.push(key); return m; }
    used.add(key); n++;
    const v = en[key];
    return open + (v.startsWith("\n") ? v + "\n" : v) + close;
  });

  html = html.replace(/\b(alt|aria-label|content)="[^"]*"(\s+)data-i18n-\1="([^"]+)"/g, (m, attr, sp, key) => {
    if (!(key in en)) { unknown.push(key); return m; }
    used.add(key); n++;
    return `${attr}="${escAttr(en[key])}"${sp}data-i18n-${attr}="${key}"`;
  });

  fs.writeFileSync(p, html);
  console.log(file, "filled:", n, "unknown keys:", unknown);
}
used.add("theme.to_light"); used.add("theme.to_dark");
console.log("dictionary keys never used in HTML:", Object.keys(en).filter((k) => !used.has(k)));
