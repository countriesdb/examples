# Prefer Official Subdivisions (HTML)

Demonstrates how to force official ISO subdivisions globally by setting `window.CountriesDBConfig.preferOfficialSubdivisions = true`.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- `window.CountriesDBConfig` is defined **before** loading the widget script and includes:
  ```js
  {
    publicKey: 'YOUR_PUBLIC_KEY',
    preferOfficialSubdivisions: true
  }
  ```
- This makes every subdivision select request the official ISO list even if the account has access to extended translations.
- You can still opt-in per select by adding `data-prefer-official` if you want most selects to use extended lists but a few to use official; the global flag simply applies to all selects by default.

