# TLOU Interactive Guide - Activity Log

## Current Status
**Last Updated:** 2026-04-09
**Tasks Completed:** 10 / 32
**Current Task:** card-flip complete

---

## Session Log

### 2026-04-07 — PRD Creation & Expert Review
- Created comprehensive PRD with 32 tasks (setup, features, styling, content, testing)
- Extracted trophy data from playstationtrophies.org and psnprofiles.com into TLOU_REMASTERED_TROPHIES.json (50 trophies)
- Updated PROMPT.md with bun commands, deploy instructions, and specific file staging
- Updated .claude/settings.json with vite, tsc, and deploy permissions
- Architecture: React Router (HashRouter) with /#/ and /#/trophies routes
- Design direction: PlayStation trophy case + TLOU post-apocalyptic (concrete, moss, greenery)
- Interactions: card flip, 3D tilt hover, expand overlay with blur, confetti, haptic feedback
- Expert plan review completed — applied all critical/high priority fixes:
  - C1: Added resolveJsonModule config + move JSON to src/
  - C2: Added snake_case → camelCase data transformation step
  - C3: Added public/404.html for GitHub Pages SPA
  - C4: Resolved deploy-after-every-task instructions, updated PROMPT.md
  - C5: Fixed task count (32 tasks)
  - H1: Split naming 100 items into 2 tasks (Ch 2-6, Ch 7-12)
  - H3: Moved haptics task after TrophyView basic layout
  - H4: Changed git add . to specific file staging
  - H7: Split final testing into 2 tasks
  - Added prefers-reduced-motion accessibility support
  - Added Blob URL approach for markdown export
  - Added task IDs for stable referencing
  - Added error boundary requirement

### 2026-04-08 — setup-router
- Installed HashRouter via `createHashRouter` + `RouterProvider` from react-router v7
- Updated `src/main.tsx`: wraps app in `createHashRouter` with routes for `/` and `/trophies`
- Updated `src/App.tsx`: removed router shell (routing now in main.tsx), App is collectibles content
- Each route wrapped in `ErrorBoundary` component
- `public/404.html` and `src/views/TrophyView.tsx` already existed from PRD setup
- Removed `@vitejs/plugin-react-swc` from vite.config.ts (package was never installed; Vite 8 handles JSX natively)
- Updated `CLAUDE.md` architecture section to reflect routing setup
- Ran `bun run lint` (pass) and `bun run build` (pass)
- Verified via `bun run preview`: `/#/` shows collectibles, `/#/trophies` shows trophy placeholder
- Screenshot: `screenshots/setup-router-trophies.png`
- Note: port 5173 had a stale dev server from another directory; used preview server on 4174 for verification

### 2026-04-08 — extract-collectibles
- Created `src/views/CollectiblesView.tsx` — moved all collectibles logic from App.tsx (state, toggle, filters, chapters, footer)
- Created `src/views/CollectiblesView.css` — moved all collectibles styles from App.css
- Updated `src/main.tsx` to import CollectiblesView instead of App for the `/` route, removed App.css import
- Simplified `src/App.tsx` to a minimal Outlet-based router shell
- Emptied `src/App.css` (styles now live in CollectiblesView.css)
- Ran `bun run lint` (pass) and `bun run build` (pass)
- Verified via dev server on port 5180 (port 5173 occupied by stale server from different directory):
  - `/#/` shows collectibles tracker with all chapters, tag filters, progress bar — works as before
  - `/#/trophies` shows trophy guide placeholder — routing still works
- Screenshot: `screenshots/extract-collectibles.png`

### 2026-04-08 — trophy-data-module
- Moved `TLOU_REMASTERED_TROPHIES.json` into `src/` (within tsconfig include scope)
- Added `resolveJsonModule: true` to `tsconfig.app.json`
- Created `src/trophyData.ts` with typed interfaces: `Trophy`, `TrophySection`, `RoadmapStage`, `TrophyType`
- Implemented snake_case to camelCase mapping functions (`story_related` -> `storyRelated`, `online_required` -> `onlineRequired`, etc.)
- Normalized JSON structures: base_game_trophies (flat array) and DLC objects (nested with metadata) into uniform `TrophySection[]`
- Exports: `allTrophySections` (5 sections), `roadmapStages` (5 stages), `tipsAndStrategies`, `categorySummaries`
- Left Behind DLC trophies lack `online_required` field — handled with `?? false` default
- Ran `bun run lint` (pass) and `bun run build` (pass) — strict types, no `as any`
- Verified both routes work on dev server (port 5181)
- Screenshot: `screenshots/trophy-data-module.png`

