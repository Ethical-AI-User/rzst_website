# Patch Proposal: AUD-F02 and AUD-F03

**Objective:** Close two documented design gaps by specifying a deterministic review-signal invariant (`AUD-F02`) and a material-change reclassification gate (`AUD-F03`) for Manus–Zapier task contracts.

**Status:** Proposed; not yet accepted or runtime-tested
**Evidence label:** Design recommendation grounded in the audit and synthetic simulation
**Affected findings:** [AUD-F02 and AUD-F03](../adversarial-audit/adversarial-audit-findings.md)
**Related records:** [Roadmap](../remediation-runtime-assurance-roadmap.md), [Mock Simulation Plan](../operations-readiness/mock-failure-matrix-simulation-plan.md), [Prompt and Structured-Output Design Library](prompt-output-design-library.md), [Use-Case Decision Framework](../use-case-portfolio/use-case-decision-framework.md)

## 1. Patch Intent and Non-Goals

The patch addresses two specification gaps. It does not configure a platform, activate an automation, substitute for a human approval decision, or prove that an implementation enforces the proposed rules. The purpose is to make the control requirements specific enough to implement, review, test, and audit.

| Finding | Gap | Patch objective |
| --- | --- | --- |
| `AUD-F02` | A schema-valid result can deny review even while related fields describe missing, conflicting, or uncertain information. | Require a deterministic consumer-side relationship between review signals, the review flag, and the review reason. |
| `AUD-F03` | A candidate may retain an earlier risk tier after a later change to its purpose, inputs, destination, action consequence, reviewer rule, or rollback method. | Require an approval snapshot and block progression until a material change is reclassified and approved. |

> **Control boundary:** The model may propose structured fields. A deterministic consumer, contract-review service, or configuration gate must enforce the rules below. Neither a natural-language prompt nor a model output may lower a risk tier, authorize a change, or waive review.

## 2. AUD-F02 — Deterministic Review-Signal Invariant

### 2.1 New contract metadata

Each output contract will declare an allowlisted vocabulary for review signals. A task may emit only the signals that are relevant to its approved use case.

| Field | Type | Required behavior |
| --- | --- | --- |
| `review_signals` | Array of controlled strings | A machine-readable account of conditions that require a human or exception route. Empty array means no documented review condition was identified. |
| `needs_human_review` | Boolean | Derived and validated from `review_signals`; it is not an independently trusted model assertion. |
| `review_reason` | Nullable string | Concise human-readable explanation derived from/consistent with the signal set. |
| `validation_status` | Controlled string | Assigned by the consumer after structural and semantic validation: `accepted`, `quarantined`, or `exception`. |
| `contract_version` | Controlled string | Binds result semantics to a reviewed contract version. |

### 2.2 Allowed review-signal vocabulary

| Signal | Meaning | Required route |
| --- | --- | --- |
| `missing_required_input` | A required input field is absent, blank, or unusable. | Review/exception; do not infer a substitute. |
| `source_conflict` | Relevant sources/data fields materially conflict. | Review/exception; expose the conflict safely. |
| `out_of_scope` | Requested outcome, data, or action exceeds the approved contract boundary. | Contain/exception; do not broaden scope. |
| `sensitive_content` | Input or output includes restricted or policy-controlled content. | Hold/exception; follow data/risk process. |
| `ambiguous_request` | The task cannot determine a supported interpretation. | Review/exception; request clarification. |
| `validation_failure` | A structural, semantic, or destination-safety check failed. | Quarantine/exception; block downstream effect. |

The allowed vocabulary is intentionally finite. A task-specific contract may add a signal only through an approved contract revision and an associated fixture.

### 2.3 Schema pattern

The following pattern is additive to the existing strict structured-output subset. All fields remain declared and required; nullable types represent permitted absence.

