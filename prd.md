# The Last of Us Remastered - Interactive Guide — PRD

## Overview

Transform the existing TLOU Collectibles Tracker into a **comprehensive interactive guide** with two views: an enhanced **Collectibles Tracker** and a new **PlayStation Trophy Guide & Tracker**. Both views feature premium UI with PlayStation trophy case aesthetics blended with the game's post-apocalyptic visual language — interactive cards, 3D effects, haptic feedback, difficulty-driven theming, and a markdown export/share system.

**Sources:**
- https://www.playstationtrophies.org/game/the-last-of-us-remastered/guide/
- https://psnprofiles.com/guide/6004-the-last-of-us-remastered-trophy-guide
- Trophy data extracted to `TLOU_REMASTERED_TROPHIES.json`
- Original collectibles guide by **Kairi** on GameFAQs: https://gamefaqs.gamespot.com/ps3/652686-the-last-of-us/faqs/67225

## Target Audience

PlayStation gamers pursuing TLOU Remastered completion — collectibles, trophies, or both. They want one beautiful, interactive page that tracks their progress, gives them tips, and lets them export/share their progress.

## Core Features

### Collectibles View Enhancements
1. **Collapsible sub-sections** — Each chapter sub-section (e.g., "20 Years Later", "Beyond The Wall") has a collapsible header with select-all toggle
2. **Multi-select tag filters** — Tags are multi-selectable (e.g., Shiv + Conversation simultaneously) for flexible filtering
3. **Tag completion counters** — Each tag filter shows completed/total count (e.g., "Shiv Doors 5/13")
4. **Reset confirmation** — Reset requires click → warning popup → confirm before data erasure
5. **Completed item readability** — Checked items stay fully readable (no strikethrough on description text)
6. **Named items** — All 100 unnamed items (FF, CONV, SHIV) get short, unique, location-based titles derived from their descriptions
7. **Haptic/force feedback** — Mobile: vibration on check/uncheck via Navigator.vibrate(). Desktop: visual pulse/ripple feedback

### Trophy View (New)
8. **Trophy Card Grid** — All 50 trophies as interactive cards organized by section (Base Game, Left Behind, Reclaimed Territories, Abandoned Territories, Grounded Mode)
9. **DLC Toggle Filter** — Left Behind on by default; other DLC packs toggleable. Excluded DLC trophies removed from progress calculations
10. **Trophy Progress Tracking** — Checkbox per trophy, localStorage persistence, progress bar with rarity breakdown (Platinum/Gold/Silver/Bronze counts + points)
11. **Interactive Roadmap** — 5-stage playthrough guide with expandable details, estimated time, exploit notes, and linked trophies per stage
12. **Premium Card Interactions** — Card flip (front/back), 3D tilt on hover, expand/collapse overlay with blur, confetti on completion
13. **Trophy Tag Filters + Search** — Multi-select filter by: Missable, Online, Story, Collectible, Buggy. Text search by trophy name and tags only (not description/guide text)

### Shared Features
14. **Difficulty Selector** — 6 difficulties (Easy → Grounded+). Changes accent colors, shadow depth, texture intensity, moss density. Dark green remains primary color across all modes
15. **Name Entry + Personalization** — Optional username stored in localStorage. Appears in header ("Sarah's Collectibles Tracker"), used in export filenames and content
16. **Markdown Export** — Export current progress as a styled markdown file following TLOU_GUIDE.md format. Includes: progress summary header, personalized name, all collectible/trophy details with checked states, user notes alongside their respective items
17. **Personal Notes** — Long-press/right-click on any chapter, section, or item → detail popup with "Add Note" button. Notes persist in localStorage and appear in exports
18. **Floating Action Button Navigation** — Minimal FAB (not sidebar/drawer/top-nav on mobile, not bottom-bar on desktop). Expands to show view links. Landscape: larger (screen % sized), activates on hover/tap/long-press. Accessible at any screen size
19. **Custom Favicon** — Elegant TLOU-themed icon replacing Vite default
20. **Attribution** — Credit all content creators (Kairi/GameFAQs for collectibles, playstationtrophies.org + psnprofiles.com for trophy data) on GitHub README and in-app footer

## Tech Stack

