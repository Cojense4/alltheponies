# The Last of Us Remastered - Interactive Guide — PRD

## Overview

Transform the TLOU Collectibles Tracker into a full interactive guide with two views: enhanced **Collectibles Tracker** and new **Trophy Guide**. Features: PlayStation trophy case card aesthetics, 3D interactions, difficulty theming, personal notes, markdown export, floating action button navigation.

**Detailed specs** (architecture, data model, UI/UX, constraints): see `prd-specs.md`

**Sources:** playstationtrophies.org, psnprofiles.com, Kairi/GameFAQs. Trophy data in `TLOU_REMASTERED_TROPHIES.json`.

---

## Task List

```json
[
  {
    "id": "name-items-ch2-6",
    "category": "setup",
    "description": "Generate location-based titles for unnamed items in Chapters 2-6",
    "steps": [
      "In src/data.ts, find items in Ch 2-6 where name is null (~50 items: FF, CONV, SHIV)",
      "Derive short unique location-based title from desc (e.g., 'Alley Tree Pendant', 'Pizza Shop Chat')",
      "Titles: 2-4 words, location-descriptive, unique within tag category",
      "Verify: no null names in Ch 2-6, bun run build succeeds"
    ],
    "passes": true
  },
  {
    "id": "name-items-ch7-12",
    "category": "setup",
    "description": "Generate location-based titles for unnamed items in Chapters 7-12",
    "steps": [
      "Same naming convention as previous task for remaining ~50 items",
      "Verify: zero null names in entire data.ts, bun run build succeeds"
    ],
    "passes": true
  },
  {
    "id": "favicon",
    "category": "setup",
    "description": "Replace Vite favicon with TLOU-themed icon",
    "steps": [
      "Create simple SVG favicon (firefly, spore, leaf, or clicker silhouette)",
      "Save as public/favicon.svg. index.html already references it",
      "Verify: browser tab shows TLOU icon"
    ],
    "passes": true
  },
  {
    "id": "collapsible-sections",
    "category": "feature",
    "description": "Collapsible sub-section headers with select-all toggle in collectibles",
    "steps": [
      "Make sub-section headers ('20 Years Later', etc.) collapsible",
      "Add select-all checkbox per sub-section (respects active tag filter)",
      "Show checked/total count on each sub-section header",
      "Chapter and sub-section collapse are independent",
      "Verify: collapse/expand works, select-all respects filters"
    ],
    "passes": true
  },
  {
    "id": "multi-select-tags",
    "category": "feature",
    "description": "Multi-selectable tag filters with completion counters",
    "steps": [
      "Change activeFilter from string|null to Set<string> for multi-select",
      "Display completion fraction on each tag: 'Shiv Doors 5/13', 'Artifacts 40/85'",
      "Counters update in real-time. 'All' deselects all",
      "Verify: SHIV + CONV selectable simultaneously, counters accurate"
    ],
    "passes": true
  },
  {
    "id": "reset-dialog-readability",
    "category": "feature",
    "description": "Reset confirmation dialog + readable completed items",
    "steps": [
      "Create src/components/ResetDialog.tsx — modal with warning + confirm/cancel",
      "Reset flow: click Reset → warning dialog → confirm to erase",
      "Fix checked items: NO strikethrough on description text. Use background/opacity change instead",
      "Verify: Reset needs 2 clicks, descriptions readable when checked"
    ],
    "passes": true
  },
  {
    "id": "trophy-view-basic",
    "category": "feature",
    "description": "TrophyView layout with sections and progress. See prd-specs.md for data model",
    "steps": [
      "Create src/views/TrophyView.tsx with header, progress, trophy sections",
      "localStorage tracking (key: 'tlou-trophies', Record<number, boolean>)",
      "Create TrophyProgress.tsx: progress bar, rarity breakdown, points (1980 max)",
      "Sections: Base Game, Left Behind, Reclaimed, Abandoned, Grounded — collapsible",
      "Create src/styles/trophy-view.css",
      "Verify: /#/trophies shows all 50 trophies with working checkboxes"
    ],
    "passes": true
  },
  {
    "id": "dlc-toggle",
    "category": "feature",
    "description": "DLC toggle filter for trophy sections",
    "steps": [
      "Create TrophyFilters.tsx with DLC toggles: Left Behind (on), Reclaimed (off), Abandoned (off), Grounded (off)",
      "Hidden DLC trophies excluded from progress. Persist in localStorage",
      "Verify: toggles show/hide sections and update progress"
    ],
    "passes": true
  },
  {
    "id": "trophy-filters-search",
    "category": "feature",
    "description": "Multi-select tag filters and text search for trophies",
    "steps": [
      "Multi-select tags: All, Missable, Online, Story, Collectible, Buggy",
      "Text search by NAME and TAGS only (not description/guide)",
      "Show result count. Hide sections with no matches",
      "Verify: Missable + Online selectable, search finds by name"
    ],
    "passes": true
  },
  {
    "id": "trophy-card-front",
    "category": "feature",
    "description": "TrophyCard component with front face. See prd-specs.md for card design",
    "steps": [
      "Create TrophyCard.tsx: rarity badge, name, description, tag badges, checkbox",
      "Earned: golden shimmer. Unearned: dimmed/locked",
      "Create src/styles/trophy-card.css — PS trophy case aesthetic",
      "Responsive grid: 3-4 cols desktop, 2 tablet, 1 mobile",
      "Verify: cards display correctly at all breakpoints"
    ],
    "passes": true
  },
  {
    "id": "card-flip",
    "category": "feature",
    "description": "Card flip animation with back face (tips/guide)",
    "steps": [
      "CSS 3D flip via rotateY(180deg) with perspective, backface-visibility: hidden",
      "Back face: guide text, tips, missable warnings. Flip via dedicated button",
      "~0.6s ease-in-out. Different background on back",
      "Verify: smooth 180 deg flip, returns on second click"
    ],
    "passes": true
  },
  {
    "id": "3d-tilt",
    "category": "feature",
    "description": "3D tilt hover effect on trophy cards",
    "steps": [
      "Track mouse via onMouseMove, tilt max ~8 deg with perspective(800px)",
      "Shadow shift + glass glare radial gradient follows cursor",
      "Smooth reset on leave. Disabled on touch via @media (hover: hover)",
      "Verify: parallax tilt with glare on desktop, no effect on mobile"
    ],
    "passes": true
  },
  {
    "id": "expand-overlay",
    "category": "feature",
    "description": "Expand overlay for trophy card details",
    "steps": [
      "Expand button opens overlay: full guide, roadmap stage, tags, rarity",
      "backdrop-filter: blur(8px), one overlay at a time for performance",
      "Include 'Add Note' placeholder. Close via X/Escape/backdrop",
      "Verify: overlay shows, blur works, closes cleanly"
    ],
    "passes": true
  },
  {
    "id": "confetti",
    "category": "feature",
    "description": "Confetti particle effect on trophy check",
    "steps": [
      "Create Confetti.tsx — canvas-based. Trigger on check only",
      "Bronze/Silver: 20-30 particles. Gold: 50+ gold. Platinum: 100+ rainbow",
      "Mobile: 50% fewer particles. Auto-cleanup ~2s",
      "Verify: confetti scales per rarity"
    ],
    "passes": true
  },
  {
    "id": "roadmap",
    "category": "feature",
    "description": "Interactive 5-stage roadmap component",
    "steps": [
      "Create TrophyRoadmap.tsx: 5 stages with title, time, trophy count",
      "Expand: description, exploit notes, linked trophy names (clickable → scroll to card)",
      "Stage completion % from checked linked trophies",
      "Horizontal timeline desktop, vertical mobile",
      "Verify: stages render, links scroll to cards"
    ],
    "passes": false
  },
  {
    "id": "haptics",
    "category": "feature",
    "description": "Interaction feedback: vibration (Android) + visual ripple (desktop)",
    "steps": [
      "Create src/utils/haptics.ts — navigator.vibrate() with feature detection",
      "Mobile: 10-30ms vibration on check/toggle. Desktop: ripple CSS animation",
      "Apply to both views. iOS falls back to visual only",
      "Verify: Android vibrates, desktop pulses, iOS graceful fallback"
    ],
    "passes": false
  },
  {
    "id": "difficulty-selector",
    "category": "feature",
    "description": "6-difficulty theme selector. See prd-specs.md for color specs",
    "steps": [
      "Create DifficultySelector.tsx + src/styles/difficulty-themes.css",
      "6 themes via data-difficulty attribute on app root",
      "Dark green ALWAYS primary. Difficulties add layers on top",
      "Persist in localStorage. Affects both views",
      "Verify: themes change visibly, green always base"
    ],
    "passes": false
  },
  {
    "id": "personal-notes",
    "category": "feature",
    "description": "Personal notes on chapters, sections, items, trophies",
    "steps": [
      "Create NoteEditor.tsx — textarea popup for add/edit/delete",
      "Long-press (mobile) or button (desktop) → detail popup → Add Note",
      "Wire up expand overlay 'Add Note' placeholder",
      "localStorage 'tlou-notes' as UserNote[]. Note indicator icon on items",
      "Verify: CRUD notes, persist across refresh"
    ],
    "passes": false
  },
  {
    "id": "name-entry",
    "category": "feature",
    "description": "Name entry for header personalization",
    "steps": [
      "Create NameEntry.tsx — inline editable or modal input",
      "localStorage 'tlou-username'. Header: 'Sarah's Collectibles Tracker'",
      "Empty falls back to generic title. Used in exports",
      "Verify: name updates header, persists, clearing reverts"
    ],
    "passes": false
  },
  {
    "id": "markdown-export",
    "category": "feature",
    "description": "Markdown export with progress, notes, attribution",
    "steps": [
      "Create src/utils/exportMarkdown.ts + ExportModal.tsx",
      "Format: summary header, [x]/[ ] items, notes alongside items, attribution footer",
      "Download via Blob URL + hidden <a download>. File: '{username}_tlou_progress.md'",
      "Also: Copy to clipboard via navigator.clipboard.writeText()",
      "Verify: valid markdown, accurate progress, download works"
    ],
    "passes": false
  },
  {
    "id": "floating-nav",
    "category": "feature",
    "description": "Floating action button navigation. See prd-specs.md for FAB specs",
    "steps": [
      "Create FloatingNav.tsx — FAB expanding to radial menu",
      "Items: Collectibles, Trophies, Export, Settings. Active route highlighted",
      "Mobile: thumb-reachable, tap. Desktop: larger, hover/tap/long-press with labels",
      "NOT sidebar/drawer/top-nav (mobile) or bottom-bar/swipe (desktop)",
      "Verify: FAB accessible at all sizes, navigates between views"
    ],
    "passes": false
  },
  {
    "id": "trophy-case-polish",
    "category": "styling",
    "description": "PlayStation trophy case visual polish",
    "steps": [
      "Metallic gradient rarity badges. Glass/acrylic card surfaces",
      "Earned: golden glow + brightness. Unearned: dimmed + grayscale badge",
      "Verify: cards look like physical PS trophy display cases"
    ],
    "passes": false
  },
  {
    "id": "moss-and-textures",
    "category": "styling",
    "description": "Moss/greenery + concrete textures. See prd-specs.md for color specs",
    "steps": [
      "CSS moss/vine decorations on headers, borders, roadmap lines (no images)",
      "Mouse parallax (desktop only). Idle sway animation",
      "Noise/grain overlay, concrete headers, vignette. Density scales with difficulty",
      "All effects performant (no scroll jank)",
      "Verify: TLOU atmosphere, more intense on harder difficulties"
    ],
    "passes": false
  },
  {
    "id": "landscape-progress",
    "category": "styling",
    "description": "Progress bar morphs to circle/pie on desktop",
    "steps": [
      "Desktop >1024px: donut chart on right side, fixed/sticky",
      "Rarity segments (trophies) or tag segments (collectibles)",
      "Mobile: falls back to improved top bar",
      "Verify: circle on wide screens with correct data"
    ],
    "passes": false
  },
  {
    "id": "responsive-polish",
    "category": "styling",
    "description": "Responsive finalization + prefers-reduced-motion",
    "steps": [
      "Mobile progress bar: better typography, clearer fractions",
      "Horizontal-scroll tag filters on mobile. Page transitions",
      "@media (prefers-reduced-motion: reduce) disables ALL animations",
      "Test: 320px, 375px, 768px, 1024px, 1440px",
      "Verify: great on all sizes, animations off when motion reduced"
    ],
    "passes": false
  },
  {
    "id": "attribution",
    "category": "content",
    "description": "Attribution for all sourced content",
    "steps": [
      "Footer: credit Kairi/GameFAQs, playstationtrophies.org, psnprofiles.com with links",
      "Export markdown includes attribution. Update README.md",
      "Verify: attribution visible on site and in exports"
    ],
    "passes": false
  },
  {
    "id": "test-collectibles",
    "category": "testing",
    "description": "Integration test: collectibles view + shared features",
    "steps": [
      "bun run lint + bun run build — zero errors",
      "Verify /#/: named items, collapsible sections, select-all, multi-select tags, counters",
      "Verify: reset dialog, readable descriptions, difficulty themes, name entry, notes, FAB nav",
      "Verify: localStorage persists all data across refresh"
    ],
    "passes": false
  },
  {
    "id": "test-trophies-deploy",
    "category": "testing",
    "description": "Integration test: trophies + responsive + deploy",
    "steps": [
      "Verify /#/trophies: 50 trophies, DLC toggles, flip/tilt/expand/confetti",
      "Verify: roadmap, export, landscape progress, responsive at all breakpoints",
      "Verify: prefers-reduced-motion disables animations",
      "bun run deploy — verify live at alltheponies.xyz",
      "Navigate deployed site: both views, interactions, FAB, export"
    ],
    "passes": false
  }
]
```

---

## Agent Instructions

1. Read `activity.md` first to understand current state
2. Read `prd-specs.md` when you need architecture, data model, or UI/UX details
3. Find next task with `"passes": false` (use `"id"` when logging)
4. Complete all steps for that task
5. Verify in browser using agent-browser
6. Update task to `"passes": true`
7. Log completion in `activity.md`
8. Commit with `git add` (specific files, NOT `git add .`), then `git commit`
9. Run `bun run deploy`, verify at `alltheponies.xyz` before proceeding
10. Repeat until all tasks pass

**Important:** Only modify the `passes` field. Do not remove or rewrite tasks.

**Project structure:** Use `src/components/` and `src/views/`. No file over ~300 lines. Don't over-separate.

**Tech:** bun (not npm). `bun run dev/build/lint`. localhost:5173. HashRouter. Strict TS. Relative imports. Trophy data in `src/TLOU_REMASTERED_TROPHIES.json`. `navigator.vibrate()` needs iOS fallback. Export uses Blob URL.

---

## Completion Criteria
All tasks `"passes": true` (32 total)
