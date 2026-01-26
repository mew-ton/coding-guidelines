---
type: indicator
title: Use the Astro Image component
description: Always use the <Image /> component or getImage() helper instead of standard <img> tags for local assets.
keywords:
  - astro
  - images
  - performance
  - cls
  - optimization
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
