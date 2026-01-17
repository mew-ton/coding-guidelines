---
title: Prefer For-Of Loops over Array Methods
description: >
  Use `for-of` loops for iteration to improve performance and debugging experience. `forEach` is strictly banned.
keywords:
  - loop
  - iteration
  - performance
  - debug
  - array
---

## Summary
Prefer native `for (const item of items)` loops over Array methods like `forEach`. While `map` and `filter` are acceptable for simple transformations, `forEach` should never be used.

## Rationale
- **Debugging**: `forEach` callbacks create new stack frames, making "Step Over" debugging difficult (it steps *into* the callback or finishes the loop entirely). `for-of` keeps execution in the current scope.
- **Performance**: `for-of` is generally faster as it avoids the function call overhead for every element.
- **Control Flow**: `forEach` does not support `await`, `break`, or `continue` in a standard way. `for-of` handles these naturally.

## Guidance
1.  **Strict Ban**: Do not use `Array.prototype.forEach`. Always replace it with `for-of`.
2.  **Preference**: Use `for-of` for any logic involving side effects, asynchronous `await`, or complex bodies.
3.  **Exceptions**:
    - **One-Liners**: Simple `map` and `filter` chains are allowed for pure data transformations (e.g., `const names = users.map(u => u.name)`).
    - If the transformation becomes complex or multi-line, prefer `for-of` with an explicit accumulator.

## Examples

### Bad (forEach)
```ts
// VIOLATION: Hard to debug, cannot await inside efficiently
items.forEach(async (item) => {
  await save(item)
})
```

### Good (for-of)
```ts
// Clear control flow, easy to debug, supports strict sequential await
for (const item of items) {
  await save(item)
}
```

### Acceptable (One-Liner Map)
```ts
// Simple transformation is fine
const activeUserIds = users.filter(u => u.isActive).map(u => u.id)
```
