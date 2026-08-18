# Documentation Change Log

This log records material changes to the Manus–Zapier living-document set. Each entry links the reader-facing change to its research, testing, or governance basis. Dates use ISO 8601 format.

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
