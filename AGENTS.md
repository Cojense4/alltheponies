# AGENTS.md — Coding Guidelines for AI Agents

> Target: React 19 + TypeScript + Vite project using bun

---

## Build, Lint & Test Commands

```bash
# Development server
bun run dev              # Start Vite dev server

# Build
bun run build            # Full production build (runs tsc + vite build)
bun run preview          # Preview production build locally

# Linting
bun run lint             # Run ESLint on all files
bun run lint -- --fix    # Auto-fix ESLint issues

# Deploy
bun run deploy           # Deploy to production
```

**Note:** No test runner is configured yet. Add one (Vitest recommended) if tests are needed.

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** — no implicit any, strict null checks, etc.
- Target: **ES2022** (app), **ES2023** (node config)
- Module: **ESNext** with bundler resolution
- Use **explicit types** for function parameters and return values
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types

### Imports

```typescript
// React imports first
import { useState, useEffect } from 'react';

// Third-party libraries
import { someLibrary } from 'some-library';

// Absolute imports from project root (@/ aliases)
import { Component } from '@/components/Component';

// Relative imports
import { helper } from './utils/helper';

// CSS/SCSS imports last
import './styles.css';
```

### Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Functions | camelCase | `fetchUserData()` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `UserProfileProps` |
| Enums | PascalCase | `UserStatus` |
| Files | PascalCase (components), camelCase (utils) | `Button.tsx`, `formatDate.ts` |
| Hooks | camelCase with `use` prefix | `useAuth()` |
| CSS modules | camelCase | `styles.module.css` |

### React Patterns

- Use **functional components** with hooks
- Prefer **destructuring** props in function parameters
- Use `React.FC` sparingly; explicit return types preferred
- Keep components focused (single responsibility)
- Extract reusable logic into custom hooks in `src/hooks/`

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### Error Handling

- Always handle promise rejections with `.catch()` or try/catch
- Use early returns to reduce nesting
- Log errors with context before re-throwing

```typescript
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for caller to handle
  }
}
```

### File Organization

```
src/
├── components/        # React components (create if needed)
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   └── index.ts       # Barrel exports
├── hooks/             # Custom React hooks (create if needed)
│   ├── useAuth.ts
│   └── index.ts
├── types/             # Global TypeScript types (create if needed)
│   └── index.ts
├── utils/             # Utility functions (create if needed)
│   └── helpers.ts
├── assets/            # Static assets imported by components
├── App.tsx
├── main.tsx
└── index.css
```

### ESLint Rules

- Flat config in `eslint.config.js`
- Uses recommended TypeScript, React Hooks, and React Refresh rules
- EcmaVersion 2020 with browser globals
- Ignores `dist/` directory

### Git

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`
- Keep commits atomic and focused
- Write descriptive commit messages explaining "why" not "what"

---

## AI Agent Instructions

When modifying this codebase:

1. **Check for existing patterns** — follow the style of nearby code
2. **Run `bun run lint`** before finishing
3. **Verify build passes** with `bun run build`
4. **Use explicit types** — no implicit any
5. **Create directories** as needed (components/, hooks/, types/, utils/)
6. **Export from index.ts** when creating new directories with multiple files
7. **Never suppress TypeScript errors** with `@ts-ignore` or `as any`
8. **Match existing indentation** (2 spaces based on current files)
