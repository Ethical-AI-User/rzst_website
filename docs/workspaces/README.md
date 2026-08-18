# Manus–Zapier Documentation Workspaces

**Status:** Active

**Established:** 2026-08-18

**Parent governance:** [Living Documentation Governance](../living-document-governance.md)

## Prior-Request Reconciliation

The immediately preceding request asked for **three ways to proceed** with the living document and explicitly excluded three subjects: webhook authentication/OAuth2 token handling, an end-to-end Manus-webhook-to-multi-step-Zap example, and a slide presentation. The delivered response proposed exactly three distinct paths—use-case portfolio and decision framework; prompt, input, and structured-output design library; and operations, observability, and incident readiness.

**Reconciliation result: no prior step was missed.** The excluded subjects will remain out of scope for these three workspaces unless the user explicitly adds them in a future request.

## Workspace Map

| Workspace | Purpose | Primary outputs | Explicit boundary |
| --- | --- | --- | --- |
| [Use-Case Portfolio and Decision Framework](use-case-portfolio/README.md) | Decide which automation opportunities are worthwhile, permitted, and ready to progress | Suitability matrix, risk tiers, intake card, decision tree, prioritization queue | Does not implement authentication or build an end-to-end webhook Zap |
| [Prompt, Input, and Structured-Output Library](prompt-output-library/README.md) | Standardize safe task briefs, input handling, schemas, and quality evaluation | Prompt contracts, schema patterns, adversarial fixtures, validation rules, review rubrics | Does not define OAuth2 handling or presentation materials |
| [Operations, Observability, and Incident Readiness](operations-readiness/README.md) | Make approved workflows measurable, supportable, and recoverable | Health signals, correlation record, alert policy, incident runbooks, post-incident template | Does not introduce an end-to-end webhook automation walkthrough |

## Coordination Rules

The workspaces share the evidence labels and update cycle in the parent governance document. Any substantive source belongs in the central [Evidence Register](../research/evidence-register.md). Any test card or observed result belongs in the [Experimental Validation Ledger](../experiments/validation-ledger.md). Material changes are recorded in the [Documentation Change Log](../CHANGELOG.md).

| Cross-workspace dependency | Handoff rule |
| --- | --- |
| A use case is approved for design | The use-case workspace provides the business purpose, risk tier, data classification, allowed action boundary, and success metric to the prompt/output workspace |
| A prompt/schema pattern is accepted | The prompt/output workspace provides input fields, output fields, validation rules, failure conditions, and human-review trigger to operations |
| Operations identifies recurring failures or risk | The operations workspace opens an evidence gap, decision review, or new test card; the affected workspace revises the governing artifact |
| A platform fact changes | Update the evidence register first, then revise every affected workspace and change-log entry |

## Workspace Update Template

Every workspace addition should include the following fields near the top of its artifact.

| Field | Required content |
| --- | --- |
| Objective | The question or decision the artifact addresses |
| Status | Draft, documented, local implementation validation, observed in authorized test, accepted, or retired |
| Scope / non-goals | What the artifact deliberately does and does not cover |
| Evidence label | Documented, observed in test, design recommendation, account-dependent, or open question |
| Owner / review trigger | Named role or future event that requires reassessment |
| Links | Relevant evidence IDs, experiment cards, change-log entry, and related workspace files |

## Definition of a Complete Workspace Iteration

A workspace iteration is complete when it has a reader-facing artifact, clear scope, evidence or stated assumptions, validation criteria, open questions, a handoff to dependent workspaces where needed, and an entry in the change log. Completion does not imply that a workflow is authorized, live, or empirically observed in an account.
