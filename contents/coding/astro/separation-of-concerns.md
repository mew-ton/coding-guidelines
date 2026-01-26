---
type: indicator
title: Keep Astro frontmatter clean
description: Move complex logic out of the component frontmatter script fence into utility files.
keywords:
  - astro
  - clean-code
  - testing
  - logic-separation
---

## Summary
Keep the "Code Fence" (the area between `---`) in `.astro` files focused on **View Logic** (fetching props, transforming data for display). Move complex business logic, data fetching wrappers, or heavy computations into separate `.ts` utility files.

## Rationale
- **Testability**: Code inside `.astro` files is hard to unit test isolated from the markup. `.ts` files are easy to test.
- **Readability**: Huge frontmatter blocks hurt the scannability of the component structure.
- **Reusability**: Logic in `.ts` files can be shared across endpoints and components.

## Guidance
1.  **Extract**: If the frontmatter exceeds 20-30 lines, consider extracting classes or functions.
2.  **Imports**: Import the logic and call it.

## Examples

### Bad
```astro
---
// index.astro
const { data } = await fetch('...');
const filtered = data.filter(x => ...).map(y => ...).reduce(...);
// ... 50 lines of logic ...
---
```

### Good
```astro
---
// index.astro
import { getFilteredData } from '../utils/data';
const filtered = await getFilteredData();
---
```
