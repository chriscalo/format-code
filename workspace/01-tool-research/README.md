# Tool Research POCs

This directory contains Proof of Concept implementations for each formatting tool researched in task 01.

## Structure

Each language has its own folder following the convention:
- `[lang]/format-[lang].js` - Formatter implementation  
- `[lang]/format-[lang].test.js` - Test suite
- `[lang]/input.[ext]` - Test input
- `[lang]/expected.[ext]` - Expected output
- `[lang]/README.md` - Usage and results

## Languages Implemented

- `yaml/` - YAML formatter using js-yaml (❌ **Comment preservation limitation**)