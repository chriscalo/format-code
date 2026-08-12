# Markdown Formatting Test

This document contains various formatting inconsistencies that need to be cleaned up.

## Lists with Mixed Bullet Styles

- First item using asterisk

* Second item using plus

- Third item using dash
  - Nested item with asterisk
  * Another nested with plus
    - Deeply nested with dash

## Code Blocks with Inconsistent Fencing

Here's some JavaScript with tildes:

```javascript
function hello() {
    console.log("Hello world!");
}
```

And here's some Python with backticks:

```python
def greet():
    print("Hello world!")
```

Sometimes we have unfenced code blocks:

```
function legacy() {
    return "old style";
}
```

## Emphasis with Mixed Markers

This text has *italic text with asterisks* and *italic text with underscores*. It also has **bold text with double asterisks** and **bold text with double underscores**.

Some text with ***bold italic with asterisks*** and ***bold italic with underscores***.

## Long Lines That Need Wrapping

This is a very long line that exceeds the 80-character limit and should be wrapped properly to maintain readability and conform to our style guide requirements.

Here's another extremely long line with lots of text that goes way beyond the 80-character limit and demonstrates the need for proper line wrapping in markdown documents to maintain consistency and readability.

## Mixed Formatting Issues

1. Ordered list item one
2. Ordered list item two with a very long description that should wrap properly at 80 characters
3. Ordered list item three

- Unordered after ordered

* Mixed bullet again

- Different bullet style

Here's a horizontal rule with asterisks:

---

And one with dashes:

---

And one with underscores:

---

## Table Example

| Column 1|Column 2   |  Column 3|
|---|:---:|---:|
|Left|Center|Right|
|More data|More center|More right|

## Links and References

[Link with title](https://example.com "Example Title")
[Link without title](https://example.com)

Reference links work too [reference link][ref1].

[ref1]: https://example.com "Reference"
