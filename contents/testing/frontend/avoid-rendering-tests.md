---
type: indicator
title: Avoid Component Rendering Tests
description: >
  Minimize reliance on component rendering tests (mounting). Prefer Unit Testing extracted logic. If rendering is needed, mock child components.
keywords:
  - frontend
  - rendering
  - mount
  - integration
  - mock
  - shallow
---

## Summary
Treat component rendering tests (using `mount`, `render`, `shallowMount`) as **Integration Tests**. They are costly and flaky. Avoid them by extracting business logic into pure functions or hooks. If you must test rendering, **mock** child components to isolation.

## Rationale
- **Stability**: Rendering tests heavily depend on the DOM, child component internals, and global context (Router, Store), making them fragile to unrelated changes.
- **Speed**: Emulating a DOM (jsdom/happy-dom) is significantly slower than running pure JavaScript logic.
- **Focus**: Tests should verify inputs and outputs, not pixel placement or internal DOM structure.

## Guidance
1.  **Extract Logic (Preferred)**:
    - Instead of testing "Clicking button increments counter in DOM", extract the counter logic to a Composable/Hook and Unit Test that hook directly.
    - Follow any available guidelines for separating business logic from components (e.g., Flux architecture or Composables).
2.  **Mock Children (If Rendering)**:
    - When testing a parent component, do not render full child components.
    - Use **Shallow Rendering** or explicitly **Mock** child components.
    - Verify that the parent passes the correct **Props** to the child, rather than checking the child's DOM output.
3.  **Scope**:
    - Use Rendering tests only for high-level Integration/E2E flows where user interaction is the primary focus.

## Examples

### Bad (Testing Implementation Details)
```ts
// Flaky: Depends on the child 'UserCard' implementation
test('displays user name', () => {
  const wrapper = mount(UserList, { props: { users: [{ name: 'Alice' }] } })
  // If UserCard changes from h2 to div, this breaks
  expect(wrapper.find('h2').text()).toBe('Alice')
})
```

### Good (Logic Extracted)
```ts
// Unit Test the Logic (Composable) - No DOM needed
test('useUserList', () => {
  const { users } = useUserList()
  users.value = [{ name: 'Alice' }]
  expect(users.value[0].name).toBe('Alice')
})
```

### Good (Mocking Children)
```ts
// Testing the Parent-Child contract
test('passes user to UserCard', () => {
  // Child is mocked, so we don't care how it renders
  const wrapper = mount(UserList, { 
    global: { stubs: { UserCard: true } }
  })
  const userCard = wrapper.findComponent({ name: 'UserCard' })
  expect(userCard.props('user').name).toBe('Alice')
})
```
