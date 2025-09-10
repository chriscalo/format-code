# Project Context

## Ecosystem Preferences

**Primary Ecosystem**: npm/JavaScript - prefer Node.js-based tools when possible
**Forbidden Tools**: Prettier (explicitly banned from this project)
**Requirements Philosophy**: Tools don't need to be language-specific if general tools can meet formatting requirements

## Target Languages and Tools

Based on completed research (task 01-tool-research):

- **HTML**: rehype + rehype-format (✅ validated)
- **JavaScript**: ESLint + js-beautify (✅ validated, despite ESLint formatting rule deprecation)
- **CSS/SCSS**: Stylelint (✅ validated) 
- **Markdown**: remark + remark-stringify (✅ validated)
- **YAML**: js-yaml (custom CLI wrapper approach - no existing tool perfectly matches style guide)
- **JSON/JSONC**: ESLint + @eslint/json (✅ validated, 2024 official plugin)
- **Python**: ruff (✅ validated, with black as fallback if extensibility needed)

## Key Constraints for Agents

1. **Always check this file first** before making tool recommendations
2. **Never suggest Prettier** - it is forbidden  
3. **Prefer npm ecosystem** unless requirements cannot be met
4. **Understand the actual need** - don't assume language-specific formatters are required
