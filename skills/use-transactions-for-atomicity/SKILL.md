---
name: use-transactions-for-atomicity
description: "Enforces wrapping multiple related write operations (INSERT/UPDATE/DELETE) in a database transaction to ensure atomicity. Use when writing code that performs two or more writes that must succeed or fail together. Do not use for single-statement writes or read-only queries where transactions add unnecessary overhead."
metadata:
  type: "constraint"
  keywords: "sql, transactions, atomicity, integrity, database"
---

## Summary
When an operation requires multiple writes (INSERT, UPDATE, DELETE) to the database, wrap them in a **Transaction**. If any part fails, the entire transaction should be **Rolled Back**.

## Rationale
- **Integrity**: Prevents partial updates (e.g., money deducted but item not shipped) which leave the database in an inconsistent state.
- **Concurrency**: Transactions (depending on isolation level) help manage concurrent access to the same data.

## Guidance
1.  **Start**: Begin transaction.
2.  **Execute**: Perform all writes.
3.  **Check Error**: If any error occurs, `ROLLBACK` immediately.
4.  **Commit**: If all succeeded, `COMMIT`.
5.  **Defer**: In Go/backend code, ensure `Rollback` is deferred in case of panics or early returns.

## Examples

### Bad
```go
db.DecreaseBalance(userA, 100)
// If this fails or crashes, money is lost but not transferred
db.IncreaseBalance(userB, 100)
```

### Good
```go
tx := db.Begin()
if err := tx.DecreaseBalance(userA, 100); err != nil {
    tx.Rollback()
    return err
}
if err := tx.IncreaseBalance(userB, 100); err != nil {
    tx.Rollback()
    return err
}
tx.Commit()
```
