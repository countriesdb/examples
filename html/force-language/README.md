# Force Language Example (HTML)

Demonstrates how to force the widget to render countries and subdivisions in a specific language (Spanish) using the global `window.CountriesDBConfig` object.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (`python -m http.server`, `npx serve .`, etc.).
3. Open the printed URL (e.g., http://localhost:8000).

## How it works

- `window.CountriesDBConfig` is defined **before** loading the widget script and includes:
  ```js
  {
    publicKey: 'YOUR_PUBLIC_KEY',
    forcedLanguage: 'es'
  }
  ```
- Because this is a global configuration, it applies to every select that the widget initializes on the page.
- The country and subdivision selects are standard single-select elements linked via `data-name` / `data-country`.

