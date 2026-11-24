# Contador de caracteres para el resumen del CV

One static web page, in Spanish, where a person types or pastes the summary of their CV and sees, as they write, how many characters it holds against a limit of 500. Past 500 a message says so, without ever blocking the typing; one button clears the text, and undo right after brings it back. Nothing about the person is kept or sent anywhere.

The spec is ratified (PRD.md, BASELINE.md, ARCHITECTURE.md, DECISIONS.md, INVENTORY.md). The page is the three files in `site/`.

## Preview

Open `site/index.html` in a browser, or serve the folder with any static server, for example:

    cd site && python -m http.server 8080

## Tests

The acceptance tests (`tests/acceptance/`) run in Docker, in Chromium, Firefox and WebKit:

    docker compose -f docker-compose.acceptance.yml up --build --abort-on-container-exit --exit-code-from tests

They were written by the build session, not by ViD's separate test author, and are not ViD ledger evidence: INVENTORY.md's rows still read `owed: spec-only — first stage` until `/vid develop` writes and proves the ledger.

## Publish

Upload only the files in `site/` to a static host that serves HTTPS only and can send Strict-Transport-Security (DECISIONS.md D-019).

## Before you put this online

Not a framework. A sticky note. With /vid deploy, items 1, 2, 4 and 5 are
enforced structurally — the rest still matter.

1. Restore one backup before you trust backups — actually run the restore, once, end to end.
2. Redirect a week of outbound email to your own inbox first; read what the product sends.
3. Try one real feed/integration end-to-end before switching them all on.
4. Rotate any secret an agent ever saw — every key that was ever pasted into a session.
5. Agents never hold prod credentials. Deploys happen from your hands, not from a session.
6. Put a spending cap on every paid API and on the hosting account.
7. Check each Tier-0 row in BASELINE.md by hand once, in the real environment.
8. Keep a copy of PRD.md and DECISIONS.md somewhere off the server.
9. First week: read the logs daily. Boring logs are the goal.
10. When something is wrong, run /vid:vid-fix and answer its questions — don't patch by hand.

## Commit ids in PRD.md

The repository's history was rewritten once, before it was made public, to replace the author's work email with GitHub's private address; nothing else changed. PRD.md's `## Ratifications` lines name the commits by their ids before that rewrite:

| Before | Now | Commit |
|---|---|---|
| 3a7c18d | 4c83eb3 | PRD pause 1: thesis and contract ratified |
| 8cb11f9 | 8a926b8 | PRD pause 2: gap answers ratified |
| 6d33f71 | fc9c8e0 | PRD pause 3: final ratification |
| c755c53 | 1a43cd7 | PRD: final ratification record line |
| fa92a1d | 84ac497 | Spec commit: technical foundation, test inventory and checks |
| af6865f | 44bfa46 | The page: character counter, over-limit message and clear button |
| 53c8e26 | 5b84b57 | Acceptance tests in Docker across Chromium, Firefox and WebKit |
