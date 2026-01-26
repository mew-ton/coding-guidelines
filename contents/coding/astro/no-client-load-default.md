---
type: constraint
title: Do not use client:load by default
description: Minimize client-side JavaScript. Only hydrate components when strictly necessary.
keywords:
  - astro
  - hydration
  - performance
  - islands-architecture
---

## Summary
Astro is static by default. Do not add `client:load` or `client:only` to a component unless it requires immediate interactivity on page load (e.g. a navbar toggle). Default to server rendering (no directive) or `client:idle` / `client:visible` if interactivity is secondary.

## Rationale
- **Performance**: `client:load` downloads and executes JS during the critical rendering path, hurting TBT and LCP.
- **Philosophy**: Using `client:load` everywhere turns Astro into a standard SPA, negating its benefits.

## Guidance
1.  **No Directive**: The default. Use for static UI (footers, content, headers without menus).
2.  **client:visible**: Use for carousels, maps, or footer widgets that appear below the fold.
3.  **client:idle**: Use for low-priority tracking or non-critical UI.
4.  **client:load**: Reserved for above-the-fold critical interactivity (e.g. Theme toggler).

## Examples

### Bad
```astro
<!-- Hydrates immediately, blocking main thread -->
<Footer client:load />
```

### Good
```astro
<!-- Zero JS (HTML only) -->
<Footer />

<!-- Hydrates when user sees it -->
<HeavyChart client:visible />
```
