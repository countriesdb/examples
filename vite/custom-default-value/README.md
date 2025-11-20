# Vite Custom Default Value Example

Shows how to override the placeholder value with `data-default-value` in a Vite setup.

## Setup

```bash
npm install
npm run dev
```

Vite prints the preview URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`.
2. Set your CountriesDB public key in `window.CountriesDBConfig`.
3. Change `data-default-value` to match whatever sentinel value your backend expects.

## How it works

- `src/main.js` imports `@countriesdb/widget`; the widget auto-initializes.
- `data-preselected=""` keeps the placeholder selected until the user chooses an option.
- Using the same `data-default-value` on both selects gives you predictable form submissions.

