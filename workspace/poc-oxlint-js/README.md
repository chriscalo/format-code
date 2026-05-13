# POC: Oxlint for JavaScript Formatting Rules

## Evaluation Question

Can Oxlint detect the JavaScript formatting violations defined in the style guide?

## Style Guide Rules Under Evaluation

| Rule | Violation example | Oxlint rule needed |
|---|---|---|
| Double quotes for strings | `'hello'` | `quotes` |
| Semicolons required | `const x = 1` (no `;`) | `semi` |
| Trailing commas in multiline | `{ a: 1, b: 2 }` (last property no comma) | `comma-dangle` |
| 2-space indentation | 4-space indent | `indent` |
| 80-character line width | line > 80 chars | `max-len` |

## Finding: Oxlint Does Not Support These Rules

Oxlint intentionally omits pure formatting/whitespace rules. From the Oxlint
documentation: formatting is delegated to dedicated formatters (Prettier,
Biome, dprint). Oxlint focuses on code correctness and semantic style.

**None of these rules exist in Oxlint:**
- `quotes` — no single/double quote enforcement
- `semi` — no semicolon enforcement
- `comma-dangle` — no trailing comma enforcement
- `indent` — no indentation enforcement
- `max-len` — no line length enforcement

## Test Results

All 5 tests pass, each asserting that Oxlint reports 0 errors and 0 warnings
for files containing exactly one formatting violation:

```
# tests 5
# pass 5
# fail 0
```

The tests pass because Oxlint *correctly* (by its own design) reports nothing
for formatting violations — it is not the right tool for this job.

## Recommendation

Oxlint **cannot** satisfy the JavaScript formatting rules in the style guide.
Use a formatter instead:

| Formatter | Configures | Notes |
|---|---|---|
| **Prettier** | quotes, semi, trailing commas, indent, line width | Most popular; zero-config default |
| **Biome** | same as Prettier + lint rules | Faster; single tool for format + lint |
| **ESLint** (with plugins) | quotes, semi, comma-dangle, indent, max-len | Requires deprecated formatting plugins |

Oxlint is still valuable alongside a formatter for detecting bugs and semantic
style issues (e.g., `prefer-const`, `no-unused-vars`, `prefer-template`).

## Running the POC

```sh
npm install
npm test
```
