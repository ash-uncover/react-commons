# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this library is

`@sol.ac/react-commons` is a React UI component library. It is **not published to npm** — consumers install it directly from GitHub:

```json
"@sol.ac/react-commons": "ash-uncover/react-commons"
```

Because of this, `dist/` is committed to the repository. The pre-commit hook ensures it is always up to date.

## Commands

```bash
npm run dev            # Webpack dev server on port 8080 (hot reload, demo app)
npm run build          # Compile library to dist/ (TypeScript + Babel)
npm run watch          # Watch mode: TSC + Babel in parallel
npm run build:docs     # Build demo site to docs/ (Webpack production)
npm run test           # Jest
npm run test:coverage  # Jest with coverage
```

## Project layout

```
src/
  app/          ← demo application for local development (not published)
    index.tsx   ← Webpack entry point
    components/ ← demo pages exercising library components
  lib/          ← the published library (compiled to dist/)
    index.ts    ← public API re-export
    index.css   ← CSS custom properties (design tokens)
    components/ ← one folder per component (*.tsx + *.css)
    hooks/      ← shared React hooks
    lib/        ← constants (ResponsiveBreakpoint)
```

## Build system

Three tsconfig files:
- `tsconfig.json` — base (ES6, CommonJS, JSX: React, strict)
- `tsconfig.build.json` — library output only, excludes `src/app/` and tests
- `tsconfig.webpack.json` — used by the Webpack dev server for the demo app

Three webpack configs:
- `webpack.config.base.js` — shared loaders (babel-loader for JS/JSX, ts-loader for TS, css-loader, asset rules)
- `webpack.config.dev.js` — extends base, dev server on port 8080, source maps, SPA fallback
- `webpack.config.docs.js` — extends base, production build to `docs/`

Library build uses TypeScript (`build:tsc`) followed by Babel (`build:babel`) — Babel handles transpilation of the compiled TypeScript.

## Pre-commit hook

The pre-commit hook (not pre-push) builds the library and demo site and stages all generated files:
```bash
npm run build && npm run build:docs && git add -A .
```
This ensures `dist/` is always current when consumers install from the GitHub reference.

## Components

All components are in `src/lib/components/`, one folder each. Each folder contains a `.tsx` file and a `.css` file. Components use CSS custom properties defined in `src/lib/index.css` for all sizing, color, and spacing.

Key components: Avatar, Button, FormGroup, ImageUploader, Input, Label, Menu, Panel, Select, Shell / ShellContainer / ShellPage, Slider, Switch, TextArea, Title.

## Hooks

Located in `src/lib/hooks/`:
- `useClasses` — dynamic CSS class builder
- `useIsPhone` — mobile detection via `react-responsive` (≤769px)
- `usePrevious` — previous prop value via `useRef`
- `useQuery` — URL search params via `react-router`

## Styling

Styling is built on three layers of CSS custom properties, all prefixed with `--ap-`.

**Layer 1 — Global design tokens** (`src/lib/index.css`, `:root`)
Raw values defined once for the whole library: brand colors, semantic colors (positive, negative, warning…), shell depth levels, a size scale, and spacing/radius aliases that reference that scale.

**Layer 2 — Component tokens** (each component's `.css` file, `:root`)
Each component declares its own scoped variables using the pattern `--ap-{component}--{property}`. Default values reference Layer 1 tokens where relevant. The base class then uses only these component variables — never raw values.

**Layer 3 — Variant overrides** (modifier classes inside the component)
Modifier classes (applied at runtime by `ClassBuilder`) do not redeclare CSS properties — they only reassign the component-scoped variables. The base class declarations stay untouched and automatically pick up the new values. State variants (`:hover`, disabled…) follow the same pattern.

The key principle: CSS property declarations appear exactly once per component in the base class. Variants and states only manipulate variables. A consumer can restyle any component by redefining its `--ap-{component}--*` variables without touching the component's internal rules.

### CSS class naming

All classes follow **BEM** with the `ap-` library prefix.

| Pattern | Purpose | Example |
|---------|---------|---------|
| `.ap-{component}` | Root element of the component | `.ap-button`, `.ap-panel` |
| `.ap-{component}__{element}` | Internal child element | `.ap-panel__header`, `.ap-input__input` |
| `.ap-{component}__{element}__{sub}` | Nested child element | `.ap-panel__header__title` |
| `.ap-{component}--{modifier}` | Variant or state applied to the root | `.ap-button--positive`, `.ap-panel--collapsed` |

Modifiers are added and removed at runtime via `ClassBuilder` (from the `useClasses`/`useClasseName` hooks). Child element classes are static — set directly in JSX.

## Peer dependencies

The following are `peerDependencies` (must be provided by the consumer, not bundled):
- `react`, `react-dom`, `react-router`
- `react-responsive`
- `@fortawesome/react-fontawesome` + free icon packs (solid, regular, brands)
- `@sol.ac/js-utils`
