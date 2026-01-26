---
type: constraint
title: Avoid arbitrary values in Tailwind classes
description: Avoid using arbitrary values (e.g. w-[17px]) to ensure design system consistency.
keywords:
  - tailwind
  - consistency
  - design-system
  - maintenance
---

## Summary
Avoid using arbitrary value syntax (square brackets like `w-[17px]`, `bg-[#f00]`) unless absolutely necessary. Stick to the defined design system theme tokens.

## Rationale
- **Consistency**: Using standard tokens (e.g. `w-4`, `p-2`) ensures visual consistency across the application.
- **Maintainability**: Magic numbers scattered in code are hard to update. Updating the theme config propagates changes everywhere.
- **Readability**: `h-[3.75rem]` is harder to parse and reason about than `h-15` (if 15 is defined) or standard spacing.

## Guidance
1.  **Check Theme First**: Always look for an existing utility class that is "close enough".
2.  **Extend Config**: If a value is used repeatedly (more than twice), add it to `tailwind.config.js`.
3.  **One-offs**: Arbitrary values are permissible ONLY for truly unique, pixel-perfect requirements (e.g. `top-[33%]`) that will never be reused, but treat these as code smells to be challenged.

## Examples

### Bad
```html
<div class="w-[17px] h-[13px] mt-[5px]"></div>
```

### Good
```html
<!-- Use closest standard spacing -->
<div class="w-4 h-3 mt-1"></div>
```
