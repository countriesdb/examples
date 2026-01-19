# CountriesDB Widget - React Examples

This directory contains React examples demonstrating various features of the CountriesDB widget.

## Available Examples

- **[basic](./basic/)** - Basic widget setup with country and subdivision selection
- **[subdivisions](./subdivisions/)** - Country and subdivision selection with linked selects
- **[preselection](./preselection/)** - Preselecting countries and subdivisions
- **[disable-geolocation](./disable-geolocation/)** - Disabling geolocation preselection
- **[custom-label](./custom-label/)** - Custom labels for select elements
- **[custom-default-value](./custom-default-value/)** - Custom default values for select elements
- **[standalone-subdivision](./standalone-subdivision/)** - Standalone subdivision selects without country selection
- **[nested-prefix](./nested-prefix/)** - Nested prefixes for hierarchical subdivisions
- **[prefer-official-per-select](./prefer-official-per-select/)** - Preferring official ISO subdivisions per select
- **[multi-select-basic](./multi-select-basic/)** - Basic multi-select for countries and subdivisions
- **[multi-select-preselected](./multi-select-preselected/)** - Multi-select with preselected values
- **[multi-select-single-country](./multi-select-single-country/)** - Single country with multi-select subdivisions
- **[ready-event](./ready-event/)** - Wait for `countriesWidget:ready` before wiring listeners
- **[update-select](./update-select/)** - Listening to countriesWidget:update events
- **[update-multiselect](./update-multiselect/)** - Listening to countriesWidget:update events with multi-select
- **[force-language](./force-language/)** - Forcing a specific language
- **[default-language](./default-language/)** - Setting a default fallback language
- **[follow-related](./follow-related/)** - Following related countries when selecting subdivisions
- **[follow-upward](./follow-upward/)** - Following upward to parent countries when selecting subdivisions
- **[prefer-official](./prefer-official/)** - Preferring official ISO subdivisions globally
- **[hide-subdivision-type](./hide-subdivision-type/)** - Hiding subdivision type display
- **[allow-parent-selection](./allow-parent-selection/)** - Allowing selection of parent subdivisions
- **[auto-init-delayed](./auto-init-delayed/)** - Delayed automatic initialization
- **[iso-country-names](./iso-country-names/)** - Using ISO short names for countries
- **[romanization-preference](./romanization-preference/)** - Setting romanization preference for subdivisions
- **[local-variant](./local-variant/)** - Preferring local variant names for subdivisions
- **[name-filter](./name-filter/)** - Custom name filtering using callback functions

## Framework Integration Examples

For complete framework integration examples, see:
- **[React Router Example](https://github.com/countriesdb/react-router-example)** - React Router v7 integration with widget reload on route navigation

## Getting Started

Each example is a standalone React application. To run an example:

1. Navigate to the example directory:
   ```bash
   cd examples/react/basic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Configuration

All examples use `YOUR_PUBLIC_KEY` as a placeholder for the CountriesDB API public key. Replace this with your actual public key before running the examples.

## Example Structure

Each example follows the same structure:

- `package.json` - Dependencies and scripts
- `index.html` - HTML entry point
- `src/App.tsx` - Main React component
- `src/main.tsx` - React entry point
- `src/vite-env.d.ts` - TypeScript definitions for the widget
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `README.md` - Example-specific documentation

## Common Patterns

All React examples follow these patterns:

1. **Widget Configuration**: Set `window.CountriesDBConfig` before importing the widget
2. **Dynamic Import**: Import `@countriesdb/widget` dynamically in `useEffect`
3. **Event Listeners**: Listen for `countriesWidget:update` events to track selections. Some scenarios (like `ready-event`) also listen for `countriesWidget:ready` to wait for the initial dataset.
4. **State Management**: Use React state to track selected values
5. **Data Attributes**: Use data attributes on select elements to configure the widget

## TypeScript Support

All examples are written in TypeScript and include type definitions for the widget API in `src/vite-env.d.ts`.
