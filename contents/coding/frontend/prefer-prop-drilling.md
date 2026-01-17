---
title: Prefer Prop Drilling over Implicit Context
description: >
  Favor explicit data passing (Prop Drilling) over implicit mechanisms like Provide/Inject or Global State to maintain clear data flow.
keywords:
  - props
  - data-flow
  - context
  - implicit
  - magic
  - obscure
  - traceability
  - explicit
  - drilling
---

## Summary
Do not consider "Prop Drilling" (passing data through multiple layers) an anti-pattern. Prefer it over implicit dependency injection techniques like `provide/inject` (Vue) or Context (React), which obscure the source of data.

## Rationale
- **Traceability**: Explicit props make the data flow obvious. You can trace where data comes from by simply following the parent-child chain.
- **Maintainability**: Implicit context (`inject`) acts as hidden global state within a subtree, making refactoring difficult because dependencies are not visible in the component's interface.
- **Honesty**: Prop drilling honestly reflects the coupling between components. If drilling becomes too deep, it may be a sign that the component hierarchy needs restructuring, not that you should hide the dependency.

## Guidance
1.  **Rule**: Pass data explicitly via properties.
    - *Avoid*: Using `provide/inject` just to avoid passing a prop down 2-3 levels.
    - *Avoid*: Moving page-specific state to a Global Store (Pinia/Redux) just to access it from a deep child.
2.  **Structuring**: If prop drilling feels excessive (e.g., > 5 levels), consider:
    - **Composition**: Pass components as `children`/`slots` so intermediate components don't need to know about the data.
    - **Refactoring**: Flatten the component hierarchy.
3.  **Exceptions**: True global application state (User Session, Theme, I18n) is a valid use case for Context/Global Stores.

## Examples

### Bad (Implicit Injection)
```vue
<!-- UserProfile.vue -->
<script setup>
provide('user', userData)
</script>

<!-- UserCard.vue (Grandchild) -->
<script setup>
// Where does 'user' come from? Hard to trace.
const user = inject('user')
</script>
```

### Good (Explicit Drilling)
```vue
<!-- UserProfile.vue -->
<template>
  <UserLayout :user="user" />
</template>

<!-- UserLayout.vue -->
<template>
  <UserCard :user="user" />
</template>

<!-- UserCard.vue -->
<script setup>
// Dependencies are explicit in the interface.
defineProps(['user'])
</script>
```
