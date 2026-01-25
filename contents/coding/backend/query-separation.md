---
type: indicator
title: Separate Queries from Handlers
description: >
  Move data access logic (SQL/ORM queries) out of HTTP Handlers and into a Repository or Query Service layer.
keywords:
  - backend
  - architecture
  - database
  - repository
  - separation-of-concerns
---

## Summary
Do not write SQL queries or complex ORM logic directly inside API Handlers (Controllers). Abstract data access behind a **Repository Interface** or a dedicated **Query Service**. Handlers should only coordinate between the Request/Response and the Domain/Data layer.

## Rationale
- **Testability**: You can mock the `UserRepository` interface to test the Handler's logic without a running database.
- **Maintainability**: If the database schema or ORM changes, you only update the Repository, not every Handler that touches usage data.
- **Reusability**: Common queries (e.g., `FindActiveUsers`) can be reused across different endpoints or background jobs.

## Guidance
1.  **Repository Interface**: Define an interface for data access (e.g., `GetUser(ctx, id)`).
2.  **Implementation**: Implement the interface (e.g., `PostgresUserRepository`).
3.  **Use in Handler**: The Handler accepts the **Interface**, not the concrete struct (Dependency Injection).

## Examples

### Bad (Query in Handler)
```go
func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    // Logic mixed with SQL
    row := h.db.QueryRow("SELECT * FROM users WHERE id = ?", r.URL.Query().Get("id"))
    // ...
}
```

### Good (Repository Pattern)
```go
// 1. Interface
type UserRepository interface {
    Get(ctx context.Context, id string) (*User, error)
}

// 2. Handler usage
func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    user, err := h.repo.Get(r.Context(), r.URL.Query().Get("id"))
    // ...
}
```
