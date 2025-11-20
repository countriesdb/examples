# ESM Disable Geolocation Example

This example shows how to disable GeoIP preselection using an ES module bundle built with Rollup.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update `public/index.html` with your CountriesDB `publicKey` inside `window.CountriesDBConfig`.

3. Build and run:
   ```bash
   npm run dev
   ```
   This builds `public/bundle.js` and serves the folder (typically http://localhost:3000).

## How it works

- `window.CountriesDBConfig` is defined before the bundle loads so auto-init can initialize the widget.
- Both selects use `data-preselected=""`, which disables the automatic GeoIP default.
- The subdivision select links to the country select via matching `data-name` / `data-country` attributes.


