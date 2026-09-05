# Performance & Memory Optimization

## High-DPI Canvas Rendering
Rendering certificates at 300 DPI produces canvas dimensions of **3508 × 2480 pixels** (~8.7 megapixels per certificate).

### Strategies Implemented:
1. **CSS Scaling for Thumbnails**: Template previews use CSS `transform: scale()` with GPU composition (`will-change: transform`), avoiding repeated offscreen canvas allocations.
2. **Garbage Collection Optimization**: Bitmap objects created during bulk export are explicitly disposed after ZIP streaming.
3. **Font Subsetting**: System and Google Fonts are cached in memory to eliminate re-fetching during rapid multi-page exports.