- **Frontend**: React 19 + TypeScript (strict) — existing stack
- **Routing**: `react-router-dom` v7 (new addition) — `HashRouter` for GitHub Pages
- **Build**: Vite 8 beta + SWC — existing
- **Styling**: Vanilla CSS with CSS custom properties — existing approach, extended
- **Package Manager**: Bun — existing
- **Deployment**: `gh-pages` to `alltheponies.xyz` — existing

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

**IMPORTANT:** The JSON source (`TLOU_REMASTERED_TROPHIES.json`) uses **snake_case** fields (`story_related`, `online_required`). The TypeScript interfaces use **camelCase**. `trophyData.ts` must include a mapping/transformation layer that converts snake_case JSON → camelCase TypeScript at import time.

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
  targetId: string;             // chapter index, section name, item id, or trophy id
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
1. **Card flip**: Click dedicated flip button → 180° CSS 3D transform. Front = info. Back = tips/guide/strategy
2. **3D tilt on hover**: Card tilts toward mouse cursor. Max ~8°. Glass glare follows cursor. Disabled on touch via `@media (hover: hover)`
3. **Expand/collapse**: Expand button → full-detail overlay with `backdrop-filter: blur(8px)`. Close via X/Escape/backdrop. Includes "Add Note" button
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
- **Mobile/Portrait (≤600px)**: Single column cards. Keep top progress bar (improved styling). Vertical roadmap. Compact FAB. Horizontal-scroll tag filters
- **Tablet (601-1024px)**: 2-column grid. Stacked roadmap. Medium FAB

### Completed Items — Readability
- Checked collectible items: description text remains fully readable (NO strikethrough on small description text)
- Visual differentiation via checkbox state, subtle background change, or opacity shift — NOT text decoration

## Data Source

Trophy data: `TLOU_REMASTERED_TROPHIES.json` (50 trophies: 24 base + 10 Left Behind + 7 Reclaimed + 7 Abandoned + 2 Grounded).

Collectibles guide format reference: `/Users/cjensen32/Downloads/TLOU_GUIDE/TLOU_GUIDE.md` — used as template for markdown export output format.

## Security Considerations

- No user authentication (static site)
- No external API calls (all data local)
- localStorage for progress, notes, settings
- No user-generated content sent externally
- Export generates local file only (no upload)

## Constraints & Assumptions

- **No new CSS frameworks** — extend existing vanilla CSS approach
- **No state management libraries** — React hooks + localStorage sufficient
- **Bun** is the package manager
- **HashRouter** for GitHub Pages compatibility
- Existing collectibles tracker must continue to work after refactoring
- All content from external sources must be attributed
- **Performance budget**: `backdrop-filter: blur()` is expensive — limit to one overlay at a time. Use `will-change` conservatively. Limit confetti particles on mobile. Moss parallax is desktop-only
- **Accessibility**: Add `@media (prefers-reduced-motion: reduce)` to disable/simplify ALL animations (card flip, tilt, confetti, moss, transitions)
- **Markdown export**: Use `URL.createObjectURL(new Blob([markdownString], { type: 'text/markdown' }))` to create download link. Trigger via hidden `<a>` with `download` attribute. No server needed
- **`navigator.vibrate()`** is NOT supported on iOS Safari — the haptic feature is Android/desktop only. Desktop uses visual ripple fallback. This is acceptable
- **Component size limit**: No single `.tsx` or `.css` file should exceed ~300 lines. Split into focused sub-components when growing large
- **Deploy after each task**: Commit, run `bun run deploy`, verify at `alltheponies.xyz` before moving to next task

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

---

## Task List

