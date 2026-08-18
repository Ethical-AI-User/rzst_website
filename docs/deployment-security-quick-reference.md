# Manus–Zapier Deployment and Security Quick Reference

**Manual version:** 1.1.0

**Use:** Pre-activation review, incident triage, and recurring operational checks

**Detailed manual:** [Manus and Zapier: An Implementation Manual](manus-zapier-integration-manual.md)

> **Rule of use:** This is a condensed operating reference, not an independent architecture specification. If it conflicts with the main manual, the main manual and its cited primary sources govern. Confirm account-specific capabilities in the current Manus and Zapier interfaces before activation.

## 1. Deployment Gate

A workflow is ready to activate only when every relevant control below is satisfied.

| Gate | Required evidence | Manual detail |
| --- | --- | --- |
| Ownership | A named business owner and technical owner can pause, investigate, and approve changes | [Sections 3, 11, and 13](manus-zapier-integration-manual.md#3-prerequisites-ownership-and-data-boundaries) |
| Trigger scope | The trigger is narrow; a Filter excludes incomplete, duplicate, irrelevant, or unapproved records before Manus runs | [Sections 3 and 4](manus-zapier-integration-manual.md#4-route-a-build-a-native-manus-app-workflow-in-zapier) |
| Prompt boundary | Prompt separates trusted fields from untrusted input and prohibits external actions | [Section 3.3](manus-zapier-integration-manual.md#33-prompt-contract-template) |
| Data boundary | Only minimum necessary data is sent; source, destination, retention, and reviewer responsibilities are known | [Section 8.3](manus-zapier-integration-manual.md#83-data-classification-questions) |
| Credential safety | Keys are connection-managed or secret-managed; no secret appears in prompts, request bodies, repositories, screenshots, or logs | [Section 8.2](manus-zapier-integration-manual.md#82-security-controls) |
| API containment | API-by-Zapier connection uses a restrictive domain filter and approved ownership | [Sections 3.1 and 5.1](manus-zapier-integration-manual.md#51-create-the-api-connection-safely) |
| Outcome handling | Finished, waiting, structured-output failure, and error outcomes have different routes | [Section 2](manus-zapier-integration-manual.md#2-core-concepts-and-the-task-state-model) |
| Human approval | Any customer-facing, irreversible, financial, publishing, record-deletion, or other consequential action is behind a named human gate | [Section 7](manus-zapier-integration-manual.md#7-human-approval-and-action-boundaries) |
| Callback safety | A consequential callback is signature-verified, timestamp-checked, logged, and deduplicated before a downstream side effect | [Section 6](manus-zapier-integration-manual.md#6-route-c-send-manus-completion-events-to-zapier) |
| Observability | Correlation records include source ID, task ID, task URL, event ID when present, route, outcome, and reviewer decision | [Section 11](manus-zapier-integration-manual.md#11-operations-runbook) |
| Validation | Synthetic tests have passed; test artifacts were removed or revoked; open questions are recorded | [Section 10](manus-zapier-integration-manual.md#10-deployment-and-test-protocol) |

## 2. Security Controls

| Control | Implement now | Validate before production | Escalate when |
| --- | --- | --- | --- |
| Least privilege | Enable only the required Manus connectors, Zapier apps, and destinations | Connection inventory matches documented use | A workflow gains a new connector, destination, or permission |
| Input control | Treat free text, email bodies, and website text as untrusted data | Injection-like sample text does not alter the task boundary | A task needs broader browsing, files, or external connectors |
| Output control | Allowlist fields and enums; check structured-output `success` | Invalid/unknown values take an exception path | A model result would create or change an external record |
| Secret control | Use approved connection/secret storage; redact logs | Secret scan is clean and owner can rotate/revoke | A key owner changes, a key is exposed, or a connection is copied |
| Webhook authenticity | Verify timestamp and RSA signature over raw body and full URL | Mutation tests reject altered body, URL, header, and stale timestamp | A callback could produce a meaningful external side effect |
| Replay resistance | Atomically record `event_id` before a destination action | A repeated event produces no second effect | A retry, replay, or delivery ambiguity occurs |
| Human control | Review `ask`, error, failed extraction, and consequential routes | A reviewer can decline, timeout, and approve safely | The workflow begins sending, publishing, scheduling, deleting, spending, or changing customer data |
| Audit and minimization | Keep correlation records and redact payloads | Logs show outcome without unnecessary raw content | An incident, access review, or retention requirement changes |

## 3. Offline Webhook Validation Before Live Access

Run the [offline webhook-validation protocol](experiments/offline-webhook-validation-protocol.md) before requesting a live test workspace. It validates the controlled receiver using only synthetic fixtures and an ephemeral local keypair. It does **not** claim to validate real Manus delivery or Zapier mapping.

| Offline test | Pass criterion | Failure means |
| --- | --- | --- |
| Baseline valid request | Valid local signature verifies; one minimized fake output is recorded | Signing string, encoding, or key use is incorrect |
| Raw body mutation | A one-byte change fails before parsing or routing | Receiver is not preserving/verifying raw bytes |
| URL mutation | A changed full URL fails | Receiver is not using the documented full URL in signing input |
| Stale timestamp | A timestamp outside the window fails | Replay protection is absent or clock handling is incorrect |
| Duplicate event ID | Second request creates no second fake effect | Idempotency boundary is too late or non-atomic |
| `ask` / failed output | Valid transport event becomes review/error, never approved route | Transport trust is being confused with business authorization |

## 4. When a Run Fails

| Signal | First action | Do not do |
| --- | --- | --- |
| Task is waiting / `ask` | Create or inspect the named-human review item | Treat it as approval or continue the business process unattended |
| Structured output has `success: false` | Open the task and exception record; use `error` for diagnosis | Use its schema-shaped fallback as a business decision |
| Webhook signature fails | Reject, log a redacted reason, inspect receiver configuration | Bypass verification or loosen signature checks |
| Callback duplicate | Check event ledger and destination-call history | Blindly replay the downstream side effect |
| Zap is on hold or errored | Inspect connection state, error branch, and task correlation before recovery | Re-run task creation before checking whether a task already exists |
| Key or webhook URL may be compromised | Pause relevant workflow, rotate/revoke, preserve redacted correlations | Delete evidence or continue routing sensitive payloads |

## 5. Operating Cadence

| Cadence | Minimum review |
| --- | --- |
| Every run | Correlate source record, task, route, and reviewer outcome |
| Weekly | Review waiting, errored, on-hold, and handled-error runs |
| Monthly | Review Filters, destinations, sample data, and approval paths |
| Quarterly | Revalidate connection ownership, domain filters, webhook URLs, documentation, and open questions |
| After any platform/configuration change | Run relevant synthetic test cards and update the living-document change log |

## 6. Fast Stop Procedure

1. Pause the Zap or disable the triggering condition.
2. Disable the affected destination action or callback forwarding path.
3. Revoke or rotate a suspected credential; delete a suspected webhook registration if appropriate.
4. Preserve redacted correlation records: source ID, task ID, task URL, event ID, timestamps, route, and outcome.
5. Determine whether a task or side effect already occurred before any replay.
6. Record the incident and required documentation update in the living-document artifacts.

## Related Artifacts

| Artifact | Use |
| --- | --- |
| [Living Documentation Governance](living-document-governance.md) | Interaction-to-document process, evidence labels, review thresholds, and versioning |
| [Evidence Register](research/evidence-register.md) | Current sources, discrepancy log, and limits of each claim |
| [Experimental Validation Ledger](experiments/validation-ledger.md) | Authorized-live-test cards and current access constraints |
| [Offline Webhook Validation Protocol](experiments/offline-webhook-validation-protocol.md) | Detailed local fixture and mutation-test procedure |
