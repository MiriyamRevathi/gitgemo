# Use typed arrays for syntax token storage to reduce garbage collection

Minimize V8 garbage collection pauses when processing large source files.


## Verification
- Benchmark memory footprint during parsing of large code files
