---
name: avoid-n-1-queries
description: "Prevents N+1 query problems by enforcing eager loading (JOINs) or query batching when fetching related data. Use when writing or reviewing code that fetches a list and then queries related data per item. Do not use when the secondary queries are intentionally lazy-loaded for performance reasons and the number of items is provably small."
metadata:
  type: "indicator"
  keywords: "sql, performance, n+1, optimization, database, slow, latency, loop, join"
---

## Summary
Do not issue a database query inside a loop that iterates over the results of another query. Use **Eager Loading** (fetching relations in the main query) or **Batching** (fetching all relations in one go).

## Rationale
- **Performance**: Executing 101 queries (1 main + 100 children) is significantly slower than executing 1 or 2 queries due to network latency and database overhead.
- **Scalability**: An N+1 problem might not be noticeable with small datasets but causes massive slowdowns as data grows.

## Guidance
1.  **Identify Loops**: Look for loops where a DB call happens in each iteration.
2.  **JOIN**: Use `JOIN` to fetch related data in a single query.
3.  **WHERE IN**: Keep IDs and fetch all related records using `WHERE id IN (...)`.
4.  **ORMs**: Use your ORM's eager loading features (e.g., `Preload` in Gorm, `Include` in Prisma).

## Examples

### Bad (N+1)
```go
// 1 query
users := db.GetUsers()
for _, user := range users {
    // N queries
    posts := db.GetPostsByUserID(user.ID) // BAD
}
```

### Good (Batching / Preload)
```go
// 1 or 2 queries total
users := db.GetUsers()
// Fetch all posts for these users in one go
db.Preload("Posts").Find(&users)
```
