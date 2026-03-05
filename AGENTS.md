# AGENTS.md

## Code Review Sub-Agent

Load skill: `/react-code-review`

Usage:
```
Task(description="Review React code", prompt="Review src/components/ThemeToggle.jsx", subagent_type="explore")
```

Model: MiniMax M2.5 Free (opencode/minimax-m2.5-free)
- Read-only analysis
- Focus: React patterns, hooks, performance, best practices

Details: [Copilot](./.github/copilot-instructions.md)

---

Also follow: [soul.md](./soul.md)

## Project
React + Vite + Tailwind portfolio. Blog, stock charts, GitHub stats, site analytics.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Build (dist folder, copies index.html to 404.html) |
| `npm run preview` | Preview build |
| `npm run deploy` | GitHub Pages |

## Structure

```
src/
├── components/       # PascalCase
│   ├── ThemeToggle.jsx
│   ├── StockDashboard.jsx
│   ├── GithubStats.jsx
│   └── ...
├── pages/           # Home, BlogList, PostDetail, About
├── data/            # posts.js
├── App.jsx          # Routing
└── main.jsx         # Entry
```

## Code Rules

### Naming
- Components: PascalCase (`ThemeToggle.jsx`)
- Utils: camelCase
- Tailwind classes: kebab-case

### Imports
```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Papa from 'papaparse';
```

### Component Pattern
```jsx
import React, { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';

const ComponentName = () => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // side effects
    return () => cleanup;
  }, []);

  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Tailwind
- `dark:` for dark mode
- `transition-colors duration-500` for theme transitions
- Colors: `slate-*`, `rose-*`, `sky-*`, `indigo-*`
- Dark bg: `bg-slate-950`, Light bg: `bg-white`

### Dark Mode
- Tailwind `darkMode: 'class'`
- Toggle adds/removes `dark` class on `document.documentElement`
- Persist in `localStorage`

### Routing
- `react-router-dom` v6 with `Routes` and `Route`
- `BrowserRouter` with `basename="/my-portfolio-vibecoding"`
- Use `Link` for navigation

### Error Handling
- Check undefined in charts: `if (x === undefined) return null`
- Optional chaining: `payload?.[0]?.payload`
- Parse floats: `parseFloat(row.value)`

### Data Fetching
- `useEffect` for side effects
- Cleanup in return
- Handle loading/error states

### TypeScript
- Not configured
- Use `.tsx` and proper types if added

## Common Patterns

```jsx
{condition && <Component />}
{condition ? <True /> : <False />}
{data.map(item => (<div key={item.id}>...</div>))}
<div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-500">
```

## Dependencies

| Package | Purpose |
|---------|---------|
| react, react-dom | UI |
| react-router-dom | Routing |
| recharts | Charts |
| papaparse | CSV |
| lucide-react | Icons |
| react-markdown | Blog |
| @giscus/react | Comments |
| tailwindcss | Styling |

## Deployment
- GitHub Pages via `gh-pages`
- Base: `/my-portfolio-vibecoding/`
- Output: `dist/`

## SnakeGame
- No `grid-cols-20` unless extended
- Inline: `gridTemplateColumns: repeat(GRID_SIZE, minmax(0,1fr))`
- Snake: length constant unless eating, never remove tail twice
- Timers: refs + functional updates

## File Operations
- Don't claim file creation unless Write or Edit tool was used.
- Write files directly to disk.
- Windows: PowerShell-compatible commands only.
- Verify file existence after writing.
