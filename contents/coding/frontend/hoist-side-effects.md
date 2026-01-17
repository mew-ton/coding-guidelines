---
title: Hoist Side Effects to Parents
description: >
  When handling side effects (API calls, Routing, State mutation), hoist them to "Container" or "Page" components to keep leaf components pure.
keywords:
  - sideeffect
  - container
  - page
  - api
  - routing
  - architecture
  - responsibility
  - separation
---

## Summary
Handle side-effects (API calls, Routing, Store interactions, Server Actions) in high-level "Container" or "Page" components, and delegate them to "Presentational" components via props or callbacks.

## Rationale
- **Separation of Concerns**: Separates "How things look" (UI) from "How things work" (Logic/Data).
- **Testability**: Logic layers and UI layers can be tested independently.
- **Flexibility**: The same UI component can be used with different data sources or actions.

## Guidance
1.  **Responsibility**:
    - **Page/Container**: Orchestrates data fetching, routing (`useRouter`), and global state management.
    - **Presentational Component**: Renders data provided by the parent and triggers actions provided by the parent.
2.  **Boundaries**: Keep framework-specific "Magic" (e.g., `useNuxtApp`, Server Actions) in the Container layer.
    - *Next.js*: Pass Server Actions as `action` props to leaf components instead of importing them directly.
3.  **Delegation**: Pass callback functions for actions (e.g., `onSave`, `onNavigate`) down to children.

## Examples

### Bad (Mixed Concerns)
```tsx
// UserCard.tsx (Leaf Component)
import { updateProfile } from './actions' // Server Action

export function UserCard({ id }) {
  return <button onClick={() => updateProfile(id)}>Save</button>
}
```

### Good (Hoisted Logic)
```tsx
// UserPage.tsx (Container)
import { updateProfile } from './actions'
import { UserCard } from './UserCard'

export default function UserPage({ id }) {
  // Logic is here
  return <UserCard onSave={() => updateProfile(id)} />
}

// UserCard.tsx (Presentational)
export function UserCard({ onSave }) {
  // Pure UI
  return <button onClick={onSave}>Save</button>
}
```
