---
type: indicator
title: Avoid Unnecessary Features (YAGNI)
description: >
  Do not add functionality until it is deemed necessary. "You Ain't Gonna Need It".
keywords:
  - yagni
  - complexity
  - design
  - features
  - scope
---

## Summary
Do not implement features, abstractions, or extensibility points for hypothetical future use cases. Implement only what is needed to satisfy the current requirements.

## Rationale
- **Reduced Complexity**: Unused code adds maintenance burden and cognitive load without providing value.
- **Lower Cost**: Implementing features that are never used is a waste of time and resources.
- **Better Design**: Designing for unknown future requirements often leads to wrong abstractions that are harder to refactor later than simple code.

## Guidance
1.  **Just in Time**: Implement features when you need them, not when you foresee them.
2.  **Remove Dead Code**: If a feature is no longer used, remove it immediately.
3.  **Simple First**: Choose the simplest solution that satisfies the current verification plan. Refactor later if requirements change.

## Examples

### Bad
```typescript
interface UserStorage {
  // We only use save() right now, but maybe we'll need these later?
  save(user: User): void;
  delete(id: string): void;
  findById(id: string): User;
  findAll(): User[];
}
```

### Good
```typescript
interface UserStorage {
  // Only implement what is currently used
  save(user: User): void;
}
```
