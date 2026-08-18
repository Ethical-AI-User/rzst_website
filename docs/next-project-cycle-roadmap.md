# Next Project Cycle Roadmap

**Objective:** Provide a sequenced, decision-gated roadmap for the Manus–Zapier living-document program after the completed manual, workspaces, audit, simulation, patch proposal, and executive assurance briefing.

**Status:** Prepared for future owner decision; no next-cycle implementation has started
**Evidence label:** Planning recommendation; not a runtime or production authorization
**Prerequisite register:** [Living Project Milestone Register](living-project-milestone-register.md)
**Current decision briefing:** [Executive Runtime-Effectiveness Assurance Briefing](workspaces/executive-runtime-effectiveness-assurance-briefing.md)

## 1. Roadmap Principle

The next cycle should proceed through bounded decisions rather than a single “go live” motion. Design remediation, runtime testing, and operating adoption answer different questions and require different evidence. No stage below implies approval of a later stage.

> **Progression rule:** First accept and re-test the design controls. Then, only with explicit authorization, collect implementation evidence using fictional data and non-consequential destinations. Consider a narrowly bounded R0/R1 pilot only after the prior gates are met and accountable owners have reviewed the evidence.

## 2. Staged Roadmap

| Stage | Objective | Primary work | Completion evidence | Decision gate | Status |
| --- | --- | --- | --- | --- | --- |
| **0. Governance and scope selection** | Establish accountable decision makers and select the next bounded goal. | Name business, technical, and risk/security owners; decide whether to accept/revise the AUD-F02/F03 proposal; select at most one candidate R0/R1 process for future evaluation. | Named owners, decision record, selected or deferred candidate, confirmed no-external-action boundary. | G0 — Authorize design remediation only. | Prepared; not started |
| **1. Accept and incorporate AUD-F02/F03** | Convert proposed controls into governing design artifacts. | Review the review-signal invariant and material-change reclassification gate; update contract, use-case, operations, handoff, audit, and change-log documentation after acceptance. | Approved patch version, owner signatures/decision record, revised artifact links. | G1 — Confirm design-control incorporation. | Prepared; not started |
| **2. Re-test accepted design controls** | Verify that accepted documents resolve the two previously blocked coherence cases. | Re-run A-08/H-02 fixtures and SIM-03/SIM-08 against the accepted artifacts; preserve baseline and delta. | Re-test record that distinguishes design acceptance from runtime proof. | G2 — Decide whether to prepare a non-production charter. | Prepared; not started |
| **3. Close or prioritize remaining audit gaps** | Address AUD-F01, AUD-F04, and AUD-F05 deliberately. | Propose deterministic template assembly/provenance control, trusted-field provenance, and reviewer-facing output hygiene; add fixtures and owners. | Risk-prioritized remediation backlog and approved work sequence. | G3 — Confirm residual risk posture for a future test scope. | Prepared; not started |
| **4. Prepare non-production test charter** | Define an authorized, reversible implementation-evidence program. | Select fictional data, non-production environment, no-external-action destination, acceptance criteria, cleanup method, correlation record, and stop conditions. | Approved test charter and experiment cards. | G4 — Explicitly authorize scoped testing. | Prepared; not started |
| **5. Run authorized non-production assurance tests** | Observe whether a named configuration enforces the documented controls. | Inspect contract assembly/validation/configuration; execute fictional positive, negative, review, timeout, duplicate/unknown-effect, and evidence-retention tests. | Observed test records, expected/actual results, redacted evidence, anomalies, cleanup, and change impacts. | G5 — Decide pilot, remediate, pause, or retire. | Deferred pending G4 |
| **6. Consider one controlled R0/R1 pilot** | Test a bounded real operating process only if prior evidence supports it. | Complete a candidate intake card; enforce monitoring/correlation and pause/rollback; set owner-defined review cadence and guardrails. | Pilot charter, owner approval, operating evidence, and expand/pause/retire decision. | G6 — Operating-governance decision. | Deferred pending G5 |
| **7. Ongoing assurance and source maintenance** | Keep the living document credible after any adoption. | Review incidents, change records, source changes, versions, evidence retention, contract drift, and metrics periodically. | Updated change log, evidence register, milestone register, and operating review record. | Recurring governance review. | Continuous after a pilot, otherwise periodic documentation review |

## 3. Immediate Decision Package

The next interaction should resolve the following questions before any implementation or testing is considered.

| Decision | Options | Recommended constraint |
| --- | --- | --- |
| AUD-F02/F03 proposal | Accept as written, accept with edits, or defer | Do not label the findings closed until the accepted version is incorporated and re-tested. |
| Candidate use case | Select one R0/R1 candidate, or defer selection | Do not choose R2/R3 as the first runtime-assurance candidate. |
| Accountability | Name business, technical, and risk/security owners, or defer | No runtime test without named owner and stop authority. |
| Environment | Authorize fictional-data non-production discovery later, or defer | No production account change, real data, or external action by default. |
| Remaining audit gaps | Prioritize F01, F04, F05 now or schedule them after F02/F03 acceptance | Do not let a later patch bypass the material-change gate. |

## 4. Success Criteria by Horizon

| Horizon | Success means | It does not mean |
| --- | --- | --- |
| Near term — design | Open controls are specific, owned, versioned, and re-tested as documents | A live integration is secure or effective |
| Medium term — non-production assurance | A named configuration produces expected results for approved fictional fixtures | Every account, destination, or future version is covered |
| Longer term — controlled operation | One bounded use case has evidence-informed owner decisions, monitoring, review, and recovery | High-consequence automation is approved |

## 5. Constraints That Remain in Force

The roadmap preserves the existing boundaries: no credentials in documentation, no unapproved connector enablement, no real sensitive data, no external messaging/publication/record update, no blind replay, no automatic R2 approval, and no generic R3 automation. A future test charter must state its data, destination, owner, cleanup, review, and stop conditions before it is executed.

## 6. First Recommended Next Action

The most efficient next action is **Stage 0: a design-decision review of the AUD-F02/F03 patch proposal**. That decision either gives the living document an accepted remediation baseline for Stage 1 and Stage 2, or identifies the edits required before any future assurance work is planned. It does not authorize a live system change.
