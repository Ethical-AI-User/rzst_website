# Workspace A: Use-Case Portfolio and Decision Framework

**Objective:** Identify and prioritize Manus–Zapier automation opportunities that have a clear business purpose, bounded data and action scope, measurable value, and an acceptable risk posture.

**Status:** Charter established; portfolio research not yet complete

**Evidence label:** Design framework pending use-case-specific evidence

**Parent index:** [Documentation Workspaces](../README.md)

## Scope

This workspace will create a repeatable way to decide whether a proposed automation should be rejected, kept manual, prototyped with synthetic data, designed for human review, or advanced to an authorized test. It will focus on business suitability, data boundaries, approval needs, expected outcomes, and operational ownership.

It will not configure OAuth2, define webhook authentication mechanics, build an end-to-end webhook-to-multi-step Zap, or create slides.

## Planned Deliverables

| Artifact | Purpose | Completion criterion |
| --- | --- | --- |
| Use-case intake card | Captures business purpose, users, trigger, inputs, outputs, destination, risk, and owner | Every candidate can be compared using the same facts |
| Suitability matrix | Scores repeatability, input stability, action consequence, data sensitivity, review need, observability, and reversibility | Scoring produces a documented recommendation rather than an automatic decision |
| Risk-tier model | Separates low-risk internal drafting from higher-risk external or irreversible actions | Each tier has a permitted action boundary and minimum control set |
| Decision tree | Selects manual process, draft-only support, human-reviewed automation, controlled test, or rejection | Paths are understandable to non-specialists and link to controls |
| Initial opportunity portfolio | Lists candidate patterns and priority rationale without enabling a workflow | Each candidate has an owner, confidence, and next validation step |

## Research Questions

1. Which classes of work benefit from AI-assisted preparation but should remain human-authorized?
2. What conditions make an inbound event unsuitable for automation, even if it is technically possible?
3. Which inputs are stable enough to support a bounded prompt contract and structured result?
4. What success measures demonstrate meaningful improvement without obscuring quality, fairness, privacy, or operational risk?
5. What review, rollback, and monitoring controls are proportionate to each risk tier?

## Handoffs

| Receiving workspace | Required handoff when a use case advances |
| --- | --- |
| Prompt/output library | Approved business purpose, trusted/untrusted input map, allowed tasks, prohibited actions, required output fields, and human-review trigger |
| Operations workspace | Owner, success metric, failure conditions, action boundary, data classification, and recovery/reversal requirement |
| Evidence register | Any product claim, source, or account-dependent caveat discovered during assessment |

## Initial Open Questions

| ID | Question | Owner | Resolution trigger |
| --- | --- | --- | --- |
| UC-01 | Which first three real business processes should be assessed using the intake card? | Business owner | User provides candidate processes or approves a discovery brief |
| UC-02 | What data classifications and legal/regulatory rules govern the target workflows? | Data/risk owner | Before any use case is marked ready for authorized test |
| UC-03 | What measures define quality, timeliness, and failure for each selected process? | Process owner | During use-case scoring |
