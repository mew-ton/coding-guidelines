---
title: Images Require Alt Text
description: >
  All img tags must have an alt attribute. Use empty alt="" for decorative images, but never omit the attribute.
keywords:
  - html
  - accessibility
  - a11y
  - images
  - alt
  - seo
  - screen-reader
---

## Summary
Every `<img>` tag must have an `alt` attribute. If the image conveys info, describe it. If the image is purely decorative, use `alt=""`.

## Rationale
- **Screen Readers**: Without an `alt` attribute, screen readers often read the filename (e.g., "img_1234.jpg"), which provides poor UX.
- **Fallback**: If the image fails to load, the `alt` text is displayed.
- **SEO**: Search engines index the `alt` text.

## Guidance
1.  **Informative**: For icons w/ functionality or photos w/ meaning, describe the content or function (e.g., "Search", "Profile of John Doe").
2.  **Decorative**: For background blobs, spacers, or redundant icons, use `alt=""`.
3.  **Prohibited**: Do NOT omit the attribute entirely.

## Examples

### Bad
```html
<!-- Missing alt attribute -->
<img src="logo.png" />
```

### Good
```html
<!-- Informative -->
<img src="logo.png" alt="Company Name Home" />

<!-- Decorative -->
<img src="divider.png" alt="" />
```
