# Code Formatting Orchestrator — Overview

## What this is
A **multi-tool orchestrator framework** for formatting code, designed to handle **languages within other languages** (HTML, CSS, JavaScript, YAML, Markdown, JSON).  

- The orchestrator provides the **framework for embedding awareness**: detecting regions, delegating to inner tools, enforcing host constraints, and reinserting content.  
- Each language is formatted by the **best-in-class tool for that language**, chosen for its configurability and plugin ecosystem.  
- Both the orchestrator and each per-language tool must be **highly configurable through plugin architectures**, with the goal of leveraging a rich existing ecosystem so very few custom plugins need to be written.

## Why it matters
- Ensures **readability and consistency** across a heterogeneous codebase.  
- Supports **fine-grained, language-specific rules** while composing them seamlessly in mixed-language files.  
- Enables long-term flexibility through **plugin-driven extensibility**.  
- Provides **deterministic, idempotent formatting** integrated into everyday workflows.

## Scope
- Languages: **HTML, CSS, JS, YAML, Markdown, JSON**  
- Embeddings:  
  - HTML: `<style>` and `<script>` blocks  
  - Markdown: fenced & inline code for JS/HTML/CSS/YAML/JSON, plus raw HTML blocks  
- Orchestration:  
  - Detect embedded regions.  
  - Delegate to the correct inner formatter.  
  - Impose outer context constraints (line length, indentation).  
  - Reinstate the formatted block seamlessly.  
- Distribution: Node-first CLI, runnable via `npm run …`

## Non-Goals
- “Check-only” mode — the orchestrator always applies formatting.  
- A monolithic formatter — this is **explicitly a multi-tool solution**.  
- Rigid one-style approach — the system prioritizes **configurability**.  

## Design principles
- **Framework + tools:** Orchestrator handles embedding; language-specific tools handle formatting.  
- **Plugin architectures everywhere:** Both orchestrator and tools must be extensible, with rich plugin ecosystems.  
- **Embedding parity:** Any language must format identically when standalone or embedded.  
- **Inner tool ignorance:** Inner formatter runs as if standalone, unaware of host context.  
- **Outer context enforcement:** Orchestrator adjusts line length and uniformly applies indentation when reinserting.  
- **Boundary discipline:** Outer formatter normalizes only boundaries, not inner content.  
- **Determinism:** Same inputs always yield the same outputs.  

## CLI commands (npm scripts)
- `npm run format` — format the entire repository  
- `npm run format:js`  
- `npm run format:html`  
- `npm run format:md`  
- `npm run format:css`  
- `npm run format:yaml`  
- `npm run format:json`  

## Success outcomes
- One-command formatting that is deterministic and idempotent.  
- Embedded content formats **byte-for-byte identical** to standalone files.  
- Rich plugin ecosystem: most needs met by existing plugins; writing a new one is rare and easy.  

## Risks & mitigations
- **Tool disagreement:** resolved by strict **inner-language precedence** for embedded regions.  
- **Diff churn:** minimized by pinned versions and local previews.  
- **Plugin sprawl:** managed via per-tool configs, version pinning, and canonical output tests.  

## Assumptions
- Node environment available (CLI via `npx`/`npm run`).  
- Sub-tool versions can be pinned for reproducibility.  
- Separate configs per tool are acceptable.  

## Out of scope
- Languages beyond the six listed.  
- Linting or semantic transforms beyond pure formatting.  
- IDE/editor integration.
