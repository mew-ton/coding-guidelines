---
title: Prioritize Unit Testing and Refactor for Testability
description: >
  Build a solid Test Pyramid by prioritizing fast, isolated Unit Tests. Refactor complex code into smaller, testable functions (using internal directories/packages) to achieve this.
keywords:
  - testing
  - unit
  - pyramid
  - refactoring
  - internal
  - testability
---

## Summary
Focus your testing efforts on the base of the **Test Pyramid**: Unit Tests. If code is hard to unit test, do not rely on slow integration tests; instead, **refactor** the code by extracting logic into smaller, testable functions (refer to the **Refactoring Guidelines**, such as "Keep functions short").

## Rationale
- **Speed**: Unit tests run in milliseconds, providing immediate feedback. Integration tests are slow and brittle.
- **Design Feedback**: "Hard to test" usually means "Bad design" (tight coupling, hidden dependencies).
- **Coverage**: It is impossible to cover all edge cases (permutations) with expensive E2E/Integration tests. Only Unit tests can cheaply cover all branches.

## Guidance
1.  **Refactor to Test**:
    - If a function is too complex to test easily, **extract** the logic into helper functions.
    - Follow the **Refactoring Guidelines** (e.g. "Keep Functions Short" / Top-Down Decomposition) when extracting. Do not split arbitrarily.
2.  **Encapsulation with Internals**:
    - Move extracted helper functions to an `internal/` package (Go) or directory (TS/JS) if they shouldn't be part of the public API.
    - Test these `internal` units directly to verify complex logic in isolation.
3.  **Pyramid Shape**:
    - **70% Unit Tests**: Fast, isolated, covers all edge cases.
    - **20% Integration Tests**: Covers valid paths and major error cases across boundaries.
    - **10% E2E Tests**: Covers critical user flows ("Happy Path").

## Examples

### Bad (Monolithic, Hard to Test)
```ts
// Hard to test without mocking the DB valid/invalid/connection-error states
async function registerUser(req) {
  if (!req.email.includes('@')) throw Error('Invalid email') // Logic mixed with I/O
  const user = await db.save(req) // Integration point
  await email.sendWelcome(user) // Integration point
}
```

### Good (Refactored for Unit Testing)
```ts
// 1. Pure logic extracted (Easy to Unit Test)
// internal/validation.ts
export function validateEmail(email: string): boolean {
  return email.includes('@')
}

// 2. Main function coordinates (Integration Test or Mock Test)
async function registerUser(req) {
  if (!validateEmail(req.email)) throw Error('Invalid email')
  // ...
}
```