### 2026-04-08 — name-items-ch2-6
- Named 9 null-named items in Chapter 6 (all Ch 2-5 items already had names)
- Items named: c6-4 "Sewer Waterway Pendant" (FF), c6-6 "Sunken Car Pendant" (FF), c6-8 "Generator Room Tools" (TOOL), c6-14 "Kitchen Cave-in Chat" (CONV), c6-15 "Warning Sign Chat" (CONV), c6-16 "Ice Cream Truck Chat" (CONV), c6-21 "Bathroom Comic" (COMIC), c6-22 "Dart Game Chat" (CONV), c6-23 "Backyard Tree Pendant" (FF)
- All names 2-4 words, location-descriptive, unique within tag category
- First null name now at line 906 (Chapter 7) — Ch 2-6 fully named
- Ran `bun run lint` (pass) and `bun run build` (pass)
- Verified via dev server: Chapter 6 renders correctly with all items
- Screenshot: `screenshots/name-items-ch2-6.png`

### 2026-04-08 — name-items-ch7-12
- Verified all items in Chapters 7-12 already have names (named in a previous iteration)
- Zero `null` names in data.ts — only occurrence is the type definition `string | null`
- `bun run lint` (pass) and `bun run build` (pass)
- Verified in browser: Chapter 7 "Tommy's Dam", Chapter 8 "The University" items all display proper names
- Screenshot: `screenshots/name-items-ch7-12.png`

