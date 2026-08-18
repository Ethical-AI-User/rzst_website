# Living Documentation Governance: Manus–Zapier Manual

**Status:** Active working protocol

**Effective date:** 2026-08-18

**Applies to:** `docs/manus-zapier-integration-manual.md` and its research and experimental-supporting artifacts

## Purpose

This protocol turns the Manus–Zapier manual into a **living document**: a maintained body of evidence rather than a one-time publication. Each future interaction may contribute a question, correction, new implementation pattern, research source, experimental result, or operational incident. The documentation set will preserve that contribution in a location appropriate to its certainty and audience.

> **Operating principle:** No claim becomes a production instruction merely because it was discussed. Every material update must be labeled as documented, observed in a controlled test, a design recommendation, or an unresolved question.

## Documentation Set and Responsibilities

| Artifact | Role | Update when | Confidence boundary |
| --- | --- | --- | --- |
| [Implementation Manual](manus-zapier-integration-manual.md) | Reader-facing explanation, procedures, walkthroughs, controls, and checklists | A verified finding changes reader action, architecture, risk control, or troubleshooting guidance | Contains only current, cited facts and clearly labeled design recommendations |
| [Evidence Register](research/evidence-register.md) | Source metadata, supported claims, evidence ratings, and discrepancies | A new source, claim, contradiction, product change, or source-quality issue appears | Records what the source proves and what it does not prove |
| [Experimental Validation Ledger](experiments/validation-ledger.md) | Test cards, access limitations, results, anomalies, and cleanup records | A controlled test is proposed, run, paused, or invalidated | Separates documented behavior from observed behavior |
| **Change Log** | Concise chronological record of what changed and why | Every accepted material edit | Links changes to evidence IDs, test cards, and affected manual sections |
| **Decision Log** | Durable record of material design choices and rejected alternatives | An architecture choice changes scope, trust boundary, or operations | Captures rationale, owner, review trigger, and reversibility |
| **Open Questions Register** | Questions, evidence gaps, and user decisions still needed | A claim cannot be responsibly resolved now | Prevents assumptions from silently becoming guidance |

## The Interaction-to-Document Cycle

Every future conversation about Manus and Zapier will follow this cycle. The cycle is designed for iterative collaboration; it does not run automatically in the background or without a user request.

| Stage | What happens in the interaction | Documentation action | Completion criterion |
| --- | --- | --- | --- |
| 1. Intake | Identify whether the user is asking for information, a correction, a new workflow, an experiment, or a production change | Add a short item to the open-questions register if the request changes scope or needs verification | The request has a stated objective and affected artifact(s) |
| 2. Classify | Mark the proposed content as product fact, implementation observation, recommendation, incident learning, or open question | Select the evidence label and the required verification level | No unverified observation is treated as a product fact |
| 3. Research or test | Collect primary documentation first; run a controlled test only with authorized non-production access | Add source entries or experiment cards before drafting conclusions | Claims have provenance, limitations, and a date |
| 4. Reconcile | Compare new evidence with current guidance and identify conflicts | Update the discrepancy log and decide whether to revise, qualify, or retire existing guidance | Contradictions are visible rather than silently overwritten |
| 5. Draft | Update the reader-facing manual, supporting artifacts, or both | Cite factual claims; identify design recommendations and account-dependent behavior | A reader can see what changed and why it matters |
| 6. Validate | Run Markdown, link, security, and scope checks; review any safety-sensitive changes | Record validation outcome in the change log | The change is internally consistent and does not expose secrets or unsafe instructions |
| 7. Publish and review | Commit the versioned change and summarize it for the user | Add commit reference, next review date/trigger, and any remaining open question | The update is discoverable and reversible |

## Evidence and Claim Taxonomy

The following labels must appear in prose where a reader could otherwise mistake a recommendation or untested pattern for guaranteed platform behavior.

