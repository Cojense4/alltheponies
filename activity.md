# TLOU Interactive Guide - Activity Log

## Current Status
**Last Updated:** 2026-04-08
**Tasks Completed:** 4 / 32
**Current Task:** name-items-ch7-12 complete

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

<!-- Agent will append dated entries below -->
