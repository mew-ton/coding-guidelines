---
title: Prefer Table-Driven Tests
description: >
  Standardize on the idiomatic Go pattern of using a slice of test cases to run the same logic against different inputs/outputs.
keywords:
  - testing
  - go
  - table-driven
  - idiomatic
---

## Summary
Use table-driven tests to verify multiple test cases for a single function. Define a slice of structs containing inputs, expected outputs, and a test name, then iterate over them.

## Rationale
- **Compactness**: Reduces boilerplate code by reusing the setup and assertion logic.
- **Readability**: Makes it easy to scan all test cases and see the variation in inputs/outputs.
- **Extensibility**: Adding a new test case is as simple as adding a new line to the slice.

## Guidance
1.  **Anonymous Structs**: Use an anonymous struct slice `cases := []struct { ... }` inside the test function.
2.  **Subtests**: Use `t.Run(tc.name, func(t *testing.T) { ... })` inside the loop to isolate failures.
3.  **Comprehensive Cases**: Include edge cases, error cases, and happy paths in the table.

## Examples

### Bad
```go
func TestAdd(t *testing.T) {
    if Add(1, 2) != 3 {
        t.Error("1 + 2 should be 3")
    }
    if Add(-1, 1) != 0 {
        t.Error("-1 + 1 should be 0")
    }
    // ... repetitive code
}
```

### Good
```go
func TestAdd(t *testing.T) {
    cases := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 1, 2, 3},
        {"negative and positive", -1, 1, 0},
        {"zeros", 0, 0, 0},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            if got := Add(tc.a, tc.b); got != tc.expected {
                t.Errorf("Add(%d, %d) = %d; want %d", tc.a, tc.b, got, tc.expected)
            }
        })
    }
}
```
