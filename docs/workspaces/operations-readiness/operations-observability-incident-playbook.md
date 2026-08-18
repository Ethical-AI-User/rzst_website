# Operations, Observability, and Incident-Readiness Playbook

**Objective:** Operate approved Manus–Zapier workflows as accountable business processes with visible health, safe containment, recoverable failures, and documented learning.

**Status:** Design recommendation; operational thresholds require workflow-owner approval

**Evidence label:** Design recommendation grounded in incident-response and reliability guidance

**Workspace:** [Operations, Observability, and Incident Readiness](README.md)

**Related artifacts:** [Implementation Manual](../../manus-zapier-integration-manual.md), [Deployment and Security Quick Reference](../../deployment-security-quick-reference.md), [Experimental Validation Ledger](../../experiments/validation-ledger.md)

## 1. Operating Principle

A workflow is healthy only when it delivers an appropriate, reviewable outcome—not merely when a trigger fires or a task begins. Separate operational availability from business correctness, safety, and human-review quality. Google SRE guidance recommends choosing a small set of user-relevant, actionable indicators and tying alerts to meaningful response procedures. [1] [2] NIST incident-response guidance frames preparation, detection, response, recovery, and lessons learned as integrated risk-management activities rather than isolated technical tasks. [3]

> **Operational rule:** Never use a retry, replay, or “rerun” button as the first response. First establish whether the original task or any downstream effect already occurred, then contain the issue, preserve redacted evidence, and apply the risk-tier approval rule before recovery.

## 2. Minimum Correlation Record

Maintain the minimum data needed to trace a business item safely through the workflow. The record should use identifiers and outcomes rather than unnecessary raw prompt text, full attachments, credentials, or private payloads.

| Field | Purpose | Example / control |
| --- | --- | --- |
| `workflow_version` | Connects outcome to the approved route and prompt/schema version | `triage-v1.2 / schema-v1.0` |
| `source_record_id` | Identifies the originating business item | Internal record ID, not copied source body |
| `correlation_id` | Connects processing attempts across components | Generated opaque identifier |
| `task_id` and `task_url` | Locates the Manus task for authorized review | Store access-controlled link; do not publish it |
| `event_id` when present | Supports deduplication and callback tracing | Persist before downstream effect |
| `input_classification` | Records allowed data class and sensitivity tier | `internal_non_sensitive` / `restricted` |
| `route` | Shows which policy branch was selected | `approved_internal`, `review`, `exception`, `contained` |
| `validation_outcome` | Records schema/business/destination validation result | `schema_pass; semantic_review_required` |
| `reviewer_decision` | Captures human approval, rejection, or timeout | `approved_by_role`, `rejected`, `expired` |
| `destination_effect_status` | States whether a side effect occurred | `none`, `staged`, `completed`, `unknown_needs_investigation` |
| `timestamps` | Supports latency, freshness, and incident timelines | Created, task-stopped, review, effect timestamps |
| `owner` | Names a responsible role, not merely a system | Business owner and technical owner |

## 3. Health-Signal Catalogue

Choose a small set of indicators that users and owners can act on. Each signal must have a definition, collection method, threshold owner, and response. Do not alert on a metric merely because it is easy to measure. [1] [2]

| Signal family | Example indicator | Why it matters | Alert only when | First response |
| --- | --- | --- | --- | --- |
| Intake integrity | Percentage of records rejected by pre-task validation | Detects upstream data drift or overbroad trigger scope | A defined sustained deviation or prohibited data appears | Pause/adjust input route; inspect a redacted sample |
| Task progress | Running/waiting/error distribution and time to final state | Distinguishes normal asynchronous work from stalled/review-required work | Waiting/error backlog exceeds owner-defined limit | Route waiting items to owner; investigate error class |
| Contract quality | Structured-result success rate and semantic-validation failure rate | Prevents schema-valid but unusable data from flowing onward | Failure rises above baseline or any unsafe field reaches an approved route | Contain destination route; inspect schema/prompt version and input class |
| Human review | Review queue age, reviewer response time, rejection rate | Detects hidden automation debt or under-resourced approval | Review deadline is missed or rejections change materially | Escalate review owner; do not bypass the queue |
| Destination safety | Duplicate, unknown, or failed effect count | Detects accidental repeat or incomplete/unsafe downstream behavior | Any high-consequence effect is unknown or duplicated | Freeze affected route; reconcile source/task/event/effect records |
| Security / misuse | Injection-like flags, prohibited-data detection, unexpected scope attempt | Detects pressure on the task boundary | Any credible restricted-data or scope-escape signal | Contain, redact, preserve evidence, and escalate risk owner |
| Recovery quality | Time from containment to owner-approved resolution | Measures operational readiness, not just speed | Recovery exceeds agreed target or requires repeated manual intervention | Improve runbook, ownership, or automation boundary |

## 4. Operational Objectives

Use workflow-level objectives only where they drive decisions. Targets must be set by the business and technical owners after a baseline period; do not copy generic numbers into production.

