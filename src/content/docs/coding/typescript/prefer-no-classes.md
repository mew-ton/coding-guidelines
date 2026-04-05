---
skill: true
title: Prefer Plain Objects over Classes
description: Discourages class usage in TypeScript in favor of plain objects and pure functions to improve tree-shaking and bundle size. Use when designing new modules or reviewing code that introduces a class. Do not use when implementing interfaces required by frameworks or libraries that expect class instances (e.g. NestJS providers, TypeORM entities).
skill-metadata:
  type: indicator
  keywords: "typescript, tree-shaking, minification, classes, functional, bundle-size"
---

## Summary
Prefer **Plain Data Objects** (interfaces/types) and **Standalone Functions** over `class` definitions. Classes are difficult for bundlers to minify (property names are preserved) and tree-shake (methods are attached to the prototype, appearing "used").

## Rationale
- **Tree-Shaking**: Tools like Webpack or Rollup often cannot remove unused methods from a class because they are attached to the prototype dynamically. Standalone functions are easily eliminated if unused.
- **Minification**: Class property names and method names usually cannot be mangled (shortened) safely. Function names/variables are aggressive compilation targets for minifiers.
- **Simplicity**: Separating data from behavior (Functional Programming style) often leads to more reusable code.

## Guidance
1.  **Data**: Use `interface` or `type` to define the shape of your data.
2.  **Constructor**: Use a simple factory function (`createFoo(...)`) that returns the plain object.
3.  **Methods**: Write functions that take the object as the first argument (`doSomething(foo, ...)`).

## Examples

### Bad (Class)
```ts
class User {
  constructor(public name: string) {}
  greet() {
    return `Hello ${this.name}`;
  }
}
// 'greet' is retained in bundle even if never used
```

### Good (Plain Object + Function)
```ts
interface User {
  name: string;
}

function createUser(name: string): User {
  return { name };
}

function greet(user: User) {
  return `Hello ${user.name}`;
}
// 'greet' can be completely removed if unused
```
