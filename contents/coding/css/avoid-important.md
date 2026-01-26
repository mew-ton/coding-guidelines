---
type: constraint
title: Avoid using !important
description: Do not use !important to override styles as it breaks the cascade and increases specificity wars.
keywords:
  - css
  - specificity
  - cascade
  - maintainability
---

## Summary
Do not use `!important` in your CSS. It completely breaks the natural cascading nature of CSS and essentially creates a global variable that is extremely hard to override.

## Rationale
- **Specificity Hell**: Overriding an `!important` rule requires another `!important` rule with even higher specificity, leading to an arms race.
- **Maintainability**: It masks the root cause of why a style isn't applying (usually incorrect selector specificity or loading order).
- **Unpredictability**: It makes the style immutable to standard utility classes or state changes.

## Guidance
1.  **Increase Specificity**: If a style isn't applying, use a more specific selector (e.g. `.nav .link` instead of `.link`) rather than `!important`.
2.  **Check Order**: Ensure your custom styles are loaded *after* any libraries you are trying to override.
3.  **Exception**: extremely rare cases where you must override inline styles from a 3rd party widget that you cannot control via JS.

## Examples

### Bad
```css
.btn {
  background-color: red !important;
}
```

### Good
```css
/* Use specificity or order */
.header .btn {
  background-color: red;
}
```
