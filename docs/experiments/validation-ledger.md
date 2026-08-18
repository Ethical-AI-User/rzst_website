# Experimental Validation Ledger: Manus–Zapier Manual

**Research date:** 2026-08-18

## Scope and Safety Conditions

The approved research plan requires only controlled, non-production experiments. An experiment may proceed only with an explicitly authorized Manus and Zapier test workspace, synthetic data, a disposable webhook receiver, no production systems, and no consequential destination action. Any test that would publish, send, update, delete, spend, or otherwise produce an external side effect requires separate explicit approval.

## Access Assessment

The current task configuration was inspected in read-only mode. The Zapier integration connection is disabled, and no user-authorized browser connection is enabled for the task. No credential was requested, no connector was enabled, no browser session was opened, and no Manus or Zapier request was sent.

| Test category | Required test access | Current status | Result | Reason |
| --- | --- | --- | --- | --- |
| Native Manus app capability discovery | Authorized Zapier test workspace | Not available | Not run | The task has no enabled Zapier connection or browser access |
| Native happy-path task creation | Isolated Zap, synthetic trigger and safe destination | Not available | Not run | Would require access to an authenticated test workspace |
| API-by-Zapier request contract | Test API connection with a restricted credential | Not available | Not run | Would require an API key placed in a user-controlled test connection |
| Manus-to-Zapier callback | Disposable receiver and registered test webhook | Not available | Not run | Would create a callback registration and external delivery path |
| Structured-output mapping | Safe task and a test Zap branch | Not available | Not run | Would require the same authenticated test environment |
| Failure, replay, and review paths | Isolated workspace and mock-only side effect | Not available | Not run | Must not induce faults or replay behavior in an unapproved environment |

## Evidence Labels Used in the Manual

| Label | Meaning |
| --- | --- |
| **Documented** | Supported by a cited primary or official source, but not observed in an authorized test workspace for this manual |
| **Observed in test** | Directly observed in a dated, synthetic-data, non-production test; no such observations exist in this revision |
| **Design recommendation** | Vendor-neutral or standards-informed pattern, not a claim that either platform automatically supplies the control |
| **Account-dependent** | Behavior may differ by account, plan, workspace, region, feature rollout, or current product release |

## Future Test Cards

### EV-01 — Native task creation and output routing

| Field | Definition |
| --- | --- |
| Hypothesis | The native Manus app can create a bounded Manus task from mapped trigger data and expose a task identifier/direct URL for later Zap steps. |
| Source basis | Manus integration guide; public Zapier Manus app catalog. |
| Test data | Synthetic lead: `company_name = Example Labs`, `contact_name = Morgan Lee`. |
| Expected result | Test run creates a private task with a visible task identifier/direct URL and does not send external communication. |
| Pass criteria | Mapped values arrive in the configured task; identifier/URL can be captured; no non-test record is changed. |
| Cleanup | Delete the test task if it is no longer needed and disable/delete the test Zap. |

### EV-02 — API-by-Zapier task-creation request

| Field | Definition |
| --- | --- |
| Hypothesis | A domain-restricted API-by-Zapier connection can send a valid JSON `task.create` request without exposing the API key in the Zap body. |
| Source basis | Manus `task.create` and authentication references; Zapier API-by-Zapier documentation. |
| Test data | A benign request that returns a small synthetic structured object. |
| Expected result | A successful response contains `task_id` and `task_url`; the connection configuration, not the request body, stores the API key. |
| Pass criteria | Response parses correctly; no key appears in task history, logs, exports, or the manual; the connection domain filter is limited to the required API domain. |
| Cleanup | Revoke the dedicated test key after validation and delete the test connection if it will not be reused. |

### EV-03 — Completion callback, verification, and deduplication

| Field | Definition |
| --- | --- |
| Hypothesis | A controlled verifier can validate a Manus completion callback over its raw request, reject a stale/invalid request, record the event identifier, and forward only a reduced trusted payload into a test Zap. |
| Source basis | Manus webhook overview/security; Zapier Catch Raw Hook guidance; OWASP API guidance. |
| Test data | Harmless task with a small structured result and disposable callback URL. |
| Expected result | One valid completion event produces one trusted downstream record; a repeated event identifier produces no second side effect; invalid signature/timestamp is rejected. |
| Pass criteria | Signature/timestamp checks run before parse/route; event-ID record is written; duplicate test is safely ignored; no production destination is invoked. |
| Cleanup | Delete Manus webhook registration; destroy disposable endpoint/logs and test Zap; revoke test key. |

### EV-04 — Human-review and failure routing

| Field | Definition |
| --- | --- |
| Hypothesis | A human review gate and error branch stop consequential behavior when the task is waiting, structured output reports failure, or a required field is absent. |
| Source basis | Manus task lifecycle and structured-output documentation; Zapier run-status documentation. |
| Test data | Synthetic `waiting`, malformed schema, missing required field, and mock action samples. |
| Expected result | Each condition creates a review/handled-error record and does not send, publish, update, or delete any real destination. |
| Pass criteria | Workflow state and reviewer outcome are visible in the test history; no mock is replaced with a real side effect. |
| Cleanup | Remove all samples, review items, and test workflow branches. |

## Conclusion

No external experiment was appropriate with the current authorization state. The completed manual will therefore label platform behavior as **documented**, distinguish design recommendations from vendor guarantees, and include these test cards as a deployment-readiness protocol. It will not claim that any integration path was empirically verified in this task.
