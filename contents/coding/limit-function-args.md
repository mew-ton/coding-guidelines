---
type: indicator
title: Limit Function Arguments
description: >
  Limit the number of function arguments to a maximum of 3. Use an options object or configuration struct for more complex inputs.
keywords:
  - clean-code
  - function
  - arguments
  - parameters
  - readability
---

## Summary
Functions should ideally have **0 to 2 arguments**, and **at most 3**. If a function requires more than 3 arguments, group them into a single Object, Interface, or Struct (often called "Options Object" or "Named Parameters").

## Rationale
- **Readability**: A call like `createUser(name, true, false, 5)` is ambiguous. `createUser({ name, isAdmin: true, ... })` is self-documenting.
- **Order Safety**: Positional arguments are prone to off-by-one errors or swapped values (e.g., `width` vs `height`).
- **Extensibility**: Adding a new field to an options object does not break the function signature for existing callers.

## Guidance
1.  **Count Rule**:
    - 0-2 args: Great.
    - 3 args: Acceptable.
    - 4+ args: **Refactor** to use an Object/Struct.
2.  **Grouping**:
    - Identify related arguments and group them (e.g., `x, y, z` -> `Vector3`).
3.  **Language Specifics**:
    - **TS/JS**: Use destructuring in the signature. `function foo({ a, b }: Options)`.
    - **Go**: Use a `Config` struct. `func NewServer(cfg Config)`.

## Examples

### Bad
```ts
function createChart(title, data, width, height, color, showLegend) {
  // Call site is unreadable
}

createChart("Sales", [1, 2], 100, 200, "red", true);
```

### Good
```ts
interface ChartOptions {
  width: number;
  height: number;
  color?: string;
  showLegend?: boolean;
}

function createChart(title: string, data: number[], options: ChartOptions) {
  // ...
}

createChart("Sales", [1, 2], {
  width: 100,
  height: 200,
  color: "red"
});
```
