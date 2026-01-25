---
type: constraint
title: Avoid Arbitrary Stateful Objects
description: >
  Do not indiscriminately create objects that hold mutable state. Prefer stateless functions and immutable data. Use established patterns (Factory/Builder) when state is necessary.
keywords:
  - typescript
  - state
  - mutability
  - functional
  - singleton
  - side-effects
---

## Summary
Minimize the use of long-lived, mutable objects (state containers). Prefer passing immutable data through stateless functions. When state is required, use explicit creation patterns like **Factory** or **Builder** rather than ad-hoc stateful classes.

## Rationale
- **Predictability**: Stateless functions are easier to test and reason about because their output depends only on their input.
- **Debugging**: Tracking state mutation across an application is a common source of bugs. Hidden state makes reproduction difficult.
- **Concurrency**: Immutable data is inherently safe to share across async contexts or threads (in environments that support it).

## Guidance
1.  **Immutability**: Prefer `readonly` properties and `const` variables.
2.  **Pure Functions**: Write logic as functions that take data and return new data, without mutating `this`.
3.  **Controlled State**: If you need state (e.g., a connection pool, a cache), use a Factory function to create it explicitly, rather than hiding it inside a class constructor's side effects.

## Examples

### Bad (Implicit State)
```ts
class StringProcessor {
  private result = '';
  append(str: string) {
    this.result += str; // Mutation
  }
  getResult() {
    return this.result;
  }
}
```

### Good (Pure Function)
```ts
// Stateless
function appendString(original: string, addition: string): string {
  return original + addition;
}
```

### Good (Factory for necessary state)
```ts
// Explicit state creation
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count
  };
}
```
