# Documentation Change Log

This log records material changes to the Manus–Zapier living-document set. Each entry links the reader-facing change to its research, testing, or governance basis. Dates use ISO 8601 format.

## [1.2.0] — 2026-08-18

### Reconciliation

The preceding request asked for three next paths while excluding webhook authentication/OAuth2 handling, an end-to-end Manus-webhook-to-multi-step-Zap walkthrough, and slide creation. The prior response delivered exactly three paths. This version creates corresponding workspaces without adding any excluded topic.

### Added

| Change | Affected artifact | Basis |
| --- | --- | --- |
| Shared workspace index, coordination rules, handoff records, and prior-request reconciliation | [Documentation Workspaces](workspaces/README.md) | Living-document governance process |
| Use-case intake card, suitability matrix, risk tiers, decision tree, illustrative portfolio, and success/guardrail measures | [Use-Case Decision Framework](workspaces/use-case-portfolio/use-case-decision-framework.md) | NIST AI RMF Core/Playbook/GenAI profile and OECD AI Principles; evidence IDs `GOV-01` through `GOV-04` |
| Prompt contracts, input-treatment map, strict schema patterns, four-layer validation policy, adversarial fixtures, and quality rubric | [Prompt and Structured-Output Design Library](workspaces/prompt-output-library/prompt-output-design-library.md) | Manus structured-output documentation and OWASP guidance; evidence IDs `SAFE-01` through `SAFE-03` |
| Correlation-record specification, health signals, alert policy, failure matrix, safe recovery protocol, incident runbooks, and post-incident record | [Operations and Incident-Readiness Playbook](workspaces/operations-readiness/operations-observability-incident-playbook.md) | NIST SP 800-61r3 and Google SRE guidance; evidence IDs `OPS-02` through `OPS-04` |

### Boundaries retained

No live product test, connector enablement, workflow activation, external action, OAuth2 implementation, webhook authentication implementation, or slide generation occurred in this revision. The new workspace artifacts are documented design frameworks and require future use-case-specific owner decisions before production use.

### Review trigger

Update this entry when the user selects real candidate processes, an approved task contract is instantiated, an authorized synthetic test is run, or a current platform/source change affects a cited claim.

## [1.1.0] — 2026-08-18

### Added

| Change | Affected artifact | Basis |
| --- | --- | --- |
| Living-document governance protocol, including interaction cycle, evidence taxonomy, review thresholds, versioning, and recurring maintenance triggers | [Living Documentation Governance](living-document-governance.md) | Establishes the process requested for continuing updates across future interactions |
| Detailed offline webhook-validation protocol using synthetic fixtures, an ephemeral local RSA keypair, raw-body mutation tests, replay/idempotency tests, and fake side effects | [Offline Webhook Validation Protocol](experiments/offline-webhook-validation-protocol.md) | Manus webhook/security documentation plus independent replay/raw-body guidance; evidence IDs `SEC-03`, `SEC-04`, and discrepancy `D-07` |
| Condensed deployment and security quick reference, including deployment gate, controls, failure triage, cadence, and fast-stop process | [Deployment and Security Quick Reference](deployment-security-quick-reference.md) | Extracts and organizes existing reader-facing guidance from the implementation manual |
| Research entries for local receiver testing and replay prevention | [Evidence Register](research/evidence-register.md) | `SEC-03`, `SEC-04`, and `D-07` |

### Changed

| Change | Affected artifact | Reader action |
| --- | --- | --- |
| Bumped the implementation manual from `1.0` to `1.1.0` | [Implementation Manual](manus-zapier-integration-manual.md) | Run the offline validation protocol before requesting an authorized live-workspace webhook test |
| Linked the deployment protocol to the new offline validation procedure | [Implementation Manual](manus-zapier-integration-manual.md) | Treat a local passing result as implementation evidence only, not a live-provider validation |

### Validation status

No new Manus or Zapier account action was performed. The offline validation protocol is a proposed local test plan; it has not been executed. Existing access constraints continue to apply: no authorized Zapier test workspace was available for this documentation update.

### Review trigger

Update this release entry when a local fixture harness is executed, an authorized live-workspace test occurs, or a primary Manus/Zapier documentation change affects the webhook contract.

## [1.0.0] — 2026-08-18

### Added

The initial research-backed implementation manual, evidence register, experimental validation ledger, and repository documentation index were published. The manual covers native integration, API v2, task events, verified webhooks, structured output, security, reliability, troubleshooting, and deployment readiness.
