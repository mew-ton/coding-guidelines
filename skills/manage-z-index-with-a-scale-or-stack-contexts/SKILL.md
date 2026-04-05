---
name: manage-z-index-with-a-scale-or-stack-contexts
description: "Enforces z-index management through a defined scale or CSS custom properties to eliminate magic numbers. Use when adding or reviewing z-index declarations in CSS. Do not use for z-index values inside isolated stacking contexts where local numbering is intentional and documented."
metadata:
  type: "indicator"
  keywords: "css, z-index, stacking-context, architecture"
---

## Summary
Do not use arbitrary "magic numbers" like `z-index: 9999`. Define a system (variables, SCSS map, or Tailwind config) and stick to it. Understand Stacking Contexts to isolate components.

## Rationale
- **Z-Index Wars**: One developer uses `999`, another uses `1000`, leading to absurd values like `2147483647`.
- **Predictability**: A defined scale (`modal: 100`, `tooltip: 200`) makes it clear what should appear on top.

## Guidance
1.  **Variables**: Define `--z-dropdown`, `--z-sticky`, `--z-modal`, `--z-toast`.
2.  **Isolation**: Use `isolation: isolate` to create a new stacking context and prevent children from leaking out or being interfered with.

## Examples

### Bad
```css
.modal {
  z-index: 99999;
}
```

### Good
```css
:root {
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 30;
}

.modal {
  z-index: var(--z-modal);
}
```
