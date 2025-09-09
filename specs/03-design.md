# Code Formatting Orchestrator

> Persona: **Software Architect** (Phase 3)  
> Goal: Integrate better ideas from the provided draft while staying 100% aligned with our approved **overview.md** and **requirements.md**.

---

## Decision Summary

We will implement a **multi‑tool orchestrator framework** on Node.js using the **Unified** ecosystem:

- **Hosts (embedding‑aware):**
  - **HTML** → `rehype` pipeline (parse → embedded delegation → `rehype-format` host normalize)
  - **Markdown** → `remark` pipeline (parse → code‑fence delegation → `remark-stringify` host normalize)

- **Inner language tools (highly configurable, plugin‑driven):**
  - **JavaScript/TypeScript/JSX** → **ESLint** (fix‑only, rule‑driven); optional **JS‑Beautify**/**Pretty Diff** for hard wrapping
  - **CSS/SCSS/Sass** → **Stylelint** (`--fix`, plugins e.g. `stylelint-order`)
  - **YAML** → **Google `yamlfmt`** (CLI, configurable)
  - **JSON/JSONC** → **ESLint + jsonc-eslint-parser + eslint-plugin-jsonc** (or **JS‑Beautify** if preferred)
  - **HTML-as-inner (Markdown ```html)** → rehype round‑trip formatter

- **Interface contract (non‑negotiable):**
  - **Inner tool ignorance:** format as if standalone (no host context).
  - **Outer enforcement:** orchestrator computes **effective width = maxWidth − indentOffset**, delegates with that width when supported, then **uniformly reapplies host indentation**.
  - **Embedding parity:** embedded results must match standalone formatting **byte‑for‑byte** (modulo the uniform indent prefix).
  - **Boundary discipline:** hosts normalize only fenced/tag boundaries—never rewrite inner content.

- **No CI/IDE requirements.**  
- **No Prettier, no dprint.**  
- **macOS‑safe** by construction.

---

## Project Structure

Adopt a **clear plugin-per-responsibility** layout and a central **process coordinator** abstraction.

```
scripts/format/
  index.js                         # CLI entry (ESM); flags, routing, logging
  config/
    orchestrator.config.js         # file patterns, embedding rules, per-tool wiring
    rehype.config.js               # host HTML format options (rehype-format)
    remark.config.js               # host MD stringify options
  plugins/
    rehype-format-embedded.js      # HTML: find <script>/<style>, delegate, reintegrate
    remark-format-code-blocks.js   # MD: find fenced/inline code + raw HTML, delegate
    unified-process-coordinator.js # spawn/stdin/stdout + contextual args injection
  formatters/                      # thin adapters; rule of 1 job each
    javascript.js                  # ESLint (Node API) + optional beautify wrapper
    css.js                         # Stylelint (CLI or API)
    yaml.js                        # yamlfmt (CLI)
    json.js                        # ESLint JSONC or JS-Beautify
    html-inner.js                  # rehype round-trip for ```html fences
    spawn.js                       # low-level spawn with timeouts & error shaping
  utils/
    files.js                       # globbing, ignore rules
    io.js                          # safe read/write, stable newline/encoding
    context-preservation.js        # indent detection, normalize, reapply
    width.js                       # effective width computation
    embedding-parity.js            # parity checks standalone vs embedded
    errors.js                      # typed errors (FormatterError, ParityError)
  tests/
    fixtures/                      # golden inputs/expected
    embedding-parity.test.js
    roundtrip-stability.test.js
```

---

## Orchestrator Config (Hierarchical)

`orchestrator.config.js` defines high‑level behavior; **per‑tool configs** remain in their native files (`.eslintrc.*`, `.stylelintrc.*`, `.yamlfmt`, `.jsbeautifyrc`, etc.).

```js
// scripts/format/config/orchestrator.config.js
export default {
  filePatterns: {
    html: ["**/*.html", "**/*.htm"],
    markdown: ["**/*.md", "**/*.markdown"],
    javascript: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    css: ["**/*.css", "**/*.scss", "**/*.sass"],
    yaml: ["**/*.yml", "**/*.yaml"],
    json: ["**/*.json", "**/*.jsonc"]
  },

  embeddingRules: {
    preserveIndentation: true,
    adjustLineWidth: true,           // pass effective width to inner tool when supported
    validateParity: true,            // run parity validator in dev/verbose mode
    boundaryPolicy: { blankLines: "host-normalize" }
  },

  formatters: {
    javascript: { kind: "eslint", maxWidthFlag: null }, // ESLint doesn't wrap; optional beautify wrapper handles width
    css:        { kind: "stylelint", stdin: true },
    yaml:       { kind: "yamlfmt", stdin: true },
    json:       { kind: "eslint-jsonc", alt: "js-beautify" },
    htmlInner:  { kind: "rehypeRoundTrip" }
  }
};
```

---

## Data Flow

### 1) HTML (rehype pipeline)

1. Parse → HAST with `rehype-parse`.  
2. **`rehype-format-embedded` plugin**:  
   - Visit `<script>`/`<style>`.  
   - Extract raw text; **detect indent offset** via `context-preservation`.  
   - Compute **effectiveWidth**.  
   - Delegate to inner tool through **ProcessCoordinator** (stdin/stdout or API).  
   - On success: **reapply uniform indent**, splice back.  
   - On failure: keep original content; report via structured error.  
3. Host normalize with `rehype-format` (indent/whitespace only; no inner rewrites).  
4. Stringify → write.

### 2) Markdown (remark pipeline)

1. Parse → MDAST with `remark-parse`.  
2. **`remark-format-code-blocks` plugin**:  
   - Visit `code` nodes (fenced & inline) and raw HTML blocks.  
   - Map `node.lang` to formatter (js/css/yaml/json/htmlInner).  
   - Extract content; compute indent offset (for list‑nested fences).  
   - Delegate via ProcessCoordinator; reindent; preserve fence style & info string.  
3. Host stringify via `remark-stringify` with conservative, predictable options.  
4. Write output.

### 3) Standalone files

- Stream content to formatter adapter; overwrite in place.  
- Same rules as embedded (identical output—no host indentation applied).

---

## Process Coordination (stdin/stdout abstraction)

All external formatter invocations go through **`unified-process-coordinator.js`**, which:

- Injects contextual arguments (e.g., computed width flags when supported, filename hints for parser behavior).
- Manages **timeouts**, **stderr capture**, **non‑zero exit codes** with helpful diagnostics.
- Returns normalized stdout text; never silently alters encoding/newlines.

```js
// scripts/format/plugins/unified-process-coordinator.js
export class ProcessCoordinator {
  async format({ command, args, input, filename, context }) {
    const { spawn } = await import("node:child_process");
    const adjusted = injectContextArgs(args, { filename, context }); // width/filename flags if applicable
    return new Promise((resolve, reject) => {
      const cp = spawn(command, adjusted, { stdio: ["pipe", "pipe", "pipe"] });
      let out = "", err = "";
      cp.stdout.on("data", d => out += d);
      cp.stderr.on("data", d => err += d);
      cp.on("close", code => code === 0 ? resolve(out) : reject(new FormatterError(command, code, err)));
      cp.stdin.end(input);
    });
  }
}
```

> **ESLint** often yields most deterministic results via the **Node API**; our `formatters/javascript.js` adapter may choose that route while still honoring the “preferred” stdio pattern overall.

---

## Context Preservation & Width

- **Detect** host indent (spaces/tabs, column count).
- **Normalize** embedded text to column 0 before delegation.
- **Compute** `effectiveWidth = configuredMaxWidth − indentOffset`.  
  - Pass to inner tool **if** it supports width flags (**JS‑Beautify**, **Pretty Diff**, **yamlfmt**); else rely on inner rules and ensure reintegration does not exceed host width.  
- **Reapply** uniform indent to each returned line.
- **Preserve** blank line policy as configured (host controls surrounding blank lines).

```js
// scripts/format/utils/context-preservation.js
export function computeIndentOffset(source, nodePosition) { /* column calc */ }
export function normalizeToColumnZero(text, indentOffset) { /* strip prefix */ }
export function reindentUniform(text, indentOffset, unit = "  ") { /* prefix lines */ }
```

---

## Embedding Parity Validation

Provide a **developer‑mode validator** that diff‑checks embedded vs standalone:

1. Take the embedded snippet (column‑0 normalized).  
2. Format via the **same** inner tool (standalone).  
3. Format via the **embedding pipeline**; strip re‑applied indent.  
4. **Assert byte equality**. If mismatch, raise `ParityError` with minimal diff.

```js
// scripts/format/utils/embedding-parity.js
export async function assertParity({ text, lang, pipelineFormat, standaloneFormat }) {
  const embedded = await pipelineFormat(text);
  const standalone = await standaloneFormat(text);
  if (embedded !== standalone) throw new ParityError(lang, { embedded, standalone });
}
```

---

## Formatter Adapters (thin, testable)

- **`formatters/javascript.js`**  
  - Primary: **ESLint** Node API `{ fix: true }` on string input.  
  - Optional: chain **JS‑Beautify** (`--wrap-line-length`) for hard wrapping **after** ESLint if desired.  
  - Returns formatted string; throws `FormatterError` on failure.

- **`formatters/css.js`**  
  - **Stylelint** CLI (`--stdin --fix`) or API; support `customSyntax` as needed.  

- **`formatters/yaml.js`**  
  - Spawn `yamlfmt` with stdin; honor `.yamlfmt` config in repo.

- **`formatters/json.js`**  
  - Option A: **ESLint + jsonc-eslint-parser + eslint-plugin-jsonc** (Node API).  
  - Option B: **JS‑Beautify** CLI with configured indent/wrap.

- **`formatters/html-inner.js`**  
  - For Markdown ```html fences: small rehype parse → `rehype-format` → stringify, **no** rewriting beyond formatting.

