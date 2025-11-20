# ESM Custom Labels Example

Rollup-based example showing how to customize placeholder labels for the CountriesDB widget with ES modules.

## Setup

```bash
npm install
npm run dev
```

`serve` will print the URL (defaults to http://localhost:3000).

## Configuration

1. Open `public/index.html`
2. Set your CountriesDB `publicKey` inside `window.CountriesDBConfig`
3. Adjust the `data-label` text to whatever placeholder copy you need

## How it works

- `src/widget.js` imports `@countriesdb/widget`; no manual init needed
- Rollup bundles to `public/bundle.js`
- `window.CountriesDBConfig` provides runtime configuration before the bundle executes
- `data-label` customizes the placeholder text for each select
- `data-preselected=""` keeps the placeholder selected until the user chooses an option

