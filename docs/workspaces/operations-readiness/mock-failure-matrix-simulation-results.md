# Mock Failure-Matrix Simulation Results

**Objective:** Record the deterministic, fixture-only assessment of eight fictional failure scenarios against the use-case decision framework and operations failure matrix.

**Status:** Completed synthetic simulation
**Evidence label:** Synthetic documentation-coherence result; no runtime behavior is verified
**Plan:** [Mock Failure-Matrix Simulation Plan](mock-failure-matrix-simulation-plan.md)
**Machine-readable result:** [mock-failure-matrix-results.json](mock-failure-matrix-results.json)
**Related audit:** [Adversarial Security Audit Findings](../adversarial-audit/adversarial-audit-findings.md)

## 1. Result Summary

The deterministic simulation assessed eight fictional scenarios. Five reached a **pass—documented route** because the current workspaces specify a tier-appropriate, non-blind-replay response. One produced a **safe hold** under the use-case override rule. Two were **blocked pending remediation** because the safety outcome relies on an audit finding that is not yet a deterministic documented control.

| Result state | Count | Scenarios |
| --- | ---: | --- |
| Pass — documented route | 5 | SIM-01, SIM-02, SIM-04, SIM-05, SIM-07 |
| Hold — use-case override | 1 | SIM-06 |
| Blocked — remediation dependency | 2 | SIM-03, SIM-08 |
| External side effects | 0 | All scenarios |

> **Interpretation:** The simulation shows that the current documentation consistently holds or contains missing data, scope-redirection attempts, duplicate/unknown effects, review timeouts, restricted data, and destination uncertainty. It also confirms that contradictory review signals and material scope changes cannot be marked as coherent passes until the corresponding audit remediations are added.

## 2. Scenario Outcomes

| ID | Tier / score | Fictional condition | Result | Use-case disposition | Operations route | Replay decision | Audit dependency |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SIM-01 | R1 / 10 | Required request body missing | Pass — documented route | Keep candidate bounded; do not infer category | S1 review/exception; request valid input; block staging effect | Resume only after valid input is supplied and validated | None |
| SIM-02 | R1 / 11 | Untrusted content attempts to redirect task scope | Pass — documented route | Maintain internal-routing boundary; untrusted text cannot redefine task | S2 containment if credible boundary signal; retain redacted evidence; escalate by tier | No broadened action or destination effect | None |
| SIM-03 | R2 / 12 | Review flag denies review despite missing-information signal | Blocked — remediation dependency | R2 cannot progress on internally contradictory review information | S1 exception/review; block destination effect | Re-test only after deterministic semantic invariant exists | `AUD-F02` |
| SIM-04 | R1 / 12 | Duplicate source/event and unknown destination effect | Pass — documented route | Treat effect state as unsafe to assume | S2 freeze route; reconcile source/task/event/effect chain | No retry until state is known and owner confirms safe recovery | None |
| SIM-05 | R2 / 12 | Named human review window expires | Pass — documented route | R2 requires human decision; timeout is not approval | S1 notify reviewer/backup; escalate, expire, or contain | No external action; resume only through authorized response | None |
| SIM-06 | R0 / 11 | Restricted-data placeholder appears in input | Hold — use-case override | Hold regardless of score; prohibited data overrides tier progression | S2 stop before task; exception record; redacted metadata; risk-owner escalation | No task or replay permitted | None |
| SIM-07 | R1 / 12 | Destination attempt fails; effect state unknown | Pass — documented route | Keep tier but do not infer effect result | S2 contain; preserve correlation; reconcile effect state | Retry only after known-safe, approved determination | None |
| SIM-08 | R0 / 12 | Later design changes to customer-facing message action | Blocked — remediation dependency | Original R0 cannot continue; reclassify as R2/R3 first | S2 hold the proposed route and return to intake/risk review | No activation or replay; re-test after reclassification rule exists | `AUD-F03` |

## 3. Control Assessment

| Control question | Simulation evidence | Result |
| --- | --- | --- |
| Does the override rule beat suitability score when data is prohibited? | SIM-06 holds an R0 score-11 candidate before any task | Coherent documented route |
| Does the R2 boundary prevent timeout-driven external action? | SIM-05 escalates/expires/contains rather than auto-approving | Coherent documented route |
| Does unknown effect state prevent blind replay? | SIM-04 and SIM-07 freeze/reconcile before retry | Coherent documented route |
| Does the prompt boundary route scope-redirection pressure safely? | SIM-02 remains internally bounded and enters containment/escalation path when credible | Coherent documented route |
| Can contradictory uncertainty/review data be deterministically blocked? | SIM-03 requires an intended rule not yet written as a semantic invariant | Blocked by `AUD-F02` |
| Does material scope change automatically trigger tier reclassification? | SIM-08 requires an intended rule not yet written in the handoff process | Blocked by `AUD-F03` |

## 4. Required Follow-Through

| Priority | Action | Owner type | Re-test condition |
| --- | --- | --- | --- |
| High | Add review-flag and uncertainty-field semantic invariants to each structured schema/consumer rule | Prompt/output owner | Re-run SIM-03 and a contradiction fixture; result must be exception/review with no destination effect |
| Moderate | Add material-change reclassification trigger to the use-case handoff and change-log process | Use-case/governance owner | Re-run SIM-08; an R0-to-customer-facing change must hold pending R2/R3 decision |
| High | Add parameter provenance and deterministic template-assembly rules | Prompt/output owner | Re-run A-03, A-05, and X-01 fixture family with declared trusted/untrusted parameter maps |
| Moderate | Add reviewer-facing output hygiene guidance | Operations/review owner | Re-run X-02 fixture; model text remains data, not an approval instruction |

## 5. Limitations

No model, workflow, connector, endpoint, queue, destination, authorization setting, or real record was used. The result proves only that the written decision and operations rules can be interpreted consistently for the eight fictional cases. Authorized implementation tests are still required to establish actual task behavior, validation enforcement, review delivery, destination idempotency, reconciliation, and evidence handling.