All adapters are **idempotent**: same input → same output.

---

## CLI & NPM Scripts

```json
{
  "type": "module",
  "scripts": {
    "format": "node scripts/format/index.js",
    "format:html": "node scripts/format/index.js --only html",
    "format:md": "node scripts/format/index.js --only md",
    "format:js": "node scripts/format/index.js --only js",
    "format:css": "node scripts/format/index.js --only css",
    "format:yaml": "node scripts/format/index.js --only yaml",
    "format:json": "node scripts/format/index.js --only json"
  }
}
```

**Flags:**  
- `--only <lang>`: restrict to one language  
- `--max-width <n>`: global target (defaults from config)  
- `--parity` / `--no-parity`: enable/disable parity checks (default on in dev)

---

## Testing Strategy

- **Golden fixtures** per language and embedding scenario:  
  - HTML with `<script>`/`<style>` at varying indents; Markdown with nested fences (under lists/quotes).  
  - Standalone counterparts for each embedded snippet.  
- **Parity tests**: embedded-vs-standalone byte equality (after stripping uniform indent).  
- **Round‑trip stability**: second run produces zero diff.  
- **Boundary policy tests**: host can add/remove a single blank line as configured—no inner content mutations by host.  
- **Cross‑platform**: run on macOS and Linux locally (no CI requirement).

