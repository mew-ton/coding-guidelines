---
skill: true
title: Naming Conventions
description: Enforces consistent identifier naming across the codebase by applying language-standard conventions (camelCase, PascalCase, snake_case, etc.) according to context. Use when naming new variables, functions, types, or files. Do not use to rename identifiers in auto-generated code or third-party bindings where the naming is externally dictated.
skill-metadata:
  type: indicator
  keywords: "naming, style, readability"
---

## Summary
Use consistent naming conventions to communicate intent and scope.

## Guidance
- **PascalCase**: Classes, Interfaces, Types, Components (Astro/Vue etc), Structs (Go export).
- **camelCase**: Variables, functions, methods, fields.
- **kebab-case**: Filenames (web), CSS classes, URLs.
- **UPPER_CASE**: Constants.

## Rationale
Consistency reduces cognitive load and allows predicting names.
