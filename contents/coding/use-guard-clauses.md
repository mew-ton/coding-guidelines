---
title: Use Guard Clauses (Early Return)
description: >
  Reduce complexity by checking failure conditions early and returning. Keep the "Happy Path" de-nested at the bottom of the function.
keywords:
  - clean-code
  - complexity
  - readability
  - structure
  - early-return
  - guard-clause
---

## Summary
Avoid deep nesting of `if/else` statements. Instead, check for invalid conditions or edge cases at the beginning of the function and `return` (or throw) immediately. This keeps the "Happy Path" (the main logic) indented as little as possible.

## Rationale
- **Cognitive Load**: Deep nesting requires the reader to keep multiple contexts in their "mental stack". Flat code is easier to scan.
- **Diff Readability**: Adding a condition to a nested block often requires re-indenting the entire block, polluting git diffs.
- **Focus**: Guard clauses handle "distractions" (errors/edge cases) upfront, leaving the rest of the function focused on the core task.

## Guidance
1.  **Invert Conditions**: Instead of `if (valid) { ... }`, use `if (!valid) return;`.
2.  **Fail Fast**: Handle specific error cases first.
3.  **No `else` after return**: If an `if` block returns, you do not need an `else` block. The rest of the function is implicitly the `else`.

## Examples

### Bad (Deep Nesting)
```ts
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // ... heavy logic ...
        save(user);
      } else {
        throw new Error("No permission");
      }
    }
  } else {
    throw new Error("No user");
  }
}
```

### Good (Guard Clauses)
```ts
function processUser(user) {
  // 1. Guard against missing user
  if (!user) {
    throw new Error("No user");
  }

  // 2. Guard against inactive
  if (!user.isActive) {
    return;
  }

  // 3. Guard against permission
  if (!user.hasPermission) {
    throw new Error("No permission");
  }

  // 4. Happy Path (No indentation)
  // ... heavy logic ...
  save(user);
}
```
