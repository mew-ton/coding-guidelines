---
title: Design Resource-Oriented APIs
description: >
  Use nouns (resources) in REST API paths instead of verbs. Use HTTP methods to define actions.
keywords:
  - backend
  - api
  - rest
  - resource-oriented
  - http
---

## Summary
Design REST APIs around **Resources** (Nouns), not Actions (Verbs). Use standard **HTTP Methods** (`GET`, `POST`, `PUT`, `DELETE`) to express the operation being performed on the resource.

## Rationale
- **Predictability**: Developers can guess the API structure (`/users`, `/users/:id`) without reading documentation for every single RPC-style endpoint (`/getUser`, `/deleteUser`).
- **Standardization**: Leverages the HTTP protocol (Caching, Idempotency, Status Codes) effectively.

## Guidance
1.  **URIs are Nouns**:
    - **Bad**: `/getAllUsers`, `/createUser`, `/updateUser`
    - **Good**: `/users`
2.  **Methods define Actions**:
    - `GET /users`: List users.
    - `POST /users`: Create a user.
    - `GET /users/123`: Get specific user.
    - `PUT /users/123` or `PATCH /users/123`: Update user.
    - `DELETE /users/123`: Delete user.
3.  **Sub-resources**:
    - Use hierarchy for belonging relationships.
    - `GET /users/123/orders`: Get orders for user 123.

## Examples

### Bad (RPC Style)
```text
POST /api/createUser
POST /api/deleteUser?id=123
GET  /api/getUserOrders?userId=123
```

### Good (REST Style)
```text
POST   /api/users
DELETE /api/users/123
GET    /api/users/123/orders
```
