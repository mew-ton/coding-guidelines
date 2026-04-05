---
skill: true
title: Component Design (Atomic Principles)
description: Applies Atomic Design thinking (atoms, molecules, organisms) to component granularity decisions without requiring a rigid directory hierarchy. Use when designing a new component and deciding how to decompose it. Do not use as a reason to create deeply nested folder structures — the principle guides granularity, not directory layout.
skill-metadata:
  type: indicator
  keywords: "frontend, architecture, atomic-design, component"
---

## Summary
Design components based on the Atomic Design methodology (Atoms -> Molecules -> Organisms), but organize them by feature or domain rather than strict "atoms/molecules" directories.

## Guidance
1.  **Granularity**:
    - **Atom**: Basic UI elements (Button, Input). No logic.
    - **Molecule**: Groups of atoms (SearchBox). UI logic only.
    - **Organism**: Complex sections (Header, ProductList). Business logic allowed (via props/containers).
2.  **Organization**:
    - Use a flat `components/` directory or group by feature `features/<feature>/components`.
    - Do NOT create deep `components/atoms`, `components/molecules` nesting unless necessary.

## Rationale
Atomic Design helps in deciding component size and responsibility. However, strict directory separation often leads to "where do I put this?" classification hell.
