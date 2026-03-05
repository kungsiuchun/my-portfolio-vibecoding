# Agent Guidelines (SnakeGame / Tailwind / React)

## Tailwind grid
- Avoid `grid-cols-20` unless Tailwind config adds it (default configs may not generate >12).
- Preferred: set grid columns explicitly:
  `style={{ gridTemplateColumns: \`repeat(${GRID_SIZE}, minmax(0, 1fr))\` }}`

## Snake movement invariant
- Each tick: add head; if not eating, pop exactly one tail segment.
- Never “remove tail twice” (e.g., using `slice(0,-1)` and also `pop()`).

## Intervals in React
- For setInterval loops: use refs or functional state updates to avoid stale closures.