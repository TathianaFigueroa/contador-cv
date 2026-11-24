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
