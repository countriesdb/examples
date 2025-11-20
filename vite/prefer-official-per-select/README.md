# Prefer Official Subdivisions (Per-Select) - Vite

This Vite example shows how to use `data-prefer-official` on a specific subdivision select to show official ISO subdivisions instead of extended translations.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The subdivision select has `data-prefer-official` attribute to use official ISO data

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `data-prefer-official` on the subdivision select makes only this specific select request official ISO subdivisions
- Other subdivision selects on the page (if any) will use the default behavior (extended if available)
- This attribute only works when your plan includes extended subdivisions

