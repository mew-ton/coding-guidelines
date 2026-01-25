---
type: constraint
title: Enforce Erasable Syntax Only
description: >
  Avoid TypeScript features that emit runtime code (like enum and namespace). Use syntax that can be "erased" to valid JavaScript.
keywords:
  - typescript
  - transpile
  - erase
  - enum
  - namespace
  - bundle-size
---

## Summary
Limit TypeScript usage to syntax that disappears completely during compilation (Type Erasure). Do NOT use `enum`, `namespace`, or `parameter properties` (in constructors) as they emit JavaScript code at runtime.

## Rationale
- **Single Source of Truth**: TypeScript should only label types, not generate logic. This ensures compatibility with tools like Babel, SWC, or esbuild which often strip types based on syntax.
- **Bundle Size**: Features like `enum` generate complex IIFE code in JavaScript.
- **Predictability**: It is clearer when the JS output is structurally identical to the TS source (minus types).

## Guidance
1.  **Enums**: Replace with `const` objects (as Const enum) or String Unions (`type State = 'active' | 'inactive'`).
2.  **Namespaces**: Use ES Modules (`import`/`export`) instead.
3.  **Constructors**: Declare properties explicitly in the class body, not in the constructor arguments.

## Examples

### Bad (Runtime Emission)
```ts
enum Direction {
  Up,
  Down
}

class User {
  constructor(public name: string) {} // Parameter property
}
```

### Good (Erasable)
```ts
type Direction = 'Up' | 'Down';
// OR
const Direction = {
  Up: 'Up',
  Down: 'Down',
} as const;

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```
