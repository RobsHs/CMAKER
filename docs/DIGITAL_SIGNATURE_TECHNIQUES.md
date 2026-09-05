# Digital Signature Processing Pipeline

CMAKER integrates two signature generation workflows:

## 1. Interactive Natural Ink Canvas
- Utilizes cubic Bezier curve interpolation between pointer capture points to eliminate polygonal jaggedness.
- Pressure simulation dynamically adjusts stroke width based on velocity.

## 2. Paper Signature Photo Transparentizer
- Scans uploaded bitmap images pixel-by-pixel.
- Evaluates luminance: `Y = 0.299R + 0.587G + 0.114B`.
- Applies progressive alpha thresholding to convert paper grain to 100% transparency while preserving deep blue/black ink.