```json
[
  {
    "id": "setup-router",
    "category": "setup",
    "description": "Install react-router-dom and set up HashRouter with route structure",
    "steps": [
      "Run: bun add react-router-dom",
      "Verify types are available: import { HashRouter } from 'react-router-dom' should resolve. If not, run: bun add -d @types/react-router-dom",
      "Update src/main.tsx to wrap App in HashRouter from react-router-dom",
      "Update src/App.tsx to use Routes/Route components with / and /trophies paths",
      "Create a placeholder src/views/TrophyView.tsx that renders 'Trophy Guide coming soon'",
      "Create public/404.html with a script redirect to index.html (standard GitHub Pages SPA trick) for direct URL navigation",
      "Add a simple React error boundary component wrapping each Route to handle rendering errors gracefully",
      "Update CLAUDE.md architecture section to note that routing has been added (react-router-dom, HashRouter)",
      "Verify: bun run build succeeds, navigating to /#/ and /#/trophies shows correct views"
    ],
    "passes": false
  },
  {
    "id": "extract-collectibles",
    "category": "setup",
    "description": "Extract current collectibles tracker into its own view component",
    "steps": [
      "Create src/views/ and src/components/ directories",
      "Create src/views/CollectiblesView.tsx — move all collectibles logic from App.tsx (state, handlers, rendering)",
      "Create src/views/CollectiblesView.css — move collectibles-specific styles from App.css",
      "Keep App.tsx as router shell only (Routes, shared layout, error boundary)",
      "Use relative imports (not @/ aliases — no path alias is configured)",
      "Verify: collectibles tracker works exactly as before at localhost:5173/#/",
      "Verify: bun run build and bun run lint both pass"
    ],
    "passes": false
  },
  {
    "id": "trophy-data-module",
    "category": "setup",
    "description": "Create typed trophy data module from JSON source",
    "steps": [
      "Move TLOU_REMASTERED_TROPHIES.json from project root into src/ directory (so it's within tsconfig include scope)",
      "Add 'resolveJsonModule': true to tsconfig.app.json compilerOptions",
      "Create src/trophyData.ts with TypeScript interfaces: Trophy, TrophySection, RoadmapStage, TrophyType",
      "IMPORTANT: The JSON uses snake_case (story_related, online_required) but TypeScript interfaces use camelCase (storyRelated, onlineRequired). Write a mapping function that transforms the JSON data to camelCase at import time",
      "The JSON has different structures: base_game_trophies (flat array) vs dlc_left_behind (object with metadata + trophies array). Normalize these into a uniform TrophySection[] array",
      "Export: allTrophySections, roadmapStages, tipsAndStrategies, and trophy category summaries",
      "Verify: bun run build succeeds — all types strict, no 'as any' or @ts-ignore"
    ],
    "passes": false
  },
  {
    "id": "name-items-ch2-6",
    "category": "setup",
    "description": "Generate location-based titles for unnamed items in Chapters 2-6",
    "steps": [
      "In src/data.ts, find all items in Chapters 2-6 where name is null (~50 items across FF, CONV, SHIV tags)",
      "For each unnamed item, derive a short, unique, location-based title from the desc text",
      "Examples: FF near tree → 'Alley Tree Pendant', CONV in pizza shop → 'Pizza Shop Chat', SHIV near generator → 'Generator Room Stash'",
      "Titles: concise (2-4 words), descriptive of location, unique within their tag category",
      "Update the name field from null to the generated title string",
      "Verify: no items in Chapters 2-6 have name: null remaining",
      "Verify: bun run build succeeds"
    ],
    "passes": false
  },
  {
    "id": "name-items-ch7-12",
    "category": "setup",
    "description": "Generate location-based titles for unnamed items in Chapters 7-12",
    "steps": [
      "In src/data.ts, find all remaining items in Chapters 7-12 where name is null (~50 items)",
      "Apply same naming convention as previous task: short, location-based, unique per tag",
      "Update the name field from null to the generated title string",
      "Verify: zero items in data.ts have name: null across the entire file",
      "Verify: bun run build succeeds"
    ],
    "passes": false
  },
  {
    "id": "favicon",
    "category": "setup",
    "description": "Replace Vite default favicon with elegant TLOU-themed icon",
    "steps": [
      "Create a simple, elegant SVG favicon that evokes TLOU (e.g., stylized firefly, spore, leaf, or clicker silhouette) — clean icon, no complex artwork",
      "Save as public/favicon.svg (overwrite if exists)",
      "Verify index.html already references /favicon.svg (it does)",
      "Verify: browser tab shows the new TLOU-themed icon, not the Vite logo"
    ],
    "passes": false
  },
  {
    "id": "collapsible-sections",
    "category": "feature",
    "description": "Enhance collectibles sub-sections: collapsible headers with select-all toggle",
    "steps": [
      "In CollectiblesView, make each sub-section header (e.g., '20 Years Later', 'Beyond The Wall') collapsible — click to show/hide items within that sub-section",
      "Add a 'select all' checkbox/button on each sub-section header that checks/unchecks all VISIBLE items in that sub-section (respects active tag filter)",
      "Sub-section headers show count: checked/total for items currently displayed",
      "Preserve existing chapter-level collapse — chapter and sub-section collapse are independent",
      "Style sub-section headers distinctly from chapter headers but consistent with theme",
      "Verify: sub-sections collapse/expand independently, select-all works correctly with filters active"
    ],
    "passes": false
  },
  {
    "id": "multi-select-tags",
    "category": "feature",
    "description": "Make tag filters multi-selectable with completion counters",
    "steps": [
      "Refactor tag filter in CollectiblesView to support selecting multiple tags simultaneously (e.g., SHIV + CONV active at same time)",
      "Change activeFilter from string|null to Set<string> — when no tags selected, show all",
      "On each tag filter button, display a completion fraction: 'Shiv Doors 5/13', 'Artifacts 40/85', etc.",
      "Counters update in real-time as items are checked/unchecked",
      "'All' button deselects all tag filters",
      "Style counters to fit within or below tag buttons without cluttering",
      "Verify: selecting SHIV + CONV shows both categories, counters reflect accurate completion"
    ],
    "passes": false
  },
  {
    "id": "reset-dialog-readability",
    "category": "feature",
    "description": "Add reset confirmation dialog and improve completed item readability",
    "steps": [
      "Create src/components/ResetDialog.tsx — modal dialog warning about data loss",
      "Reset flow: click Reset → dialog ('This will erase all your progress. Are you sure?') → confirm or cancel",
      "Dialog has backdrop blur, clear Cancel and Confirm buttons",
      "Fix completed item styling: remove any strikethrough on description text for checked items — use checkbox state + subtle background change or opacity shift instead, keeping all text fully readable",
      "Verify: Reset requires 2 clicks (button + confirm), completed items have readable descriptions"
    ],
    "passes": false
  },
  {
    "id": "trophy-view-basic",
    "category": "feature",
    "description": "Build TrophyView basic layout with sections and progress tracking",
    "steps": [
      "Create src/views/TrophyView.tsx with header, progress section, and trophy sections",
      "Implement localStorage-based checkbox tracking (key: 'tlou-trophies', shape: Record<number, boolean>)",
      "Create src/components/TrophyProgress.tsx showing: overall progress bar, rarity breakdown (Platinum/Gold/Silver/Bronze counts), points earned vs total (1980 max)",
      "Render trophy sections: Base Game, Left Behind, Reclaimed Territories, Abandoned Territories, Grounded Mode — each collapsible with count",
      "Create src/styles/trophy-view.css matching existing dark theme",
      "Verify: navigate to /#/trophies, see all 50 trophies organized by section with working checkboxes and progress bar"
    ],
    "passes": false
  },
  {
    "id": "dlc-toggle",
    "category": "feature",
    "description": "Build DLC toggle filter for trophy sections",
    "steps": [
      "Create src/components/TrophyFilters.tsx with DLC toggle switches",
      "DLC toggles: Left Behind (on by default), Reclaimed Territories (off), Abandoned Territories (off), Grounded Mode (off)",
      "When DLC is toggled off, section hides and trophies excluded from progress calculations",
      "Persist DLC toggle state in localStorage (key: 'tlou-trophy-dlc-filters')",
      "Style toggles to match dark theme with smooth on/off transitions",
      "Verify: toggling DLC sections shows/hides them and updates progress bar counts"
    ],
    "passes": false
  },
  {
    "id": "trophy-filters-search",
    "category": "feature",
    "description": "Add multi-select tag filters and text search for trophies",
    "steps": [
      "Add multi-select tag filter buttons to TrophyFilters: All, Missable, Online, Story, Collectible, Buggy",
      "Multiple tags selectable simultaneously (same pattern as collectibles multi-select)",
      "Add text search input that filters trophies by NAME and TAGS only — NOT by description/guide text",
      "Filters work across all visible DLC sections; sections with no matches hidden",
      "Show filter result count (e.g., '4 of 34 trophies')",
      "Verify: selecting Missable + Online shows both categories, searching 'Grounded' finds trophies by name"
    ],
    "passes": false
  },
  {
    "id": "trophy-card-front",
    "category": "feature",
    "description": "Build TrophyCard component with front face design",
    "steps": [
      "Create src/components/TrophyCard.tsx as a reusable card component",
      "Front face: rarity badge (Platinum/Gold/Silver/Bronze with metallic color), trophy name, description, tag badges (missable, online, buggy, story)",
      "Checkbox for marking earned/unearned",
      "Earned: golden shimmer overlay, bright. Unearned: dimmed, muted, locked feel",
      "Create src/styles/trophy-card.css — PlayStation trophy case: dark glass surface, subtle border, metallic rarity badge",
      "Replace plain list rendering in TrophyView with TrophyCard grid",
      "Responsive grid: 3-4 cols desktop (>1024px), 2 cols tablet (601-1024px), 1 col mobile (≤600px)",
      "Verify: cards display correctly at all breakpoints"
    ],
    "passes": false
  },
  {
    "id": "card-flip",
    "category": "feature",
    "description": "Add card flip animation with back face (tips and guide)",
    "steps": [
      "Add CSS 3D flip animation using transform: rotateY(180deg) with perspective",
      "Back face: detailed guide text, tips, strategy notes, missable warnings",
      "Flip triggered by dedicated flip button/icon (not the checkbox)",
      "backface-visibility: hidden for clean effect, ~0.6s ease-in-out duration",
      "Back face styled with slightly different background from front",
      "Verify: flip icon smoothly rotates card 180°, clicking again returns to front"
    ],
    "passes": false
  },
  {
    "id": "3d-tilt",
    "category": "feature",
    "description": "Add 3D tilt hover effect to trophy cards",
    "steps": [
      "Track mouse position over each card via onMouseMove",
      "Calculate tilt angles relative to card center, apply transform: perspective(800px) rotateX() rotateY() with max ~8°",
      "Add subtle shadow shift following tilt direction",
      "Add glass highlight/glare radial gradient overlay that follows cursor",
      "Smooth reset on mouse leave with CSS transition",
      "Disable on touch devices via @media (hover: hover)",
      "Verify: hovering creates smooth parallax tilt with glare effect on desktop, no effect on mobile"
    ],
    "passes": false
  },
  {
    "id": "expand-overlay",
    "category": "feature",
    "description": "Add expand/collapse detail overlay for trophy cards",
    "steps": [
      "Add expand button to each TrophyCard",
      "Clicking expand opens overlay/modal with: full guide text, related roadmap stage, all tags, rarity info",
      "Overlay uses backdrop-filter: blur(8px) — limit to one overlay at a time for performance",
      "Include 'Add Note' button placeholder (notes feature wired in later task)",
      "Smooth scale-up animation, close via X/Escape/backdrop click, scrollable if overflow",
      "Verify: expanding shows full detail overlay with blur, closes cleanly"
    ],
    "passes": false
  },
  {
    "id": "confetti",
    "category": "feature",
    "description": "Add confetti particle effect on trophy completion",
    "steps": [
      "Create src/components/Confetti.tsx — lightweight canvas-based confetti burst",
      "Trigger on trophy checkbox check (not uncheck)",
      "Bronze/Silver: small burst (20-30 particles). Gold: large burst (50+, gold-colored). Platinum: extra large (100+, rainbow)",
      "On mobile: reduce particle counts by 50% for performance",
      "Confetti originates from checkbox position, fades with gravity, auto-cleanup ~2s",
      "Verify: checking trophies triggers appropriately sized confetti per rarity"
    ],
    "passes": false
  },
  {
    "id": "roadmap",
    "category": "feature",
    "description": "Build interactive roadmap component",
    "steps": [
      "Create src/components/TrophyRoadmap.tsx showing 5 playthrough stages",
      "Each stage: title, description, estimated time, trophy count",
      "Click to expand: full description, exploit notes, list of linked trophy names",
      "Linked trophy names are clickable — scroll to and highlight relevant card",
      "Show stage completion % based on linked checked trophies",
      "Create src/styles/trophy-roadmap.css — horizontal timeline desktop (>1024px), vertical mobile (≤600px)",
      "Verify: all 5 stages render, expanding shows details, trophy links scroll to cards"
    ],
    "passes": false
  },
  {
    "id": "haptics",
    "category": "feature",
    "description": "Add interaction feedback: haptic on mobile, visual ripple on desktop",
    "steps": [
      "Create src/utils/haptics.ts with helper that calls navigator.vibrate() on supported devices (Android only — iOS Safari does not support it)",
      "On mobile: trigger short vibration (10-30ms) when checking items, toggling sections, interacting with cards",
      "On desktop: trigger visual ripple/pulse CSS animation from the interaction point",
      "Use feature detection — gracefully no-op if vibration API unavailable",
      "Apply to BOTH CollectiblesView and TrophyView interactions",
      "Verify: Android vibrates on interactions, desktop shows visual pulse, iOS gracefully falls back to visual only"
    ],
    "passes": false
  },
  {
    "id": "difficulty-selector",
    "category": "feature",
    "description": "Add difficulty selector with 6 visual theme variants",
    "steps": [
      "Create src/components/DifficultySelector.tsx — button group or dropdown: Easy, Normal, Hard, Survivor, Grounded, Grounded+",
      "Create src/styles/difficulty-themes.css with 6 CSS custom property overrides via data-difficulty attribute on app root",
      "Easy: warm greens, softer shadows. Normal: default. Hard: deeper shadows + amber layer. Survivor: muted/desaturated/gritty. Grounded: near-black + red accent. Grounded+: darkest + crimson + max decay",
      "Dark green ALWAYS the primary base color — difficulties add layers on top, never replace",
      "Persist in localStorage (key: 'tlou-difficulty'). Affects both views",
      "Verify: switching difficulties visibly changes theme, dark green always present"
    ],
    "passes": false
  },
  {
    "id": "personal-notes",
    "category": "feature",
    "description": "Add personal notes system for chapters, sections, and items",
    "steps": [
      "Create src/components/NoteEditor.tsx — textarea popup/modal for adding/editing notes",
      "Notes attachable to: chapters, sections, individual items, or trophies (by id)",
      "Activation: long-press (mobile) or dedicated button (desktop) → detail popup → 'Add Note' → NoteEditor",
      "Wire up the 'Add Note' placeholder in the trophy card expand overlay",
      "Notes stored in localStorage (key: 'tlou-notes') as UserNote[] array",
      "Items with notes show small note indicator icon. Notes editable and deletable",
      "Verify: add/edit/delete notes on items/sections/chapters, persist across refresh"
    ],
    "passes": false
  },
  {
    "id": "name-entry",
    "category": "feature",
    "description": "Add name entry for header personalization",
    "steps": [
      "Create src/components/NameEntry.tsx — inline editable text or modal input",
      "Accessible from header area — clicking default text opens editor",
      "Stored in localStorage (key: 'tlou-username')",
      "When set: header shows 'Sarah's Collectibles Tracker' / 'Sarah's Trophy Hunt'",
      "When empty: falls back to generic title",
      "Verify: name updates header, persists across refresh, clearing reverts to default"
    ],
    "passes": false
  },
  {
    "id": "markdown-export",
    "category": "feature",
    "description": "Build markdown export with progress summary, notes, and attribution",
    "steps": [
      "Create src/utils/exportMarkdown.ts — generates markdown from current progress state",
      "Create src/components/ExportModal.tsx — modal with preview and download/copy buttons",
      "Export format: progress summary header (username, date, completion %), then collectibles/trophies with [x]/[ ] states, user notes alongside their items",
      "Include attribution: 'Collectibles guide by Kairi (GameFAQs). Trophy data from playstationtrophies.org and psnprofiles.com'",
      "Download using Blob URL: URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' })) + hidden <a> with download attribute. File named '{username}_tlou_progress.md'",
      "Also offer 'Copy to clipboard' via navigator.clipboard.writeText()",
      "Verify: export generates valid markdown with accurate progress, notes, attribution. Download works"
    ],
    "passes": false
  },
  {
    "id": "floating-nav",
    "category": "feature",
    "description": "Build floating action button navigation",
    "steps": [
      "Create src/components/FloatingNav.tsx — circular FAB expanding into radial/popup menu",
      "Menu items: Collectibles (/#/), Trophies (/#/trophies), Export, Settings (difficulty/name)",
      "Mobile portrait: positioned for easy thumb reach (not buried in far corner), activates on tap",
      "Landscape/Desktop: larger size (proportional to screen %), hover/tap/long-press activation, shows text labels on hover",
      "Active route visually highlighted in expanded menu",
      "Create src/styles/floating-nav.css with smooth expand/collapse animation",
      "NOT a sidebar/drawer/top-nav on mobile. NOT a bottom-bar/swipe on desktop",
      "Verify: FAB accessible at all screen sizes, expands cleanly, navigates between views"
    ],
    "passes": false
  },
  {
    "id": "trophy-case-polish",
    "category": "styling",
    "description": "Apply PlayStation trophy case visual polish to cards",
    "steps": [
      "Metallic gradient sheen on rarity badges (CSS linear-gradient + animation)",
      "Platinum: iridescent/rainbow shifting gradient. Gold: warm gold shimmer. Silver: cool reflection. Bronze: warm copper",
      "Glass/acrylic card surface: semi-transparent background + subtle border + box-shadow",
      "Earned: golden glow border + brightness filter. Unearned: reduced opacity + grayscale badge",
      "Verify: cards look like physical PlayStation trophy display cases"
    ],
    "passes": false
  },
  {
    "id": "moss-and-textures",
    "category": "styling",
    "description": "Add moss/greenery decorations and concrete texture atmospheric effects",
    "steps": [
      "Create src/styles/moss-effect.css with CSS-based vine/leaf/moss decorations using shapes, gradients, pseudo-elements (no external images)",
      "Apply to: section headers, page borders, roadmap connector lines",
      "Subtle parallax shift toward cursor on mouse move (desktop only — skip on mobile for performance)",
      "Gentle idle sway animation (CSS keyframes, slow organic movement)",
      "Greenery colors: #2d5a27, #3a7a35, #1a3d15. Moss density increases with difficulty level",
      "Add subtle CSS noise/grain texture overlay on card surfaces and section backgrounds",
      "Section headers: concrete/wall texture feel. Dark vignette at page edges",
      "Grain intensity scales with difficulty level. All effects performant (no scroll jank)",
      "Verify: organic moss decorations + concrete textures evoke TLOU world, more intense on harder difficulties"
    ],
    "passes": false
  },
  {
    "id": "landscape-progress",
    "category": "styling",
    "description": "Landscape layout: progress bar morphs to circle/pie display",
    "steps": [
      "On landscape/desktop (>1024px): transform progress bar into circle/pie/donut chart on the right side of screen",
      "Donut shows overall completion % with rarity color segments (trophy view) or tag-color segments (collectibles view)",
      "Circle display is fixed/sticky, always visible while scrolling",
      "On resize to mobile: falls back to improved top progress bar",
      "Verify: wide screens show circle/pie progress on right side with correct data"
    ],
    "passes": false
  },
  {
    "id": "responsive-polish",
    "category": "styling",
    "description": "Mobile polish, responsive finalization, and accessibility",
    "steps": [
      "Mobile (≤600px): improve top progress bar — better typography, clearer fractions",
      "Tag filters: horizontal scroll on mobile overflow",
      "Smooth CSS page transitions between Collectibles and Trophies views",
      "Add @media (prefers-reduced-motion: reduce) queries to disable/simplify ALL animations (flip, tilt, confetti, moss parallax, transitions) for accessibility",
      "Test at 320px, 375px, 768px, 1024px, 1440px",
      "Verify: app looks great on all sizes, animations disabled when prefers-reduced-motion is set"
    ],
    "passes": false
  },
  {
    "id": "attribution",
    "category": "content",
    "description": "Add attribution for all sourced content on website and GitHub",
    "steps": [
      "In-app footer: credit Kairi (GameFAQs) for collectibles guide, playstationtrophies.org and psnprofiles.com for trophy data",
      "Footer links to original sources",
      "Export markdown includes attribution section",
      "Update README.md (if present) or create a credits section noting all content sources",
      "Respect Kairi's copyright notice from the original guide",
      "Verify: attribution visible on website footer and in exported markdown files"
    ],
    "passes": false
  },
  {
    "id": "test-collectibles",
    "category": "testing",
    "description": "Integration testing: collectibles view and shared features",
    "steps": [
      "Run bun run lint — fix all ESLint errors",
      "Run bun run build — zero TypeScript errors",
      "Verify collectibles at /#/: all items have titles (no 'null' names), sub-sections collapse, select-all works, multi-select tags work, tag counters accurate",
      "Verify reset requires confirmation dialog, completed items have readable descriptions (no strikethrough)",
      "Verify difficulty selector changes theme across the page",
      "Verify name entry personalizes header text",
      "Verify notes: add/edit/delete on collectible items, chapters, sections",
      "Verify FAB navigation works on both mobile and desktop viewports",
      "Verify localStorage: check some items, add notes, set name, refresh — all persisted"
    ],
    "passes": false
  },
  {
    "id": "test-trophies-deploy",
    "category": "testing",
    "description": "Integration testing: trophy view + responsive + final deployment",
    "steps": [
      "Verify trophy view at /#/trophies: all 50 trophies present with correct data",
      "Verify DLC toggles show/hide sections and update progress counts",
      "Verify card interactions: flip, 3D tilt (desktop only), expand overlay with blur, confetti on check",
      "Verify roadmap: 5 stages, expandable, trophy links scroll to cards",
      "Verify export: generates valid markdown with progress, notes, attribution. Download and clipboard both work",
      "Verify landscape: progress bar morphs to circle/pie on desktop",
      "Verify responsive: 320px, 375px, 768px, 1024px, 1440px — no broken layouts",
      "Verify prefers-reduced-motion disables animations",
      "Run bun run deploy — verify live at alltheponies.xyz",
      "Navigate deployed site: check both views, card interactions, FAB nav, export functionality"
    ],
    "passes": false
  }
]
```

