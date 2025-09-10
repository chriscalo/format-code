# Markdown Embedding Support

Implement remark plugin to format code blocks and raw HTML within Markdown.

**PROOF REQUIRED**: See [POC Requirements](../poc-requirements.md) - all plugin implementation must produce running code with tests.

## Tool Usage Guidelines (IMPORTANT for YOLO mode)
**Prefer native tools over bash commands** to minimize approval prompts:
- Use `Write` tool to create plugin files and test documents
- Use `Read` tool to verify formatted output
- Use `Edit` or `MultiEdit` tools for plugin code changes
- Use npm scripts from package.json when available
- Only use Bash for running tests and npm commands

## Workspace
Create `workspace/06-markdown-embedding/` for:
- `plugins/remark-format-code-blocks.js` implementation
- Markdown test files with various code block scenarios
- Triple-embedding test cases (markdown → HTML → JS/CSS)

## Context
- Line length: 80 characters
- Indentation: 2 spaces  
- Markdown processing: remark-parse → code-block delegation → remark-stringify
- Handle fenced code blocks, inline code, and raw HTML blocks

## Implementation Tasks

### Remark Plugin Development
- [ ] Create `plugins/remark-format-code-blocks.js`
- [ ] Parse Markdown with remark to find code blocks and HTML blocks
- [ ] Map language identifiers to formatters (js→javascript, py→python, etc.)
- [ ] Extract code content while preserving fence style and info strings
- [ ] Integrate with context preservation for nested scenarios (lists, quotes)

### Code Block Processing
- [ ] Handle fenced code blocks with language detection
- [ ] Process inline code blocks (decide: format or preserve?)
- [ ] Handle indented code blocks (typically preserve as-is)
- [ ] Route to appropriate language formatter
- [ ] Preserve fence characters (```, ~~~) and info strings

### Raw HTML Block Processing
- [ ] Detect raw HTML blocks in Markdown
- [ ] Route HTML content through rehype pipeline
- [ ] Handle HTML blocks that may contain script/style (delegation chain)
- [ ] Preserve HTML block boundaries and structure

### Host Markdown Normalization
- [ ] Apply remark-stringify with conservative options
- [ ] Preserve code block fences and avoid unwanted transformations
- [ ] Maintain list indentation and quote block structure
- [ ] Ensure consistent Markdown formatting without affecting code content

## Test Cases

### Basic Fenced Code Blocks
````markdown
# Example

```javascript
const message='Hello World';console.log(message);
```

```css
body{margin:0;padding:10px}
```
````
- [ ] Format JavaScript with double quotes and semicolons
- [ ] Format CSS with proper spacing and property ordering
- [ ] Preserve markdown structure and fence style

### Nested in Lists
````markdown
1. First item with code:
   ```javascript
   function test() {
     return 'formatted';  
   }
   ```

2. Second item with different language:
   ```python
   def hello():
       return "world"
   ```
````
- [ ] Detect 3-space list indentation offset
- [ ] Compute effective width: max(40, 80-3) = 77
- [ ] Format code with appropriate indentation context
- [ ] Preserve list structure and numbering

### Raw HTML Blocks
````markdown
# HTML Content

<div class="example">
  <script>
  const x = 1;
  console.log(x);
  </script>
  <style>
  .example{background:#fff;margin:10px}
  </style>
</div>

Back to markdown content.
````
- [ ] Process HTML block through rehype pipeline
- [ ] Format embedded script/style within the HTML
- [ ] Maintain separation between HTML block and markdown content
- [ ] Handle the delegation chain: markdown → HTML → JavaScript/CSS

### Complex Nesting Scenarios
````markdown
> Quote with code:
> 
> ```javascript
> function nested() {
>   return 'deep';
> }
> ```
> 
> And some HTML:
> 
> <script>
> const quoted = true;
> </script>
````
- [ ] Handle quote block indentation (2-space offset for `> `)
- [ ] Process both fenced code and raw HTML within quotes
- [ ] Maintain quote formatting while processing embedded content

### Language Mapping
- [ ] `js`, `javascript` → JavaScript formatter
- [ ] `css`, `scss` → CSS formatter  
- [ ] `html` → HTML formatter (with potential further embedding)
- [ ] `yaml`, `yml` → YAML formatter
- [ ] `json` → JSON formatter
- [ ] `python`, `py` → Python formatter
- [ ] Unknown languages → preserve as-is

### Edge Cases
- [ ] Empty code blocks (preserve structure)
- [ ] Code blocks without language specification
- [ ] Mixed fence types (``` vs ~~~) - preserve original
- [ ] Code blocks with unusual info strings
- [ ] Malformed code within blocks (preserve original, log error)
- [ ] Very deeply nested code (lists within quotes, etc.)

## Integration Testing
- [ ] Test with complex markdown documents containing multiple embedding levels
- [ ] Verify markdown host formatting doesn't break code blocks
- [ ] Test round-trip stability (format twice → identical results)
- [ ] Test performance with large markdown files containing many code blocks
- [ ] Verify effective width calculation for deeply nested scenarios

## Triple-Embedding Scenario
````markdown
# Triple Embedding Test

```html
<div class="example">
  <script>
  function triple() {
    const nested = {
      deep: true,
      level: 'three'
    };
    return nested;
  }
  </script>
</div>
```
````
- [ ] Markdown processes fenced HTML block
- [ ] HTML processor finds script block
- [ ] JavaScript formatter handles the actual code
- [ ] Context preservation works through all three levels
- [ ] Final result maintains all proper indentation

## Minimum Success Criteria

**Task is complete when:**
1. ✅ remark plugin for code block formatting works for 5+ languages
2. ✅ Basic nesting test passes (markdown with HTML with JS)
3. ✅ Plugin integrates with orchestrator

## Full Success Criteria  
- Code blocks format identically to standalone files of same language
- Markdown structure preservation (lists, quotes, headers)
- Proper handling of delegation chains (markdown → HTML → JavaScript/CSS)
- No data loss during complex nesting scenarios
- Consistent fence and info string preservation

## Documentation Requirements
- Document the remark plugin architecture and AST manipulation
- Record language mapping decisions and extension points
- Note any markdown syntax that causes issues
- Document the triple-embedding processing flow
- Record performance considerations for large documents