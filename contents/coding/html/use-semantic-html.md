---
title: Use Semantic HTML
description: >
  Use Semantic HTML elements (article, section, nav) instead of generic `div` soup. explicit `role` attributes are an acceptable exception.
keywords:
  - html
  - semantic
  - accessibility
  - seo
  - structure
  - role
---

## Summary
Prioritize **Semantic HTML** tags (e.g., `<article>`, `<section>`, `<nav>`, `<main>`) over generic `<div>` or `<span>` elements. Use `div`/`span` only when no semantic tag applies, or for pure styling wrappers.

## Rationale
- **Accessibility**: Screen readers rely on semantic landmarks (landmarks) to navigate. A `<nav>` or `<main>` element allows users to skip repetitive content.
- **SEO**: Search engines use tag hierarchy to understand content importance and relationship.
- **Maintainability**: Semantic tags communicate the code's *intent* (`<article class="post">` vs `<div>`).
- **Testability**: Semantic structure enables robust testing selectors like `getByRole('navigation')` or `getByRole('article')`, which are more resilient to design changes than CSS classes.

## Guidance
1.  **Rule**: Default to semantic tags.
    - `header`, `footer`, `main`: High-level page structure.
    - `nav`: Navigation links.
    - `article`: Self-contained content (blog post, comment).
    - `section`: Thematic grouping of content with a heading.
2.  **Avoid**: "Div Soup" (nested divs with no semantic meaning).
3.  **Exception**:
    - **Explicit Role**: A `div` or `span` with a valid WAI-ARIA `role` (e.g., `<div role="button">`) is acceptable if a native element cannot be used (though native is still preferred).
    - **Styling**: `div` and `span` are perfectly fine for layout/styling wrappers (e.g., Flexbox containers) that have no semantic meaning.

## Examples

### Bad (Div Soup)
```html
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>
<div class="content">
  <!-- Just a generic container -->
  <div class="post">...</div>
</div>
```

### Good (Semantic Structure)
```html
<header>
  <nav>
    <a href="#">Home</a>
  </nav>
</header>
<main>
  <article>...</article>
</main>
```

### Acceptable (Role Exception)
```html
<!-- When you absolutely need a div for a button (e.g. complex layout) -->
<div role="button" tabindex="0" @click="handleClick">
  Click Me
</div>
```