### 2026-04-08 — favicon
- Replaced Vite lightning bolt favicon with TLOU-themed firefly SVG
- Design: dark circle background (#1a1a14), stylized firefly with glowing yellow abdomen, translucent wings, antennae
- Colors match the app's post-apocalyptic theme (olive greens, muted yellows)
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshot: `screenshots/favicon.png`

### 2026-04-08 — collapsible-sections
- Made sub-section headers collapsible with independent open/close state (default open)
- Added select-all checkbox per sub-section that checks/unchecks all visible items (respects active tag filter)
- Added checked/total count display on each section header (e.g., "5 / 5")
- Section and chapter collapse are fully independent
- New state: `openSections` (Record<string, boolean>), keyed by `${chapterIndex}-${sectionIndex}`
- New callbacks: `toggleSection`, `toggleSelectAll`
- New CSS: `.section-header`, `.section-header-left`, `.section-toggle`, `.section-meta`, `.section-count`, `.section-select-all`
- `bun run lint` (pass) and `bun run build` (pass)
- Verified in browser: collapse/expand works, select-all checks all items, counters update, filter respects tags
- Screenshots: `screenshots/collapsible-sections-initial.png`, `screenshots/collapsible-sections-collapsed.png`, `screenshots/collapsible-sections-selectall.png`, `screenshots/collapsible-sections-filter.png`

### 2026-04-08 — multi-select-tags
- Feature was already implemented in a previous iteration (collapsible-sections work)
- `activeFilters` is `Set<string>` for multi-select, `toggleFilter` adds/removes from set
- Each tag button shows completion fraction (e.g., "Artifacts 0/85", "Shiv Doors 0/13")
- Counters update in real-time as items are checked
- "All" button clears the set, showing all items
- Verified in browser: SHIV + CONV selectable simultaneously, chapter counts update correctly
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/multi-select-tags-initial.png`, `screenshots/multi-select-tags-both-active.png`, `screenshots/multi-select-tags-all.png`

### 2026-04-08 — reset-dialog-readability
- Created `src/components/ResetDialog.tsx` — modal with warning title, body text, Cancel/Reset buttons
- Reset flow now requires 2 clicks: Reset button opens dialog → Confirm to erase, Cancel to dismiss
- Dialog has dark overlay with backdrop-filter blur, centered card, red-styled confirm button
- Removed strikethrough on checked items — now uses opacity (0.55) + background change only
- Descriptions remain fully readable when items are checked
- Cancel closes dialog and preserves progress; Confirm resets all and closes dialog
- Backdrop click also dismisses dialog
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/reset-dialog-checked-item.png`, `screenshots/reset-dialog-open.png`, `screenshots/reset-dialog-confirmed.png`

### 2026-04-08 — trophy-view-basic
- Task was already fully implemented in a previous iteration
- Verified: TrophyView.tsx has header ("The Last of Us" + "Trophy Guide"), TrophyProgress component, 5 collapsible sections
- Verified: localStorage tracking with key 'tlou-trophies', Record<number, boolean> type
- Verified: TrophyProgress.tsx shows progress bar, rarity breakdown (Platinum/Gold/Silver/Bronze), points (1980 max)
- Verified: All 5 sections present — Base Game (24), Left Behind (10), Reclaimed Territories (7), Abandoned Territories (7), Grounded Mode (2) = 50 total
- Verified: CSS at src/views/trophy-view.css with comprehensive styling for progress, sections, items, badges, responsive
- Verified: Checkbox click earns trophy, updates progress (30/1980 pts for Silver), section count, and rarity breakdown
- Verified: Section collapse/expand works independently
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/trophy-view-basic-top.png`, `screenshots/trophy-view-basic-checked.png`, `screenshots/trophy-view-basic-collapsed.png`

### 2026-04-09 — dlc-toggle
- Created `src/components/TrophyFilters.tsx` — DLC toggle buttons with active/inactive indicator dots
- Updated `src/views/TrophyView.tsx` — added DLC toggle state, filters visible sections and trophies passed to TrophyProgress
- Added CSS for `.trophy-dlc-filters`, `.trophy-dlc-toggle`, `.trophy-dlc-toggle-indicator` in trophy-view.css
- Default state: Left Behind ON, Reclaimed OFF, Abandoned OFF, Grounded OFF
- localStorage key `tlou-dlc-toggles` persists toggle state as `Record<string, boolean>`
- Hidden DLC trophies excluded from progress bar, points, rarity breakdown, and trophy count
- Verified: toggling Reclaimed on changes 34→41 trophies, 1470→1635 pts; toggling Left Behind off drops to 31 trophies
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/dlc-toggle-trophies-view.png`, `screenshots/dlc-toggle-reclaimed-on.png`, `screenshots/dlc-toggle-leftbehind-off.png`

### 2026-04-09 — trophy-filters-search
- Task was already fully implemented in a previous iteration
- Verified: Multi-select tag filters (All, Missable, Online, Story, Collectible, Buggy) with counts
- Verified: Text search by name and tags — "Light" finds "Look for the Light" (1 result)
- Verified: Result count display ("4 trophies found", "8 trophies found", etc.)
- Verified: Sections hidden when no matches (Left Behind hidden when only Missable selected)
- Verified: Missable + Online selectable simultaneously → 8 trophies found
- Components: TrophyFilters.tsx (tag buttons, search input), trophyFilters.ts (tag matching util)
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/trophy-filters-search-top.png`, `screenshots/trophy-filters-search-missable.png`, `screenshots/trophy-filters-search-multi.png`, `screenshots/trophy-filters-search-name.png`

### 2026-04-09 — card-flip
- Task was already fully implemented in a previous iteration
- Verified: TrophyCard.tsx has `flipped` state, front face (trophy info) and back face (guide text)
- Verified: CSS 3D flip via `rotateY(180deg)` with `perspective: 800px`, `backface-visibility: hidden`, `transform-style: preserve-3d`
- Verified: `0.6s ease-in-out` transition on `.trophy-card__inner`
- Verified: Dedicated "Show guide" flip button on front, "Back to front" on back
- Verified: Back face shows name + rarity badge, missable warning (⚠ Missable), guide text
- Verified: Flip and return both work smoothly in browser
- `bun run lint` (pass) and `bun run build` (pass)
- Screenshots: `screenshots/card-flip-initial.png`, `screenshots/card-flip-flipped.png`, `screenshots/card-flip-returned.png`, `screenshots/card-flip-missable.png`

<!-- Agent will append dated entries below -->
