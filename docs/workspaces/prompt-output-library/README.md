# Workspace B: Prompt, Input, and Structured-Output Design Library

**Objective:** Create reusable, safe, testable prompt contracts and structured-output patterns that transform approved use-case requirements into reliable Manus task inputs and reviewable results.

**Status:** Charter established; design-library research not yet complete

**Evidence label:** Design framework pending pattern-specific evidence and local validation

**Parent index:** [Documentation Workspaces](../README.md)

## Scope

This workspace will turn approved business requirements into compact task briefs, trusted/untrusted input separations, allowed-tool boundaries, structured-output schemas, validation rules, and quality-evaluation fixtures. It will preserve the principle that an authenticated transport event or a schema-shaped output is not, by itself, authorization for a consequential external action.

It will not configure OAuth2, detail webhook authentication mechanics, assemble a complete webhook-driven multi-step Zap, or create slides.

## Planned Deliverables

| Artifact | Purpose | Completion criterion |
| --- | --- | --- |
| Prompt contract library | Reusable task templates for research briefs, internal triage, drafting, and record enrichment | Each template states scope, trusted inputs, untrusted inputs, prohibitions, output, and review rule |
| Input-treatment guide | Defines minimization, normalization, injection resistance, attachments, and sensitive-data handling | Each candidate input field has a justified allowed/prohibited status |
| Structured-output schema patterns | Provides strict schema examples for classifications, summaries, recommendations, exceptions, and review requests | Patterns can be validated with synthetic positive and negative cases |
| Output-validation policy | Specifies success checks, allowlists, range/enum rules, required fields, and fallback behavior | No downstream route consumes a failed or unvalidated result as a decision |
| Adversarial fixture pack | Uses fictional inputs to test instruction injection, missing data, ambiguity, hostile formatting, and out-of-scope demands | Every template has documented expected safe behavior |
| Quality rubric | Scores factual fidelity, completeness, actionability, uncertainty disclosure, and review escalation | Reviewers can compare test outputs consistently |

## Research Questions

1. What is the smallest set of trusted fields that allows each planned task to achieve its purpose?
2. How should each template identify and contain untrusted text without treating it as instruction?
3. Which output fields should be categorical, nullable, or always human-reviewed?
4. What failures should yield a structured exception rather than a speculative answer?
5. How can synthetic fixtures test prompt and schema behavior without using sensitive or production data?

## Handoffs

| Receiving workspace | Required handoff when a pattern is accepted |
| --- | --- |
| Operations workspace | Input/output contract version, correlation fields, validation failures, quality thresholds, review trigger, and expected latency/volume characteristics |
| Use-case workspace | Constraints discovered during design that affect suitability, data minimization, or risk tier |
| Evidence register | Source basis for platform behavior, schema limits, or safety-relevant recommendations |

## Initial Open Questions

| ID | Question | Owner | Resolution trigger |
| --- | --- | --- | --- |
| PO-01 | Which three task archetypes should become the first reusable templates? | Process owner | After initial use-case portfolio selection |
| PO-02 | Which controlled vocabulary and taxonomy must outputs use? | Business/data owner | Before schema patterns are accepted |
| PO-03 | What human-review threshold is needed for uncertain, incomplete, or sensitive outputs? | Risk owner | During pattern approval |
