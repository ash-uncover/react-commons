# react-commons

React UI component library for `@sol.ac` projects. Distributed via GitHub reference, not npm.

```json
"@sol.ac/react-commons": "ash-uncover/react-commons"
```

## Source structure

```
src/
  app/   ← demo application (local development only, never distributed)
  lib/   ← the library (compiled to dist/ and committed)
```

`src/app` is a Webpack-driven demo app used for visual development. It is not part of the distributed library.  
`src/lib` is what consumers get — it compiles to `dist/` via the two-step build (tsc + Babel).

## Exported API

### Components

| Export | Companion types | Description |
|--------|----------------|-------------|
| `Avatar` | `AvatarSize`, `AvatarSizes` | User avatar with optional icon and color nuance |
| `Button` | `ButtonSemantic`, `ButtonSemantics` | Button with optional icon and semantic variants |
| `FormGroup` | `FormGroupDirection`, `FormGroupDirections` | Label + field wrapper with horizontal/vertical layout |
| `ImageUploader` | — | Image upload field with preview |
| `Input` | — | Single-line text input |
| `Label` | — | Text label |
| `Menu` | — | Navigation menu with nested items and selection state |
| `MenuNavigationItem` | — | Individual menu item |
| `MenuNavigationList` | — | List of menu items |
| `Panel` | — | Collapsible content panel |
| `PanelHeader` | — | Panel header slot |
| `PanelFooter` | — | Panel footer slot |
| `Select` | — | Dropdown select |
| `Shell` | — | Top-level app layout (wraps ShellContainer) |
| `ShellContainer` | — | Scrollable content area within a shell |
| `ShellPage` | — | Full-height page slot within a shell |
| `Slider` | — | Range slider input |
| `Switch` | — | Toggle switch |
| `TextArea` | — | Multi-line text input |
| `Title` | `TitleLevel`, `TitleLevels` | Heading element with configurable level |

### Hooks

| Export | Description |
|--------|-------------|
| `useClasses` | Reactive CSS class string builder — returns a `ClassBuilder` and the current class string |
| `useClasseName` | Attaches/detaches a class name to an existing `ClassBuilder` based on component lifecycle |
| `useIsPhone` | Returns `true` when the viewport matches a phone (portrait + small width or landscape + small height) |
| `useQuery` | Returns `URLSearchParams` parsed from the current route location |
| `usePrevious` | Returns the value of a prop or state from the previous render |

### Constants

| Export | Description |
|--------|-------------|
| `ICONS` | FontAwesome icon references used across the library |
| `ResponsiveBreakpoint`, `ResponsiveBreakpoints` | Breakpoint values (`S` = 769 px) used by `useIsPhone` |
