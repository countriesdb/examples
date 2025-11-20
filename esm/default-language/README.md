# Default Language Example (ESM)

This example demonstrates how to set a default fallback language using `defaultLanguage` in the global configuration in an ES Modules environment.

## Features

- Sets French (fr) as the default fallback language
- Widget prefers browser language, but falls back to French when unavailable
- Only used when `forcedLanguage` is not set and browser language cannot be resolved
- Bundled with Rollup for browser compatibility

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and default language in `public/index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       defaultLanguage: 'fr'
   };
   ```

3. Build and run:
   ```bash
   npm run dev
   ```

   This will build the bundle and start a local server at `http://localhost:3000`.

## Project Structure

```
default-language/
├── src/
│   └── widget.js          # Entry point that imports the widget
├── public/
│   ├── index.html         # HTML with select elements and global config
│   └── bundle.js          # Generated bundle (created by build)
├── rollup.config.js       # Rollup configuration
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/widget.js`, which gets bundled by Rollup.
2. `window.CountriesDBConfig` is set in `index.html` before the bundle loads, allowing auto-init to read the configuration.
3. The `defaultLanguage` option sets a fallback language that is used when:
   - The browser language cannot be resolved to a supported translation
   - `forcedLanguage` is not set
4. If the default language is also not available, the widget falls back to English.

