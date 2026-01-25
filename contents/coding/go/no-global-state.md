---
type: constraint
title: Avoid Global State and init()
description: >
  Do not use package-level variables or init() functions for state. Use explicit dependency injection.
keywords:
  - go
  - global
  - state
  - init
  - dependency-injection
  - testing
---

## Summary
Avoid using package-level variables (Globals) for application state (like Database connections, Configs, Loggers) and avoid `init()` functions for side-effects. Instead, use **Dependency Injection**: pass dependencies explicitly to your structs or functions (controllers/handlers).

## Rationale
- **Traceability**: It is clear what a component depends on by looking at its constructor or fields.
- **Testability**: Globals make parallel testing impossible (race conditions) and mocking difficult. You cannot run two tests with different configurations if they share a global config variable.
- **Order of Initialization**: `init()` execution order can be subtle and hard to debug. Explicit wiring (`main.go`) is predictable.

## Guidance
1.  **No `var db *sql.DB`** at package level.
2.  **No `func init() { config.Load() }`**.
3.  **Pattern**:
    - Define a struct that holds dependencies.
    - Create a "Constructor" (Factory) function.
    - Wire everything in `main.go`.

## Examples

### Bad (Global State)
```go
var db *sql.DB

func init() {
    db = connect() // Side effect during import
}

func CreateUser() {
    db.Exec(...) // Implicit dependency
}
```

### Good (Dependency Injection)
```go
type UserHandler struct {
    db *sql.DB
}

func NewUserHandler(db *sql.DB) *UserHandler {
    return &UserHandler{db: db}
}

func (h *UserHandler) CreateUser() {
    h.db.Exec(...) // Explicit dependency
}
```
