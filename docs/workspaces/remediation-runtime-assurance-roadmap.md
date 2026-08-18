# Remediation and Runtime-Assurance Roadmap

**Objective:** Define three evidence-bounded paths for advancing the Manus–Zapier living-document program after the AUD-F02/AUD-F03 findings and mock-simulation results.

**Status:** Active roadmap
**Evidence label:** Design recommendation; runtime effectiveness remains unverified
**Interaction cycle:** 2026-08-18
**Related artifacts:** [Adversarial Audit Findings](adversarial-audit/adversarial-audit-findings.md), [Mock Simulation Results](operations-readiness/mock-failure-matrix-simulation-results.md), [Documentation Change Log](../CHANGELOG.md)

## 1. Current Position

The living-document set has a documented design baseline, a fixture-only adversarial audit, and an eight-scenario synthetic simulation. It does not yet have evidence from a deployed Manus–Zapier workflow. The audit retains `AUD-F02` and `AUD-F03` as open design gaps, and the simulation deliberately blocks the scenarios that depend on them. The appropriate next step is therefore to separate **design remediation**, **runtime assurance**, and **operational adoption** rather than treating them as one undifferentiated rollout.

> **Roadmap rule:** A design proposal may resolve a documentation ambiguity only after acceptance and re-test. It cannot establish runtime effectiveness, platform configuration, permission behavior, or operational reliability without separately authorized evidence.

## 2. Three Ways to Proceed

| Path | Primary objective | Work products | Advancement gate | What it does not prove |
| --- | --- | --- | --- | --- |
| **1. Remediation-first contract hardening** | Close the known AUD-F02/AUD-F03 design gaps before any consequential implementation is considered. | Accepted patch proposal; updated task-contract metadata; deterministic semantic rules; reclassification record; new audit fixtures; re-run mock results. | `AUD-F02` and `AUD-F03` change from **open design gap** to **design control accepted and re-tested**. | That a provider, connector, destination, or reviewer workflow enforces the controls at runtime. |
| **2. Authorized runtime-assurance program** | Turn documented controls into bounded, configuration-specific evidence in a non-production environment. | Test charter; fictional-data fixtures; configuration/code review; observed test records for task assembly, output validation, review routing, reconciliation, and evidence hygiene. | Each target claim meets its defined acceptance criterion in the approved test environment, with failures recorded and resolved. | That performance and safety generalize to another account, data class, destination, or production workload. |
| **3. Low-risk controlled pilot and operating review** | Apply the framework to one selected R0 or tightly bounded R1 use case after Paths 1 and 2 produce sufficient evidence. | Approved intake card; named owners; bounded contract; correlation/monitoring record; review cadence; pilot decision log. | Owners approve an expand, pause, or retire decision based on observed quality, safety, and operational evidence. | That R2 or R3 cases are approved; R3 remains outside this generic framework. |

## 3. Recommended Sequence

The paths are compatible but should not be collapsed. **Path 1** removes known specification ambiguity. **Path 2** tests whether the accepted controls work in a scoped implementation. **Path 3** converts only sufficiently evidenced, low-risk behavior into a controlled operating practice. This sequence keeps a prompt contract from being mistaken for an authorization system and keeps a successful synthetic result from being mistaken for a production-readiness decision.

| Sequence | Decision question | Minimum evidence |
| --- | --- | --- |
| 1 | Are review signals and material scope changes governed deterministically in the design? | Approved patch, fixture re-test, revised simulation record |
| 2 | Does a named non-production configuration enforce the documented control path? | Authorized fictional-data test, configuration/consumer review, observed expected route, cleanup record |
| 3 | Is one R0/R1 use case sufficiently bounded, owned, observable, and reversible to operate narrowly? | Pilot charter, named owners, defined pause/recovery, correlation record, review of observed results |

## 4. Decision Gates

| Gate | Required decision | Evidence required | Decision owner type |
| --- | --- | --- | --- |
| G1 — Design acceptance | Accept, revise, or reject the AUD-F02/AUD-F03 patch proposal | Patch review, test fixtures, audit linkage, no unresolved contradiction | Prompt/output owner and use-case/governance owner |
| G2 — Test authorization | Authorize a scoped non-production runtime-assurance program | Fictional-data charter, named technical/risk/business owners, external-action boundary, cleanup plan | Technical owner and risk/business owner |
| G3 — Pilot authorization | Start, defer, or reject a low-risk pilot | Completed G1/G2 evidence, R0/R1 intake, rollback/pause method, review cadence | Business owner and technical owner |
| G4 — Expansion decision | Expand, hold, remediate, or retire the pilot | Quality, safety, review, incident, and recovery evidence | Business, technical, and risk owner as appropriate |

## 5. Immediate Deliverables for This Cycle

| Deliverable | Purpose | Status |
| --- | --- | --- |
| [AUD-F02/F03 Patch Proposal](prompt-output-library/aud-f02-f03-patch-proposal.md) | Concrete, reviewable specification for deterministic review invariants and material-change reclassification | Planned in this cycle |
| [Executive Runtime-Effectiveness Assurance Briefing](executive-runtime-effectiveness-assurance-briefing.md) | Decision-maker view of current evidence, assurance ladder, gates, and decisions required | Planned in this cycle |
| Updated audit and simulation records | Preserve baseline versus proposed-control re-test status | Planned in this cycle |

## 6. Open Questions

| ID | Question | Required before answer |
| --- | --- | --- |
| RA-01 | Which real R0/R1 process, if any, should become the first candidate? | User-selected process and completed intake card |
| RA-02 | Who is accountable for semantic-validator implementation and material-change approval? | Named technical and governance owners |
| RA-03 | What non-production environment and fictional-data policy are available? | Authorized test charter and data-handling decision |
| RA-04 | Which destination and reviewer experience must be tested first? | Destination inventory and reviewer workflow definition |
