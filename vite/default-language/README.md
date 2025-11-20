# Default Language Example (Vite)

This example demonstrates how to set a default fallback language using `defaultLanguage` in the global configuration in a Vite project.

## Features

- Sets French (fr) as the default fallback language
- Widget prefers browser language, but falls back to French when unavailable
- Only used when `forcedLanguage` is not set and browser language cannot be resolved
- Hot module replacement during development

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and default language in `index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       defaultLanguage: 'fr'
   };
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   This will start Vite's development server, typically at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

   The built files will be in the `dist/` directory.

## Project Structure

```
default-language/
├── src/
│   └── main.js            # Entry point that imports the widget
├── index.html             # HTML with select elements and global config
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
3. The `defaultLanguage` option sets a fallback language that is used when:
   - The browser language cannot be resolved to a supported translation
   - `forcedLanguage` is not set
4. If the default language is also not available, the widget falls back to English.

