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

## Component conventions

**`classBuilder.add/remove` must always be inside `useEffect`, never in the render body.**
Calling `classBuilder.add()` directly in the render function calls `notify()` → `setClassesString()` → setState during render → React infinite loop. Always wrap in `useEffect` with the relevant dependency:
```tsx
React.useEffect(() => {
  classBuilder.add(`ap-foo--${variant}`)
  return () => { classBuilder.remove(`ap-foo--${variant}`) }
}, [variant])
```

**Component fields in data structures must be `React.ComponentType`, never `ReactElement`.**
Storing `<MyPage />` (a ReactElement instance) in a data structure creates a new object reference on every parent render. React sees a different element each time and unmounts/remounts the component — causing the equivalent of a full page reload on every navigation. Always store the component reference (`MyPage`) and let the renderer instantiate it:
```tsx
// Wrong — new object every render, causes remounting
{ component: <MyPage /> }

// Correct — stable reference, React can reconcile properly
{ component: MyPage }
```

## Peer dependencies

The following are `peerDependencies` (must be provided by the consumer, not bundled):
- `react`, `react-dom`, `react-router`
- `react-responsive`
- `@fortawesome/react-fontawesome` + free icon packs (solid, regular, brands)
- `@sol.ac/js-utils`

---

## Testing

### Setup

- `jest.config.js` at the repo root (not in `package.json`)
- `testEnvironment: 'jsdom'` — all components run in a browser-like environment
- `setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']` — imports `@testing-library/jest-dom`
- CSS imports are mapped to `__mocks__/styleMock.js` via `moduleNameMapper`
- `transformIgnorePatterns` must allow `react-router` and `@remix-run` through (they ship as ESM)
- 100% coverage enforced on all metrics (branches, functions, lines, statements)
- `collectCoverageFrom` targets `src/lib/**` only — `src/app/` is the demo app and must be excluded

### Spec file co-location

Tests live alongside source: `Foo.tsx` + `Foo.spec.tsx`. The build pipeline excludes them via:
- `tsconfig.build.json` — `exclude` list covers both `*.spec.ts` and `*.spec.tsx`
- Babel `--ignore` — covers all four patterns (`*.spec.ts`, `*.spec.tsx`, `*.test.ts`, `*.test.tsx`)
- Babel `--no-copy-ignored` — prevents `--copy-files` from copying spec sources to `dist/`
- `build:clean-tests` — removes any `*.spec.js` / `*.test.js` / `*.spec.d.ts` / `*.test.d.ts` that slip through

### Mocking the barrel (`'../..'`)

Every component spec mocks `'../..'` (the library's `index.ts` barrel) to break circular dependencies and control what the component sees:

```tsx
jest.mock('../..', () => {
  const { useClasses, useClasseName } = require('../../hooks/useClasses')
  return {
    __esModule: true,
    useClasses,
    useClasseName,
    // other exports the component under test needs
  }
})
```

**Always `require` the real hook implementations** — `useClasses` and `useClasseName` must be the real functions, not stubs, because they manage the internal class-string state that the component renders.

### Covering constant/enum files

Files like `ButtonSemantic.ts` that only export a type alias and a constant object reach 0% coverage because the spec mocks the barrel that imports them. Fix: spread the real module in the mock factory instead of redefining the values inline:

```ts
// Wrong — defines mock values inline, real file never executed
ButtonSemantics: { DEFAULT: 'DEFAULT', POSITIVE: 'POSITIVE', ... }

// Correct — executes the real file, covers it
...require('./ButtonSemantic'),
```

### Avoiding untestable branches

Several patterns create Istanbul branches that can never be exercised:

**Redundant optional chaining on always-defined values** — `values?.length` where `values: SelectValue[]` is never null. Replace with `values.length`. Same for `menuDef?.length`, `items?.length` etc.

**Ref null guards in event handlers** — `if (sliderBar?.current)` inside a mouse handler: the `?.` on the ref object itself (not `.current`) creates a null branch that can never be taken since `useRef` always returns an object. Remove the `?.`, keep the `if (sliderBar.current)` null-check on `.current` if the handler can fire from a document-level listener after unmount.

**Ref null guards post-mount** — `if (textarea.current)` or `if (container.current)` inside handlers that only fire after the component is mounted. The ref is always set by the time any event fires. Replace with `ref.current!` (non-null assertion) to remove the dead branch.

**Default parameters that are never defaulted** — `function buildContext(items: IMenuItemDef[] = [])` where callers always pass the argument. Remove the default to eliminate the "was the default used?" branch.

**`|| []` fallback on always-array values** — `let items = menuItems || []` where `menuItems` is guaranteed non-null. Remove the `|| []`.

### Timer-related act() warnings

The Slider uses `setTimeout` to hide the tooltip. Tests that use fake timers must wrap timer advancement in `act()`:

```ts
// afterEach — fires pending timers including setShowTooltip(false)
afterEach(() => {
  act(() => jest.runOnlyPendingTimers())
  jest.useRealTimers()
})

// In tests
act(() => { jest.runAllTimers() })
```

Calling `jest.runOnlyPendingTimers()` or `jest.runAllTimers()` bare (outside `act`) triggers "An update was not wrapped in act()" warnings because the timer callback calls `setState`.

### NaN prop warnings

Components that pass numeric props (e.g. `min`, `max`) to native DOM elements should guard against `NaN` before passing to the DOM:

```tsx
// Triggers "Received NaN for the `min` attribute" warning
<input min={min} />

// Correct — undefined is ignored by React, NaN is not
<input min={isNaN(min) ? undefined : min} />
```

### Mocking React.useRef — don't

Mocking `React.useRef` with `mockReturnValueOnce` to simulate a null ref corrupts React's fiber hook state. The re-render triggered by the subsequent state update breaks because hook ordering is violated. Defensive guards like `if (ref.current)` that only exist to protect against a null ref that can never be null in normal rendering are best removed rather than tested through hook mocking.
