# Importing TLOU_GUIDE into alltheponies

This guide covers how to replace the default Vite+React template in this repo with the TLOU_GUIDE collectibles tracker app, then deploy it to GitHub Pages.

**Source:** `~/Downloads/TLOU_GUIDE/web/`
**Destination:** This repo (`alltheponies`)

Both projects use React 19 + Vite + Bun, so the migration is straightforward.

---

## Step 1: Remove default template files

```bash
rm src/App.tsx src/App.css src/index.css src/main.tsx
rm -rf src/assets
rm public/vite.svg
```

## Step 2: Copy TLOU_GUIDE source files

```bash
# App source
cp ~/Downloads/TLOU_GUIDE/web/src/App.jsx   src/
cp ~/Downloads/TLOU_GUIDE/web/src/App.css   src/
cp ~/Downloads/TLOU_GUIDE/web/src/index.css src/
cp ~/Downloads/TLOU_GUIDE/web/src/main.jsx  src/
cp ~/Downloads/TLOU_GUIDE/web/src/data.js   src/

# Public assets (favicon + icon sprites)
cp ~/Downloads/TLOU_GUIDE/web/public/favicon.svg public/
cp ~/Downloads/TLOU_GUIDE/web/public/icons.svg   public/
```

## Step 3: Update `index.html`

Replace `index.html` at the project root. The TLOU_GUIDE version adds Google Fonts and points to `main.jsx` instead of `main.tsx`:

```bash
cp ~/Downloads/TLOU_GUIDE/web/index.html ./index.html
```

**Key differences from the current `index.html`:**
- Favicon path changes from `/vite.svg` to `/favicon.svg`
- Title changes to "The Last of Us - Collectibles Tracker"
- Adds Google Fonts preconnect + stylesheet (Special Elite, Source Sans 3)
- Entry script changes from `/src/main.tsx` to `/src/main.jsx`

## Step 4: Update TypeScript config to allow JS files

The TLOU_GUIDE uses `.jsx`/`.js` files, not TypeScript. Add `"allowJs": true` to `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "allowJs": true,
    ...existing options...
  }
}
```

You may also want to temporarily set `"strict": false` or disable `"noUnusedLocals"` / `"noUnusedParameters"` if the build complains about the JS files. Alternatively, rename the files to `.tsx`/`.ts` and add type annotations.

## Step 5: Install dependencies and build

```bash
bun install
bun run build
```

The TLOU_GUIDE has no extra dependencies beyond what alltheponies already has (React + React DOM), so `bun install` shouldn't pull anything new.

If the build fails, check for:
- TypeScript errors on `.jsx` files: ensure `allowJs: true` is set
- Unused variable warnings: temporarily set `"noUnusedLocals": false` in `tsconfig.app.json`

## Step 6: Test locally

```bash
bun run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`). You should see the TLOU collectibles tracker with:
- Dark post-apocalyptic theme
- Collapsible chapters
- Checkbox progress tracking (persisted in localStorage)
- Tag-based filtering (Artifacts, Firefly Pendants, Conversations, etc.)

## Step 7: Deploy

```bash
bun run deploy
```

This runs `bun run build && gh-pages -d dist/` which pushes the built site to the `gh-pages` branch. The site will be live at `alltheponies.xyz`.

---

## File mapping summary

| Removed (template)        | Added (TLOU_GUIDE)              |
|---------------------------|---------------------------------|
| `src/App.tsx`             | `src/App.jsx`                   |
| `src/App.css`             | `src/App.css` (replaced)        |
| `src/index.css`           | `src/index.css` (replaced)      |
| `src/main.tsx`            | `src/main.jsx`                  |
| `src/assets/react.svg`    | _(removed, not needed)_         |
| `public/vite.svg`         | `public/favicon.svg`            |
| —                         | `public/icons.svg` (new)        |
| —                         | `src/data.js` (new)             |
| `index.html`              | `index.html` (replaced)         |
| `tsconfig.app.json`       | `tsconfig.app.json` (modified)  |

## Notes

- The CNAME file (`public/CNAME`) and `_headers` already in this repo are preserved and unaffected.
- The `vite.config.ts` doesn't need changes since `base: '/'` is correct for both projects.
- localStorage key `"tlou-checked"` is used for progress persistence.
