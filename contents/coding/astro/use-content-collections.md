---
type: constraint
title: Use Content Collections for Markdown
description: Enforce using Content Collections (src/content) for structured content instead of pages/ or pure markdown imports.
keywords:
  - astro
  - content-collections
  - type-safety
  - validation
---

## Summary
Use Astro's **Content Collections** (`src/content`) for managing Markdown/MDX types. Define strict schemas using Zod in `src/content/config.ts`. Avoid placing content directly in `src/pages`.

## Rationale
- **Type Safety**: Content Collections generate TypeScript interfaces for frontmatter, preventing runtime errors.
- **Validation**: Zod schemas ensure all content meets requirements (e.g. valid dates, required images).
- **Separation**: Decouples content structure from routing logic.

## Guidance
1.  **Define Schema**: Always create a `config.ts` in `src/content` and define a schema for each collection.
2.  **Query, Don't Import**: Use `getCollection()` to fetch content, not `import * from '*.md'`.

## Examples

### Bad
```typescript
// Importing markdown directly and guessing types
const posts = await Astro.glob('../pages/posts/*.md');
const title = posts[0].frontmatter.title; // unsafe
```

### Good
```typescript
// src/content/config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

// src/pages/index.astro
const posts = await getCollection('blog');
const title = posts[0].data.title; // Typed!
```
