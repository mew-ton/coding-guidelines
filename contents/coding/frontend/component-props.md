---
type: indicator
title: Component Props Naming and Structure
description: >
  Name component props like HTML attributes (e.g. disabled, checked). Prefer passing primitive values over complex objects to decouple components.
keywords:
  - frontend
  - component
  - props
  - naming
  - primitives
  - html-style
---

## Summary
Component props should feel like standard **HTML Attributes**.
1.  **Naming**: Use nouns or adjectives (`disabled`, `open`, `value`). Avoid verb prefixes like `is`/`has` unless they are standard (like `isOpen` in some libraries, but standard HTML uses `open`).
2.  **Structure**: Pass **Primitive types** (string, number, boolean) whenever possible, rather than passing large, complex Objects.

## Rationale
- **HTML Consistency**: `disabled`, `checked`, `hidden`, `readonly` are standard attribute names. Using `isDisabled` creates a cognitive mismatch with the platform.
- **Decoupling**: Accepting `userId` (string) is loosely coupled. Accepting `User` (object) couples the component to the entire User shape, making it harder to reuse or mock.
- **Optimization**: Primitives are easier for frameworks (Vue/React) to diff than deep objects.

## Guidance
1.  **Naming**:
    - **Boolean Props**: `disabled`, `checked`, `visible`, `open`, `loading`. (Avoid `isDisabled`).
    - **Event Props**: `on[Event]` (React) or `[event]` (Vue). e.g., `onSubmit`, `onChange`.
2.  **Primitive Preference**:
    - **Bad**: `props: { user: UserObject }`
    - **Good**: `props: { userId: string, userName: string, avatarUrl: string }`
    - **Exception**: If a component is *explicitly designed* to render a specific domain entity (e.g., `UserCard`), passing the object is acceptable, but consider accepting a narrowed interface.

## Examples

### Bad
```ts
// Props
interface Props {
  isDisabled: boolean; // Not HTML-like
  config: {          // Large blob object
    theme: string;
    showSidebar: boolean;
  };
}
```

### Good
```ts
// Props
interface Props {
  disabled: boolean; // Matches <button disabled>
  theme: string;     // Explicit primitive
  showSidebar: boolean; // Explicit primitive
}
```
