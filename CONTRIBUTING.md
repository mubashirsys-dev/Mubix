# Contributing to MUBIX Portfolio

First off, thank you for taking the time to contribute! This project is a showcase of high-end developer portfolio design and interactive experiences, and we welcome improvements, refactors, and feature additions.

---

## Code of Conduct

By participating in this project, you agree to abide by our standards of respectful, welcoming communication and professional collaboration.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Search existing issues to verify the bug has not been reported.
- If you find a new bug, open an issue describing:
  - The expected vs. actual behavior.
  - Clear steps to reproduce the issue.
  - Your environment parameters (Browser, Operating System version).
  - Screenshots or console logs if applicable.

### 2. Suggesting Enhancements
- Open a feature request issue.
- Describe the feature's utility, target section, and potential performance implications (e.g. bundle size or animation paint times).

### 3. Submitting Code Changes
- Fork the repository and create a branch from `main`.
- Adhere to the branch naming convention:
  - `feat/feature-name` for new layouts or sections.
  - `fix/bug-fix-name` for corrections and styling repairs.
  - `docs/doc-updates` for copy and writing updates.
- Keep your changes focused. Do not combine multiple unrelated features into one Pull Request.
- Verify that your code builds locally before submitting (`npm run build`).

---

## Coding Standards

### JavaScript & React
- Use ES6+ features (arrow functions, object destructuring, template literals).
- Group component imports logically (React hooks, external libraries, local components, styles, data utilities).
- Ensure all interactive elements remain fully accessible (add appropriate `aria-label` or `aria-expanded` attributes, and verify keyboard navigation compatibility).

### Styling & CSS
- Adhere to our custom CSS custom properties (variables) defined in `src/base.css`.
- Avoid hardcoded values for margins, colors, or shadows; utilize CSS tokens (`var(--neo-accent)`, `var(--border-heavy)`, etc.).
- Ensure all layouts are mobile-first and responsive.

### Commit Guidelines
We follow semantic commit message formatting:
- `feat: add portfolio terminal utility`
- `fix: correct comic wipe toggle alignment`
- `docs: update setup guide in README`
- `style: format base variables`

---

## Pull Request Checklist

Before submitting your PR, please verify:
- [ ] The application builds cleanly with no compilation or esbuild errors (`npm run build`).
- [ ] No duplicate or dead code is left trailing in the files.
- [ ] Commit history is squashed and matches the semantic formatting standard.
- [ ] Responsive layouts have been verified across simulated viewports (Desktop, Tablet, Mobile).
