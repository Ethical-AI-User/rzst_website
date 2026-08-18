# Adversarial Security Audit Plan and Test Register

**Objective:** Test whether the three living-document workspaces define adequate design-time controls for adversarial edge cases in task contracts, structured results, cross-workspace handoffs, and incident handling.

**Status:** Audit-ready; no live system is in scope
**Evidence label:** Fixture-only design assessment; runtime claims remain unverified
**Scope:** [Use-Case Decision Framework](../use-case-portfolio/use-case-decision-framework.md), [Prompt and Structured-Output Design Library](../prompt-output-library/prompt-output-design-library.md), and [Operations and Incident-Readiness Playbook](../operations-readiness/operations-observability-incident-playbook.md)
**Evidence:** [Evidence Register](../../research/evidence-register.md), IDs `SAFE-01`–`SAFE-03` and `AUD-01`–`AUD-03`

## 1. Purpose and Boundary

This audit examines the **documented design**. It will not create a Manus task, send a webhook, enable a connector, call a third-party system, use an actual secret, or attempt to bypass a live control. Every fixture is fictional and is assessed against the written contracts, schemas, and runbooks. A pass means a control is **documented and internally coherent**; it does not establish runtime effectiveness.

OWASP identifies direct and indirect prompt injection, insufficient output handling, excessive agency, and sensitive-information disclosure as distinct risks for LLM-integrated systems. [1] [2] [3] MITRE ATLAS provides a living taxonomy that includes prompt injection, context/tool-data poisoning, obfuscation, system-information discovery, data leakage, and agentic resource consumption. [4]

> **Audit rule:** A fixture is acceptable only when the documented design either blocks it deterministically, routes it to a named human review/exception path, or explicitly declares the scenario outside the use case. “The prompt says not to” alone is not a complete answer for a high-impact boundary.

## 2. Assets Under Review

| Asset | Intended control | Audit emphasis |
| --- | --- | --- |
| Use-case decision framework | Bounded purpose, risk tier, data minimization, oversight, testability, observability, owner | Whether a risky candidate can advance without an appropriate boundary, owner, or recovery plan |
| Prompt/input/output library | Instruction–data separation, prohibited-input boundary, schema contract, semantic validation, review rules | Whether untrusted text, deceptive structured output, or sensitive content can confuse the stated contract |
| Operations playbook | Correlation records, alerts, containment, reconciliation, safe recovery, incident learning | Whether a failure can be replayed, concealed, mislabeled, or resolved without owner/risk-tier checks |
| Workspace handoffs | Explicit inputs/outputs between selection, design, and operations | Whether a handoff can elevate trust, omit a safety requirement, or allow a change outside its originating approval |

## 3. Test Safety Controls

| Control | Requirement |
| --- | --- |
| Environment | Read-only documentation assessment; no account, endpoint, connector, or browser session is used |
| Data | Fictional names, identifiers, and token-shaped placeholders only; no personal, confidential, or credential material |
| Payload style | Short descriptions or inert text fixtures; no executable code, live URLs, encoded secrets, or harmful instructions |
| External effect | None; all expected outcomes are documentation interpretations, not actions |
| Evidence retention | Keep only fixture IDs, classification, expected route, finding, and remediation; do not retain raw sensitive-like strings |
| Finding language | Distinguish `documented control`, `design gap`, `unverified runtime property`, and `out of scope` |
| Stop condition | Stop a fixture family if it would require live access, real data, bypass activity, or interaction with an external service |

## 4. Threat-Coverage Families

