# Single Country with Multi-select Subdivisions (ESM)

Rollup-based example linking a single-select country dropdown with a multi-select subdivision list.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Set `window.CountriesDBConfig.publicKey` in `public/index.html` before `bundle.js` loads.

## How it works

- Country select uses `data-name="country_single"`.
- Subdivision select uses `multiple` plus `data-country="country_single"` to follow the selected country.
- Multi-select subdivision lists ignore placeholder-related attributes, so only the required attributes are included.
- `src/widget.js` imports the widget; Rollup outputs `public/bundle.js`.