| Objective | Example definition | Guardrail |
| --- | --- | --- |
| Internal preparation timeliness | “A defined share of R0 research briefs reaches a reviewable result within the agreed internal window.” | Exclude records waiting for missing approved input; report waiting separately |
| Review responsiveness | “A defined share of R2 proposals receives an owner decision within the review window.” | Do not auto-approve when the window expires; escalate or expire safely |
| Contract reliability | “A defined share of accepted synthetic and authorized-test cases pass schema and semantic validation.” | Segment by use case/input class; a high aggregate rate cannot hide a critical failure class |
| Safety containment | “No unvalidated field reaches an approved external action.” | Any occurrence is an incident, not an average to optimize away |
| Recovery readiness | “Every high-impact failure has a current owner, runbook, pause control, and proven rollback/containment step.” | Reassess after destination or policy changes |

## 5. Alert Policy and Ownership

| Severity | Condition | Notification | Required response | Escalation |
| --- | --- | --- | --- | --- |
| **S0 — Informational** | Expected synthetic test outcome, routine low-risk rejection, or non-actionable metric change | Record only | Review in periodic trend analysis | None unless pattern changes |
| **S1 — Review required** | Waiting task, semantic ambiguity, failed structured result, or delayed internal review | Named process owner | Resolve, request input, or close with reason | Escalate if review window expires |
| **S2 — Contain and investigate** | Persistent task failure, unexpected validation change, duplicate attempt, or destination uncertainty | Technical owner and business owner | Pause affected route if needed; preserve correlation record; classify issue | Risk/security owner when data or scope boundary implicated |
| **S3 — High-impact incident** | Potential unapproved external effect, restricted-data exposure, unauthorized scope, or unresolvable destination state | Incident lead, business owner, technical owner, risk/security owner | Contain immediately; revoke/disable affected route as appropriate; coordinate communication | Formal incident process and post-incident review |

Alerts should describe the user/process impact, source/task/effect correlations, and the first safe action. An alert without an owner or runbook is a ticket to improve the operating design, not a page to send. [1]

## 6. Failure Classification Matrix

| Failure class | Observable symptom | Safe first action | Evidence to preserve | Recovery rule |
| --- | --- | --- | --- | --- |
| Input-policy failure | Missing required field, prohibited data, malformed record | Stop before task; create review/exception record | Source ID, validation rule, redacted reason | Correct source data or revise policy with owner approval |
| Task-boundary failure | Task requests/appears to attempt out-of-scope behavior | Contain task path; do not broaden permissions | Task ID/URL, sanitized excerpt, contract version | Revise contract/permissions; adversarial test before reuse |
| Waiting-state backlog | Task needs input or confirmation beyond expected window | Notify named owner; keep business effect blocked | Task ID, waiting reason, queue age | Resume only through authorized human response |
| Structured-result failure | `success = false`, invalid schema, unknown enum, missing required rationale | Route to exception/review; block downstream action | Task ID, schema version, error/validation result | Fix input/prompt/schema; test before replaying |
| Semantic-quality failure | Schema passes but output conflicts with business data/policy | Hold for human review | Correlation ID, validation rule, reviewer result | Adjust taxonomy/prompt; do not auto-correct without deterministic rule |
| Duplicate/ambiguous effect | Same source/event appears twice or destination state is unknown | Freeze related route; reconcile event ledger and destination state | Source/task/event IDs, destination effect status | Reissue only after owner confirms no prior effect or an idempotent operation is safe |
| Destination failure | Staging/review/destination call fails | Contain; preserve state before recovery | Correlation record, error class, attempted route | Retry only when duplicate consequences are understood |
| Security/data-boundary signal | Suspicious instruction, restricted data, unexpected content route | Contain, redact, and escalate based on tier | Redacted event metadata and policy match | Resume only after risk-owner decision and corrective action |

## 7. Safe Recovery and Replay Protocol

A recovery plan must answer “what has already happened?” before it asks “how do we run again?”

1. **Pause or isolate** the trigger, destination route, or affected version when impact could continue.
2. **Classify** the incident using the matrix above and assign the severity/owner.
3. **Reconstruct** the correlation chain: source record, task ID, event ID, review decision, and destination-effect status.
4. **Determine effect state** as `none`, `completed`, `partially completed`, or `unknown`.
5. **Choose recovery:** repair input, request human action, correct deterministic mapping, create a compensating internal record, or reissue only an operation known to be safe and approved.
6. **Do not replay blindly.** A source/task retry can create duplicate tasks or effects; an uncertain destination state requires reconciliation first.
7. **Validate the fix** with synthetic fixtures or an authorized test appropriate to the risk tier.
8. **Record the learning** in the change log, evidence register, experiment ledger, or affected workspace.

## 8. Incident Runbooks

### 8.1 Review queue age exceeds the agreed window

