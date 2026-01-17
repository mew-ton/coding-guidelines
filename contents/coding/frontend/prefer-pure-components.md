---
title: Prefer Pure Components
description: >
  When building UI components, prefer pure "Props-In / DOM+Events-Out" behavior to ensure testability and reusability.
keywords:
  - component
  - props
  - event
  - sideeffect
  - coupling
  - testability
  - purity
  - predictability
  - functional
---

## Summary
Treat UI components like pure functions: they should receive data exclusively via `props` and communicate with the outside world only via **DOM** (rendering) and **Events** (e.g., `emit`, `v-model`, callbacks).

## Rationale
- **Testability**: Components can be tested in isolation by simply passing mock props and asserting on emitted events/rendered DOM.
- **Reusability**: Decoupling from global state (Router, Store) makes components portable across different pages or even projects.
- **Predictability**: Data flow becomes explicit and unidirectional, making the application easier to debug.

## Guidance
1.  **Input**: Receive all necessary data via `props`.
    - *Avoid*: Reading directly from `route.query`, `window`, or global stores (e.g., Pinia, Redux) inside presentational components.
2.  **Output**: Return **DOM** elements and use **Framework Standard Events** to notify parents of changes.
    - *Examples*: `emit('update:modelValue')` in Vue, `onChange` callbacks in React.
    - *Avoid*: Mutating global state directly or calling external services.
3.  **Principle**: `Component(props) => DOM + Events`

## Examples

### Bad (Implicit Dependencies)
```vue
<script setup>
const route = useRoute() // Implicit dependency
const userStore = useUserStore() // Implicit dependency

// Side effect inside component
const saveData = () => {
    userStore.update(route.params.id, { ... })
}
</script>
```

### Good (Explicit Interface)
```vue
<script setup>
// Explicit inputs
defineProps(['userId', 'userData'])

// Explicit outputs
const emit = defineEmits(['save'])

const onSave = () => {
    emit('save', { ... })
}
</script>
```
