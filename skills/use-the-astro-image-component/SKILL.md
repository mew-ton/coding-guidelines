---
name: use-the-astro-image-component
description: "Enforces use of Astro's Image component or getImage() helper for all local image assets to ensure optimization, lazy loading, and CLS prevention. Use when writing or reviewing any Astro template that displays an image from local assets. Do not use for externally hosted images where Astro cannot optimize the source."
metadata:
  type: "indicator"
  keywords: "astro, images, performance, cls, optimization"
---

## Summary
Use Astro's built-in `<Image />` component or the `getImage()` helper for local images. Avoid using standard HTML `<img>` tags for assets residing in `src/`.

## Rationale
- **Optimization**: Automatically compresses and converts images (WebP/Avif).
- **Layout Shift**: Automatically interprets width/height to prevent Cumulative Layout Shift (CLS).
- **Efficiency**: Lazy-loading is enabled by default.

## Guidance
1.  **Import**: Import the component `import { Image } from 'astro:assets';`.
2.  **Local Assets**: Import the image file directly `import myImg from '../assets/img.png';` and pass it to `src`.
3.  **Remote Images**: For remote images, use `inferSize` or explicitly provide dimensions.

## Examples

### Bad
```html
<img src="/assets/hero.png" />
```

### Good
```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.png';
---
<Image src={heroImg} alt="Hero image" />
```
