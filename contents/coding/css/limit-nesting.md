---
type: indicator
title: Limit CSS nesting depth
description: Limit the nesting depth of CSS rules (e.g. max 3 levels) to prevent excessive specificity and file size.
keywords:
  - css
  - nesting
  - preprocessor
  - performance
  - specificity
---

## Summary
Limit CSS nesting (SCSS/Native Nesting) to a maximum of 3 levels deep. If you need to go deeper, your HTML structure or class naming strategy is likely too complex.

## Rationale
- **File Size**: Deep nesting generates long selectors (`.a .b .c .d .e`) which bloat the CSS file.
- **Performance**: Browsers have to traverse the DOM tree right-to-left to match deep selectors, which can be slower (though less of an issue today).
- **Fragility**: Deep selectors mirror the HTML structure precisely. Changing the HTML structure breaks the CSS.

## Guidance
1.  **Flatten**: Instead of `.card .header .title`, just use `.card-title`.
2.  **BEM**: Use Block Element Modifier (BEM) naming to avoid nesting entirely (e.g. `.card__title`).

## Examples

### Bad
```scss
.nav {
  ul {
    li {
      a {
        span {
          color: red;
        }
      }
    }
  }
}
```

### Good
```scss
.nav-link-text {
  color: red;
}
```