```json
{
  "type": "object",
  "properties": {
    "review_signals": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "missing_required_input",
          "source_conflict",
          "out_of_scope",
          "sensitive_content",
          "ambiguous_request",
          "validation_failure"
        ]
      }
    },
    "needs_human_review": {
      "type": "boolean"
    },
    "review_reason": {
      "type": ["string", "null"]
    }
  },
  "required": [
    "review_signals",
    "needs_human_review",
    "review_reason"
  ],
  "additionalProperties": false
}
```

### 2.4 Consumer-side semantic invariant

The semantic validator must evaluate the following rule **after** structural-schema validation and **before** any destination route or approval queue consumes the result.

```text
signal_present = (length(review_signals) > 0)

ACCEPT only if:
  needs_human_review == signal_present
  AND (needs_human_review == false OR review_reason is non-null and non-blank)
  AND (needs_human_review == true OR review_reason is null)
  AND every review signal belongs to the approved contract vocabulary

Otherwise:
  validation_status = "quarantined"
  route = "exception_review"
  destination_effect_status = "none"
  retain correlation_id, contract_version, validation failure code, and redacted evidence
```

A generic informative field, including routine `open_questions`, does not independently trigger review unless the contract converts it into an explicit allowlisted `review_signal`. This avoids an overly broad rule that would make all research outputs unavailable merely because they include normal caveats.

### 2.5 Prompt-contract addition

Add the following language after the existing review rule in each reusable contract:

```text
Review-signal rule
Return every condition requiring human review in `review_signals` using only the approved
vocabulary. Set `needs_human_review` to true exactly when `review_signals` is non-empty.
When review is required, provide a concise `review_reason`. Do not claim that a route,
record, message, approval, or external action has occurred.
```

This instruction guides the model but is not the enforcement point. The consumer-side invariant remains authoritative.

### 2.6 New fixtures and acceptance criteria

| Fixture | Fictional setup | Expected result |
| --- | --- | --- |
| `A-08a` | `needs_human_review = false` and `review_signals = ["missing_required_input"]` | Quarantine; `exception_review`; no destination effect; correlation preserved. |
| `A-08b` | `needs_human_review = true`, empty signals, non-null reason | Quarantine unless contract defines a separate approved signal; no implicit override. |
| `A-08c` | Valid nonempty signal set, review flag true, concise reason | Accept into named review queue; no automatic destination effect. |
| `A-08d` | Unknown review-signal enum value | Structural or semantic failure; quarantine. |

`AUD-F02` can move to **design control accepted and re-tested** only when the schema, validator rule, runbook route, fixture results, and `SIM-03` re-run all agree. It remains runtime-unverified until an authorized implementation demonstrates the behavior.

## 3. AUD-F03 — Material-Change Reclassification Gate

### 3.1 Contract approval snapshot

Each approved task contract will carry an immutable approval snapshot. A proposed revision is compared to this snapshot before a task or destination route is enabled.

| Snapshot field | Purpose |
| --- | --- |
| `use_case_id` | Connects the contract to the approved business purpose. |
| `risk_tier` and `risk_tier_rationale` | Preserves the approved R0/R1/R2/R3 decision and why it was made. |
| `input_sources` and `input_classification` | Identifies source systems, field trust classes, and prohibited data constraints. |
| `permitted_task_boundary` and `prohibited_actions` | Defines what the task may and may not do. |
| `output_schema_version` and `contract_version` | Binds semantic and structural rules to a known reviewable version. |
| `destination_class` | States whether output is internal draft, internal staging, review queue, or external preparation. |
| `action_consequence` | Captures the potential impact/reversibility of a downstream effect. |
| `reviewer_requirement` and `timeout_rule` | Identifies who can approve and what happens when a review does not occur. |
| `pause_rollback_method` | Requires an owner-approved safe stop/recovery method. |
| `approved_by`, `approved_at`, and `evidence_refs` | Provides traceability to decisions and supporting records. |

### 3.2 Material-change definition

A reclassification is required when any proposed revision changes one or more of the following:

