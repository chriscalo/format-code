# Design Validation Tasks

## Overview
This directory contains autonomous design validation tasks for the Code Formatting Orchestrator design. Each task is split into a separate file for focused context management.

**CRITICAL: Document everything as you go.** Add your findings directly to the task file you're working on. Save any authored source code (config files, plugins, test scripts) as code blocks in the task file for reuse later. The point is not just to validate that things work, but to create a comprehensive record of findings and implementation decisions.

## For Agents

**To claim and work on the next available task:**

1. **Find next available task** in the status section below
2. **Claim task**: Update your task status to working  
3. **Do the work**: Read the task file and complete all requirements
4. **Mark complete**: Update status to done

Tasks must be completed in dependency order. Multiple agents can work simultaneously on tasks that don't depend on each other.

---

## All Tasks

```yaml
01-tool-research:
  status: ready
  dependencies: []

02-stdio-validation:
  status: waiting
  dependencies: [01-tool-research]

03-basic-orchestrator:
  status: waiting
  dependencies: [02-stdio-validation]

04-context-preservation:
  status: waiting
  dependencies: [03-basic-orchestrator]

05-html-embedding:
  status: waiting
  dependencies: [04-context-preservation]

06-markdown-embedding:
  status: waiting
  dependencies: [04-context-preservation]

07-parity-validation:
  status: waiting
  dependencies: [05-html-embedding, 06-markdown-embedding]

08-integration-testing:
  status: waiting
  dependencies: [07-parity-validation]
```

---

## Status Schema

- `ready` - Available to work on (all dependencies completed)
- `working` - Currently being worked on by an agent
- `done` - Task completed successfully
- `waiting` - Cannot start (dependencies not completed)

## How to Update Status

When you start a task:
```yaml
01-tool-research:
  status: working
```

When you complete a task:
```yaml
01-tool-research:
  status: done
```


## Shared Context

Each task file links to the context it needs:
- **Style Guide**: [STYLE_GUIDE.md](../../STYLE_GUIDE.md)
- **Project Context**: [specs/project-context.md](../project-context.md)  
- **Technical Requirements**: [specs/technical-requirements.md](../technical-requirements.md)
