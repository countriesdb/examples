# CommonJS Custom Default Value Example

Tiny Browserify setup that customizes the placeholder option value with `data-default-value`.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configuration

- Set your API key in `public/index.html` inside `window.CountriesDBConfig`.
- Update `data-default-value` if you need a different placeholder value (e.g. `select_country`).

## How it works

- `src/widget.js` simply requires `@countriesdb/widget`; auto-init handles the rest.
- Browserify outputs `public/bundle.js`, which the HTML page loads.
- `data-preselected=""` keeps the placeholder selected until the user chooses an option.
- Both selects share the same placeholder value (`not_selected`), which is useful for form validation.

