# Technical Requirements

- stdin/stdout interface preferred for all formatters
- Embedding parity: byte-for-byte identical formatting (embedded vs standalone)
- Context preservation: effective width = max(40, maxWidth - indentOffset)
- Parse failure handling: system must work with malformed input
- Performance: investigate streaming vs buffering approaches
