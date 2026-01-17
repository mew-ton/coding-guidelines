---
title: Colocate Related Code
description: >
  Keep related files (tests, styles, utils, types) close to where they are used. Avoid global folders unless the code is truly global.
keywords:
  - clean-code
  - structure
  - organization
  - colocation
  - modularity
---

## Summary
Place code as close as possible to where it is relevant. If a utility, style, or test is only used by a specific component or feature, put it in that component's directory. Avoid generic "global" buckets like `/utils`, `/styles`, or `/types` unless the content is truly shared across the *entire* application.

## Rationale
- **Maintainability**: When you delete a component/feature, you can delete its entire directory and know you've cleaned up everything. (No "zombie code" left in global folders).
- **Discoverability**: You don't have to hunt through a massive `/utils` folder to find the helper used by `UserProfile`. It's right there in `UserProfile/utils.ts`.
- **Scalability**: As the app grows, global folders become dumping grounds. Colocated feature folders stay self-contained.

## Guidance
1.  **Directory Structure**:
    - **Bad**: Separating by technology (`/controllers`, `/views`, `/models`).
    - **Good**: Separating by feature (`/user-profile`, `/shopping-cart`).
2.  **What to Colocate**:
    - **Tests**: `MyComponent.test.ts` next to `MyComponent.ts`.
    - **Styles**: `MyComponent.module.css` next to `MyComponent.ts`.
    - **Types**: `types.ts` inside the feature folder if only used there.
    - **Utils**: `helpers.ts` inside the feature folder if only used there.

## Examples

### Bad (Layered / Global)
```text
/src
  /components
    UserList.tsx
  /utils
    userListHelpers.ts  <-- Far away
  /tests
    UserList.test.tsx   <-- Far away
```

### Good (Colocated / Feature-Based)
```text
/src
  /features
    /user-list
      UserList.tsx
      UserList.test.tsx // Right here
      helpers.ts        // Right here
```
