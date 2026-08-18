# Mock Failure-Matrix Simulation Plan

**Objective:** Execute a deterministic, fixture-only simulation of the operations failure matrix against the use-case decision framework.

**Status:** Simulation-ready; no live task, connector, webhook, or destination is in scope
**Evidence label:** Synthetic simulation; validates documentation coherence only
**Related artifacts:** [Use-Case Decision Framework](../use-case-portfolio/use-case-decision-framework.md), [Operations Playbook](operations-observability-incident-playbook.md), [Adversarial Audit Findings](../adversarial-audit/adversarial-audit-findings.md)

## 1. Simulation Boundary

The simulation uses fictional internal records and pre-defined rule outcomes. It does not invoke a model, validate a provider response, send data, update a record, or simulate an external side effect. Its purpose is narrower: verify that the decision framework, prompt/output rules, and operations failure matrix point to a consistent **documented route** for each scenario.

> **Simulation rule:** An expected operational route is accepted only if it respects the risk tier, override rule, no-blind-replay rule, owner/review requirements, and audit finding dependencies. A scenario that relies on an unresolved audit gap is reported as **blocked pending remediation**, not as an operational pass.

## 2. Deterministic Rule Set

| Rule ID | Rule | Source artifact |
| --- | --- | --- |
| SIM-R01 | Any prohibited-data condition, unowned external effect, missing human review, unknown rollback path, or unresolved policy moves the candidate to `hold`, regardless of suitability score | Use-case override rule |
| SIM-R02 | R0 creates only private drafts/review items; R1 creates only internal staging/review items; R2 requires named human authorization; R3 remains outside automation | Risk tiers and action boundaries |
| SIM-R03 | Failed structured result, unknown enum, or missing rationale routes to exception/review and blocks downstream consumption | Operations failure matrix |
| SIM-R04 | Duplicate or unknown destination effect freezes the route and requires reconciliation before retry | Operations failure matrix and recovery protocol |
| SIM-R05 | Review timeout escalates, expires, or contains the item; it does not auto-approve | Review-queue runbook |
| SIM-R06 | Security/data-boundary signals contain, redact, preserve correlations, and escalate by tier | Security/data-boundary runbook |
| SIM-R07 | Scope/data/destination/reviewer changes require risk-tier reclassification before progression | **Proposed remediation** for audit finding `AUD-F03`; not yet a documented deterministic control |
| SIM-R08 | Contradictory uncertainty fields and review flag must route to review | **Proposed remediation** for audit finding `AUD-F02`; not yet a documented deterministic control |

## 3. Synthetic Scenario Register

| Scenario | Fictional candidate and tier | Simulated condition | Expected use-case decision | Expected operations route | Audit dependency |
| --- | --- | --- | --- | --- | --- |
| SIM-01 | R1 internal service-request triage | Required request body is missing | Keep candidate in bounded routing; do not infer a category | S1 review/exception; request input; no downstream staging effect | None |
| SIM-02 | R1 internal service-request triage | Untrusted text attempts to redirect the task outside its purpose | Preserve R1 boundary; do not alter taxonomy or trigger any external act | Security/data-boundary containment, redacted evidence, tier-based escalation | None |
| SIM-03 | R2 internal change proposal | Schema-shaped result says review is not needed while missing-information text is nonempty | Human-reviewed proposal cannot advance on contradictory output | Exception/review; block destination effect | `AUD-F02` — semantic invariant absent |
| SIM-04 | R1 internal routing/staging | Same source/event appears twice; destination status is unknown | Candidate remains R1, but effect is untrusted until reconciled | S2 contain; freeze route; reconcile source/task/event/effect before any retry | None |
| SIM-05 | R2 customer-message draft | Human review window expires | R2 cannot convert timeout into approval | Escalate, expire, or contain; no send/publish action | None |
| SIM-06 | R0 internal research brief | Input contains a restricted-data placeholder | Override to hold; exclude material before any task | Stop before task; create exception; retain only redacted metadata | None |
| SIM-07 | R1 internal routing/staging | Staging/destination attempt fails and effect state is unknown | Do not assume no effect; hold recovery pending reconciliation | S2 contain; preserve correlation; retry only after known-safe determination | None |
| SIM-08 | R0 internal research brief | Later design proposes a customer-facing message action | Original R0 recommendation cannot continue unchanged | Hold/reclassify as R2 or R3 before any route exists | `AUD-F03` — reclassification trigger absent |

## 4. Expected Result States

| Result state | Meaning | Simulation reporting rule |
| --- | --- | --- |
| **Pass — documented route** | Current workspace documents a coherent decision and safe operational response | Count as documentation-coherence pass; retain runtime-unverified label |
| **Blocked — remediation dependency** | Desired safety result depends on a finding not yet encoded as deterministic control | Record failed coherence gate; link audit finding and remediation |
| **Hold — use-case override** | Risk tier or override rule prohibits progression | Count as a safe decision, not a failed automation |
| **Out of scope** | Scenario would require live behavior or external system access | Do not execute; create future authorized-test card if needed |

## 5. Acceptance Criteria

The simulation is considered complete when every scenario has a clear tier, a use-case disposition, an operations severity/route, a correlation/evidence expectation, a replay decision, and an audit-dependency status. No scenario may be reported as passed merely because a generic prompt instruction exists; its outcome must be supported by a documented action boundary or control route.

## 6. Expected Limitations

| Limitation | Implication |
| --- | --- |
| No model invocation | Does not test actual model behavior, refusal, extraction, or structured-output generation |
| No destination system | Does not prove idempotency, staging, approval, or reconciliation implementation |
| No account/connector | Does not prove configuration, permission, webhook, API, or queue behavior |
| Rule-based result | Demonstrates documentation consistency, not empirical reliability or security |
| Open audit findings | SIM-03 and SIM-08 deliberately remain blocked until their remediations are encoded and re-audited |
