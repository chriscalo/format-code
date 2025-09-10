# Code Formatting Orchestrator — Requirements

## Target
- Build a **multi-tool orchestrator framework** that manages formatting of languages embedded within other languages.  
- For each supported language, use the **best-in-class formatter** for that language.  
- Both orchestrator and per-language tools must be **highly configurable through plugin architectures**.  
- Favor ecosystems with a **rich set of existing plugins** so very few custom plugins need to be written.

---

## Functional Requirements

### Language Coverage
- Must support **HTML, CSS, JavaScript, YAML, Markdown, and JSON**.  
- Must correctly detect and handle **embedded/nested content**:
  - HTML: `<script>` and `<style>` blocks
  - Markdown: fenced & inline code blocks (JS, HTML, CSS, YAML, JSON) and raw HTML blocks

### Embedding Behavior
- **Parity:** Formatting inside embedded regions must be byte-for-byte identical to standalone formatting for that language.  
- **Inner tool ignorance:** Inner formatters must run as if code were standalone, with no awareness of host context.  
- **Outer context enforcement:**  
  - Orchestrator imposes line length constraints on inner formatter (effective max width = configured max width − indentation offset).  
  - Orchestrator uniformly applies host indentation when reinserting inner content.  
- **Boundary discipline:** Outer formatter must not rewrite inner content; only normalize boundaries (e.g., surrounding blank lines, fences).  

### Orchestration
- Must provide a **full solution**, not a single tool:  
  - A multi-tool orchestrator that coordinates multiple best-in-class formatters.  
  - Plugins extend or override behavior when existing tools don’t cover needs.  
- Orchestrator must detect and slice embedded regions, pipe them to the correct tool, and reintegrate results.  
- Preferred pattern: tools accept **stdin** and emit **stdout**; orchestrator passes content without file I/O.  
- Configurable command set:
  - `npm run format` (entire repo)
  - `npm run format:js`
  - `npm run format:html`
  - `npm run format:md`
  - `npm run format:css`
  - `npm run format:yaml`
  - `npm run format:json`

### Application Mode
- Must always **apply formatting**, never only “check” for formatting.

---

## Non-Functional Requirements

### Configurability
- Each formatter must be **highly configurable** (indentation, line wrapping, quotes, semicolons, trailing commas, blank line handling with context-matching whitespace, attribute wrapping).  
- Rules must be shared across embedded and standalone contexts.  
- It is acceptable to use **separate configs per tool**; a single unified config is not required.  

### Extensibility
- Both orchestrator and language tools must support a **plugin architecture**.  
- Plugins must be simple to write, documented, and fast to test.  
- Rich plugin ecosystems are strongly preferred so few custom plugins are needed.  

### Compatibility
- Must run reliably on **macOS**.  
- Node-first orchestrator, runnable via `npm run` or `npx`.  

### Determinism
- Same input always produces the same output across environments.  
- Version pinning for each sub-tool to guarantee reproducibility.  
- Configs (per tool) must be checked into source control.  

---

## Selection Criteria for Language Tools
- **Configurability:** Must allow deep control.  
- **Plugin support:** Must have community ecosystem + ability to extend.  
- **Embeddings:** Must handle embedded code cleanly or cooperate with orchestrator.  
- **Integration:** Prefer stdin/stdout model.  
- **Platform compatibility:** Must run on macOS, Linux, Windows.  
- **Sustainability:** Open source, active maintenance, good documentation.  
- **Unopinionated:** Avoid overly rigid tools (e.g., Prettier-style rigidity).  

---

## Risks
- **Tool disagreement across boundaries:** Mitigated by strict inner-language precedence.  
- **Diff churn when swapping tools:** Mitigated by pinned versions and canonical test fixtures.  
- **Plugin sprawl/style drift:** Mitigated by strong plugin ecosystems and per-tool configs.  

---

## Out of Scope
- Languages beyond the six listed.  
- Semantic linting or refactoring beyond formatting.  
- IDE/editor integration (not required).
