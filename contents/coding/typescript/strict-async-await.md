---
title: Strict Async/Await Usage
description: >
  Always use async/await instead of .then().catch() chains for consistency and better error handling semantics.
keywords:
  - typescript
  - async
  - promise
  - readability
  - error-handling
---

## Summary
Use `async` and `await` for all asynchronous operations. Do not use Promise chaining (`.then()`, `.catch()`) unless absolutely necessary (e.g., in a legacy library callback integration).

## Rationale
- **Readability**: `async/await` reads like synchronous code, making control flow (loops, conditionals) easier to follow.
- **Error Handling**: `try/catch` provides a single, consistent mechanism for error handling that works for both sync and async errors.
- **Stack Traces**: Modern JS engines often provide better stack traces for async functions than for Promise chains.

## Guidance
1.  **Convert Chains**: Flatten `.then()` chains into sequential lines.
2.  **Try/Catch**: Wrap fallible async calls in `try/catch` blocks.
3.  **Top-Level**: Use Top-Level Await if the environment supports it, rather than an IIFE with `.then()`.

## Examples

### Bad (Promise Chain)
```ts
function getUserData(id: string) {
  return fetchUser(id)
    .then(user => {
      return fetchPosts(user.id)
        .then(posts => ({ user, posts }));
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}
```

### Good (Async/Await)
```ts
async function getUserData(id: string) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
```
