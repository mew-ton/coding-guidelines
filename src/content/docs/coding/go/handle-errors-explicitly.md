---
skill: true
title: Explicit Error Handling
description: Enforces explicit error handling in Go code by prohibiting ignored errors and requiring meaningful error propagation. Use when writing or reviewing any Go function that returns an error. Do not use for test helper functions where panic-on-error is acceptable and conventional.
skill-metadata:
  type: constraint
  keywords: "go, error-handling, robustness"
---

## Summary
Do not use `_` to ignore errors. Always check `if err != nil`.

## Guidance
- Use automated tools like `errcheck` to find ignored errors.
- Wrap errors with context when bubbling up: `fmt.Errorf("do something: %w", err)`.

## Rationale
Silent failures are the hardest bugs to debug.
