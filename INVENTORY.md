# Contador de caracteres para el resumen del CV — TEST INVENTORY

> Ratified at init, same standing as PRD.md: the owner ratified these ROWS —
> what will be verified — before any code existed. Mechanically derived from
> three enumerable sets (PRD requirements + Fail-ifs; design pack @screen
> markers via the resolved design-join table; the scaffold's route table via
> the ratified routes extractor), plus the auth-state × surface axis and the
> genus-row proposals (origin: domain). Rows are generated, never authored;
> only exceptions are hand-touched. Additions during development are
> permitted, never silent — checks/inventory.sh fails a commit whose new
> route has no row here, and every change to this block is a law change:
> a standalone commit, nothing else in it (pre-commit, §4.1). Development is
> "make the ledger green": every row below was materialised as a failing
> ledger test at init (proved red — the red gate), or carries
> `owed: <reason>` until its test can exist.

## Row schema

    ROW-NNN | kind | subject | actor/state | marker | obligation | derived-from | test

- `kind` — `surface` · `journey` · `shell` · `behavior` · `reachability`
- `subject` — route (`/account`, in the scaffold's own literal form), screen
  id, or requirement id
- `actor/state` — `anonymous` · `candidate` · `operator:<role>` · `n/a` ·
  `(process)` (v0.9.3 3.2, R3: a machine journey or a trigger row — the
  product acting on what enters at an external input boundary, with no
  person at a browser)
- `marker` — the design pack marker this row binds to (`P03/expired`), or `n/a`
- `obligation` — one falsifiable sentence a fresh-context grader can check
- `derived-from` — `REQ-NNN` and/or a design marker; never "authored"
- a **journey** row's obligation carries the narrative followed by
  `transitions:` — one numbered item per transition, `<actor> at <state>
  · <entry control> · <action> · <next state> · <observable effect>`
  (v0.9.2 3.5, R8); an `(off_screen)` phase stays in the narrative and is
  no transition. The row is paid per transition, in a real browser,
  operating the real control; setup may reach the starting state through
  the API or a fixture and never performs a transition; the verdict pass
  returns one verdict per transition and the row is KEPT only when every
  transition is.
- a **machine journey** (v0.9.3 3.2, R3) is a journey row with actor
  `(process)`: every external input boundary ARCHITECTURE.md declares
  (feeds, uploads, webhooks, scheduled pulls, inbound mail) × every
  observable consequence the PRD promises for what enters there
  (searchable, matched, notified, exported, expired, deleted); its
  `transitions:` are the stages as the PRD states them (enter · parse ·
  store · index · notify · expire), each with its observable effect; paid
  per stage at the boundary's real entry point, the external party played
  by the harness's fake (itself a `difference` row), never a browser.
- **the deployed population** (v0.9.3 3.3, R4): every row of kind
  `journey`, and every row whose actor is `(process)`, is paid by the close
  run's deployed pass — the product's declared processes running on the
  same image, nothing inline — and that report alone is its receipt (a row
  absent from it is red, whatever the inline report says). Scoped runs stay
  inline.
- `test` — path under tests/invariants/, or `owed: <reason>` (owed rows block
  completion — checks/inventory.sh --strict and checks/coverage.sh --strict).
  One owed reason has its own standing (v0.9.1 3.6): `owed: paid by /vid
  deploy gate <1|2|3> — <what the rung observes>` — a row whose obligation
  can only be observed through something the harness substitutes (a DIF
  row's paying step, a seam with `credentials: not-yet`, a deployed
  worker consuming a schedule). Reported as `deploy-owed`, outside the
  owed gaps; completion requires it present and named, never silently
  absent; it is paid only by that rung's evidence and stamped `| paid-at:
  gate-N <date> <deploy log row>` in a law commit. Any other shape in this
  field is a GAP, never silent — a typo'd path must not exit the evidence
  join.

  **Deferral is a closed vocabulary (v0.9.2 3.2, R3).** Under a block
  whose first line inside the fence is `grammar: 0.9.2` — or `grammar:
  0.9.3`, which carries every 0.9.2 rule — an owed reason
  reads `owed: <class> — <detail>`, the class one of the table below and
  the detail naming the missing dependency and its payment point; a legal
  word alone does not pass, and any other reason is a GAP at every commit
  (`unclassed deferral`, checks/inventory.sh). "Materialised when its
  surface exists", "lands with the screen's slice", "in the slice that
  builds the subject" are not classes: they describe a red test — a test
  against a missing route or marker IS a red test, and is written. A
  block without the line keeps the pre-0.9.2 reading (any reason,
  reported).

  | class | when it is legal | detail must name |
  |---|---|---|
  | `guard-first` | a hostility probe or control sibling whose guard does not exist yet | the protection row; paid in the slice that builds it |
  | `census-armed` | a rule row before any site exists; and a rule row during a sanctioned rule-shaped repair (every enumerated site being guarded — citing a test arms the census at once) | for the repair: `sites being guarded, fix <finding id>`; paid by the owed→path flip once every site is guarded |
  | `probe-capture` | a seam probe awaiting the capture | the seam id; paid before the first client line, or at deploy gate 2 (R15) |
  | `golden-set` | the row awaits its ratified golden set | the fixture path to be ratified |
  | `fixture-source` | a fixture from an external source not yet held | the source; when it is expected |
  | `prerequisite` | a fixture or interface contract the harness lacks (a test-author pass's `unwritable: missing prerequisite`) | what is missing; paid at which slice or boundary |
  | `spec-only` | a row ratified at a spec-only init whose test is not written yet (v0.26.10.9); develop's code skeleton writes it, or, in ticket mode, the ticket that carries it | exactly `first stage`; `ticket` for a row appended under ticket mode |
  | `owner-decision` | the existing visible-debt class | `OQ-n` |
  | `reverted` | **legacy** — written by 0.9.2's develop at the two-attempt bound; 0.9.3 never writes it (a row past the bound stays materialised and is held, below) and an upgraded project keeps the rows it has | the verdict's one-line reason, quoted |
  | `paid by /vid deploy gate <1\|2\|3>` | the v0.9.1 deploy-owed form above, verbatim | what the rung observes (its own `deploy-owed=N` and `paid-at:` semantics, never re-classed) |

  The par (v0.9.2 R4): checks/inventory.sh prints `par: rows=R
  materialised=N legitimate=K (by class) deploy-owed=D other=J` under the
  line, and the red gate fails while `J > 0` or `N + K + D ≠ R` — every
  row is materialised or legitimately deferred, and the count of
  legitimate deferrals is printed at the gate. A surface row may be
  deferred ONLY as `prerequisite` naming a harness fixture the state
  needs and the harness lacks; a missing route, a 404 or a missing
  marker is a failing case of the surface instrument, never a deferral.

**A row's verdicts (v0.9.3 3.6, 3.7; R8–R11).** Under `grammar: 0.9.3` a
materialised row is ledger-tested only when its cases pass in the current
receipt AND its latest verdict is KEPT (`checks/coverage.sh --strict`,
per row, whatever the row derives from). KEPT means the promise holds in
the product AND the test observes it. BREACHED carries its class:
`product` (the product violates the Fail-if), `test` (the test cannot
observe the promise — it asserts what was already true, stops before the
effect, binds the wrong boundary) or `harness` (the instrument failed); a
row whose transitions differ takes `product` if any transition's latest
breach is, else `test`, else `harness`. A `test` or `harness` breach costs
no attempt and leaves the row `unverdicted` until a fresh verdict. Rounds,
attempts and holds are computed from the verdict events by
`checks/metrics.sh`, never written: two `product` rounds since the row's
latest KEPT, reissue or amendment hold it (`reason=bound`), two `test`
rounds likewise (`reason=test`), two `harness` rounds with no harness
repair between them (`reason=harness`). A held row stays materialised —
this field unchanged, no law commit — counts `breached`, is left out of
the automatic claim and waits for the owner; an owner answer
(`reissued`), an amendment, or a KEPT from a fix's blind re-grade releases
it. An amended obligation, or a changed `fail-if:` of the item a row
derives from, wipes the row's verdicts and its attempt history
(`checks/hooks/post-commit` records `amended row=ID sha=<commit>`); a
verdict quoted before the amendment does not count.

Every row may carry optional trailing labeled fields, in any order:

- `| origin: REQ-NNN | domain | finding-NNN | derivation <date>` — provenance:
  which requirement, genus-row proposal, grade finding, or re-derivation
  sitting produced the row. `| origin: incorporation <date> D-NNN` — the decision line an incorporation (/vid:vid-incorporate) added; a rule row names its REQs after it.
- `| paid-at: gate-N <date> <deploy log row>` — on a deploy-owed row, the
  rung that paid it (v0.9.1 3.6); written by /vid deploy, never by a
  sandbox run.
- `| proved-red: <commit-sha>` — the commit at which the row's test was
  observed failing (§3.6). Init stamps it for materialised rows; a test added
  later records the parent commit where it was red. A row test with no
  proved-red has the same standing as `owed` — an unproved test is not
  evidence, and checks/inventory.sh counts it accordingly. The stamp is
  joined, not merely present (v0.8.1d): the sha must resolve, the cited
  file must exist at it, and the file there must name the row (its ROW id
  or its `derived-from` REQ id) — a sha at which the test was never red
  is a GAP. Cited test paths resolve against the commit under construction
  (the staged index, then HEAD), never the working tree: the rhythm is
  test (free ledger addition, observed red) → row (law commit, stamped with
  the parent) → code.
- `| golden: tests/invariants/<fixture>` and `| divergence: DIF-NNN` —
  on a row derived from a `derives: golden-set` item: the ratified golden
  set the row's test reads (one line per query: `query | must-appear |
  must-outrank | must-not-appear`, proposed by a fresh-context lens, never
  by the build or tuning context), and the difference row that legalises
  a model or engine divergence on that path. A named DIF must exist and
  carry a `paying-step:` (below) — checks/inventory.sh joins the two.

**Row shapes with no new class (v0.8.1d).** One row per independently
breakable promise of a requirement's complete block — the ROW is the
atomic unit, no sub-ids. A **trigger-existence row** (kind `behavior`,
subject the item, actor `(process)` under `grammar: 0.9.3` — so the
deployed pass pays it) for every time-worded Fail-if. A **volume row** per
list surface once a scale item exists. A **control sibling** of every
guard/never row — the allowed case demonstrably works, effect observed —
an ordinary ROW, `derived-from` the same REQ, obligation opening
`control of ROW-NNN: …`. **Property-form rows** through the public
surface: many-input datasets, and the four invariance relations —
reorder-invariance, rename-invariance of aggregates, repeat-idempotence,
unrelated-state-unchanged — each a falsifiable predicate over the
product's own outputs, never a reference implementation.

**Two tiers.** `tests/invariants/` is the ledger and the only tier rows
cite. `tests/scaffolding/` is the builder's non-law tier: implementation-
keyed instruments, never cited, never evidence, outside the coverage join,
proved-red, the extractors and the deletion tripwire; deletable without a
law commit; never run by the gate. Every fixture file under `tests/`
opens with a one-line `Provenance:` header — `hand-authored`, `captured
from <seam probe>`, or `generated by <generator path under tests/>` — so
a fixture whose expected value the system under test produced (circular)
is visible to the vacuity extractor.

## Census row classes (v0.7 — read by checks/census.sh)

    rule       | RULE-NNN | statement | census-command | tier | test
    difference | DIF-NNN  | knob | test-value | prod-value | why-safe [| paying-step: <rung> — <what re-runs against the real component>]
    exception  | EXC-NNN  | subject | census-class | why-rule-does-not-apply
    suppression| SUP-NNN  | subject | census-class | extractor-gap | fix-by

- A **rule** row's census command is its denominator — it enumerates every
  site the rule applies to; new code that adds a site is automatically in
  scope on the next run. Three forms: a ratified extractor path
  (`checks/extractors/invariant.<name>.sh`); two enumerations
  `<sites-cmd> :: <guarded-cmd>` (orphans = left minus right); or a single
  enumeration (a pure denominator the row's ledger test asserts over). The
  command may contain pipes; the statement field may not. An empty
  population is a FAILURE, never a pass (zero-denominator guard) — except
  while the rule's test is still `owed:`, when orphans AND an empty
  population report `pending` (ratified, not yet armed); materialising the
  test arms the census fail-closed.
- **State-machine variant (v0.8, §6.1).** A rule row whose statement field
  begins `state-machine <field>:` declares a transition table and is the
  landing spot for a lifecycle decision (publication status, alert
  lifecycle, consent):

      rule | RULE-NNN | state-machine <field>: draft>published published>archived | census-command | tier | test

  The declared transitions are the field's whole legal vocabulary
  (space-separated `from>to` pairs; a bare token declares a state with no
  transition, e.g. an initial state nothing transitions into). The census
  command enumerates every site that mutates or guard-reads the field,
  one line per site: `<site> <from>><to>` for a mutation, `<site> <state>`
  for a guard read. The engine convicts any site whose transition is not
  declared or whose state is outside the vocabulary — fail-closed, naming
  the site (grade brief instruction: find a state mutation outside the
  declared table). Zero-denominator, debt-awareness, and the population=1
  flag apply as for any rule row.
- A **difference** row is the only legal way for a knob to differ between
  test and prod. The census prints the full divergence table every run —
  the owner sees exactly what the green ledger did NOT validate. Every
  fake the harness substitutes is a divergence by construction — derived
  at materialisation, never waited for. A DIF that legalises a model or
  engine divergence on a golden-set item's path carries `paying-step:` —
  the deploy rung and the re-run that pays it (the golden set against
  the real component): a deferred test with a named step, never a
  permanent shrug. **The paying step `close run, profile=deployed`**
  (v0.9.3 3.3): a difference whose knob is the inline switch, a scheduler
  stand-in or the absent workers is paid by the close run's deployed pass,
  locally, and its deploy gate-2 sibling stays, narrowed to the platform
  half ("the platform's worker consumes it"); a knob whose real component
  exists only on the platform keeps `paying-step: staging`.
- An **exception** says the rule genuinely does not apply to this subject.
  Exceptions count toward the complexity law's ceremony threshold
  (CLAUDE.md §2): a rule whose exception list exceeds ~15–20% of its
  population is ceremony and is deleted.
- A **suppression** says the rule applies but the extractor cannot yet see
  the site — it never counts toward deletion and stands as a to-do against
  the extractor, printed every run. `census-class` in exception and
  suppression rows names the extractor class (`dead-path`, `divergence`,
  `reachability`, `vacuity`) for extractor orphans, and MUST name the
  specific `RULE-NNN` for a rule row's orphans — the class word is not a
  skeleton key across rules.

## Provider seam rows (v0.8 — read by checks/seams.sh)

    seam | SEAM-NNN | service | purpose | chosen: D-NNN | credentials: <held|not-yet|never> | probe: <owed | probed(YYYY-MM-DD) | unreachable-risk(reason)> | evidence: <contract-test path + captured-response path, or owed> | quirks: <one per ";", or "none yet"> [| module: <module id>]

- One row per EXTERNAL service the product depends on — payments, mail,
  feeds, search, auth, storage: anything on the other side of the network
  this repo does not own. Two discovery doors (§3.2): init's architecture
  step declares known seams (an external boundary without a row cannot be
  ratified), and checks/seams.sh rejects a staged outbound destination no
  row covers — discovery is mechanical, not remembered.
- **Born owing a probe** — same debt semantics as every other row. Two
  legal exits: pay it (`probe: probed(date)`) or declare
  `unreachable-risk(reason)` with the reason stated. Never silent coverage.
- **The probe (§3.3) comes before the first client line:** the smallest
  real calls that answer the questions — never discover a limit by
  exceeding it (that is load-testing someone else's service; where docs
  are silent, chunk conservatively). Observed shapes, error semantics, and
  identifier-namespace behavior are written into the contract tests the
  evidence field names; the captured response becomes those tests' sample
  data — the surviving, shape-scoped form of fixture provenance. Contract
  tests are ledger additions (free) and are how the probe is paid; the row
  flip `owed → probed(date)` is a law change, standalone.
- Routing per the two-channel rule: a technical quirk is logged in the
  quirks field and pinned by a contract test; a quirk touching product
  meaning ("empty response cannot be distinguished from a broken feed")
  goes to the owner as a product question, never a silent log line.
- Optional `| module: <module id>` names the module of ARCHITECTURE.md's
  module table that talks to the service (its Module column, a dotted
  label read as a path). The project viewer lists the service among that
  module's contracts; no court reads it.
- Optional trailing `| match: <tokens>` names the greppable tokens that
  identify code touching this seam (client-library import names,
  hostnames, space-separated). Absent, the service field is the match
  token. Pick tokens that will not legitimately occur otherwise — the
  vid-forbidden rule, applied here.
- checks/seams.sh (presence-gated, fail-closed): app-source additions
  matching an OWED seam's tokens are rejected naming the row (tests/ is
  exempt — contract tests are the probe's own artifact); a staged outbound
  destination covered by no seam row demands one before the code lands. A
  destination that is content, not an outbound call (a footer link), takes
  an exception row naming class `seam`.
- The grade brief carries this table with a standing instruction — find a
  behavior of this service the probe did not pin. vid-deploy's "one real
  action per provider seam" gate is these rows' re-verification, not a
  separate concept.

## Hostility rows (v0.8 §4 — read by checks/inventory.sh)

    hostility | HOS-NNN | attempt | protects: <RULE-NNN|REQ-NNN|ROW-NNN> | disable: <toggle> | test [| proved-red: <sha>]

- One row per **Tier-0 protection**, and for a Tier-0 requirement one per
  fail-if arm and, per arm, one per way in that reaches its subject (the
  bounded set, below): the sibling of a ratified Tier-0 rule
  row (`tier` = 0) or Tier-0 requirement, which *attempts the forbidden
  thing* against the locally running app through its real public surface,
  in the same Docker-only harness as every other ledger test. Reads confirm
  a guard is present and correct; only an attempt establishes that it
  holds. The measured class: a correct publication guard defeated by a
  different path erasing the state it read, and a rate-limit bound defeated
  by one rotated client-identity header — both present, both correct, both
  bypassed. The must-never-happen list, executed instead of trusted.
- `attempt` — one falsifiable sentence naming the forbidden thing the probe
  commits, never the guard it hopes to meet ("submit the same form twice
  concurrently, expect exactly one record", not "double-submit is guarded").
- `protects:` — the ratified protection this row is a sibling of: a
  Tier-0 rule row, a Tier-0 requirement, or a Tier-0 ROW (a ratified genus
  protection — the court resolves a ROW target to its REQ). Absent,
  the row is a sibling of nothing and is rejected.
- `disable:` — the named, reversible way that protection is turned OFF so
  the probe can be watched failing. Required; `none` and `n/a` are not
  values. It is a LOCAL mutation performed at materialisation and reverted
  in the same sitting (remove the guard clause, build without it) — never a
  runtime switch that ships. A guard with a production kill-switch is not a
  guard; the toggle is written down so the ritual can be re-run, not so the
  product can be unlocked.
- `test` — path under tests/invariants/, or `owed: <reason>`, as for any row.
- `proved-red:` is **mandatory** here, not optional as it is for a ROW row:
  a cited probe test with no proved-red is a GAP, not debt. A probe never
  observed failing is not evidence, and unlike an ordinary row it is
  evidence with the polarity that reassures.

### The bounded set

Derived mechanically from the ratified Tier-0 protections, never invented:
one probe per Tier-0 rule or invariant; for a Tier-0 requirement, one per
fail-if arm (as `checks/prd.sh` splits them) and, per arm, one per way in
that reaches its subject — the design's screens, each journey's entry
control, every input boundary ARCHITECTURE.md declares — the way in named
in the `attempt` sentence (0.26.10.29.4 phase 3, R3). checks/inventory.sh
prints `NOTE  REQ-n — <a> arms, <p> probes` for a requirement that fewer
rows protect than it has arms, counted as `arm-probes=<n>` on its
`inventory notes:` line; never owed. A fixed
list — explicitly not a fuzzer, not a scanner, no generated or open-ended
input exploration. Probes beyond the ratified protections are ceremony and
are deleted under the complexity law; the way to add one is to ratify the
protection it is the sibling of. The shapes these protections take,
stated as behavior so they carry to any stack:

- concurrent double-submit of the same action → exactly one record
- a replayed one-time link or token → exactly one effect, one timestamp
- a valid session for actor A requesting actor B's resource → refused, with
  an audit entry
- a transition attempted out of a state that forbids it (reject, then
  publish) → refused, whichever path sets the state
- a rotated client-identity header against a rate limit → the bound holds
- refresh mid-flow, expired-form resubmit, stale-state action → no double
  effect
- **dependency failure during the protected operation** (v0.8.1d): the
  seam the operation touches fails mid-way → the forbidden effect does
  not occur and the failure is recorded, never a silent success; the
  `disable:` toggle is the fail-closed handling itself (the measured
  class: an erasure that failed open when its store was down, whose probe
  counted residue through the pointer it had just blanked)
- **concurrency against the protected operation** (v0.8.1d): two
  simultaneous attempts → exactly one effect; the toggle is the
  serialisation guard

### The fail-first ritual (mandatory, §4.2)

A hostility probe passing proves nothing until it has been watched failing:
"refused" is equally green when the attempt was malformed and never reached
the guard at all. At materialisation, in one sitting, per probe:

1. **Prove the runner can go red** — invoke it with a selector naming a test
   that does not exist. Runners commonly exit 0 on a selection that matches
   nothing; wired that way, every probe below is a green that can never go
   red, which is worse than no probe at all. If it exits 0, fix the
   invocation before any probe is trusted.
2. **Disable** the protection by the row's own `disable:` toggle and run the
   probe. It MUST fail, and fail on its assertion about the forbidden effect
   — not on a connection error, a 404, or a fixture fault. A red for the
   wrong reason is the same false assurance in the other direction.
3. **Restore** the protection and run the probe. It MUST pass.
4. **Stamp** `proved-red: <sha>` — the commit at which step 2 was observed.

A probe with no verified failing state is REJECTED at materialisation: the
row stays `owed:` until the ritual is performed. checks/inventory.sh
enforces the mechanical half — a missing `protects:`, a missing or `none`
`disable:` toggle, and a cited test with no `proved-red` are GAPs that fail
the commit; a Tier-0 rule row with no hostility sibling is owed debt that
blocks completion (`--strict`); a ROW a hostility row's `protects:` names
by its ROW id, with no control sibling, is a NOTE, counted on its own line
(`inventory notes: control-siblings=<n>`) and never owed (0.26.10.29.3,
R5). The honesty of steps 1–3 is the builder's,
and the row is what the graders read.

Granularity is **screen × state** — the zero-results, expired, and error
variants are where gaps hide. Mandatory row classes, generated, not
judged: (1) every drawn screen × state, one surface row per applicable auth
state; (2) every requirement with a Fail-if, one behavior row; (3) **the
shell** in each auth state — header, footer, primary nav, error pages, empty
states; (4) reachability — every required surface reachable from an entry
point in its auth state, every default-navigation link resolves, a session
implies a sign-out control, no anonymous-only control shown authenticated or
vice versa; (5) every critical PRD journey end-to-end, one row each.

Browser-class rows (shell, reachability, journeys, the surface
instrument) are ledger tests in the engines the harness contract declares,
inside the container-only harness. **The sizing is law (v0.9.2 3.4,
R7):** ~5 shell rows + ~10 journey rows + one instrument for all screens
— written, for new projects, as a ledger test file per screen (its states
together, up to 5 rows a file; v0.9.8.1 R18), every file through the one
measure module, produced by the surface test-author pass
from the rows, the canvases and the measure module, one case per surface
row (screen × state × auth state), loading each state once per engine,
reading every load-bearing paint property in one evaluate, checking the
state's content, stray controls (the denominator: the whole page minus
the shell) and console errors, then the row's `pins:` hook on that same
loaded page. Surface rows cite their screen's file (its head carries the
row table); a surface test, or a pins hook, written by the builder is a
defect. Other new test files hold one row, or up to 5 related rows.

## Rows

```vid-inventory
grammar: 0.9.3
ROW-001 | behavior | REQ-001 | anonymous | n/a | After any change, the shown count equals the number of characters in the box, where each space, each line break, each accented letter (typed as one code point or as a letter plus a combining accent) and each emoji (however many joined parts it is built from, flags and skin tones included) counts as one, each invisible character standing on its own (a zero-width space, a soft hyphen, a direction mark) counts as one, and an invisible joiner or modifier attached to the letter or emoji before it is part of that character, and leading or trailing spaces, a trailing line break, tabs, no-break spaces and a box of only spaces count in full; the rule is checked on independently sampled and generated strings (for example the Unicode grapheme-break test sequences, emoji with skin tones, variation selectors and keycaps, a keycap such as 1️⃣, #️⃣ or *️⃣ counting as one), never only on named examples, and the expected counts come from Unicode's published grapheme-break test data for a pinned Unicode version, never from the browser under test, corrected by the owner's rule where the two differ: a combining mark, joiner, modifier or selector that follows a space, a tab, a line break or any other character that is not a letter or an emoji counts as one of its own, as does a prepended mark (sampled cases include a space then a lone skin-tone swatch, a space then a joiner, and a space then a combining accent, each counting 3 with a letter before them). | REQ-001 | owed: spec-only — first stage | origin: REQ-001
ROW-002 | behavior | REQ-001 | anonymous | n/a | After text is pasted, cut, dropped or undone, the shown count reflects the new text at once, with no further key pressed; "at once" means read once, with no retrying, before the next screen update after the edit, and read again after one second with no input. | REQ-001 | owed: spec-only — first stage | origin: REQ-001
ROW-003 | behavior | REQ-001 | anonymous | n/a | The count shows characters used against the limit, in the form "<used> / 500" (for example "123 / 500"), never characters remaining. | REQ-001 | owed: spec-only — first stage | origin: REQ-001
ROW-004 | behavior | REQ-001 | anonymous | n/a | With more than 500 characters in the box, the count shows the real number (for example "523 / 500"), never stopping at 500 and with no thousands separator. | REQ-001 | owed: spec-only — first stage | origin: REQ-001
ROW-005 | behavior | REQ-002 | anonymous | n/a | With exactly 500 characters in the box no over-limit message is shown, and with 501 the message is shown and stays shown while the text stays above 500 — still after ten seconds with no input, and still after typing on to 600. | REQ-002 | owed: spec-only — first stage | origin: REQ-002
ROW-006 | behavior | REQ-002 | anonymous | n/a | Once the text is brought back from above 500 to 500 characters or fewer, by deleting, cutting or undoing, the over-limit message is no longer shown. | REQ-002 | owed: spec-only — first stage | origin: REQ-002
ROW-007 | behavior | REQ-002 | anonymous | n/a | Typing, pasting or dropping text that takes the box past 500 characters is accepted whole: no key press is refused and no text is cut, so the box holds every character entered. | REQ-002 | owed: spec-only — first stage | origin: REQ-002
ROW-008 | behavior | REQ-002 | anonymous | n/a | For text near the limit whose code units, code points and visible characters all differ — holding at least one emoji made of a surrogate pair, one emoji made of several code points (a skin-tone modifier or a joined sequence) and one letter with a combining accent — the over-limit message is shown exactly when the shown count is above 500 and hidden exactly when it is 500 or fewer. | REQ-002 | owed: spec-only — first stage | origin: REQ-002
ROW-009 | behavior | REQ-003 | anonymous | n/a | One press of the clear button empties the box, with no confirmation, dialog or other question before it. | REQ-003 | owed: spec-only — first stage | origin: REQ-003
ROW-010 | behavior | REQ-003 | anonymous | n/a | Right after clearing a box that was above 500 characters, the count shows "0 / 500" and the over-limit message is not shown. | REQ-003 | owed: spec-only — first stage | origin: REQ-003
ROW-011 | behavior | REQ-003 | anonymous | n/a | Undo pressed right after clearing brings back the exact text that was cleared, and the count and the message follow it. | REQ-003 | owed: spec-only — first stage | origin: REQ-003
ROW-012 | behavior | CON-001 | anonymous | n/a | While the page loads and while the person types, pastes and clears, the page makes no network request other than loading its own shipped site/ files, sets no cookie, writes nothing to localStorage, sessionStorage, IndexedDB, the Cookie Store or the origin-private file system, leaves window.name empty and the history entry's state empty, leaves the page's address unchanged, and leaves the page's title as it was at load (no text or count in the tab title or history). | CON-001 | owed: spec-only — first stage | origin: CON-001
ROW-013 | behavior | CON-001 | anonymous | n/a | control of ROW-012: with the network cut after the page has loaded, typing, the count, the over-limit message and clearing all still work. | CON-001 | owed: spec-only — first stage | origin: CON-001
ROW-014 | behavior | CON-002 | anonymous | n/a | After text is typed, a reload, and separately a navigation away and back that the browser serves from its back-forward cache (the page reports it was restored from that cache), both show an empty box with the count "0 / 500" and no message; and the text box tells the browser not to remember its content (autocomplete="off"). | CON-002 | owed: spec-only — first stage | origin: CON-002
ROW-015 | behavior | CON-003 | anonymous | n/a | The page declares Spanish as its language; the full set of words it shows or ships for people to read — the title, labels, placeholder, button text, tooltips and accessible names — equals an expected list written in Spanish addressing the person as tú, with no whole word in usted (for example "su", "usted", "ingrese", "introduzca", "pegue", "escriba", "borre", "limpie") and the document called "CV" (never "currículum" or "hoja de vida"); and the over-limit message reads exactly "Tu resumen supera los 500 caracteres. Acórtalo para que quepa." | CON-003 | owed: spec-only — first stage | origin: CON-003
ROW-016 | shell | / | anonymous | n/a | The page loads at its address with a Spanish title, one labelled text box, the count "0 / 500", the clear button and no over-limit message, no console error, and no control beyond these. | REQ-001, REQ-003 | owed: spec-only — first stage | origin: derivation 2026-11-24
ROW-017 | reachability | / | anonymous | n/a | The page is reached from its entry address and from /index.html, and every link on it, if any, resolves. | REQ-001 | owed: spec-only — first stage | origin: derivation 2026-11-24
ROW-018 | journey | / | anonymous | n/a | The person writing their CV summary arrives with a summary to fit (off_screen), writes it, trims it under the limit, may clear and undo, and leaves with nothing kept (off_screen). transitions: (1) person at the empty page · the text box · types or pastes a draft · the box holds the text · the count shows its length out of 500; (2) person at a text of 500 or fewer · the text box · keeps typing past 500 · over the limit · the over-limit message appears and nothing typed is refused; (3) person over the limit · the text box · deletes text down to 500 or fewer · within the limit · the message disappears and the count follows; (4) person at any text · the clear button · presses it · an empty box · the count shows "0 / 500" and no message; (5) person at a just-cleared box · undo (Ctrl+Z) · presses undo · the text is back · the count shows the restored text's length | REQ-001, REQ-002, REQ-003 | owed: spec-only — first stage | origin: derivation 2026-11-24
ROW-019 | behavior | REQ-001 | anonymous | n/a | After text arrives with no key press, the shown count reflects the new text at once, each edit made as the browser itself makes that kind of edit, never by setting the box's value: in Chromium, an input-method commit and an emoji insert through the browser's own input-method and text-insertion path, a replacement (as autocorrect and a predictive suggestion make) as an insert-text command over a selected word, a redo through the browser's redo command, and a drag inside and a drag out of the box as real drags; dictation is not driven by the harness and is left to the real-device check; "at once" means read once, with no retrying, before the next screen update after the edit, and read again after one second with no input. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-020 | behavior | REQ-001 | anonymous | n/a | During and after composition — an accent typed with a dead key (´ then e), and a word still being composed as phone keyboards do — the count equals the characters shown, a finished accented letter counting once, and it is never left one step behind once composition ends, including when the composition's last input event is still marked as composing and no input event follows its end; driven as a real composition in Chromium. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-021 | behavior | REQ-002 | anonymous | n/a | The page never changes what the person entered: double and trailing spaces, accents typed in two parts and every other character stay exactly as entered, and a character typed mid-text leaves the caret right after it, both below 500 characters and above it (for example at 520, typing at position 100). | REQ-002 | owed: spec-only — first stage | origin: domain
ROW-022 | behavior | CON-003 | anonymous | n/a | Served with no charset in its Content-Type, the page still shows every accented letter of its labels and of the over-limit message correctly, and index.html declares UTF-8 within its first 1024 bytes. | CON-003 | owed: spec-only — first stage | origin: domain
ROW-023 | behavior | REQ-001 | anonymous | n/a | The obligations of ROW-001, ROW-002, ROW-008, ROW-011, ROW-014, ROW-024, ROW-032, ROW-033, ROW-043, ROW-046 and ROW-048 hold alike in the Chromium, Firefox and WebKit browser engines; of ROW-019, the drags and the replacement run in all three engines, while the input-method commit and the emoji insert run in Chromium only, and the rest is left to the real-device check of the grading checklist. | REQ-001, REQ-002, REQ-003, CON-002 | owed: spec-only — first stage | origin: domain
ROW-024 | behavior | REQ-001 | anonymous | n/a | Whatever the box holds after a load, a reload or a back navigation, the count and the message agree with it at once, never a stale "0 / 500" beside restored text. | REQ-001, CON-002 | owed: spec-only — first stage | origin: domain
ROW-025 | behavior | REQ-001 | anonymous | n/a | With the page's script blocked from running, the page shows no count that looks like a reading, so no "0 / 500" stays on screen while typing changes nothing, and no over-limit message is visible. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-026 | behavior | CON-001 | anonymous | n/a | Typing, pasting, clearing and undoing leave the system clipboard exactly as it was before. | CON-001 | owed: spec-only — first stage | origin: domain
ROW-027 | behavior | CON-001 | anonymous | n/a | control of ROW-026: the person can still select the box's text and copy it by hand, and the clipboard then holds exactly that text. | CON-001 | owed: spec-only — first stage | origin: domain
ROW-028 | behavior | CON-001 | anonymous | n/a | Pasting or dropping formatted content (HTML holding a remote image, bold text and a list) puts plain text only into the box, loads nothing from any other address, and counts each line break once. | CON-001, REQ-001 | owed: spec-only — first stage | origin: domain
ROW-029 | behavior | CON-001 | anonymous | n/a | control of ROW-028: pasting plain text of several lines keeps every line break, and the count includes each as one. | CON-001, REQ-001 | owed: spec-only — first stage | origin: domain
ROW-030 | behavior | CON-001 | anonymous | n/a | Loaded with text in its address (a query such as ?texto=hola, or a fragment such as #hola), the page opens with an empty box and "0 / 500": nothing from the address enters the box. | CON-001 | owed: spec-only — first stage | origin: domain
ROW-031 | behavior | CON-001 | anonymous | n/a | control of ROW-030: loaded with a query or a fragment in its address, the page still works: typing is counted and clearing clears. | CON-001 | owed: spec-only — first stage | origin: domain
ROW-032 | behavior | REQ-003 | anonymous | n/a | After undo has brought cleared text back, the browser's own undo command (the edit menu's Undo as the browser runs it, not a key the page listens for) restores it too, a redo then empties the box again, and further undos step back through earlier edits without ever doubling the text. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-033 | behavior | REQ-003 | anonymous | n/a | Pressing clear twice in a row and then undoing (repeated if needed) brings back the original text exactly, never an empty box. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-034 | behavior | REQ-003 | anonymous | n/a | After one press of clear, with no further click, the characters the person types and the undo they press go to the text box. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-035 | behavior | REQ-002 | anonymous | n/a | However often the text crosses 500 upward — by typing, pasting, dropping, after deleting, after clear and undo — exactly one over-limit message is shown each time, at once, with no further key pressed, and it goes at once when the text comes back to 500 or fewer by any of those ways, never stacked copies. | REQ-002 | owed: spec-only — first stage | origin: domain
ROW-036 | behavior | REQ-002 | anonymous | n/a | At exactly 500 characters none of the over-limit styling the page uses at 501 (a colour, a mark on the box or the count) is present, and at 501 it is; and after coming back down from 501 — by deleting, and by clearing then typing again — it is gone at 500 and below. | REQ-002 | owed: spec-only — first stage | origin: domain
ROW-037 | behavior | REQ-003 | anonymous | n/a | Pressing clear while a word is still being composed (an input-method or phone-keyboard composition) leaves the box empty: the composing word does not come back on the next key, the next letter typed gives "1 / 500", and undo still brings the cleared text back. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-038 | behavior | REQ-001 | anonymous | n/a | Resizing the window or rotating between portrait and landscape, with text past 500 in the box, leaves the text, the count and the single message unchanged. | REQ-001, REQ-002 | owed: spec-only — first stage | origin: domain
ROW-039 | behavior | CON-001 | anonymous | n/a | At its live address the page serves files identical to the shipped site/ files, and loading, typing and clearing there make no request beyond them, set no cookie and log no console error. | CON-001 | owed: paid by /vid deploy gate 2 — the page at its live address, after the owner publishes it | origin: domain
ROW-040 | behavior | CON-001 | anonymous | n/a | At its live address the page is served only over HTTPS: the plain-HTTP address redirects to HTTPS, the HTTPS response carries Strict-Transport-Security with a max-age of at least 31536000 seconds, and nothing loads over plain HTTP. | CON-001 | owed: paid by /vid deploy gate 2 — the page at its live address, after the owner publishes it | origin: domain
ROW-041 | behavior | REQ-002 | anonymous | n/a | With the stylesheet blocked from loading, the count reads "0 / 500", no over-limit message is visible, and the 500/501 boundary of ROW-005 still holds. | REQ-002 | owed: spec-only — first stage | origin: domain
ROW-042 | behavior | REQ-001 | anonymous | n/a | With the browser's grapheme-counting facility removed before the page's script runs, or the count failing at runtime, typing never leaves "0 / 500" or the last value beside text that has changed: run on the sampled and generated strings of ROW-001 (flags, skin tones, keycaps, variation selectors, combining accents), the page shows no reading at all and no over-limit message, never a count from a fallback of its own. | REQ-001, CON-004 | owed: spec-only — first stage | origin: domain
ROW-043 | behavior | REQ-001 | anonymous | n/a | Text typed or pasted into the box while the page's script is still loading is still there once it runs, and the count and the message agree with it at once. | REQ-001, CON-002 | owed: spec-only — first stage | origin: domain
ROW-044 | behavior | REQ-001 | anonymous | n/a | Across the journey's steps and pastes of unusual but legal text (a lone surrogate, a null character, right-to-left text and direction marks, a block of 2,000 characters) no uncaught error is logged and the count keeps following the box. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-045 | behavior | CON-001 | anonymous | n/a | The page declares its own icon as an empty inline icon (data:,), so on load, and when served from a subfolder, the browser requests nothing outside the page's own files and nothing from the host's root. | CON-001 | owed: spec-only — first stage | origin: domain
ROW-046 | behavior | REQ-001 | anonymous | n/a | After the person's own deletions and replacements — deleting a word, deleting to the start of the line, the forward Delete key, deleting a selection, typing or pasting over a selection, choosing a spelling suggestion — each made as the browser itself makes that kind of edit, never by setting the box's value, the count equals the characters in the box. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-047 | behavior | REQ-001 | anonymous | n/a | A box the person empties by their own editing (select all then delete, deleting back to the start, cutting everything) shows "0 / 500" in every engine. | REQ-001 | owed: spec-only — first stage | origin: domain
ROW-048 | behavior | REQ-001 | anonymous | n/a | Typing or pasting followed at once, with no wait, by clear, undo or redo — and a quick burst of these — leaves the count and the message matching the box's final text, read once with no retrying right after the last action and again after one second with no input. | REQ-001, REQ-002, REQ-003 | owed: spec-only — first stage | origin: domain
ROW-049 | behavior | REQ-003 | anonymous | n/a | Clear, then undo, then clear again empties the box again, and a further undo brings the text back again. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-050 | behavior | REQ-003 | anonymous | n/a | The clear button is reached with Tab from the box, and Enter and Space each clear the box once, with undo then restoring the text and the count following it. | REQ-003 | owed: spec-only — first stage | origin: domain
ROW-051 | behavior | CON-001 | anonymous | n/a | With text in the box, switching to another tab, staying idle 60 seconds, navigating away and closing the tab make no network request to any host — every request the browser attempts is observed, with all of the browser's traffic routed to the harness's own listening host outside the page — set no cookie and write no storage of any kind. | CON-001 | owed: spec-only — first stage | origin: domain
rule | RULE-001 | No file the page ships contains a way to send or store data: no network call, no storage write, no cookie, no change to the page's address or title, no clipboard write | find . -type f -path './site/*' :: grep -LE 'fetch\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|localStorage|sessionStorage|indexedDB|document\.cookie|caches\.|serviceWorker|window\.name *=|location *=|location\.(hash|search|href) *=|location\.(assign|replace)\(|window\.open\(|history\.(pushState|replaceState)|document\.title *=|navigator\.clipboard|execCommand\(.copy|new Image|\.src *=|setAttribute\(|url\(|Worker\(|createElement\(.(img|script|link|iframe)|import\(|ping=|postMessage|BroadcastChannel|navigator\.share|<iframe|http-equiv=.refresh|speechSynthesis|SpeechSynthesisUtterance|SpeechRecognition|getUserMedia|RTCPeerConnection|WebTransport|new Notification|setAppBadge|cookieStore|navigator\.storage|getDirectory\(|showSaveFilePicker|requestFileSystem|createObjectURL|download=|\.download *=|createElement\(.a.\)|\.href *=|<form' /dev/null $(find . -type f -path './site/*') | 0 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: CON-001
hostility | HOS-001 | With one line added to the page's script that sends the box's text to the harness's listening host by a path the rule's word list does not name (a request function reached through a computed property name, for example window['fe'+'tch']), in one session type a summary, paste text, go past 500, press clear, stay idle 30 seconds, then hide the page and close it; recorded at the browser's network exit outside the page from the start of load, expect no request to any host other than the page's own address at any moment, no request to the page's own address after load, and every storage the page can reach still empty at the end; with the line removed the same probe passes | protects: RULE-001 | disable: insert into site/main.js's input handler one line that calls window['fe'+'tch'] with the harness listener's address and the box's text, then remove it | owed: guard-first — RULE-001; paid in the slice that builds site/main.js
hostility | HOS-003 | With one line added to site/main.js that calls fetch with the harness listener's address and the box's text, run RULE-001's census and expect it to name site/main.js as unguarded; with the line removed the census passes | protects: RULE-001 | disable: insert into site/main.js one line calling fetch with the harness listener's address and the box's text, then remove it | owed: guard-first — RULE-001; paid in the slice that builds site/main.js
rule | RULE-002 | No key, keypress or change listener decides the count: the count follows the text box's input event, the clear action, and a recount at load and when the page is shown again | find . -type f -path './site/*' :: grep -LE "addEventListener\( *['\"](keyup|keydown|keypress|change)['\"]|on(keyup|keydown|keypress|change) *=" /dev/null $(find . -type f -path './site/*') | 1 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain REQ-001
rule | RULE-003 | No file the page ships writes HTML from strings or runs strings as code | find . -type f -path './site/*' \( -name '*.js' -o -name '*.html' \) :: grep -LE 'innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\(|new Function' /dev/null $(find . -type f -path './site/*' \( -name '*.js' -o -name '*.html' \)) | 1 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain CON-001
rule | RULE-004 | Every local reference in the page (src, href) is relative and names a shipped file exactly, letter case included, so the page works under any folder of any host | checks/extractors/invariant.local-refs.sh | 1 | owed: census-armed — the extractor is generated with the code skeleton; armed when the first stage writes the rule's test | origin: domain REQ-001
rule | RULE-005 | No file the page ships names another site: no absolute (http:, https:) or protocol-relative (//) address in any attribute, stylesheet or script, so nothing preconnects, prefetches or imports from elsewhere (a code comment is written with a space after //) | find . -type f -path './site/*' :: grep -LE '(https?:)?//[A-Za-z0-9]' /dev/null $(find . -type f -path './site/*') | 0 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain CON-001
hostility | HOS-002 | With a link to another site's address added to the page (a preconnect to the harness's outside host), load the page and expect the outside host, counting accepted connections at its socket, to receive none; with the link removed the same probe passes, and a control load with the guard off shows the browser does open the connection | protects: RULE-005 | disable: add to site/index.html one preconnect link to the harness's outside host, then remove it | owed: guard-first — RULE-005; paid in the slice that builds site/index.html
rule | RULE-006 | Every script the page ships is included exactly once, so no two copies of the counting code run at the same time | checks/extractors/invariant.script-once.sh | 1 | owed: census-armed — the extractor is generated with the code skeleton; armed when the first stage writes the rule's test | origin: domain REQ-002
rule | RULE-007 | The text box is the browser's own plain-text field: no file the page ships makes an element editable as rich content | find . -type f -path './site/*' \( -name '*.js' -o -name '*.html' \) :: grep -LiE 'contenteditable|designMode' /dev/null $(find . -type f -path './site/*' \( -name '*.js' -o -name '*.html' \)) | 1 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain REQ-001
rule | RULE-008 | No file the page ships carries a real person's contact details: no email address and no phone number in the page, its placeholder, its comments or anything else published; a run of seven or more digits, however spaced, dotted, hyphenated or bracketed, counts as a phone number, so no shipped file holds one | find . -type f -path './site/*' :: grep -LE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|[0-9]([ ().-]?[0-9]){6,}' /dev/null $(find . -type f -path './site/*') | 1 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain CON-001
rule | RULE-009 | The count never depends on the kind of edit: no shipped code reads the input event's kind to decide whether, or how, to recount | find . -type f -path './site/*' :: grep -LE 'inputType' /dev/null $(find . -type f -path './site/*') | 1 | owed: census-armed — no site exists before the code skeleton; armed when the first stage writes the rule's test | origin: domain REQ-001
```
