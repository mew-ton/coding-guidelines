---
title: Comments should explain WHY, not WHAT
description: >
  Write comments that provide context and rationale, rather than duplicating the code's intent which should be self-evident.
keywords:
  - comments
  - documentation
  - readability
  - context
---

## Summary
Comments should explain the reasoning behind a decision or provide context that is not immediately obvious from the code itself. Avoid comments that simply translate the code into English.

## Rationale
- **Redundancy**: Comments that say "what" the code does become stale easily when the code changes.
- **Clarity**: Good code should be self-documenting regarding "what" it does (via variable names and structure).
- **Context**: The "why" (business rules, weird bug fixes, optimization reasons) cannot be expressed in code syntax and is where comments are most valuable.

## Guidance
1.  **Assume Competence**: Assume the reader knows the programming language.
2.  **Explain Decisions**: Document why a specific algorithm or constant was chosen.
3.  **Link Resources**: Link to relevant tickets, bug reports, or external documentation.

## Examples

### Bad
```go
// Set port to 8080
port := 8080

// If user is valid, save them
if user.IsValid() {
    save(user)
}
```

### Good
```go
// Default to 8080 as required by the load balancer configuration
port := 8080

// We must validate before saving to prevent DB inconsistencies (see issue #123)
if user.IsValid() {
    save(user)
}
```
