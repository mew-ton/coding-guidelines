---
type: indicator
title: Transform Data Before Passing to Components
description: >
  Ensure components receive "display-ready" data. Perform filtering, sorting, and reshaping in the API or Logic layer, not in the Component.
keywords:
  - transformation
  - mapper
  - viewmodel
  - logic
  - minimal
  - display-ready
---

## Summary
UI Components should receive data in a format that requires minimal processing to render. Avoid complex logic like `filter`, `sort`, or extensive `map` operations within the component's template or render function.

## Rationale
- **Separation of Concerns**: The View (Component) is responsible for *presentation* (HTML/CSS), not *business logic* (data transformation).
- **Testability**: Transformation logic is easier to test as a pure utility function or selector than when it is embedded in component markup.
- **Performance**: Passing pre-calculated data avoids re-running expensive transformations on every component re-render.
- **Backend Optimization**: Requesting only the necessary fields (GraphQL/BFF) reduces payload size.

## Guidance
1.  **Rule**: Props should be "Display-Ready".
    - *Avoid*: Passing a raw API response and filtering it in the template.
    - *Prefer*: Passing a specific subset of data that the component needs.
2.  **Where to Transform**:
    - **Level 1 (Best)**: **Backend / API (BFF)**. Return exactly what the UI needs.
    - **Level 2 (Good)**: **Logic Layer (Composable/Hook)**. Use a "Selector" or "ViewModel" pattern to reshaping data before it enters the component tree.
    - **Level 3 (Acceptable)**: **Parent Container**. A container component transforms data before passing it to a presentational child.
3.  **Formatting**: Simple formatting (dates, currency) is acceptable in components (or usually via small utility functions/pipes), but structural changes should be avoided.

## Examples

### Bad (Logic in Template)
```vue
<template>
  <ul>
    <!-- VIOLATION: Filtering and Sorting in Template -->
    <li v-for="user in users.filter(u => u.isActive).sort((a,b) => a.age - b.age)" :key="user.id">
      {{ user.firstName }} {{ user.lastName }}
    </li>
  </ul>
</template>
```

### Good (Pre-calculated Selector)
```ts
// Composable (Logic Layer)
const useActiveUsers = () => {
    const { users } = useUsers()
    // Transform here
    return computed(() => 
        users.value
            .filter(u => u.isActive)
            .sort((a,b) => a.age - b.age)
            .map(u => ({ 
                id: u.id, 
                fullName: `${u.firstName} ${u.lastName}` 
            }))
    )
}

// Component (View Layer)
// Receives simple, ready-to-render data
const activeUsers = useActiveUsers()
```
```vue
<template>
  <ul>
    <li v-for="user in activeUsers" :key="user.id">
      {{ user.fullName }}
    </li>
  </ul>
</template>
```
