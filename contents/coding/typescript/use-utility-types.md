---
type: indicator
title: Use Utility Types for DRY Types
description: >
  Instead of duplicating interfaces, use Pick, Omit, or Partial to derive types and keep them in sync.
keywords:
  - typescript
  - dry
  - utility-types
  - pick
  - omit
  - maintenance
---

## Summary
Do not manually redefine interfaces that are subsets or variations of existing types. Use TypeScript's built-in Utility Types (`Pick`, `Omit`, `Partial`, `Required`, `ReturnType`) to derive new types from a "Single Source of Truth".

## Rationale
- **Maintenance**: When the source type changes (e.g., adding a field to `User`), derived types update automatically.
- **Consistency**: Prevents subtle bugs where a DTO and the Domain Model diverge over time.
- **Intent**: Seeing `Pick<User, 'id' | 'email'>` clearly communicates "This is just a user ID and email" better than a generic `UserDTO`.

## Guidance
1.  **Derive Downwards**: Define the "full" entity (e.g., database model) first, then derive input/output types from it.
2.  **Avoid Duplication**: If you catch yourself copy-pasting properties, stop and use a Utility Type.
3.  **Composition**: You can combine them: `Partial<Pick<User, 'name'>>`.

## Examples

### Bad (Duplication)
```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// If User changes, we must remember to update this
interface CreateUserRequest {
  name: string;
  email: string;
}
```

### Good (Derived)
```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Automatically kept in sync
type CreateUserRequest = Pick<User, 'name' | 'email'>;
```
