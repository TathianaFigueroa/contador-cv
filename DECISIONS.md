# Contador de caracteres para el resumen del CV — DECISIONS

Append-only, except labels and replaced-by marks. One line per decision.
Trigger (law in CLAUDE.md): the choice picked between plausible
alternatives, constrains future code, or would surprise a competent
newcomer. Entries without an `| enforced:` ref, or without a label, are
rejected at commit.

Format:

    - **D-NNN** <what> | why: <why> | enforced: <test/hook ref, or "convention"> | applies-to: <ids and codes> [| origin: proposal] [| model: <id>]
    - **D-NNN** <what> | why: <why> | enforced: <test/hook ref, or "convention"> | scope: project [| origin: proposal] [| model: <id>]

`why:` gives the reason in ViD's own words and cites the answer it rests
on (`A-NNN`), never the owner's words, which stay in the commit's `Owner:`
trailer.

`origin: proposal` marks defaults the model chose when the owner skipped a
hint or delegated the choice.

## Log

- **D-001** The page is plain HTML, CSS and JavaScript in three files under site/, with no framework, no build step and no runtime dependency; the named alternatives are forbidden in BASELINE.md | why: one static page with three behaviours and a three-requirement cap (seed, A-012); a framework or bundler adds machinery and supply-chain surface the page never uses, and the owner gave no stack hint | enforced: checks/conformance.sh (BASELINE.md vid-forbidden) | scope: project | origin: proposal
- **D-002** The shown count is the number of grapheme clusters the browser's Intl.Segmenter finds in the box's text, so an emoji, an accented letter in one or two code points, a space and a line break (LF or CRLF) each count as one | replaced-by: D-015 | why: A-001 counts every character the person sees as one; string length and code-point counts disagree with what is seen for emoji and composed accents | enforced: convention | applies-to: REQ-001, REQ-002
- **D-003** The over-limit message reads the same count the counter shows, computed once per change by one function, never a second count of its own | why: REQ-002 part (5) forbids a message that disagrees with the shown count (F-03) | enforced: convention | applies-to: REQ-002
- **D-004** The clear button clears the box through the browser's editing path (select all, then delete as an edit) so the browser's undo restores the text, never by assigning an empty value, which discards the undo history | why: A-014, REQ-003 part (5): undo right after clearing must bring the text back | enforced: convention | applies-to: REQ-003
- **D-005** The text box carries autocomplete="off", and the page empties the box on every pageshow event, so neither form restoration nor the back-forward cache brings text back | replaced-by: D-016 | why: CON-002 and A-009: the box opens empty on every load and the browser is told not to restore it | enforced: convention | applies-to: ROW-014
- **D-006** The page is hosted on any free static host the owner chooses and publishes by hand; ViD holds no access and the spend cap is zero. Rejected: a server process, serverless functions and paid plans, which the page has no use for | why: the owner answered "none" for access and zero for the spend cap at init's technical sitting; the owner named no host, so the static-host choice is ViD's | enforced: ARCHITECTURE.md vid-hosting block | scope: project | origin: proposal
- **D-007** No release can need downtime: the product has no database and no stored data, so the downtime-tolerance question does not apply | why: CON-001 and NG-001: nothing is stored anywhere | enforced: convention | scope: project | origin: proposal
- **D-008** The page loads nothing from another site: no web fonts, no scripts, no images from a CDN; the system font stack is used | why: CON-001 forbids anything derived from the text leaving the page, and a page with no outside loads makes that promise checkable as "zero outside requests" | enforced: checks/conformance.sh (BASELINE.md vid-forbidden) | applies-to: ROW-012, RULE-001, RULE-005
- **D-009** The build runs at most one test stack at a time (budget stacks=1) | why: ViD's default; one static page needs no parallel stacks | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-010** The observer reports when free memory falls below 2048 MB (budget memory-headroom-mb=2048) | why: ViD's default headroom for a headless-browser test stack | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-011** A build slice claims at most 60 rows (budget claims-per-slice=60) | why: ViD's default | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-012** A build slice runs at most 8 wall-clock hours (budget wall-hours-per-slice=8) | why: ViD's default | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-013** A court run may take at most 300 seconds (budget court-seconds=300) | why: ViD's default | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-014** A builder or fixer is told once to finish when its context reaches 400000 tokens (budget builder-context-tokens=400000) | why: ViD's default | enforced: .vid/budget | scope: project | origin: proposal | about: vid-settings
- **D-015** The shown count is the number of grapheme clusters the browser's Intl.Segmenter finds in the box's text, corrected where the owner's rule differs: a combining mark, joiner, modifier or selector that follows a space, a tab, a line break or any other character that is not a letter or an emoji counts as one of its own; an invisible character standing on its own counts as one; on a browser without Intl.Segmenter neither a count nor the over-limit message is shown | replaced-by: D-017 | why: A-001 as restated, A-016, A-019 and CON-004: grapheme clusters match the owner's rule except at those edges | enforced: convention | applies-to: REQ-001, REQ-002, ROW-042
- **D-016** The text box carries autocomplete="off", and the page empties the box only on a pageshow event whose persisted flag is set (a return from the back-forward cache), never on the first load, so text typed while the page loads is kept | why: CON-002, A-009 and ROW-043; the final review found that emptying on every pageshow would wipe text typed during load | enforced: convention | applies-to: ROW-014, ROW-043
- **D-017** The shown count is the number of grapheme clusters the browser's Intl.Segmenter finds, corrected where the owner's rule differs: a cluster whose first character is a letter, a number, a mark, an emoji, a regional indicator or the keycap bases # and * counts as one; any other cluster (a space, a tab, a symbol, a prepended mark followed by its base) counts each of its characters on its own; a line break pair counts as one; on a browser without Intl.Segmenter neither a count nor the over-limit message is shown | why: A-001 as restated, A-016, A-019 and CON-004 | enforced: convention | applies-to: REQ-001, REQ-002, ROW-001, ROW-042
- **D-018** The expected counts of the counting rows come from Unicode 15.1's GraphemeBreakTest data, the version the supported browsers' bundled ICU carries; a change of version is a decision of its own | why: the final review found the pinned version unnamed (ROW-001, ROW-023) | enforced: convention | applies-to: ROW-001, ROW-023
- **D-019** The static host the owner chooses must serve HTTPS only and let the page send Strict-Transport-Security with a max-age of at least one year | why: ROW-040, deploy-owed, needs both; not every free host offers them | enforced: convention | applies-to: ROW-040 | origin: proposal