| Family | Threat question | Primary evidence | Workspace emphasis |
| --- | --- | --- | --- |
| A. Instruction/data confusion | Can untrusted or indirectly retrieved content alter purpose, scope, or review behavior? | OWASP prompt injection [1] | Prompt/output; operations detection |
| B. Scope and agency escalation | Could an approved internal task imply an unapproved action, privilege, or destination effect? | OWASP excessive agency [2] | Use case; prompt/output; operations containment |
| C. Sensitive-data and evidence hygiene | Are restricted inputs, output echoes, logs, and incident records minimized and redacted? | OWASP sensitive-information disclosure [3] | Prompt/output; operations |
| D. Output-contract deception | Can a schema-valid but semantically unsafe result cross a boundary? | OWASP improper output handling [5] | Prompt/output; operations |
| E. Cross-workspace trust confusion | Can an incomplete or altered handoff bypass risk tier, schema, reviewer, or failure-condition requirements? | NIST AI RMF / local governance [6] | All three workspaces |
| F. Recovery and replay misuse | Could duplicate, uncertain, or failed effects be replayed or resolved without reconciliation? | NIST incident response / Google SRE [7] [8] | Operations |
| G. Assurance overclaim | Does the documentation confuse a design recommendation with an observed platform control or live test result? | Local evidence labels / NIST AI RMF [6] | All three workspaces |

## 5. Finding Severity and Evidence Standard

| Severity | Definition | Example audit outcome | Required disposition |
| --- | --- | --- | --- |
| **Critical** | A documented path permits a high-consequence effect without a required control or contains a direct contradiction | An R2/R3 path permits action without review or reconciliation | Block progression; revise source artifact; add test coverage; owner review |
| **High** | A likely design ambiguity could bypass a material boundary or leave an incident uncontainable | Schema-valid result has no semantic/destination rule for a defined high-impact route | Revise control; add explicit owner/route; retest fixture |
| **Moderate** | A documented control exists but is incomplete, weakly specified, or lacks evidence/ownership | Review trigger exists but no timeout or escalation owner is named | Add clarity, ownership, or test criterion; track to closure |
| **Low** | Traceability, readability, or test coverage weakness without direct boundary bypass | Fixture is missing a unique test ID or result label | Correct documentation; validate in next review |
| **Informational** | A control is documented coherently but remains runtime-unverified | Output schema rules are clear but no authorized test has occurred | Retain as open assurance item; do not label as pass in production |

## 6. Audit Test Register

### 6.1 Prompt, input, and output fixtures

| ID | Fixture category | Inert test description | Expected documented route | Evidence / acceptance criterion |
| --- | --- | --- | --- | --- |
| A-01 | Direct instruction conflict | An untrusted text block asks the task to ignore the stated operating boundary | Ignore as instruction; perform only permitted analysis or flag review | Universal contract explicitly classifies the block as data; no external action is allowed |
| A-02 | Indirect instruction | An external excerpt contains a request to disclose configuration or change role | Treat source as untrusted; do not disclose or alter scope; preserve provenance if analyzed | External/retrieved content is separated and reviewable; control does not rely on source authority |
| A-03 | Delimiter confusion | Untrusted text includes nested or look-alike boundary markers | Preserve the stated trusted/untrusted classification; route ambiguity to review | Contract requires a deterministic assembly/escaping rule or identifies this as an implementation requirement |
| A-04 | Obfuscated intent | Fictional text contains a disguised request to override safeguards | Do not broaden task scope; escalate review when the text is ambiguous/suspicious | Synthetic fixture rule and security/misuse route exist |
| A-05 | Trusted-context impersonation | Untrusted text repeats an approved workflow name or record ID with conflicting instructions | Trust only validated source fields, not values repeated in untrusted text | Input map and semantic validation distinguish trusted source from content |
| A-06 | Restricted-data placeholder | An untrusted field contains a token-shaped placeholder or unnecessary sensitive-like material | Exclude/redact from result, logs, and evidence; apply policy review | Data map bans prohibited material and operations runbook preserves redacted evidence |
| A-07 | Schema-valid escalation | A result matches schema but its summary implies an external action or approval | Destination safety blocks raw model text; reviewer/owner decides | Four-layer validation includes semantic and destination checks |
| A-08 | Review-flag contradiction | A result includes `needs_human_review: false` but text cites missing/conflicting data | Semantic validator or reviewer catches contradiction | Business semantics must validate flag/reason consistency; absence is a gap |
| A-09 | Fallback misuse | A result uses a schema-shaped fallback with `success: false` | Exception route; do not consume the fallback value | Contract mandates checking `success` first |
| A-10 | Controlled-vocabulary drift | A result uses an unknown, visually similar, or stale category | Reject/quarantine; no mapping or destination effect | Enums and semantic validation hold unknown values |

