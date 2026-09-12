# Ensure proper detachment of event listeners on view transitions

Eliminate lingering event handlers during rapid view navigation.


## Verification
- Add memory leak assertions for graph event dispatchers
