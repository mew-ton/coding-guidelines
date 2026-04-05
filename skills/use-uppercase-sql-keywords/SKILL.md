---
name: use-uppercase-sql-keywords
description: "Enforces uppercase SQL keywords (SELECT, FROM, WHERE, etc.) to visually distinguish them from table and column names. Use when writing or reviewing raw SQL queries. Do not use for ORM-generated queries or query builder APIs where keyword casing is controlled by the library."
metadata:
  type: "constraint"
  keywords: "sql, readability, style, formatting"
---

## Summary
Write SQL reserved words (keywords) in **UPPERCASE** and table/column names in **snake_case**.

## Rationale
- **Readability**: Quickly distinguishes structure (`SELECT`) from data/identifiers (`user_id`).
- **Convention**: Standard practice in the SQL community and documentation.
- **Scanning**: Makes it easier to parse complex queries visually.

## Guidance
1.  **Keywords**: `SELECT`, `FROM`, `WHERE`, `JOIN`, `AND`, `OR`, `NULL` should be uppercase.
2.  **Identifiers**: Tables (`users`), columns (`first_name`), and aliases (`u`) should be lowercase/snake_case.
3.  **Functions**: Built-in functions (`COUNT`, `MAX`) should typically be uppercase.

## Examples

### Bad
```sql
select id, username from users where is_active = true and role = 'admin';
```

### Good
```sql
SELECT id, username FROM users WHERE is_active = true AND role = 'admin';
```
