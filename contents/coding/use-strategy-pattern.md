---
type: indicator
title: Replace Enum Switching with Strategy Pattern
description: >
  When you encounter a `switch` statement on an `enum`, refactor it to the Strategy Pattern to comply with the Open/Closed Principle.
keywords:
  - design-pattern
  - strategy
  - enum
  - switch
  - ocp
  - refactoring
  - string-literal
  - union-type
---

## Summary
Do not use `switch` statements to handle behavior based on Enum types. Instead, define an **Interface** and implement a concrete **Strategy** for each Enum case.

## Rationale
- **Open/Closed Principle (OCP)**: You should be able to add new behaviors (new enum cases) by adding new classes, *without* modifying existing code (the huge switch statement).
- **Safety**: Adding a new Enum value often leads to "missing case" bugs in switch statements scattered across the codebase. Strategies enforce implementation via the interface contract.
- **Cognitive Load**: Eliminates long, complex procedural branches in favor of small, focused classes.

## Guidance
1.  **Identify**: Find `switch` statements branching on an Enum or Union Type.
2.  **Abstract**: Define an Interface that represents the action being performed inside the cases.
3.  **Implement**: Create a class/struct for each Enum case that implements the Interface.
4.  **Inject**: Replace the switch statement with a map or registry that provides the correct Strategy implementation.

## Examples

### Bad (Switch on Enum)
```go
func (s *Service) DoSomething(ctx context.Context, config Config) error {
    // VIOLATION: Requires modification every time a new Type is added.
    switch config.Type {
    case "local":
        return s.uploadLocal(ctx) // Logic mixed in service
    case "s3":
        return s.uploadS3(ctx)
    case "gcs":
        return s.uploadGCS(ctx)
    default:
        return fmt.Errorf("unknown type: %s", config.Type)
    }
}
```

### Good (Strategy Pattern)
```go
// 1. Define Interface
type StorageStrategy interface {
    Upload(ctx context.Context) error
}

// 2. Implement Strategies
type LocalStrategy struct {}
func (s *LocalStrategy) Upload(ctx context.Context) error { /* ... */ }

type S3Strategy struct {}
func (s *S3Strategy) Upload(ctx context.Context) error { /* ... */ }

// Consumer
type Service struct {
    Strategies map[string]StorageStrategy // or injected single strategy
}

func (s *Service) DoSomething(ctx context.Context, config Config) error {
    // 3. Polymorphic execution
    strategy, exists := s.Strategies[config.Type]
    if !exists {
        return fmt.Errorf("unknown strategy: %s", config.Type)
    }
    return strategy.Upload(ctx)
}
```
