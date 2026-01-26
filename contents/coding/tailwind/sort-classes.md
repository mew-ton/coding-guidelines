---
type: indicator
title: Sort Tailwind classes automatically
description: Use automated tooling to sort Tailwind utility classes for consistency and readability.
keywords:
  - tailwind
  - readability
  - tooling
  - sorting
---

## Summary
Enable and rely on automated class sorting (e.g., using `prettier-plugin-tailwindcss`). Do not manually order classes.

## Rationale
- **Cognitive Load**: Eliminates decisions about where to put a class.
- **Readability**: Standard order helps eyes scan for specific properties (e.g. layout -> spacing -> typography -> color).
- **Git Diffs**: Reduces useless diff noise caused by reordering classes.

## Guidance
1.  **Install Prettier Plugin**: Ensure `prettier-plugin-tailwindcss` is configured in the project.
2.  **Run formatting**: Let the formatter handle it.
3.  **Ignore preferences**: Do not argue about "logical" grouping vs "official" grouping. Just accept the tool's output.

## Examples

### Bad
```html
<div class="text-white p-4 flex bg-blue-500 rounded hover:bg-blue-600">
  <!-- Random order is hard to scan -->
</div>
```

### Good
```html
<div class="flex rounded bg-blue-500 p-4 text-white hover:bg-blue-600">
  <!-- Consistent order (Layout -> Box Model -> Visual) -->
</div>
```
