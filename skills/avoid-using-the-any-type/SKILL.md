---
name: avoid-using-the-any-type
description: "Prohibits the use of the any type in TypeScript to enforce strict type safety throughout the codebase. Use when writing or reviewing TypeScript code. Do not use for third-party type stubs or intentional escape hatches that are explicitly cast and documented."
metadata:
  type: "constraint"
  keywords: "typescript, type-safety, lint-rule, no-any"
---

## Summary
Do not use `any`. This includes both explicit `any` usage and implicit `any` where type inference fails. Use `unknown`, Generics, or specific types instead.

## Rationale
Using `any` defeats the purpose of TypeScript.
- **Explicit Any**: Silences the compiler intentionally, hiding potential bugs.
- **Implicit Any**: Occurs when TypeScript cannot infer a type, falling back to dynamic typing which is unsafe.
