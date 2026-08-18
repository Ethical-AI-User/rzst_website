# Evidence Register: Manus–Zapier Manual

**Purpose.** This register records the sources consulted for the Manus–Zapier manual, the claims they can support, their evidence status, and any limitations. It is a working research artifact, not a substitute for the manual’s references section.

**Research date:** 2026-08-18

## Evidence Ratings

| Rating | Meaning | Permitted use in the manual |
| --- | --- | --- |
| **Primary/current** | Current official product documentation or an endpoint-specific API reference | May support product behavior, configuration requirements, and API claims |
| **Official/contextual** | Official tutorial, help article, release note, or product page that lacks full technical detail | May support high-level workflow guidance, but must not override endpoint-specific documentation |
| **Independent/reproducible** | Public, technically inspectable implementation evidence or a recognized standard | May support vendor-neutral design patterns or corroborated implementation observations |
| **Practitioner/illustrative** | Credible case study, blog, community discussion, or educational material | May provide labeled examples after corroboration; cannot establish vendor behavior |
| **Unverified lead** | Search result, anecdote, incomplete reference, or source not fully reviewed | May guide further research only; never cited as fact |

## Sources and Claim Map

| ID | Source | Publisher and type | Rating | Date checked | Claims supported | Limits and follow-up |
| --- | --- | --- | --- | --- | --- | --- |
| MZ-01 | [Zapier — Manus Documentation](https://manus.im/docs/integrations/zapier) | Manus; official integration guide | Primary/current | 2026-08-18 | Documents the visual no-code model: an event in another app can create a Manus task; identifies the setup sequence; lists Create Task, Get Task, Update Task, and Delete Task; documents task fields including prompt, mode, and optional connectors; recommends testing before activation; illustrates filtering, dynamic trigger data, multi-step flows, and scheduled tasks. | The page is an integration guide, not a complete API contract. It does not supply full schemas, exact OAuth scope details, delivery semantics, or plan-specific availability. Confirm those claims in the Manus v2 API docs and Zapier help documentation. |

## Initial Findings

The official Manus integration guide presents the native route as a visual workflow in which a third-party event creates a Manus task and the result is then consumed in Manus or routed through other workflow actions. It identifies four Manus actions—Create Task, Get Task, Update Task, and Delete Task—and describes three configuration inputs for Create Task: a prompt, a mode, and optional connectors. These facts establish the manual’s no-code baseline, while API lifecycle, webhook, signing, retry, and structured-output detail require separate primary-source validation.

## Discrepancy Log

No discrepancies recorded yet.

## Experimental Status

No product experiments have been executed. Source review only.

| MAPI-02 | [task.create](https://open.manus.ai/docs/v2/task.create) | Manus; endpoint-specific API v2 reference | Primary/current | 2026-08-18 | Confirms asynchronous task creation at `POST /v2/task.create`; direct API-key or OAuth authentication; task identifier response; `message.content`, connectors, skills, project assignment, interactive mode, visibility, title, and structured-output schema configuration. | Endpoint contract; use as the authority for request-body and response examples. Any Zapier HTTP-step capability must be verified separately. |
| MAPI-03 | [Webhooks Overview](https://open.manus.ai/docs/v2/webhooks-overview) | Manus; official API v2 guide | Primary/current | 2026-08-18 | Documents `task_created` and `task_stopped` lifecycle callbacks, including `finish` and `ask` stop reasons; callback endpoint requirements (POST JSON, HTTP 200, response within 10 seconds); and the placement of structured output in a completion callback. | Documents Manus-to-receiver behavior. It does not establish Zapier-specific receiver behavior, event deduplication, or receiver-side signature support. |
| MAPI-04 | [Webhook Security](https://open.manus.ai/docs/v2/webhooks-security) | Manus; official API v2 guide | Primary/current | 2026-08-18 | Documents RSA-SHA256 signature verification using `X-Webhook-Signature` and `X-Webhook-Timestamp`; signed-content construction; a five-minute replay window; retrieval and caching of the public key; and HTTPS use. | The guide describes server-side verification. A direct webhook-capture step may not expose raw body/header material needed for verification; the manual must distinguish a simple receiver from a verification-capable intermediary. |
| MAPI-05 | [Structured Output](https://open.manus.ai/docs/v2/structured-output) | Manus; official API v2 guide | Primary/current | 2026-08-18 | Confirms JSON-schema-driven post-task extraction; retrieval by messages or `task_stopped` callback; arm-once/fire-once lifecycle; `success`, `value`, and `error` result handling; and strict schema rules. | The manual must require readers to check `success` rather than treat a schema-conforming fallback value as business-valid output. Schema examples must remain within the documented supported subset. |

## Claim Notes Added 2026-08-18

The API route is asynchronous: a Zapier HTTP step can create a task and store its task identifier, but a downstream workflow should not assume that the final result is returned by the create response. The manual will present two completion-retrieval designs: prototype polling through the task message history and an event-driven completion callback. The latter is preferred for completion routing when the surrounding receiver can securely verify the raw signed request and maintain an idempotency record keyed by the event identifier.

Structured output is valuable when subsequent Zapier branches need stable fields rather than prose. However, the result object must be treated as a contract with a separate success indicator: extraction failures still yield a schema-shaped fallback. The manual will include a pre-validation branch that halts or routes to review when `success` is not true.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research official Zapier webhook receiver capabilities and document a verified-intermediary design if required. |
| D-02 | The native Manus action guide lists task actions, whereas API v2 documentation describes a richer asynchronous lifecycle and structured-output contract. | Present the native action route and API route as distinct choices; do not imply identical field/support coverage. | Check Zapier’s published Manus app behavior and testing documentation. |

## Experimental Status

No product experiments have been executed. Source review only.

| ZH-01 | [Trigger Zap workflows from webhooks](https://help.zapier.com/hc/en-us/articles/8496288690317-Trigger-Zap-workflows-from-webhooks) | Zapier; official help article | Primary/current | 2026-08-18 | Documents Catch Hook and Catch Raw Hook triggers; the latter preserves unparsed body data and includes headers; describes testing, payload-size limits, response behavior, URL ownership/transfer effects, arrays triggering separate runs, and rate limiting. | Catch Raw Hook makes the raw request available to the Zap but does not by itself prove that the Zap can perform the required RSA verification safely. Do not equate receipt with authentication. |
| ZH-02 | [How to get started with Webhooks by Zapier](https://help.zapier.com/hc/en-us/articles/8496083355661-How-to-get-started-with-Webhooks-by-Zapier) | Zapier; official help article | Official/contextual | 2026-08-18 | Documents the webhook URL as a sensitive secret, sample-data debugging while a Zap remains disabled, request inspection, nested data handling, webhooks as sender and receiver, and array-to-multiple-run behavior. | The article includes legacy-style explanatory details alongside current guidance. Use the newer feature-specific documentation as the source of limits and current availability. |
| ZH-03 | [Send webhooks in Zap workflows](https://help.zapier.com/hc/en-us/articles/8496326446989-Send-webhooks-in-Zap-workflows) | Zapier; official help article | Primary/current | 2026-08-18 | Documents GET/POST/PUT and Custom Request choices; JSON, form, XML, and raw payload options; custom headers; basic authentication; nested request construction; and the documented action payload limit. | Advanced authentication requirements may need a private integration or another approved design. The manual must use sanitized placeholders and specify an explicit request body for nested API payloads. |
| ZH-04 | [Troubleshoot webhooks in Zapier](https://help.zapier.com/hc/en-us/articles/8496291737485-Troubleshoot-webhooks-in-Zapier) | Zapier; official troubleshooting article | Primary/current | 2026-08-18 | Documents Custom Request for nested JSON arrays, no redirect support, payload-size errors, HTTPS certificate issues, use of a Code step as an advanced workaround, invalid-payload behavior, sample availability, and multiple runs from arrays. | This supports troubleshooting guidance, not a guarantee of a specific code-runtime capability. The manual will use it to explain observable errors and defensive design practices. |

## Claim Notes Added 2026-08-18

A Zapier workflow can call an external API with a custom request and custom headers, so it can represent a Manus API task-creation request when the account configuration allows the relevant Zapier feature. However, task creation is asynchronous; a manual should store the returned task identifier and use either a state-aware retrieval strategy or a completion event. The native Manus app remains the lower-complexity route for standard create-task automations.

For Manus-to-Zapier callbacks, the manual will offer two variants. A **receipt-only design** uses Catch Raw Hook to preserve headers and the raw request for inspection and routes only non-consequential outputs. A **verified production design** places a controlled verification service in front of Zapier, checks Manus’s signature and timestamp over raw bytes, records the event identifier to prevent duplicate processing, and then sends an internal trusted payload to Zapier. This distinction prevents the unsafe assumption that an obscure receiver URL is an authenticity control.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Catch Raw Hook documents raw body and headers, but receiver capability to execute the complete RSA verification remains unverified. Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research Zapier’s current code/security capabilities; retain verified-intermediary design as the safe default. |
| D-02 | The native Manus action guide lists task actions, whereas API v2 documentation describes a richer asynchronous lifecycle and structured-output contract. | Present the native action route and API route as distinct choices; do not imply identical field/support coverage. | Check Zapier’s published Manus app behavior and testing documentation. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |

## Experimental Status

No product experiments have been executed. Source review only.

| GOV-01 | [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | NIST; public risk-management framework | Independent/reproducible | 2026-08-18 | Establishes a voluntary framework for incorporating trustworthiness into AI-system design, development, use, and evaluation; links the generative-AI profile and the Govern, Map, Measure, Manage functions. | Provides governance framing, not product-specific configuration instructions or legal certification. |
| SEC-01 | [OWASP API Security Project](https://owasp.org/www-project-api-security/) | OWASP; community security standard | Independent/reproducible | 2026-08-18 | Supports least privilege, endpoint/asset inventory, validation of integrated API data, access-control review, resource controls, and safe third-party API consumption as manual security themes. | The document names risk categories; the manual will translate them into proportionate implementation controls without claiming conformance. |
| SEC-02 | [OWASP Top 10 for LLM and Gen AI Applications, 2025](https://genai.owasp.org/llm-top-10/) | OWASP; community security standard | Independent/reproducible | 2026-08-18 | Supports the inclusion of prompt injection, sensitive-information disclosure, improper output handling, excessive agency, misinformation, and unbounded-consumption safeguards in AI automation. | The top-level list identifies categories; use individual risk pages only if detailed mitigations are quoted. |
| REL-01 | [Idempotency-Key header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Idempotency-Key) | MDN; technical reference | Independent/reproducible | 2026-08-18 | Explains why duplicate POST/PATCH delivery can repeat side effects and why a receiver records a unique request identifier plus request identity before performing consequential work. | The page labels the header experimental/non-standard. The manual must not suggest that Manus or Zapier supports a particular idempotency header unless their documentation says so; it will recommend an application-level event-ID ledger for verified callback receivers. |

## Claim Notes Added 2026-08-18

The governance chapter will frame the integration as a socio-technical workflow: scope the AI task, constrain available access, validate both inputs and output fields before action, preserve an audit trail, and reserve high-impact changes for human approval. These are risk-management patterns, not a claim that either platform supplies full compliance controls.

The reliability chapter will distinguish an **event identity** from delivery timing. A receiver should maintain a durable record keyed by the Manus callback `event_id` before a downstream side effect; it should return a rapid acknowledgement only after recording a valid event or route to a retry-safe queue. This is a generic receiver architecture that the manual will label as a production pattern, not a feature automatically created by a Zap.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Catch Raw Hook documents raw body and headers, but receiver capability to execute the complete RSA verification remains unverified. Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research Zapier’s current code/security capabilities; retain verified-intermediary design as the safe default. |
| D-02 | The native Manus action guide lists task actions, whereas API v2 documentation describes a richer asynchronous lifecycle and structured-output contract. | Present the native action route and API route as distinct choices; do not imply identical field/support coverage. | Check Zapier’s published Manus app behavior and testing documentation. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |

## Experimental Status

No product experiments have been executed. Source review only.

| MAPI-06 | [Authentication](https://open.manus.ai/docs/v2/authentication) | Manus; official API v2 guide | Primary/current | 2026-08-18 | Documents API-key authentication for an organization’s own integrations and OAuth bearer tokens for third-party apps acting for users; notes endpoint-specific authentication and scope requirements; directs secure storage and revocation. | `webhook.create` is API-key-only, so a third-party OAuth-only pattern cannot self-register it. Avoid displaying any actual credential in examples. |
| MAPI-07 | [Task Lifecycle](https://open.manus.ai/docs/v2/task-lifecycle) | Manus; official API v2 guide | Primary/current | 2026-08-18 | Documents asynchronous task states and actions: poll/receive events, read results on stop, route error events, send a user answer for `messageAskUser`, and use confirmation only for an explicit action-confirmation event. | The manual must not make a Zap automatically confirm irreversible downstream actions. Waiting states are a human-review boundary by default. |
| MAPI-08 | [task.listMessages](https://open.manus.ai/docs/v2/task.listMessages) | Manus; endpoint-specific API v2 reference | Primary/current | 2026-08-18 | Confirms cursor-paginated task-event retrieval, status update fields, assistant/error messages, and the structured-output event; documents default and maximum page sizes and OAuth scopes. | Suitable as a prototype/fallback completion strategy. Production polling frequency, timers, and rate limits must be checked against current rate-limit documentation and operational needs. |
| MAPI-09 | [webhook.create](https://open.manus.ai/docs/v2/webhook.create) | Manus; endpoint-specific API v2 reference | Primary/current | 2026-08-18 | Confirms API-key-only webhook registration, the requirement for a publicly accessible HTTPS endpoint returning a 2xx status, and the returned webhook identity/status. | The manual will include webhook cleanup/rotation and will not place webhook creation in a generic OAuth-only user flow. |

## Claim Notes Added 2026-08-18

The manual’s completion-handling decision matrix will have three operational outcomes: **finished**, **waiting for human input or confirmation**, and **failed**. Only the finished path may feed a validated output into a downstream automated step. The waiting path must produce a review item or task-owner notification; it must not be converted into an unattended approval.

The polling walkthrough will be explicitly labeled as a low-volume prototype/fallback mechanism. It will preserve cursor state, detect `error` and `waiting` states, and stop polling after a defined timeout. The event-callback walkthrough will be the recommended design where timely completion routing and appropriate verification infrastructure are available.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Catch Raw Hook documents raw body and headers, but receiver capability to execute the complete RSA verification remains unverified. Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research Zapier’s current code/security capabilities; retain verified-intermediary design as the safe default. |
| D-02 | The native Manus action guide lists task actions, whereas API v2 documentation describes a richer asynchronous lifecycle and structured-output contract. | Present the native action route and API route as distinct choices; do not imply identical field/support coverage. | Check Zapier’s published Manus app behavior and testing documentation. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |
| D-05 | A task may stop in a waiting state because it needs a user answer or action confirmation rather than because the business process has completed. | Split `finish`, `ask`, and error branches in all API/webhook diagrams and walkthroughs. | Validate how the native Zapier app exposes such state, if at all; do not infer it from API docs. |

## Experimental Status

No product experiments have been executed. Source review only.

| ZH-05 | [Send API requests in Zap workflows](https://help.zapier.com/hc/en-us/articles/44391650357005-Send-API-requests-in-Zap-workflows) | Zapier; official help article | Primary/current | 2026-08-18 | Documents API by Zapier’s connection-managed credentials, supported HTTP methods, domain filter, mapped JSON body, headers, and test-step behavior; labels the feature beta and premium. | This is the preferred documented Zapier route for API-key storage over manually inserting secrets in request headers. Availability and beta status are date-sensitive. |
| ZH-06 | [Learn key concepts in Zap workflows](https://help.zapier.com/hc/en-us/articles/8496181725453-Learn-key-concepts-in-Zap-workflows) | Zapier; official help article | Official/contextual | 2026-08-18 | Defines filters, Paths, test records, run history, autoreplay, polling, and paid-plan dependencies for multi-step workflows. | Supports workflow vocabulary and route-selection guidance; individual feature behavior should be confirmed in detailed documentation where it matters. |
| ZH-07 | [Review run statuses in Zap workflows](https://help.zapier.com/hc/en-us/articles/20505304170637-Review-run-statuses-in-Zap-workflows) | Zapier; official help article | Primary/current | 2026-08-18 | Documents delayed, errored, handled error, on hold, needs review, running, scheduled, successful, and other run statuses; explains error handlers, human review, autoreplay, and the irreversibility of deleting a completed run. | Enables a concrete runbook, but does not make a Zap-level status equivalent to a Manus task state. Manual will keep the two state machines distinct. |
| ZH-08 | [Webhooks by Zapier rate limits](https://help.zapier.com/hc/en-us/articles/29972220283789-Webhooks-by-Zapier-rate-limits) | Zapier; official help article | Primary/current | 2026-08-18 | Documents that throttling can result in 429 responses or delayed processing despite a 200 response; recommends retrying non-200 deliveries with exponential backoff and provides replay/queue options. | Numeric limits are current as checked but may change. The manual will focus on the design consequence—backoff, monitoring, and deduplication—rather than treating a current number as permanent capacity. |

## Claim Notes Added 2026-08-18

The API-driven walkthrough will use a dedicated Zapier API connection with a domain restriction and stored credential rather than a literal API key in a field. It will use a valid mapped JSON body, test the request before activation, store `task_id`, and immediately branch into either a controlled wait/retrieval mechanism or a completion-callback design. It will state that availability and exact configuration are account- and date-dependent because the documented API action is beta and premium.

The operational checklist will compare the two systems’ states rather than flatten them: a Manus task can be running, waiting, stopped, or error, while a Zap run can be successful, delayed, needs review, on hold, or handled-error. A reliable implementation monitors both histories, has an explicit error branch, and treats replay as a potential duplicate-side-effect risk unless the downstream consumer is idempotent.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Catch Raw Hook documents raw body and headers, but receiver capability to execute the complete RSA verification remains unverified. Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research Zapier’s current code/security capabilities; retain verified-intermediary design as the safe default. |
| D-02 | The native Manus action guide lists task actions, whereas API v2 documentation describes a richer asynchronous lifecycle and structured-output contract. | Present the native action route and API route as distinct choices; do not imply identical field/support coverage. | Check Zapier’s published Manus app behavior and testing documentation. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |
| D-05 | A task may stop in a waiting state because it needs a user answer or action confirmation rather than because the business process has completed. | Split `finish`, `ask`, and error branches in all API/webhook diagrams and walkthroughs. | Validate how the native Zapier app exposes such state, if at all; do not infer it from API docs. |
| D-06 | Zapier autoreplay or manual replay can repeat a successful upstream task-creation request if the original response was not retained or the error lies downstream. | Treat replay as a controlled recovery action and require a task-ID/event-ID lookup or human review before reissuing a create-task request. | Validate exact replay semantics only with a safe test account; do not state delivery guarantees. |

## Experimental Status

No product experiments have been executed. Source review only.

| DOC-01 | [Best practices for GitHub Docs](https://docs.github.com/en/contributing/writing-for-github-docs/best-practices-for-github-docs) | GitHub; official documentation guidance | Primary/current | 2026-08-18 | Supports reader-centered structure, clear context, logical task order, meaningful headings, concise paragraphs, tables, visuals, warnings, and code blocks for scannability. | It is GitHub’s own documentation style guidance, not a required repository style. It will guide the manual while the repository’s existing conventions take precedence. |
| DOC-02 | [Basic writing and formatting syntax](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) | GitHub; official Markdown reference | Primary/current | 2026-08-18 | Confirms heading hierarchy and automatic outlines, reference-style links, relative links, and GitHub-Flavored Markdown behavior. | The rendered manual will avoid custom HTML anchors unless the repository needs them; heading edits may change anchor URLs. |
| DOC-03 | [Creating and highlighting code blocks](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks) | GitHub; official Markdown reference | Primary/current | 2026-08-18 | Confirms blank-line-separated fenced code blocks, lower-case language identifiers for highlighting, and Mermaid support in code blocks. | The manual will use Mermaid only for a small number of diagrams and include a text/table alternative so critical information is not diagram-only. |
| DOC-04 | [Organizing information with tables](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables) | GitHub; official Markdown reference | Primary/current | 2026-08-18 | Confirms standard pipe-table syntax, formatting in cells, and the need for a blank line before tables. | The manual will keep cells concise and will not embed long code blocks in tables. |

## Claim Notes Added 2026-08-18

The completed manual will use a single descriptive H1, task-oriented H2/H3 headings, an executive route-selection table near the top, short paragraphs, fenced `json`, `http`, and `text` examples, and a limited number of Mermaid diagrams. Links to repository research artifacts will be relative. Tables will summarize choices and contracts rather than carry procedural prose or large payloads.

## Experimental Status

No product experiments have been executed. Source review only.

| ZAPP-01 | [Manus + Webhooks by Zapier template](https://zapier.com/apps/manus/integrations/webhook/255675041/fetch-new-manus-tasks-using-webhooks-by-zapier) | Zapier; public app/template page | Primary/current | 2026-08-18 | Shows current public Manus app events and fields, including instant Task Created and Task Stopped triggers, Create Task, Continue Task, Get Task(s), Update Task, and Delete Task actions; exposes Create Task configuration such as instructions, agent profile, connectors, visibility, project, locale, follow-up questions, and structured-output schema. | The catalog surface is date-sensitive and account-dependent. It is the best observed public native integration evidence but does not replace API contract documentation. |
| ECO-01 | [tigusigalpa/manus-ai-go](https://github.com/tigusigalpa/manus-ai-go) | Third-party public SDK and testable source repository | Practitioner/illustrative | 2026-08-18 | Illustrates a message-based v2 task flow, task-message polling, wait/confirmation handling, webhook parsing, and SDK-level tests. It corroborates the need to separate task creation from task completion. | Third-party code may be stale or incorrect and does not currently verify each webhook signature in its shown handler. It will not be copied or treated as an authority. |

## Claim Notes Added 2026-08-18

The current public Zapier catalog indicates that the native Manus integration itself exposes both task-originated triggers and task-management actions. Therefore, the manual will put the native connector first and will describe the generic HTTP/API approach as a fallback for custom request requirements, an independent integration, or a need to operate against explicit API v2 contracts. The actual fields visible in a reader’s Zap editor remain the final configuration authority.

The independently maintained SDK supports the manual’s architectural conclusion that a robust integration is asynchronous and stateful, but its implementation is not a template for security-sensitive code. The manual will retain official signature verification instructions and a separate idempotency layer rather than rely on a convenience parser.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while a generic no-code webhook receiver may not expose raw headers and raw bytes needed for that verification. | Catch Raw Hook documents raw body and headers, but receiver capability to execute the complete RSA verification remains unverified. Do not claim that a direct generic webhook receiver alone provides verified Manus event processing. | Research Zapier’s current code/security capabilities; retain verified-intermediary design as the safe default. |
| D-02 | The native Manus action guide lists a narrower action set than the current public Zapier catalog, which also shows Task Created/Stopped triggers and Continue Task/Get Tasks actions. | Treat the Zapier catalog as the current native-app surface and state that it may vary. Do not infer every native field from the Manus API. | Use a safe test workspace only if access permits to confirm the displayed fields. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |
| D-05 | A task may stop in a waiting state because it needs a user answer or action confirmation rather than because the business process has completed. | Split `finish`, `ask`, and error branches in all API/webhook diagrams and walkthroughs. | Validate how the native Zapier app exposes such state, if at all; do not infer it from API docs. |
| D-06 | Zapier autoreplay or manual replay can repeat a successful upstream task-creation request if the original response was not retained or the error lies downstream. | Treat replay as a controlled recovery action and require a task-ID/event-ID lookup or human review before reissuing a create-task request. | Validate exact replay semantics only with a safe test account; do not state delivery guarantees. |

## Experimental Status

No product experiments have been executed. Source review only.

| ZH-09 | [Use JavaScript code in Zap workflows](https://help.zapier.com/hc/en-us/articles/8496310939021-Use-JavaScript-code-in-Zap-workflows) | Zapier; official help article | Primary/current | 2026-08-18 | Documents sandboxed Node.js 22 code steps, mapped input data, return behavior, debugging via run history, standard Node.js library availability, StoreClient, public-package availability on paid plans, and runtime/I/O limitations. | The guide does not document a turnkey, persistent secure-secret/key-rotation facility for signature verification. A code step must be considered an advanced, bounded implementation and not a general substitute for a controlled verifier. |

## Claim Notes Added 2026-08-18

An advanced builder may be able to combine Catch Raw Hook inputs with a Code by Zapier step and Node’s standard cryptographic facilities, but this manual will **not** promote that as the default production verifier. The exact signed URL, raw-byte preservation, public-key retrieval/caching, secret handling, timeout, and replay/idempotency requirements need to be tested in the specific account and can exceed the maintainability of a visual workflow. The default production pattern will therefore remain: a small controlled verification endpoint validates the Manus request, logs the event identity, and forwards a reduced trusted payload to Zapier. The manual will label the in-Zap option as an advanced experiment with preconditions, not a universal recipe.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while Zapier documents raw webhook inputs and a sandboxed code step but does not provide a turnkey signature-verification/secret-rotation flow. | Retain controlled verification endpoint as the production default. Mention an in-Zap code approach only as advanced, account-tested, and non-default. | Resolve experimentally only if the user supplies an isolated test workspace and accepts the test’s non-production scope. |
| D-02 | The native Manus action guide lists a narrower action set than the current public Zapier catalog, which also shows Task Created/Stopped triggers and Continue Task/Get Tasks actions. | Treat the Zapier catalog as the current native-app surface and state that it may vary. Do not infer every native field from the Manus API. | Use a safe test workspace only if access permits to confirm the displayed fields. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |
| D-05 | A task may stop in a waiting state because it needs a user answer or action confirmation rather than because the business process has completed. | Split `finish`, `ask`, and error branches in all API/webhook diagrams and walkthroughs. | Validate how the native Zapier app exposes such state, if at all; do not infer it from API docs. |
| D-06 | Zapier autoreplay or manual replay can repeat a successful upstream task-creation request if the original response was not retained or the error lies downstream. | Treat replay as a controlled recovery action and require a task-ID/event-ID lookup or human review before reissuing a create-task request. | Validate exact replay semantics only with a safe test account; do not state delivery guarantees. |

## Experimental Status

No product experiments have been executed. Source review only.

| MAPI-10 | [Integrations Overview](https://open.manus.ai/docs/v2/integrations-overview) | Manus; official API v2 guide | Official/contextual | 2026-08-18 | Positions Zapier as a supported route for creating and interacting with Manus tasks from existing workflow tools and describes integration setup through workspace authorization. | Provides context, not a detailed Zapier app contract. |
| ZH-10 | [How to get started with API by Zapier](https://help.zapier.com/hc/en-us/articles/44391660158733-How-to-get-started-with-API-by-Zapier) | Zapier; official help article | Primary/current | 2026-08-18 | Documents secure connection-managed static-header API keys/OAuth2, domain filters, test URLs, beta/premium status, and the governance caveat that some general app-access controls do not apply unless the app is managed. | Supports an API-by-Zapier setup section and a governance warning. It is product behavior as checked, not a permanent entitlement statement. |
| OPS-01 | [Zapier Status](https://status.zapier.com/) | Zapier; official status page | Primary/current | 2026-08-18 | The page reported that Zapier was fully operational at the research check time and exposes service-status history/subscription features. | A point-in-time health snapshot only; it will not be presented as an uptime guarantee. The manual will link to the page for live incident checks. |

## Claim Notes Added 2026-08-18

The API-by-Zapier route gives the strongest documented no-code control over API-key placement because the credential belongs in a connection rather than an inline request. The manual will require a domain filter limited to `api.manus.ai` and will call out that API-by-Zapier has distinct account governance behavior. It will include a quarterly review item for connection ownership, domain filters, webhook URLs, feature availability, and current documentation.

The manual’s operations chapter will use live status pages as a triage input, not a guarantee. When a workflow fails, the first checklist will distinguish a vendor incident, authorization failure, validation error, throttling delay, a task waiting for human input, and downstream side-effect failure.

## Experimental Status

No product experiments have been executed. Source review only.

| SEC-03 | [Webhook Security Vulnerabilities Guide](https://hookdeck.com/webhooks/guides/webhook-security-vulnerabilities-guide) | Hookdeck; independent practitioner security guide | Independent/reproducible | 2026-08-18 | Corroborates raw-body verification, replay protection, idempotent consumption, configuration access control, payload minimization, audit trails, and fixture-oriented verification of a receiver. | Uses HMAC examples and provider-agnostic patterns; it does not describe Manus’s RSA-SHA256 contract and will not be used to substitute for Manus endpoint documentation. |
| SEC-04 | [Replay prevention](https://webhooks.fyi/security/replay-prevention) | Webhooks.fyi; independent technical guidance | Independent/reproducible | 2026-08-18 | Explains the local validation sequence for signed timestamps, exact payload construction, clock tolerance, and persisted unique event identifiers. | Provider-neutral material; use only for the general test methodology. Manus remains the authority for exact header names, cryptographic algorithm, and signed-string format. |

## Claim Notes Added 2026-08-18

A fully offline webhook-validation protocol can validate the **receiver implementation** without claiming to validate Manus or Zapier behavior. It can generate an ephemeral local RSA keypair; sign fixture requests using the documented Manus signing format; assert verification success; then mutate raw bytes, URL, timestamp, headers, event ID, and structured-output fields to verify rejection, deduplication, or review routing. This tests the trust boundary, not the live provider delivery path.

## Discrepancy Log

| ID | Observation | Current treatment | Required follow-up |
| --- | --- | --- | --- |
| D-01 | Manus documents signature verification for an endpoint under the implementer’s control, while Zapier documents raw webhook inputs and a sandboxed code step but does not provide a turnkey signature-verification/secret-rotation flow. | Retain controlled verification endpoint as the production default. Mention an in-Zap code approach only as advanced, account-tested, and non-default. | Resolve experimentally only if the user supplies an isolated test workspace and accepts the test’s non-production scope. |
| D-02 | The native Manus action guide lists a narrower action set than the current public Zapier catalog, which also shows Task Created/Stopped triggers and Continue Task/Get Tasks actions. | Treat the Zapier catalog as the current native-app surface and state that it may vary. Do not infer every native field from the Manus API. | Use a safe test workspace only if access permits to confirm the displayed fields. |
| D-03 | Zapier webhook receivers may process array payloads as multiple runs and may retain/alter behavior after ownership changes or deactivation. | Require a single event object per Manus callback, persist/monitor event identifiers, and include a post-transfer/update checklist. | Research Zapier rate-limit and task-history behavior for operational guidance. |
| D-04 | Generic HTTP idempotency guidance cannot be assumed to be implemented by a particular vendor endpoint. | Use a receiver-side event-ID ledger rather than prescribe an undocumented header. | Verify any vendor-specific retry/duplicate semantics only if documented. |
| D-05 | A task may stop in a waiting state because it needs a user answer or action confirmation rather than because the business process has completed. | Split `finish`, `ask`, and error branches in all API/webhook diagrams and walkthroughs. | Validate how the native Zapier app exposes such state, if at all; do not infer it from API docs. |
| D-06 | Zapier autoreplay or manual replay can repeat a successful upstream task-creation request if the original response was not retained or the error lies downstream. | Treat replay as a controlled recovery action and require a task-ID/event-ID lookup or human review before reissuing a create-task request. | Validate exact replay semantics only with a safe test account; do not state delivery guarantees. |
| D-07 | An offline harness can test a receiver’s algorithm, policy, and fixture handling but cannot validate live provider delivery, Zapier field mapping, account configuration, or current UI/app behavior. | Label offline results as local implementation validation only; retain live-workspace cards as a separate future phase. | Run EV-03 in an authorized test workspace before treating callback delivery as empirically observed. |

## Experimental Status

No product experiments have been executed. Source review only.

| GOV-01 | [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/) | NIST; official guidance | Primary/current | 2026-08-18 | Presents voluntary, context-tailorable suggested actions aligned to the AI RMF’s Govern, Map, Measure, and Manage functions; notes the resource is living and subject to update. | Supports a configurable use-case framework, not a mandatory certification or universal scoring method. |
| GOV-02 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST; official framework text | Primary/current | 2026-08-18 | Grounds continuous governance, context mapping, risk/benefit documentation, human-oversight design, testing, monitoring, defined responsibilities, and go/no-go decisions in the AI lifecycle. | Supports the portfolio’s intake and risk-tier criteria; it does not prescribe Manus- or Zapier-specific controls. |
| GOV-03 | [NIST AI RMF: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) | NIST; official publication | Primary/current | 2026-08-18 | A cross-sector companion profile for applying AI RMF considerations to generative AI design, use, evaluation, and lifecycle decisions. | Contextual support; implementation decisions still require organization-specific analysis. |
| GOV-04 | [OECD AI Principles](https://www.oecd.org/en/topics/sub-issues/ai-principles.html) | OECD; intergovernmental standard | Primary/current | 2026-08-18 | Supports human agency/oversight, transparency, robustness/security/safety, accountability, traceability, and ongoing systematic risk management appropriate to context. | Provides principles rather than vendor-configuration instructions or a compliance determination. |

## Claim Notes Added 2026-08-18

The use-case workspace will evaluate purpose, context, affected parties, data categories, action consequence, human oversight, reversibility, testability, observability, success measures, and ownership. Its risk tiers will guide a design recommendation—manual, draft-only, human-reviewed, controlled test, or prohibited—not make an autonomous deployment decision. The framework will preserve the distinction between a valuable task, a technically feasible task, and an acceptable automation.

## Experimental Status

No product experiments have been executed. Source review only.

| SAFE-01 | [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | OWASP; primary security guidance | Primary/current | 2026-08-18 | Identifies direct and indirect prompt injection; recommends constrained behavior, expected-format validation, filtering, least privilege, human approval for high-risk actions, external-content separation, and adversarial testing. | Supports defense in depth, not a claim that a prompt template alone can eliminate injection risk. |
| SAFE-02 | [OWASP LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | OWASP; primary security guidance | Primary/current | 2026-08-18 | Provides practical guidance for input treatment, explicit data/instruction separation, output monitoring/validation, human-in-the-loop controls, least privilege, monitoring, and adversarial test types. | Contains illustrative implementation material; this documentation will extract principles and synthetic fixtures rather than prescribe a particular external library. |
| SAFE-03 | [OWASP LLM05:2025 Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/) | OWASP; primary security guidance | Primary/current | 2026-08-18 | Describes risks from passing model output to downstream systems without validation/sanitization and recommends zero-trust handling, context-aware encoding, parameterization, and monitoring. | Applies broad application-security principles; output destinations still require destination-specific safe handling. |

## Claim Notes Added 2026-08-18

The prompt/output workspace will separate trusted instructions from untrusted data, limit each task’s scope and permitted access, require schema and business-rule validation after a result is generated, require review for high-impact or uncertain outputs, and maintain a synthetic adversarial fixture pack. It will state explicitly that prompt instructions and pattern filters reduce risk but do not eliminate prompt injection; deterministic validation and external-action boundaries remain necessary.

## Experimental Status

No product experiments have been executed. Source review only.

| OPS-02 | [NIST SP 800-61r3: Incident Response Recommendations and Considerations](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf) | NIST; official publication | Primary/current | 2026-08-18 | Frames incident response as an integrated lifecycle of governance, identification, protection, detection, response, recovery, and continuous learning; supports documented roles, preparation, containment, recovery, and lessons learned. | Cybersecurity-focused guidance; the operations workspace adapts its lifecycle principles for automation incidents without representing the framework as a product runbook. |
| OPS-03 | [Google SRE Incident Management Guide](https://sre.google/resources/practices-and-processes/incident-management-guide/) | Google SRE; primary practitioner guidance | Primary/current | 2026-08-18 | Supports timely, actionable, user-impact-oriented alerts; defined incident roles; clear communications; current playbooks; practice exercises; and blameless learning. | Operational design guidance, not a contractual availability standard or mandate for a small team to replicate all SRE roles. |
| OPS-04 | [Google SRE: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) | Google SRE; primary practitioner guidance | Primary/current | 2026-08-18 | Defines indicators and objectives as user-relevant, measurable service properties; supports a small set of clear measurements, correctness alongside operational indicators, and iterative targets. | Designed for service reliability; use as a pattern for workflow health indicators rather than an assertion that every workflow needs formal SLOs. |

## Claim Notes Added 2026-08-18

The operations workspace will define user- and process-relevant health signals, avoid alerts that are not actionable, attach every high-impact alert to a runbook/owner, and record lessons in the documentation loop. It will distinguish service availability from workflow correctness and decision quality. Its incident lifecycle will be prepare, detect/triage, contain, recover, learn, and update the relevant documentation—not blind replay.

## Experimental Status

No product experiments have been executed. Source review only.

| AUD-01 | [OWASP LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) | OWASP; primary security guidance | Primary/current | 2026-08-18 | Identifies excessive functionality, permissions, and autonomy as risk drivers; recommends least functionality/privilege, human approval for high-impact actions, downstream authorization, input/output hygiene, monitoring, and rate limits. | Supports audit tests of action boundaries and approval gates; it does not establish a claim about configured permissions in an untested account. |
| AUD-02 | [OWASP LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/) | OWASP; primary security guidance | Primary/current | 2026-08-18 | Identifies disclosure risks for personal, financial, health, confidential business, credential, and legal information; recommends data sanitization, input validation, least privilege, restricted data sources, transparency, tokenization, and redaction. | Supports fixture/logging/data-minimization tests; no real sensitive data is used in this documentation audit. |
| AUD-03 | [MITRE ATLAS](https://atlas.mitre.org/) | MITRE; primary adversarial-AI knowledge base | Primary/current | 2026-08-18 | Provides a living taxonomy of adversarial tactics and techniques including direct/indirect prompt injection, agent-context/tool-data poisoning, prompt obfuscation, system-information discovery, data leakage, and agentic resource consumption. | Serves as a threat-coverage taxonomy, not a finding that a given technique is exploitable in this design-only documentation set. |

## Claim Notes Added 2026-08-18

The adversarial audit will be documentation-level and fixture-only. It will test whether the stated use-case, prompt/output, and operations controls define a safe response for instruction/data confusion, scope escalation, sensitive-data handling, untrusted handoffs, schema/semantic ambiguities, duplicate or uncertain effects, review bypass, and incident-record contamination. Results will distinguish a documented control, an identified design gap, and an unverified runtime property.

## Experimental Status

No live platform, connector, webhook, or external endpoint will be contacted by the adversarial audit. All fixtures are fictional text or structured metadata.

| ASSURE-01 | [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | NIST; official framework | Primary/current | 2026-08-18 | Frames AI risk management as a lifecycle activity organized by Govern, Map, Measure, and Manage; identifies context, risk tolerance, reliable metrics, third-party components, and different controlled/real-world settings as material to risk measurement. | Supports an evidence ladder and context-specific assurance posture; it does not prescribe a universal pass threshold or certify an integration. |
| ASSURE-02 | [NIST Incident Response Project](https://csrc.nist.gov/projects/incident-response) | NIST; official project guidance | Primary/current | 2026-08-18 | Describes SP 800-61r3’s integrated preparation, detection, response, recovery, and improvement model; lessons are analyzed, prioritized, and used across risk-management functions. | Supports continual operating review and learning; it does not prove an organization has an effective incident process. |
| ASSURE-03 | [Zapier: View and manage your Zap history](https://help.zapier.com/hc/en-us/articles/8496291148685-View-and-manage-your-Zap-history) | Zapier; official documentation | Primary/current | 2026-08-18 | States that Zap history records Zap runs, status, run details, version information, and received/sent step data; notes replay capability and a maximum guaranteed 60-day history retention / up to 10,000 displayed runs, with export offered for longer-term records. | Supports account-specific observability and retention planning; actual accessibility, plans, retention, and replay behavior must be confirmed in the authorized workspace. |

## Claim Notes Added 2026-08-18

Runtime-effectiveness assurance must be claim-specific and context-specific. Controlled documentation review and synthetic fixtures provide design evidence; authorized implementation/configuration inspection and fictional-data non-production tests are needed before claiming a configuration enforces a control. Operational evidence must retain approved correlations, contract/version context, review status, destination-effect state, and recovery outcomes outside any platform history retention that is insufficient for the organization’s requirements.

## Experimental Status

No live platform, account, connector, endpoint, credential, task, workflow, or external destination was accessed during this research update.
