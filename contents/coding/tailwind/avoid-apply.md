---
type: constraint
title: Avoid using @apply
description: Prohibit usage of @apply directive in CSS files to maintain utility-first architecture.
keywords:
  - tailwind
  - css
  - best-practice
  - utility-first
  - maintainability
---

## Summary
Do not use the `@apply` directive in CSS files to bundle utilities into custom classes. Use utility classes directly in your HTML/JSX.

## Rationale
- **Breaks Utility-First**: Re-introduces the problem of "writing CSS" and inventing arbitrary class names.
- **bundle Size**: Often leads to larger CSS bundles by duplicating styles rather than reusing atomic utilities.
- **Context Switching**: Forces developers to jump between HTML and CSS files to understand styling.
- **Maintainability**: Custom classes created with `@apply` often become "magic" and hard to refactor.

## Guidance
1.  **Prefer Composition**: Use components (React, Vue, Astro) to encapsulate reusable UI patterns, not CSS classes.
2.  **Plugin Extension**: If you need complex custom styles (e.g. scrollbars), write a Tailwind plugin or use arbitrary variants, but avoid pure CSS extraction.
3.  **Exception**: extremely rare cases where you must target an element you don't control (e.g. 3rd party HTML), but even then, try to use arbitrary variants like `[&_.child]:text-red-500` first.

## Examples

### Bad
```css
/* styles.css */
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
```

```html
<button class="btn-primary">Click me</button>
```

### Good
```jsx
// Button.tsx
export const Button = ({ children }) => (
  <button class="bg-blue-500 text-white px-4 py-2 rounded">
    {children}
  </button>
);
```
