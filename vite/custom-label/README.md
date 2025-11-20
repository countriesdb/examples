# Vite Custom Labels Example

This Vite example shows how to override the default placeholder labels rendered by `@countriesdb/widget`.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. Update the `data-label` attributes to match your copy tone

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `data-label` defines custom placeholder text for each select
- `data-preselected=""` keeps the placeholder active until the user selects a value
- `data-country="country_label"` links the subdivision select to its parent country select

