# Default Language Example

This example demonstrates how to set a default fallback language using `defaultLanguage` in the global configuration.

## Features

- Sets French (fr) as the default fallback language
- Widget prefers browser language, but falls back to French when unavailable
- Only used when `forcedLanguage` is not set and browser language cannot be resolved

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html` with your actual API public key.

2. Serve the files using any static file server:

   **Python:**
   ```bash
   python3 -m http.server 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Node.js (serve):**
   ```bash
   npx serve -p 8000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open `http://localhost:8000` in your browser.

## How It Works

The `defaultLanguage` option in `window.CountriesDBConfig` sets a fallback language. The widget will:
1. First try to use the user's browser language (Accept-Language)
2. If that's not available, fall back to the default language (French in this example)
3. If the default language is also not available, fall back to English

This only applies when `forcedLanguage` is not set.

