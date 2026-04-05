---
skill: true
title: Use Utility Types for DRY Types
description: Enforces use of TypeScript utility types (Pick, Omit, Partial, etc.) to derive types from existing interfaces instead of duplicating them. Use when a type is a subset or variation of an existing interface. Do not use when the derived type diverges semantically from the source and maintaining a separate definition is clearer.
skill-metadata:
  type: indicator
  keywords: "typescript, dry, utility-types, pick, omit, maintenance"
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
