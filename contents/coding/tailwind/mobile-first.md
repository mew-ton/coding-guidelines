---
type: indicator
title: Enforce mobile-first responsive design
description: Write default classes for mobile, and use breakpoints for larger screens.
keywords:
  - tailwind
  - responsive
  - mobile-first
  - breakpoints
---

## Summary
Build the responsive design mobile-first. Default classes target the smallest screen. Use breakpoints (`sm:`, `md:`, `lg:`) to override for larger screens. Never use `max-w` breakpoints (desktop-first) unless strictly necessary for legacy overrides.

## Rationale
- **Standardization**: Tailwind is built mobile-first. Fighting this paradigm leads to complex, hard-to-debug CSS.
- **Simplicity**: Code is often simpler because mobile layouts are typically single-column stacks (default), requiring overrides to become multi-column (complex).
- **Consistency**: Mixing mobile-first (`min-width`) and desktop-first (`max-width`) makes mental modeling difficult.

## Guidance
1.  **Start Small**: Write styles for the mobile view first without any prefixes.
2.  **Scale Up**: Add `md:` or `lg:` only when the layout *changes* for those screens.
3.  **Avoid redundancies**: Do not write `block sm:block`.

## Examples

### Bad
```html
<!-- Desktop-first approach (using max-width logic or assumed defaults reversed) -->
<div class="flex max-sm:block">...</div>
```

### Good
```html
<!-- Mobile-first: Block by default, Flex on medium screens and up -->
<div class="block md:flex">...</div>
```
