---
skill: true
title: Prohibit dynamic string concatenation for class names
description: Prohibits dynamic string concatenation for Tailwind class names because the scanner cannot detect them, causing styles to be purged. Use when writing or reviewing any code that conditionally applies Tailwind classes. Do not use for complete static class strings selected conditionally — only construction of partial class name strings is prohibited.
skill-metadata:
  type: constraint
  keywords: "tailwind, class-names, static-analysis, purge"
---

## Summary
Do not dynamically construct class strings using string concatenation or template literals (e.g. `bg-${color}-500`). Full class names must exist in the source code.

## Rationale
- **Purging/Scanning**: Tailwind's JIT compiler scans source files for *complete strings*. It does not execute JavaScript. If it sees `` `bg-${color}` ``, it generates nothing because it doesn't know what `color` is.
- **Broken Styles**: This leads to styles working in dev (if safely listed elsewhere) but breaking in production builds.

## Guidance
1.  **Map Full Strings**: Use a mapping object where values are full class strings.
2.  **Safka-listing**: (Discouraged) Safelisting classes in config is a last resort and increases bundle size.

## Examples

### Bad
```javascript
// The compiler cannot see "bg-red-500" here
const btnClass = `bg-${props.color}-500`;
```

### Good
```javascript
const colorVariants = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

// The compiler sees the full strings above
const btnClass = colorVariants[props.color];
```