| Label | Meaning | Minimum evidence required | Example use |
| --- | --- | --- | --- |
| **Documented** | A current official source describes the behavior | Endpoint-specific or feature-specific primary documentation | “Manus documents the `task_stopped` callback.” |
| **Observed in test** | The behavior was seen in a dated, synthetic-data, non-production test | Complete experiment card with outcome and cleanup record | “Observed in test on 2026-08-18: the test trigger exposed these fields.” |
| **Design recommendation** | A defensible engineering pattern rather than a vendor feature claim | Cited standards/guidance or clear reasoning | “Place a verifier in front of downstream consequential actions.” |
| **Account-dependent** | Availability can vary by plan, region, workspace, rollout, or connected application | Current documentation and a visible caveat | “Confirm the native action fields in your Zap editor.” |
| **Open question** | The team does not yet have adequate evidence | Open-questions entry with owner and next action | “Verify retry semantics in the target workspace before enabling autoreplay.” |

## Change Classification and Review Thresholds

| Change class | Examples | Required review | Required artifacts |
| --- | --- | --- | --- |
| Editorial | Clarified wording, typo, heading improvement, link repair | Documentation owner | Change log entry when material; otherwise grouped in the next release note |
| Evidence update | New primary source, revised API field, changed plan caveat | Documentation owner plus technical reviewer if behavior changes | Evidence-register entry and affected citations |
| Procedure update | New walkthrough step, deployment checklist change, revised troubleshooting sequence | Technical owner | Evidence entry, manual update, validation record |
| Security/control update | Credential handling, signature verification, approvals, privacy, audit policy | Security or risk owner plus technical owner | Decision log, threat/control rationale, validation record |
| Experimental update | Test result, anomaly, regression, cancelled test | Test owner plus technical owner | Experiment card, ledger outcome, discrepancy update |
| Production-impacting update | New endpoint, workflow activation, sender/receiver change, external side effect | Named business owner and technical owner; explicit approval where needed | Decision log, deployment plan, rollback plan, test evidence |

## Versioning and Release Practice

The Markdown files remain readable at every commit. Use semantic document versions in the manual’s metadata:

| Version change | Use when | Example |
| --- | --- | --- |
| **Patch** | Clarification, citation, link, or non-behavioral correction | `1.0.1` fixes a broken reference |
| **Minor** | New supported route, walkthrough, test protocol, or materially improved guidance | `1.1.0` adds an offline webhook-validation chapter |
| **Major** | A recommendation is retired, trust boundary changes, or a prior architecture is no longer safe/current | `2.0.0` replaces a direct callback pattern with a verified intermediary requirement |

Each release entry must state the date, summary, affected manual sections, evidence IDs/test cards, compatibility implications, and required reader action. Existing instructions are never silently deleted when the history is needed to explain a change; instead, mark them superseded and explain the replacement.

## Recurring Maintenance Triggers

The manual should be reviewed when any of the following occurs.

| Trigger | Required action |
| --- | --- |
| Manus or Zapier updates a relevant app, endpoint, authentication method, webhook contract, or plan capability | Re-check primary documentation, update evidence, and assess every affected manual claim |
| A synthetic test or incident reveals unexpected behavior | Create an experiment/incident entry, compare with documentation, and update the troubleshooting and decision records |
| A workflow gains a new connector, destination, data category, or external side effect | Re-run the access, data-boundary, approval, and rollback review |
| A key, webhook URL, owner, or connected account changes | Review connection ownership, domain restrictions, verifier configuration, and recovery procedures |
| A user asks a new question or proposes a new automation pattern | Classify it through this protocol before adding it to the manual |
| Quarterly, even without a reported change | Re-check key sources, status/incident guidance, open questions, and experiment age |

## Definition of a High-Quality Update

A change is ready to publish only when it is accurate, cited where factual, readable to its intended audience, consistent with the current trust boundary, free of real secrets and personal data, and linked to a reversible version-control change. A high-quality update also states what remains uncertain rather than filling gaps with plausible assumptions.

## Immediate Next Step

The next living-document revision will add a detailed **offline experimental-validation protocol** for Manus–Zapier webhooks and consolidate the existing deployment checklist and security controls into a quick-reference section. The work will be recorded in the change log and linked to the existing evidence register and validation ledger.
