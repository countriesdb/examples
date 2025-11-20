# Allow Parent Selection - Vite

This Vite example shows how to enable selection of parent subdivisions in multi-level administrative hierarchies.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `allowParentSelection: true` to enable parent subdivision selection

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `allowParentSelection: true` enables selection of parent subdivisions in multi-level hierarchies
- By default, users can only select the most nested subdivisions (the most specific ones)
- When enabled, users can also select parent subdivisions, which are more general administrative levels
- This is particularly useful for countries with complex administrative hierarchies (like France, United Kingdom, etc.) where you want to allow selection at different levels of specificity

