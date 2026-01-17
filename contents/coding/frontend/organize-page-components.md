---
title: Organize Page-Specific Components
description: >
  When creating components used only by a specific page, place them in a `components/pages/[PageName]/` directory to prevent global namespace pollution.
keywords:
  - component
  - page
  - directory
  - clutter
  - organization
  - scaling
  - encapsulation
  - cohesion
  - structure
---

## Summary
Do not cram all logic and UI into the page entry point. Instead, build a page-specific structure by scoping components under `components/pages/[PageName]/`, preventing global namespace pollution.

## Rationale
- **Decomposition**: Avoids monolithic page files by breaking down the UI into smaller, manageable pieces within the page's scope.
- **Encapsulation**: Components that are only relevant to a specific page should be co-located with that page's logic.
- **Organization**: Prevents the top-level `components/` folder from becoming cluttered with single-use components.
- **Maintainability**: Makes it obvious which components can be safely deleted when a page is removed.

## Guidance
1.  **Entry Point**: Place the main page component at `components/pages/[PageName]/index.vue` (or `.tsx`).
2.  **Internal Logic**: Place private sub-components and logic in `components/pages/[PageName]/internals/`.
3.  **Exports**: Explicitly export shared types or constants from `components/pages/[PageName]/types.ts` (or similar) if needed by other parts of the app.
4.  **Refactoring**: If a component in `components/pages/...` becomes useful elsewhere, **promote** it to a standardized shared directory (e.g., `components/ui/`, `components/shared/`).

## Examples

### Bad
```
components/
  UserProfile.vue        <-- Used only on Profile Page
  UserProfileHeader.vue  <-- Used only on Profile Page
  Settings.vue
```

### Good
```
components/
  pages/
    user-profile/
      index.vue          <-- Page Entry
      types.ts           <-- Public Exports
      internals/         <-- Private implementation details
        Header.vue
        UserInfo.vue
```

### Good (Nuxt Example)
```
pages/
  user/
    [id].vue             <-- Route Definition (Thin Wrapper)
components/
  pages/
    user-detail/
      index.vue          <-- Main Logic
      internals/         <-- encapsulated sub-components
        ProfileCard.vue
        ActivityFeed.vue
```

**[id].vue (Thin Wrapper):**
```vue
<template>
  <UserDetail :id="route.params.id" />
</template>
```
