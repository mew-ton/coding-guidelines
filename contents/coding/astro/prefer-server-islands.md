---
type: indicator
title: Prefer Server Islands for dynamic content
description: Use Astro Server Islands (server:defer) for personalized or dynamic content to keep the page cacheable.
keywords:
  - astro
  - server-islands
  - caching
  - dynamism
---

## Summary
Use **Server Islands** (the `server:defer` directive) for dynamic sections like "User Profile", "Cart Count", or "Recommendations" instead of client-side fetching (`useEffect`) or opting out of caching.

## Rationale
- **Cacheability**: Allows the main page to be static and cached by CDN, while dynamic bits are fetched separately.
- **Performance**: Faster than client-side fetching because the request is handled by the edge/server infrastructure, reducing client JS and layout shifts (if sized correctly).
- **Simplicity**: You write standard Astro components, not React/Vue components with fetch logic.

## Guidance
1.  **Defer**: Add `server:defer` to personalized components.
2.  **Fallback**: Always provide a `<div slot="fallback">` to prevent layout shifts.

## Examples

### Bad
```jsx
// React component fetching user data
export default function UserWidget() {
  const { data } = useSWR('/api/me');
  if (!data) return <Spinner />;
  return <div>Hello {data.name}</div>;
}
```

### Good
```astro
<!-- index.astro -->
<UserWidget server:defer>
  <div slot="fallback" class="h-10 w-20 bg-gray-200 animate-pulse" />
</UserWidget>
```
