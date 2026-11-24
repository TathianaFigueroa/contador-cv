# Contador de caracteres para el resumen del CV — BASELINE

One page: what the stack IS, what it is NOT, and the rows that must never break.

## Stack

| Layer | Choice | FORBIDDEN alternatives (named) |
|---|---|---|
| Page | One static HTML file, `site/index.html`, `lang="es"` | React, Vue, Angular, Svelte, Next.js, any single-page-app framework; server-rendered pages (PHP, Django, Express views) |
| Styles | One plain CSS file, `site/styles.css`, no preprocessor | Tailwind CSS, Bootstrap, Sass/SCSS, CSS-in-JS, web fonts or stylesheets loaded from another site |
| Behaviour | One plain JavaScript file, `site/main.js`, loaded as a classic script with defer (never a module, so the page also works opened from the file) | jQuery, TypeScript compile step, any bundler (webpack, Vite, Parcel), any npm runtime dependency shipped to the page |
| Character count | The browser's own `Intl.Segmenter` (grapheme clusters: what a person sees as one character) | `string.length` or code-point counts as the shown count, a third-party counting library |
| Data | None: the text lives only in the open page's memory | localStorage, sessionStorage, IndexedDB, cookies, any server or database |
| Outside services | None | analytics (Google Analytics, Tag Manager), error trackers (Sentry), CDNs for scripts or fonts |
| Hosting | Any free static host; the owner publishes by hand (ARCHITECTURE.md, "Where it runs") | a server process, serverless functions, a paid plan |

## Module seams & data ownership

The seam table lives in ARCHITECTURE.md. Ownership law: each table/data store
is written by exactly one module; everyone else goes through that module's
public surface. This product holds no data store at all.

## Tier-0 rows

| Rule | Meaning |
|---|---|
| CON-001 — the text never leaves the page | The text the person writes, and anything derived from it, is never sent over the network, never placed in the page's address, and never written to cookies or to any browser storage. A page load, typing, pasting and clearing produce no request carrying it. |

## Test environment

The ledger runs ONLY inside Docker: `sh checks/test.sh` → docker compose -f
docker-compose.test.yml. No test process ever receives real credentials.
The harness itself (a headless browser driving `site/index.html`) arrives
with the code skeleton.

## Owner hints (verbatim)

- Design: none given
- Architecture/stack: none given

## Machine blocks

Parsed by checks/conformance.sh at every commit. Extensions space- or
newline-separated. Forbidden terms one per line: dependency/import names that
must never appear in staged source additions — pick tokens that will not
legitimately occur in code or config otherwise.

```vid-allowed-extensions
.md .yml .yaml .sh .html .css .js .mjs .json .txt
```

```vid-forbidden
react-dom
@angular/core
svelte
jquery
tailwindcss
bootstrap.min
@sentry
googletagmanager
google-analytics
fonts.googleapis
```
