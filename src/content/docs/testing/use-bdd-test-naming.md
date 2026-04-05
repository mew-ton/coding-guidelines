---
skill: true
title: Use BDD-style test naming
description: Enforces BDD-style test naming using "it should" or "it must" prefixes to make test descriptions read as behavioral specifications. Use when writing or reviewing test describe/it blocks in any testing framework. Do not use for test file names or test helper functions — only for the test description strings.
skill-metadata:
  type: indicator
  keywords: "testing, naming, bdd, go, vitest, jest, specification, describe, context, behavior"
---

## Summary

When writing tests, use a **Behavior-Driven Development (BDD)** style for naming test cases. Focus on the *behavior* and *outcome* rather than the implementation details.

## Rationale

- **Readability**: The test output reads like a specification of the system.
- **Clarity**: Forces the writer to think about *behavior* rather than just "test case 1" or "function X".
- **Consistency**: Standardizes how tests are described across the codebase, regardless of language.

## Guidance

1.  **Prefix**: Start test descriptions with **"it should"** or **"it must"** (or just "should" if the framework provides `it` already).
2.  **Content**: Describe the specific behavior and expected result.
3.  **Scope**: This applies to:
    - `t.Run()` descriptions in Go.
    - `it()` / `test()` descriptions in JavaScript/TypeScript (Vitest, Jest).
    - `@Test` display names in Java.

## Examples

### TypeScript (Vitest / Jest)

#### Bad
```ts
test('user validation', () => { ... })
test('check error', () => { ... })
```

#### Good
```ts
describe('User Validation', () => {
  it('should return an error when the email is invalid', () => { ... })
  it('should pass transparently when all fields are valid', () => { ... })
})
```

### Go (Table Driven / t.Run)

#### Bad
```go
t.Run("invalid config", func(t *testing.T) { ... })
```

#### Good
```go
t.Run("it should return an error when the configuration is invalid", func(t *testing.T) { ... })
```
