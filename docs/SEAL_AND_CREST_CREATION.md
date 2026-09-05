# Vector Foil Seal & Crest Design

## Geometry Formulation
Embossed vector seals use trigonometric circular distribution:
```typescript
const angle = (i * Math.PI * 2) / totalTeeth;
const x = cx + radius * Math.cos(angle);
const y = cy + radius * Math.sin(angle);
```

## Upright Arc Typography
To ensure lower curved text is readable from left-to-right rather than upside down, CMAKER dynamically flips the bottom arc path direction (`sweep-flag = 0`).