---

## Agent Instructions

1. Read `activity.md` first to understand current state
2. Find next task with `"passes": false` (use the `"id"` field when logging progress)
3. Complete all steps for that task
4. Verify in browser using agent-browser
5. Update task to `"passes": true`
6. Log completion in `activity.md` referencing the task `id`
7. Commit changes with `git add` (stage specific files, NOT `git add .`), then `git commit`
8. Run `bun run deploy` to push to GitHub Pages
9. Use agent-browser to verify the deployed version at `alltheponies.xyz` — confirm changes are live before proceeding
10. Repeat until all tasks pass

**Important:** Only modify the `passes` field. Do not remove or rewrite tasks.

**Project structure:**
- Use `src/components/` and `src/views/` directories to keep the project modular and debuggable
- No behemoth files — if a component or module grows beyond ~300 lines, split into smaller focused files
- Don't over-separate either — use judgment to keep related logic together

**Tech notes:**
- Use `bun add` not `npm install`
- Use `bun run dev`, `bun run build`, `bun run lint`
- Dev server runs on `localhost:5173`
- Use `HashRouter` for GitHub Pages compatibility
- Trophy data source: `src/TLOU_REMASTERED_TROPHIES.json` (moved from root to src/)
- Existing theme vars are in `src/index.css`
- Strict TypeScript: no `@ts-ignore`, no `as any`
- Use relative imports (no `@/` path aliases configured)
- All unnamed items in src/data.ts need location-based titles — derive from desc field
- For markdown export download: use Blob URL + hidden `<a>` with `download` attribute (no server)
- `navigator.vibrate()` does NOT work on iOS Safari — always provide visual fallback

**Export format reference:**
The markdown export should follow this structure:
```markdown
# {Username}'s TLOU Progress Report
> Generated: {date} | Completion: {x}/{total} ({pct}%)

## Collectibles Progress
- Artifacts: {x}/85
- Firefly Pendants: {x}/30
...

## Chapter 2: The Quarantine Zone
### 20 Years Later
- [x] **Pizza Shop Chat** (CONV) — Follow Tess out towards the street...
  > *Note: Found this on second playthrough*
- [ ] **Boston Q.Z. Map** (ART) — You get this once Joel picks up his backpack.
...

## Trophy Progress
...

---
*Collectibles guide by Kairi (GameFAQs). Trophy data from playstationtrophies.org and psnprofiles.com.*
```

---

## Completion Criteria
All tasks marked with `"passes": true` (32 tasks total)
