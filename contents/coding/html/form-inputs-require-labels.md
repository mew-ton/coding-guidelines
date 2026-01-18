---
title: Form Inputs Require Labels
description: >
  All form inputs must have an associated label element (via for/id or nesting) or aria-label for screen reader accessibility.
keywords:
  - html
  - accessibility
  - a11y
  - forms
  - labels
---

## Summary
Every form control (`<input>`, `<textarea>`, `<select>`) must have an accessible name. The best way is an explicit `<label>`.

## Rationale
- **Click Target**: Clicking the label focuses the input, improving usability for mouse/touch users.
- **Screen Readers**: Screen readers announce the label when the input is focused. Without it, users don't know what to enter.

## Guidance
1.  **Explicit Label**: Use `<label for="id">` and `<input id="id">`.
2.  **Implicit Label**: Nest the input inside the label: `<label>Name: <input></label>`.
3.  **Hidden Label**: If a visual label isn't desired (e.g., search bar), use `aria-label="Search"` or `<label class="sr-only">`.

## Examples

### Bad
```html
<!-- No association -->
<span>Email:</span>
<input type="email" />
```

### Good
```html
<!-- Explicit -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Implicit -->
<label>
  Search
  <input type="search" />
</label>

<!-- Accessible but hidden label -->
<input type="search" aria-label="Search Site" />
```
