# JavaScript Formatter POC

A JavaScript code formatter using ESLint + js-beautify integration.

## Overview

This formatter combines two tools:
- **js-beautify**: Handles structural formatting (indentation, line breaks, spacing)
- **ESLint v9**: Enforces style rules (quotes, semicolons, trailing commas)

## Usage

### Command Line
```bash
echo 'const obj={a:1,b:2}' | node format-js.js
# Output: const obj = { a: 1, b: 2 };

cat input.js | node format-js.js > formatted.js
```

### NPM Scripts
```bash
# Format code
npm run format < input.js > output.js

# Run tests
npm test
```

## Features

- **Double quotes** for strings
- **Semicolons** on all statements  
- **Trailing commas** in multiline objects/arrays
- **2-space indentation**
- **80-character line width**
- **Proper object/array spacing**
- **Space before blocks** and around operators
- **Idempotent** formatting (same result when run multiple times)

## Configuration

### js-beautify Options
- `indent_size: 2` - 2-space indentation
- `wrap_line_length: 80` - 80-character line limit
- `brace_style: 'collapse'` - Compact brace formatting
- `space_before_conditional: true` - Space after `if`, `while`, etc.

### ESLint Rules  
- `quotes: ['error', 'double']` - Enforce double quotes
- `semi: ['error', 'always']` - Require semicolons
- `comma-dangle: ['error', 'always-multiline']` - Trailing commas

## ESLint Formatting Deprecation Workaround

ESLint deprecated formatting rules in 2023 to focus on code quality detection. This implementation works around this by:

1. Using **js-beautify** for primary formatting (structural changes)
2. Using **ESLint's remaining style rules** for quote/semicolon enforcement
3. **Special handling** for edge cases like simple vs. complex object formatting

This hybrid approach provides comprehensive JavaScript formatting while respecting ESLint's new focus.

## Test Results

All 15 tests pass:

- ✅ Main integration test (input.js → expected.js formatting)
- ✅ Style guide compliance (quotes, semicolons, commas, indentation)
- ✅ Spacing rules (objects, arrays, blocks, operators)  
- ✅ Edge cases (empty input, malformed code, idempotency)
- ✅ Code constructs (functions, classes, complex objects)

## Technical Implementation

The formatter processes input in two stages:

1. **js-beautify stage**: Applies structural formatting
2. **ESLint stage**: Applies style rule fixes

Special logic handles simple objects (`{a:1,b:2}` → `{ a: 1, b: 2 }`) while keeping complex objects multiline for readability.