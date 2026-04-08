# TLOU Interactive Guide — Architecture & Design Specs

> Reference document for detailed architecture, data model, UI/UX requirements, and constraints.
> The agent should read this file when working on tasks that need architectural or design context.

## Architecture

### Routing
```
/#/              → CollectiblesView (enhanced current view)
/#/trophies      → TrophyView (new)
```

HashRouter wraps the app in `main.tsx`. A floating action button provides navigation. A `public/404.html` redirect handles direct URL navigation on GitHub Pages.

### TypeScript Config Changes
- Add `"resolveJsonModule": true` to `tsconfig.app.json` compilerOptions
- Move `TLOU_REMASTERED_TROPHIES.json` into `src/` so it's within the `"include": ["src"]` scope
- Vite handles JSON imports natively — use `import trophyJson from './TLOU_REMASTERED_TROPHIES.json'`

### File Structure
```
src/
├── main.tsx                        (modified — HashRouter)
├── App.tsx                         (modified — router shell, difficulty context, user settings)
├── App.css                         (modified — shared styles, difficulty themes)
├── index.css                       (modified — add difficulty CSS custom property variants)
├── views/
│   ├── CollectiblesView.tsx        (new — extracted + enhanced from current App.tsx)
│   ├── CollectiblesView.css        (new — collectibles-specific styles)
│   └── TrophyView.tsx              (new — trophy guide view)
├── components/
│   ├── FloatingNav.tsx             (new — floating action button navigation)
│   ├── TrophyCard.tsx              (new — trophy card with flip/tilt/expand)
│   ├── TrophyRoadmap.tsx           (new — interactive 5-stage roadmap)
│   ├── TrophyProgress.tsx          (new — progress bar + rarity breakdown)
│   ├── TrophyFilters.tsx           (new — tag filters + DLC toggles + search)
│   ├── Confetti.tsx                (new — confetti particle effect)
│   ├── ResetDialog.tsx             (new — confirmation dialog for reset)
│   ├── NoteEditor.tsx              (new — add/edit personal notes popup)
│   ├── ExportModal.tsx             (new — markdown export/share modal)
│   ├── NameEntry.tsx               (new — username input for personalization)
│   └── DifficultySelector.tsx      (new — 6-difficulty theme switcher)
├── styles/
│   ├── trophy-view.css             (new)
│   ├── trophy-card.css             (new)
│   ├── trophy-roadmap.css          (new)
│   ├── moss-effect.css             (new)
│   ├── difficulty-themes.css       (new — 6 difficulty color/texture variants)
│   └── floating-nav.css            (new)
├── data.ts                         (modified — add titles to unnamed items)
├── trophyData.ts                   (new — typed trophy data)
└── utils/
    ├── haptics.ts                  (new — vibration/feedback utilities)
    └── exportMarkdown.ts           (new — markdown generation from progress state)
```

### Data Model

**IMPORTANT:** The JSON source (`TLOU_REMASTERED_TROPHIES.json`) uses **snake_case** fields (`story_related`, `online_required`). The TypeScript interfaces use **camelCase**. `trophyData.ts` must include a mapping/transformation layer that converts snake_case JSON to camelCase TypeScript at import time.

```typescript
// --- Trophy Types ---
type TrophyType = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

interface Trophy {
  id: number;
  name: string;
  type: TrophyType;
  description: string;
  missable: boolean;
  storyRelated: boolean;     // JSON: story_related
  onlineRequired: boolean;   // JSON: online_required
  tags: string[];
  guide: string;
}

interface TrophySection {
  sectionName: string;
  dlcName?: string;
  trophyCount: { platinum?: number; gold?: number; silver?: number; bronze?: number };
  estimatedDifficulty?: string;
  estimatedTime?: string;
  note?: string;
  trophies: Trophy[];
}

interface RoadmapStage {
  stage: number;
  title: string;
  description: string;
  exploitNote?: string;
  trophiesAvailable: string[];
}

// --- Shared Types ---
type Difficulty = 'easy' | 'normal' | 'hard' | 'survivor' | 'grounded' | 'grounded-plus';

interface UserSettings {
  username: string;             // localStorage 'tlou-username'
  difficulty: Difficulty;       // localStorage 'tlou-difficulty'
}

interface UserNote {
  targetType: 'chapter' | 'section' | 'item' | 'trophy';
  targetId: string;
  text: string;
  updatedAt: string;            // ISO timestamp
}

// --- localStorage Keys ---
// 'tlou-checked'           → Record<string, boolean>    (collectible progress)
// 'tlou-trophies'          → Record<number, boolean>    (trophy progress)
// 'tlou-trophy-dlc-filters'→ Record<string, boolean>    (DLC toggle state)
// 'tlou-username'          → string                      (personalization)
// 'tlou-difficulty'        → Difficulty                   (theme selection)
// 'tlou-notes'             → UserNote[]                   (personal notes)
```

## UI/UX Requirements

