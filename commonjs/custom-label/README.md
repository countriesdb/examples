# CommonJS Custom Labels Example

This Browserify example shows how to set custom placeholder labels for the CountriesDB widget using CommonJS.

## Setup

```bash
npm install
npm run dev
```

Then open the URL printed by `serve` (defaults to http://localhost:3000).

## Configuration

1. Edit `public/index.html`
2. Set `publicKey` inside `window.CountriesDBConfig`
3. Adjust `data-label` values for the selects if you want different copy

## How it works

- `src/widget.js` requires `@countriesdb/widget`; auto-init reads config from `window.CountriesDBConfig`
- Browserify bundles the widget into `public/bundle.js`
- `data-label` overrides the default placeholder text for each select
- `data-preselected=""` keeps the placeholder option selected until the user chooses a value
- The subdivision select links to the country select via `data-country="country_label"`