| Step | Action |
| --- | --- |
| 1 | Identify the affected risk tier and whether any external action is blocked. |
| 2 | Notify the named primary reviewer and backup owner with correlation links. |
| 3 | If no response by the defined escalation point, expire or contain the item; do not auto-approve it. |
| 4 | Review queue volume, assignment logic, and quality/rejection rate for root causes. |
| 5 | Update staffing/thresholds or reduce upstream volume only with owner approval. |

### 8.2 Structured output suddenly fails or changes character

| Step | Action |
| --- | --- |
| 1 | Route all failures to review; block approved downstream consumption for the affected contract version. |
| 2 | Compare input class, prompt version, schema version, and error pattern with a known-good baseline. |
| 3 | Run synthetic normal, missing-data, conflict, and adversarial fixtures. |
| 4 | Correct the contract, validation rule, or input route; document the decision. |
| 5 | Re-enable only after the owner accepts test evidence; investigate any previous affected records. |

### 8.3 Potential duplicate or uncertain downstream effect

| Step | Action |
| --- | --- |
| 1 | Stop retries for the related source/event set. |
| 2 | Inspect the event ledger and destination effect status. |
| 3 | If effect status is unknown, seek confirmation from the system of record or owner before a new attempt. |
| 4 | Prefer an idempotent or compensating path only when documented and approved. |
| 5 | Add an incident item if the duplication boundary failed; improve correlation/deduplication controls. |

### 8.4 Suspected input injection or data-boundary breach

| Step | Action |
| --- | --- |
| 1 | Contain the affected task/route and prevent any external action. |
| 2 | Preserve a redacted correlation record; do not paste credentials, raw secrets, or sensitive payloads into an incident ticket. |
| 3 | Identify whether the content was direct, external/retrieved, attached, or a configuration issue. |
| 4 | Notify the assigned risk/security owner for the tier; assess whether credentials, permissions, or data exposure require separate response. |
| 5 | Add or improve a synthetic adversarial fixture and update the prompt/output contract before resuming. |

## 9. Post-Incident Learning Record

Use a blameless, system-focused review. Google SRE emphasizes learning from incidents and improving detection, mitigation, coordination, and communication—not assigning individual blame. [1]

| Field | Required content |
| --- | --- |
| Summary | What happened and which process/user outcome was affected |
| Scope | Affected workflow version, risk tier, time window, and known records |
| Timeline | Detection, containment, decision, recovery, and closure timestamps |
| Impact | Actual/potential business, data, operational, and user impact |
| Detection quality | What signal detected it, what was missing, and whether the alert was actionable |
| Contributing conditions | Input, contract, data, configuration, ownership, process, or destination factors |
| What worked | Controls, people, logs, or runbooks that reduced impact |
| Corrective actions | Specific owner, due date, validation evidence, and workspace artifact to update |
| Documentation changes | Evidence register, test card, manual, prompt library, portfolio, or change-log updates required |

## 10. Operating Cadence

| Cadence | Activity | Evidence |
| --- | --- | --- |
| Every run | Record correlations and selected route; retain only necessary metadata | Correlation record |
| Weekly | Review S1/S2 queue, waiting tasks, errors, validation drift, and unresolved destination states | Exception summary with owners |
| Monthly | Review a sample of accepted/rejected outputs, approval quality, and prompt/schema versions | Quality-review record and change proposals |
| Quarterly | Revalidate owners, risk tiers, destination inventory, pause/recovery procedures, open questions, and current documentation | Control-review record |
| After change or incident | Run relevant synthetic fixtures, update the affected workspace, and log the change | Test result and change-log entry |

## 11. Operations Acceptance Checklist

- [ ] Each use case has a risk tier, business owner, technical owner, and named reviewer where needed.
- [ ] Correlation records identify source, task, route, validation, review, and destination-effect state without unnecessary raw data.
- [ ] Every actionable alert has a severity, owner, first safe action, and current runbook.
- [ ] Waiting, error, invalid-output, and duplicate/unknown-effect conditions have separate routes.
- [ ] No replay occurs before effect-state reconciliation.
- [ ] Synthetic tests cover normal, missing-data, contract-failure, ambiguity, injection-like, and duplicate scenarios as relevant.
- [ ] High-impact events have containment and communication owners.
- [ ] Incident learning produces tracked corrective actions and documentation updates.

## 12. Open Questions and Next Iteration

| ID | Question | Next action |
| --- | --- | --- |
| OP-01 | Which real process outcomes should define the first workflow health signals? | Receive selected use cases and owner priorities from Workspace A |
| OP-02 | Where will correlation metadata live and what retention/access rules apply? | Obtain operations/data-owner decision |
| OP-03 | What alert/review windows are appropriate for each risk tier? | Establish baselines during controlled testing; avoid copying generic targets |
| OP-04 | What are the approved pause and recovery controls for each destination? | Build a destination inventory before production activation |

## References

[1]: https://sre.google/resources/practices-and-processes/incident-management-guide/ "Google SRE Incident Management Guide"
[2]: https://sre.google/sre-book/service-level-objectives/ "Google SRE: Service Level Objectives"
[3]: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf "NIST SP 800-61r3: Incident Response Recommendations and Considerations"
