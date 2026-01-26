---
type: constraint
title: Avoid using ID selectors for styling
description: Do not use IDs (e.g. #header) for styling purposes due to their excessively high specificity.
keywords:
  - css
  - specificity
  - selectors
  - reusability
---

## Summary
Use classes (`.classname`) for styling. Do not use IDs (`#idname`) for CSS rules. Reserve IDs for JavaScript hooks, anchor links, and accessibility attributes (ARIA).

## Rationale
- **Specificity**: IDs have vastly higher specificity than classes. You cannot override `#header { color: red }` with `.header-dark { color: blue }` unless you chain many classes or use `!important`.
- **Reusability**: IDs are unique by definition. You cannot reuse `#submit-button` on a second button, whereas `.submit-button` is reusable.

## Guidance
1.  **Refactor**: Convert `#header` to `.header`.
2.  **Hooks**: It is fine to have `<div id="app" class="app">`. Style `.app`, target `#app` in JS.

## Examples

### Bad
```css
#sidebar {
  width: 300px;
}
```

### Good
```css
.sidebar {
  width: 300px;
}
```
