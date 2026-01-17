---
title: Use Flux Architecture in Composables
description: >
  Avoid "God Composables" by decomposing logic into distinct roles: State Providers, Actions, Getters, and Utils.
keywords:
  - composable
  - hook
  - state
  - reactive
  - action
  - getter
  - flux
  - decomposition
---

## Summary
Do not bundle state, mutations, getters, and side-effects into a single monolithic Composable (e.g., a giant `useUser`). Instead, decompose logic into 4 specific roles: **State Provider**, **Action**, **Getter**, and **Util**.

## Rationale
- **Pure Flux Implementation**: At its most granular level, this decomposition mirrors the Flux architecture using pure functions, independent of libraries.
- **Components over Monoliths**: Components can import only what they need (e.g., just an Action, or just a Getter), reducing coupling.
- **Testability**: Pure logic (Utils) and State mutation (Actions) can be tested more easily in isolation.

## Guidance
1.  **Decomposition Roles**:
    - **State Provider** (`use[Domain]State`): Holds the source of truth (Reactive State).
        - *Vue*: Use `useState` or `ref` inside an internal composable.
        - *React*: Use **Context Provider** or a Hook wrapping `useState`/`useReducer`.
        - *Visibility*: Keep this **internal/private** (e.g., in an `internals/` directory or not exported).
    - **Action** (`use[Verb][Domain]`): Functions that mutate state or perform side effects (e.g., `useAddItem`).
    - **Getter** (`use[Domain]Value`): Computed or derived values from state (e.g., `useCartTotal`).
    - **Util** (No prefix): Pure functions without reactivity (e.g., `calculateTotal`).
2.  **Naming Convention**:
    - Use `use` prefix **only** for functions that rely on Reactivity, Lifecycle, or Context.
    - Pure functions should **not** use `use` prefix.

## Examples

### Bad (God Composable)
```ts
// useCart.ts
export function useCart() {
  const items = ref([]) // State
  const total = computed(() => ...) // Getter
  const addItem = (item) => { ... } // Action
  return { items, total, addItem }
}
```

### Good (Decomposed)
**1. State Provider (Internal)**
```ts
// composables/cart/internals/useCartState.ts
export function useCartState() {
  return { items: useState('cart-items', () => []) }
}
```

**2. Action**
```ts
// composables/cart/useAddItem.ts
export function useAddItem() {
  const { items } = useCartState()
  return (item) => { items.value.push(item) }
}
```

**3. Getter**
```ts
// composables/cart/useCartTotal.ts
import { calculateTotal } from '@/utils/cart' // Pure Util
export function useCartTotal() {
  const { items } = useCartState()
  return computed(() => calculateTotal(items.value))
}
```
