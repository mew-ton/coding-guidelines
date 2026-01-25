---
type: indicator
title: Implement Graceful Shutdown
description: >
  Ensure servers handle termination signals (SIGTERM) correctly to stop accepting new requests and finish active ones before exiting.
keywords:
  - backend
  - servers
  - reliability
  - graceful-shutdown
  - signals
---

## Summary
Backend services must listen for OS signals (like `SIGTERM` and `SIGINT`) and perform a **Graceful Shutdown** procedure. This ensures that no in-flight requests are dropped abruptly during deployments or scaling events.

## Rationale
- **Zero Downtime**: Rolling updates in Kubernetes or other orchestrators rely on the application handling `SIGTERM` to safely drain traffic.
- **Data Integrity**: Ensures database transactions and open file handles are closed properly, not corrupted by a forced kill.

## Guidance
1.  **Listen**: Use `signal.Notify` (Go) or `process.on('SIGTERM')` (Node.js) to catch signals.
2.  **Stop**: Stop the HTTP server from accepting *new* connections.
3.  **Wait**: Allow existing requests a timeout window (e.g., 5-30 seconds) to complete.
4.  **Close**: Close database connections, cache connections, and other resources.
5.  **Exit**: Exit the process with code 0.

## Examples

### Go
```go
// Create a context that listens for signals
ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
defer stop()

// Start server in goroutine
go func() {
    if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        log.Fatalf("listen: %s\n", err)
    }
}()

// Wait for signal
<-ctx.Done()

// Shutdown with timeout
shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
if err := server.Shutdown(shutdownCtx); err != nil {
    log.Fatal("Server forced to shutdown:", err)
}
```