| Change category | Examples | Required response |
| --- | --- | --- |
| Purpose | Internal brief becomes customer preparation; classification becomes recommendation | Hold and return to use-case review. |
| Input source/data class | New external source, attachment class, sensitive field, or broader free-text input | Hold; update input classification/data policy and risk rationale. |
| Output destination | Internal draft/staging becomes user-visible, customer-facing, or system-of-record preparation | Hold; assess consequence and reviewer requirements. |
| Action consequence | Reversible analysis becomes a proposed, scheduled, published, purchased, deleted, or other consequential effect | Reclassify; R2/R3 gate as applicable. |
| Reviewer/timeout rule | Named reviewer or safe expiration changes or is removed | Hold; restore/approve equivalent control. |
| Pause/rollback method | Recovery or reconciliation path becomes unknown or less reversible | Hold; obtain owner-approved recovery control. |

### 3.3 State transition rule

```text
baseline = contract_approval_snapshot
proposal = proposed_contract_metadata

IF any material field differs between proposal and baseline:
  contract_state = "reclassification_required"
  task_creation = blocked
  destination_routing = blocked
  route = "use_case_review"
  required_record = reclassification_decision
ELSE:
  contract_state = "approved_for_current_scope"
```

A reclassification decision must state the previous tier, proposed tier, material change, control delta, owner decision, reviewer requirement, effective contract/schema version, test-fixture impact, and rollback/pause implications. Any prohibited-data condition, unowned effect, absent reviewer, unknown rollback path, or unresolved policy condition still invokes the existing **hold** override.

### 3.4 Handoff and change-log record

Add the following fields to the existing use-case handoff record:

```text
Approval snapshot ID:
Previous risk tier / rationale:
Proposed risk tier / rationale:
Material-change category:
Changed purpose/input/destination/action/reviewer/rollback field(s):
Control delta:
Reclassification decision owner:
Decision status: approved / rejected / pending / hold
Effective contract and schema version:
Required fixture re-tests:
```

The shared workspace index and change log will record a material change before a revised contract is called accepted. A new version does not inherit earlier approval automatically.

### 3.5 New fixtures and acceptance criteria

| Fixture | Fictional setup | Expected result |
| --- | --- | --- |
| `H-02a` | An R0 research brief changes to an R2 customer-message preparation output | `reclassification_required`; task/destination blocked pending R2 decision. |
| `H-02b` | An R1 triage contract adds a restricted input class | Hold; data/risk review; no task creation until approved. |
| `H-02c` | An R2 proposal removes its named reviewer or safe timeout | Hold; reviewer/timeout control must be restored or re-approved. |
| `H-02d` | A typographic/non-material wording change leaves snapshot fields unchanged | No reclassification; normal version-review policy applies. |

`AUD-F03` can move to **design control accepted and re-tested** only when the snapshot, material-change comparison, decision record, handoff/change-log rule, fixture results, and `SIM-08` re-run all agree. It remains runtime-unverified until an authorized implementation enforces and evidences the gate.

## 4. Required Documentation Changes

| Artifact | Patch required |
| --- | --- |
| Prompt/output design library | Add review-signal field pattern, invariant, consumer enforcement route, and A-08 fixtures. |
| Use-case decision framework | Add material-change table, snapshot requirement, reclassification state, and H-02 fixtures. |
| Shared workspace index | Add reclassification as a mandatory handoff/coordination rule. |
| Operations playbook | Add invariant-failure exception route, snapshot/version correlation fields, and safe hold behavior. |
| Audit plan/findings | Add the new fixture IDs and define proposal/re-test/accepted status without claiming runtime closure. |
| Mock simulation plan/results | Re-run SIM-03 and SIM-08 against the proposed controls; preserve baseline outcomes. |
| Change log | Record proposal, acceptance decision, re-test outcome, and residual runtime-assurance limit. |

## 5. Implementation Boundary and Decision Required

This proposal is ready for design review. It does not authorize configuration changes, code changes, task creation, or destination routing. The decision required is whether to accept the specification for incorporation into the living documents and, separately, whether to authorize a scoped non-production implementation/test charter.
