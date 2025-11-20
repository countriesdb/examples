# ESM Custom Default Value Example

Rollup + ES modules example showing `data-default-value`.

## Setup

```bash
npm install
npm run dev
```

Open the URL printed by `serve` (defaults to http://localhost:3000).

## Configuration

- Edit `public/index.html` and set `publicKey` inside `window.CountriesDBConfig`.
- Adjust `data-default-value` to the placeholder value your backend expects.

## How it works

- `src/widget.js` imports the widget; auto-init uses the global config.
- Rollup bundles the entry file into `public/bundle.js`.
- `data-preselected=""` keeps the placeholder selected until the user chooses.
- Using the same `data-default-value` on both selects keeps submitted form data consistent.

