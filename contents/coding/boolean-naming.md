---
title: Boolean Naming Conventions
description: >
  Use verb prefixes (is, has, can, should) for boolean variables and functions to ensure they read like questions or statements.
keywords:
  - clean-code
  - naming
  - boolean
  - styles
  - readability
---

## Summary
Boolean variables and functions returning booleans must be named with a **Verb Prefix** such as `is`, `has`, `can`, or `should`. This ensures the name clearly indicates a true/false value and reads naturally in control structures.

## Rationale
- **Natural Language**: Code should read like a sentence. `if (isValid)` is clearer than `if (valid)`.
- **Ambiguity Reduction**: `valid` could be a validation object or a boolean. `isValid` is definitely a boolean.

## Guidance
1.  **Prefixes**:
    - `is`: State or Identity (e.g., `isVisible`, `isAdmin`).
    - `has`: Possession or Containment (e.g., `hasPermission`, `hasChildren`).
    - `can`: Capability (e.g., `canEdit`, `canSubmit`).
    - `should`: Recommendation or Future Action (e.g., `shouldRender`, `shouldRetry`).
2.  **Scope**:
    - Applies to **local variables**, **class properties**, and **functions**.
    - **Exception**: See [Component Props Naming](/contents/coding/frontend/component-props.md) for UI component props (which follow HTML attribute style).

## Examples

### Bad
```ts
const valid = check(); // Noun or Adjective?
const permission = user.permission; // Boolean or Object?
const loading = state.loading; // Boolean or Status String?
```

### Good
```ts
const isValid = check();
const hasPermission = user.hasPermission;
const isLoading = state.isLoading;

if (canEdit && !isArchived) {
  // ...
}
```