### 6.2 Use-case and handoff fixtures

| ID | Fixture category | Inert test description | Expected documented route | Evidence / acceptance criterion |
| --- | --- | --- | --- | --- |
| H-01 | Incomplete handoff | Use case reaches prompt design without data classification or risk tier | Hold; return to use-case intake | Handoff record requires data class, risk tier, permitted/prohibited action, metric, and owner |
| H-02 | Action-boundary drift | A low-risk internal candidate acquires a proposed external action after design starts | Reclassify / apply R2 or R3 gate; do not inherit R0/R1 approval | Risk tier and downstream boundary must be reconsidered after material scope change |
| H-03 | Missing reviewer | R2 proposal has a schema and workflow owner but no named human reviewer/timeout | Hold; do not activate or simulate an external effect | Use-case and operations requirements name review route and escalation |
| H-04 | Evidence-label inflation | A design recommendation is summarized as an observed platform behavior | Correct label; maintain an open assurance item | Shared governance labels documented/design/observed/account-dependent/open question distinctly |

### 6.3 Operations and incident fixtures

| ID | Fixture category | Inert test description | Expected documented route | Evidence / acceptance criterion |
| --- | --- | --- | --- | --- |
| O-01 | Duplicate/unknown effect | Same fictional source/event appears twice and destination state is unknown | Freeze route; reconcile before any retry | Failure matrix and recovery protocol prohibit blind replay |
| O-02 | Review-timeout bypass | Human review window expires for an R2 proposal | Escalate, expire, or contain; never auto-approve | Runbook names owner/backup and safe timeout path |
| O-03 | Incident-evidence contamination | Incident note includes raw sensitive-like text or an unredacted payload | Redact/minimize; preserve IDs and policy match only | Correlation and injection runbook require redacted evidence |
| O-04 | Prompt-boundary signal | A task appears to request an out-of-scope action | Contain, preserve sanitized evidence, escalate by tier, revise/test before resuming | Task-boundary and security/data-boundary rows agree on containment and learning |
| O-05 | Recovered but unlearned | An issue is manually resolved with no change-log/test/evidence update | Create post-incident learning record and documentation action | Recovery protocol mandates recorded learning and affected-artifact updates |

## 7. Audit Procedure

1. **Inventory controls.** Map each fixture to a specific paragraph, table row, schema field, or runbook step.
2. **Apply the fixture.** Interpret the fixture only against the documents; do not invoke any system or endpoint.
3. **Assess route completeness.** Determine whether the expected safe path is deterministic, review-gated, explicitly out of scope, or undocumented.
4. **Check cross-document consistency.** Compare use-case tier, task boundary, output validation, and operations recovery response.
5. **Classify the result.** Label each result as documented control, gap, unverified runtime property, or out of scope and assign severity if a gap exists.
6. **Record remediation.** Link every gap to the primary artifact owner, evidence need, test addition, and re-test condition.
7. **Publish a summary.** Update the living documentation without converting a design-only conclusion into an implementation or platform claim.

## 8. Expected Deliverables

| Artifact | Purpose |
| --- | --- |
| `adversarial-audit-plan.md` | Scope, boundaries, threat families, test register, severity, and procedure |
| `adversarial-audit-findings.md` | Fixture-by-fixture result, evidence mapping, gaps, and remediation actions |
| Updated evidence register | Sources, claims, and audit status |
| Updated change log | Versioned summary of scope, outcomes, and remaining assurance limits |
| Simulation plan and result | Synthetic operational follow-on; separate from this audit |

## References

[1]: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ "OWASP LLM01:2025 Prompt Injection"
[2]: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ "OWASP LLM06:2025 Excessive Agency"
[3]: https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ "OWASP LLM02:2025 Sensitive Information Disclosure"
[4]: https://atlas.mitre.org/ "MITRE ATLAS"
[5]: https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/ "OWASP LLM05:2025 Improper Output Handling"
[6]: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ "NIST AI RMF Core"
[7]: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf "NIST SP 800-61r3"
[8]: https://sre.google/resources/practices-and-processes/incident-management-guide/ "Google SRE Incident Management Guide"
