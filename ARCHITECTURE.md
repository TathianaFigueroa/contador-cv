# Contador de caracteres para el resumen del CV — ARCHITECTURE

The seam table. One row per module. Updated in the same commit as any seam
change (law in CLAUDE.md). This table is EXECUTED, not descriptive: it is the
import court's rule source (checks/imports.sh reads it at every commit). A
module with no row cannot be imported; a row that lies fails the build.

Import court: enforce

## Column contract (machine-read — keep the shapes exact)

- **Module** — the module's repo path (`apps/web`, `packages/core/alerts`);
  `/src/` segments in real file paths are collapsed when matching, so
  `packages/core/alerts` also owns `packages/core/src/alerts/`. Django-style
  dotted labels (`apps.public`) are accepted and read as paths.
- **Public surface** — leads with the module's import specifier(s) in
  backticks; prose may follow. Importing any path DEEPER than a declared
  specifier is a violation — declare an entry point per module, not one
  barrel for the world. A row with no backticked specifier can only be
  reached by its own files.
- **Dependents** — comma-separated Module paths that may import this module,
  or `all`, or `none`. Direction law is encoded here: app-layer rows say
  `none` (nothing imports the app), so core reaching into app is rejected as
  an undeclared dependent. Relative imports that cross module paths are
  always violations — enter a module through its specifier.

| Module | Responsibility | Owned tables/data | Public surface | Dependents |
|---|---|---|---|---|
| site | The one page: the text box, the live character count, the over-limit message and the clear button, in Spanish | none — the text lives only in the open page's memory | `site/index.html` — the page as a browser loads it; tests drive it only through what a person can see and do | tests/invariants |

Laws:

- A module without a row here should not be committed to — add the row in the
  same commit.
- Cross-module access goes through the public-surface column only; reaching
  into another module's tables or internals is a defect — and, since v0.6, a
  rejected commit.
- The dependents column is the blast-radius map: a fix in module X re-grades
  X plus its declared dependents, not the whole product (/vid fix law).

External boundaries: none. The page calls no outside service: no network
request, no analytics, no fonts or scripts from another site (BASELINE.md,
CON-001).

## Where it runs

```vid-hosting
platform: static-host
region: global
staging: the platform's own
production: the platform's own
sending: none
spend-cap: 0 a month
access: none
dns-access: none
owner-only: choosing the static host, creating its account, and publishing the page to both addresses by hand
providers: none
```
