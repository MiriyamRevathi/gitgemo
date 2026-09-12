# Implement incremental blame chunk caching

Avoid full file re-blame by reusing unmodified chunk allocations.


## Verification
- Verify blame cache invalidation on modified chunks
