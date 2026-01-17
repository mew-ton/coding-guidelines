---
title: Use Structured Logging
description: >
  Output logs in structured JSON format and include context (TraceID) to ensure system observability and debuggability.
keywords:
  - backend
  - logging
  - observability
  - json
  - trace-id
---

## Summary
Adhere to **Structured Logging**. Output logs as machine-readable JSON, not as plain text. Ensure every log entry includes a `TraceID` and `SpanID` propagated from the request context to enable distributed tracing.

## Rationale
- **Machine Parseability**: Log aggregation systems (Datadog, CloudWatch, ELK) can index JSON fields efficiently, allowing queries like `env:prod status:500 user_id:123`.
- **Distributed Tracing**: Without a `TraceID`, it is impossible to correlate logs across multiple microservices for a single request.
- **Consistency**: Standardized fields (`level`, `message`, `timestamp`) make dashboards reliable.

## Guidance
1.  **Format**:
    - **Development**: Text/Console output is acceptable for human readability.
    - **Production**: MUST be JSON.
2.  **Context**:
    - Never discard the `context.Context`. Pass it to the logger.
    - The logger must extract `TraceID` from the context and add it to the log fields.
3.  **Levels**:
    - `ERROR`: Actionable failure requiring alert.
    - `WARN`: Unexpected but handled state.
    - `INFO`: Normal lifecycle events (Start/Stop, Request completed).
    - `DEBUG`: Verbose details for troubleshooting.

## Examples

### Bad (Plain Text)
```go
// harder to index "User created" vs "DB Error"
log.Printf("User %d created", userID) 
```

### Good (Structured)
```go
// JSON output: {"level":"info", "msg":"User created", "user_id":123, "trace_id":"abc-123"}
logger.Info(ctx, "User created", slog.Int("user_id", userID))
```
