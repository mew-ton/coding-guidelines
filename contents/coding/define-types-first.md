---
title: Define Types Before Implementation
description: >
  Define your data structures and interfaces first to establish a specification. Implement logic only after the contract is clear.
keywords:
  - type
  - interface
  - contract
  - process
  - no-any
  - specification
  - design-first
---

## Summary
Always write **Types**, **Interfaces**, or **Structs** before writing the implementation logic. Treat types as the contract or specification of the code.

## Rationale
- **Contract-Driven**: Defining types first clarifies the "What" before the "How", preventing logic from becoming convoluted to handle undefined states.
- **Error Isolation**: If a type error occurs during implementation, it signals that the implementation logic is flawed relative to the design. Fixing the implementation is the correct path, not loosening the type (e.g., to `any`).
- **No `any`**: Writing types first eliminates the need for temporary `any` casts often used when "hacking together" a solution.

## Guidance
1.  **Rule**: Start by defining the shape.
    - **TypeScript**: Define `interface` / `type` / function signatures.
    - **Go**: Define `struct` and `interface`.
    - **Java**: Define `interface` / `class` signatures.
2.  **Process**:
    1.  Write the Type definition.
    2.  Use the Type in the function signature.
    3.  Write the body to satisfy the Type.
3.  **Strictness**: Do not change the Type just to make the Implementation easier (unless the design itself was wrong). Do not use `any` or `interface{}` to bypass the contract.

## Examples

### Bad (Implementation First)
```ts
// Writing logic first, inferring types later (or using any)
function processUser(user: any) {
  // Logic is driven by runtime checks, prone to bugs
  if (user.id) { ... }
}
```

### Good (Type First)
```ts
// 1. Define the Contract
interface User {
  id: string;
  isActive: boolean;
}

// 2. Implement to the Contract
function processUser(user: User): void {
  // Compiler enforces property access
  if (user.isActive) { ... }
}
```

### Good (Go Example)
```go
// 1. Define Struct
type Config struct {
    Timeout int
    Retries int
}

// 2. Implement
func NewServer(c Config) *Server {
    // ...
}
```
