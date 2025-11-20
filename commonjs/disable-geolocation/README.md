# CommonJS Disable Geolocation Example

This example shows how to disable GeoIP preselection while bundling `@countriesdb/widget` with Browserify.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update `public/index.html` with your CountriesDB `publicKey` in `window.CountriesDBConfig`.

3. Build and run:
   ```bash
   npm run dev
   ```
   The command builds `bundle.js` and serves the `public/` directory (defaults to http://localhost:3000).

## How it works

- `window.CountriesDBConfig` is defined before `bundle.js` so auto-init can use your key.
- Both the country and subdivision selects use `data-preselected=""`, stopping the widget from auto-selecting values via GeoIP.
- The subdivision select references the country select via `data-country="country_no_geo"`.