### Visual Theme
- **PlayStation trophy case** aesthetic: metallic sheen on rarity badges, glass/acrylic card surfaces, trophy icon glow effects
- **Blended with TLOU world**: dark green remains primary color. Concrete textures, overgrown moss/greenery. Cards look normal at rest but gain a glass weight/look on interaction
- **Earned trophies**: golden shimmer, bright. **Unearned**: dimmed, muted, locked
- **Rarity badge colors**: Platinum (iridescent/rainbow), Gold (#FFD700), Silver (#C0C0C0), Bronze (#CD7F32) — all metallic gradients
- Consistent with existing theme: `--bg-deep`, `--accent`, Special Elite + Source Sans 3 fonts

### Difficulty-Driven Theming
- **Easy**: Warm greens, softer shadows, lighter feel
- **Normal**: Default theme (current dark green)
- **Hard**: Deeper shadows, amber accent tint layered on green
- **Survivor**: Muted, desaturated, grittier texture
- **Grounded**: Near-black, red accent layered on green, heavy grain
- **Grounded+**: Darkest, crimson highlights, maximum decay/moss
- Dark green is ALWAYS the primary base color — difficulties add layers, not replace

### Card Interactions
1. **Card flip**: Click dedicated flip button -> 180 deg CSS 3D transform. Front = info. Back = tips/guide/strategy
2. **3D tilt on hover**: Card tilts toward mouse cursor. Max ~8 deg. Glass glare follows cursor. Disabled on touch via `@media (hover: hover)`
3. **Expand/collapse**: Expand button -> full-detail overlay with `backdrop-filter: blur(8px)`. Close via X/Escape/backdrop. Includes "Add Note" button
4. **Confetti**: Particle burst on check. Bronze/Silver=small, Gold=large(gold-colored), Platinum=extra-large(rainbow)
5. **Haptic feedback**: Mobile vibration via `navigator.vibrate()` on item interactions. Desktop: visual ripple/pulse effect

### Interactive Moss/Greenery
- Decorative moss/vine/leaf elements around section headers, card edges, page borders
- Elements respond to mouse movement (subtle parallax shift, gentle sway)
- Greenery colors: muted greens (#2d5a27, #3a7a35, #1a3d15)
- Moss density increases with difficulty level

### Navigation — Floating Action Button (FAB)
- **Mobile portrait**: Small circular FAB, accessible position (not buried in a far corner), expands on tap to show view links
- **Landscape/Desktop**: Larger FAB (proportional to screen %), activates on hover/tap/long-press, shows labels on hover
- **NOT**: sidebar, drawer, top-nav bar on mobile. **NOT**: bottom bar, swipe gesture on desktop
- Must be accessible regardless of screen size — always reachable

### Layout Variants
- **Landscape/Desktop (>1024px)**: Card grid (3-4 cols). Progress bar morphs into circle/pie/donut display positioned to the right side. Roadmap as horizontal timeline. Larger FAB with labels
- **Mobile/Portrait (<=600px)**: Single column cards. Keep top progress bar (improved styling). Vertical roadmap. Compact FAB. Horizontal-scroll tag filters
- **Tablet (601-1024px)**: 2-column grid. Stacked roadmap. Medium FAB

### Completed Items — Readability
- Checked collectible items: description text remains fully readable (NO strikethrough on small description text)
- Visual differentiation via checkbox state, subtle background change, or opacity shift — NOT text decoration

## Constraints & Assumptions

- **No new CSS frameworks** — extend existing vanilla CSS approach
- **No state management libraries** — React hooks + localStorage sufficient
- **Bun** is the package manager
- **HashRouter** for GitHub Pages compatibility
- Existing collectibles tracker must continue to work after refactoring
- All content from external sources must be attributed
- **Performance budget**: `backdrop-filter: blur()` is expensive — limit to one overlay at a time. Use `will-change` conservatively. Limit confetti particles on mobile. Moss parallax is desktop-only
- **Accessibility**: Add `@media (prefers-reduced-motion: reduce)` to disable/simplify ALL animations
- **Markdown export**: Use `URL.createObjectURL(new Blob([markdownString], { type: 'text/markdown' }))` to create download link. Trigger via hidden `<a>` with `download` attribute. No server needed
- **`navigator.vibrate()`** is NOT supported on iOS Safari — desktop uses visual ripple fallback
- **Component size limit**: No single `.tsx` or `.css` file should exceed ~300 lines
- **Deploy after each task**: Commit, run `bun run deploy`, verify at `alltheponies.xyz`

## Success Criteria

1. All 50 trophies displayed with accurate data
2. All ~100 unnamed collectible items have unique location-based titles
3. DLC sections toggleable (Left Behind on by default)
4. Checkbox progress tracked and persisted (both views)
5. All card interactions working (flip, tilt, expand, confetti, haptic)
6. Interactive roadmap with 5 stages
7. Multi-select tag filters with completion counters
8. Text search by name/tags functional
9. 6 difficulty themes working with dark green as primary
10. Personal notes addable to any item/section/chapter, persisted, exportable
11. Markdown export with personalized name, progress summary, user notes
12. FAB navigation working on all screen sizes
13. Landscape: progress morphs to circle/pie. Mobile: improved top bar
14. Reset requires confirmation dialog
15. Attribution visible on site and GitHub
16. Responsive on mobile (320-600px), tablet (601-1024px), desktop (1025px+)
17. Existing collectibles view fully functional (no regressions)
18. Deployed to `alltheponies.xyz` via GitHub Pages
19. No TypeScript errors, ESLint clean