Use Node’s `node:test` and `assert/strict`. Keep tests **deterministic** (pin tool versions).

---

## Open Choices (explicit)

- **Markdown engine:** default **remark**; can swap to **mdformat + plugins** later *only* for MD if you prefer fence‑delegation via Python.  
- **JSON path:** prefer **ESLint JSONC** for rule consistency; allow **JS‑Beautify** if you want pure formatting semantics.  
- **JS hard wrapping:** adopt **JS‑Beautify/Pretty Diff** only if you need enforced width beyond ESLint’s remit.

---

## Risks & Mitigations

- **Mismatch host vs inner** → **Inner precedence** inside boundaries; host only normalizes edges.  
- **Formatter variance across machines** → Pin versions; check in all configs.  
- **Glue creep** → Keep delegation in two Unified plugins + ProcessCoordinator; anything more becomes a dedicated adapter or is rejected.

---

## Deliverables

- Orchestrator CLI + Unified plugins (`rehype-format-embedded`, `remark-format-code-blocks`, `unified-process-coordinator`)  
- Formatter adapters (`formatters/*.js`)  
- Utils for context/width/parity (`utils/*.js`)  
- Per‑tool configs checked in (`.eslintrc.*`, `.stylelintrc.*`, `.yamlfmt`, optional `.jsbeautifyrc`)  
- Tests + fixtures (parity, round‑trip, boundaries)
