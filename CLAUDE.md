# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server (Vite)
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

No test runner is configured.

## Architecture

React 18 SPA built with Vite, deployed on Vercel. MUI v5 handles UI components and theming.

**Routing** (`src/index.jsx`): React Router v6 with a nested layout. `App.jsx` is the shell (header, footer, `<Outlet>`). Two child routes: `/` → `Gallery`, `/supplies` → `Supply`.

**Theme:** MUI `ThemeProvider` in `src/index.jsx` reads `--wheat` CSS variable to set the primary color.

## Environment Variables

| Variable | Where used | Notes |
|---|---|---|
| `RAVELRY_USERNAME_KEY` | `api/ravelry.js` (server) | No `VITE_` prefix — server-side only |
| `RAVELRY_PASSWORD_KEY` | `api/ravelry.js` (server) | No `VITE_` prefix — server-side only |
| `VITE_CONTENTFUL_SPACE_ID` | `src/Supply.jsx` (client) | Baked into bundle at build time |
| `VITE_CONTENTFUL_ACCESS_TOKEN` | `src/Supply.jsx` (client) | Baked into bundle at build time |

## Project Instructions

- Always add comments to code changes explaining the why behind non-obvious logic.
- After completing any code changes, always run `/review` then `/security-review`.
