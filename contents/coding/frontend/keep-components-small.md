---
title: Keep Components Small
description: >
  Aim to keep frontend components under approximately 100 lines to maintain readability and encourage decomposition.
keywords:
  - component
  - file
  - function
  - large
  - long
  - complex
  - decomposition
  - readability
  - size
  - lines
---

## Summary
Maintain a soft limit of approximately **100 lines** for component files. If a component exceeds this, treat it as a trigger to consider refactoring options (extraction of logic or sub-components).

## Rationale
- **Cognitive Load**: Short files allow developers to understand the full context of a component without excessive scrolling.
- **Decomposition**: A strict size check encourages the creation of reusable sub-components and the extraction of business logic into distinct hooks or composables.
- **Tailwind**: Encourages the use of inline utility classes over lengthy `<style>` blocks, further reducing file size.

## Guidance
1.  **Target**: Aim for **< 100 lines**.
    - **Vue**: Includes `<script>`, `<template>`, and `<style>` combined.
    - **React**: Includes the main component function body.
2.  **Exceptions**:
    - **Complex Forms**: Forms with many inputs and validation logic may justifiably be larger.
    - **Data Tables**: Components handling complex tabular data visualization.
    - *Even in exceptions, consider splitting the file if possible (e.g., extracting form sections).*
3.  **Refactoring Strategies**:
    - **Extract Sub-Components**: Move parts of the template (e.g., a header card, a list item) into their own files.
    - **Extract Logic**: Move complex state management or data fetching into a Custom Hook (`useUser`) or Composable (`useUser`).

## Examples

### Bad (Large Monolith)
`UserProfile.vue` (300 lines)
- Contains logic for fetching user, handling editing state, verifying email.
- Template contains strict layout for Header, Body, and Settings form.
- Style block has 50 lines of CSS.

### Good (Decomposed)
`UserProfile.vue` (80 lines)
- Imports `useUserLogic()` for state management.
- Imports `UserHeader.vue`, `UserSettings.vue`.
- Template basically just wires these pieces together.
