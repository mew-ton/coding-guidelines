---
type: indicator
title: Use Arrange-Act-Assert (AAA)
description: >
  Structure test bodies to clearly separate setup, execution, and verification phases.
keywords:
  - testing
  - pattern
  - structure
  - readability
---

## Summary
Structure every test case or test body into three distinct sections:
1.  **Arrange**: Set up the test logic (inputs, mocks, data).
2.  **Act**: Execute the function or method under test.
3.  **Assert**: Verify the results against expected values.

## Rationale
- **Readability**: A consistent visual structure reduces cognitive load when reading tests.
- **Debugging**: Clearly separates the "setup" failures from the "actual logic" failures.
- **Focus**: Encourages tests to focus on a single action (one "Act" per test).

## Guidance
1.  **Visual Separation**: Use blank lines to separate the three sections.
2.  **Comments (Optional)**: If the test is complex, you can explicitly add `// Arrange`, `// Act`, `// Assert` comments, but blank lines are usually sufficient.
3.  **Single Act**: Ideally, there should be only one logical action in the Act phase.

## Examples

### Bad
```ts
test('user calculation', () => {
  const user = { id: 1, balance: 100 };
  const service = new UserService();
  user.balance += 50; // Logic mixed with setup
  const result = service.calculateTax(user);
  expect(result).toBe(15);
  expect(user.balance).toBe(150); // Multiple assertions validation mixed
});
```

### Good
```ts
test('calculates tax correctly', () => {
    // Arrange
    const user = { id: 1, balance: 150 };
    const service = new UserService();

    // Act
    const result = service.calculateTax(user);

    // Assert
    expect(result).toBe(15);
});
```
