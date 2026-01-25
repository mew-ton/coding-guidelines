---
type: constraint
title: Use Valid Heading Hierarchy
description: >
  Structure pages logically with h1 through h6. Do not skip levels, and use only one h1 per page.
keywords:
  - html
  - accessibility
  - seo
  - headings
  - structure
---

## Summary
Use HTML heading tags (`<h1>` - `<h6>`) to create a logical outline of the page content. Do not choose headings based on font size; choose them based on structure.

## Rationale
- **Accessibility**: Screen reader users navigate by headings. Skipping levels (e.g., `h2` to `h4`) creates confusion.
- **SEO**: Search engines use headings to understand the main topics of the page.
- **Consistency**: Enforces a consistent document structure.

## Guidance
1.  **One H1**: Each page should have exactly one `<h1>` representing the main title.
2.  **Sequential**: Do not skip levels. An `<h3>` must follow an `<h2>` (or another `<h3>`).
3.  **No Styling**: Do not use `<h5>` just because you want "small bold text". Use CSS for styling.

## Examples

### Bad
```html
<!-- Multiple H1s, Skipping levels -->
<h1>Site Logo</h1>
<h1>Welcome</h1>
<h4>Latest News</h4> <!-- Skipped h2/h3 -->
```

### Good
```html
<h1>Welcome to Our Site</h1>
<section>
    <h2>Latest News</h2>
    <article>
        <h3>New Feature Released</h3>
    </article>
</section>
```
