# Vite Disable Geolocation Example

This example shows how to disable GeoIP preselection while using `@countriesdb/widget` in a Vite project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update `index.html` with your CountriesDB `publicKey` inside `window.CountriesDBConfig`.

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Vite prints the local URL (usually http://localhost:5173).

## How it works

- `src/main.js` imports `@countriesdb/widget`; auto-init handles initialization.
- `window.CountriesDBConfig` is defined before the module script so the widget knows your key.
- Both selects set `data-preselected=""`, which disables automatic GeoIP preselection.
- The subdivision select links to the country select via matching `data-name` / `data-country` attributes.


