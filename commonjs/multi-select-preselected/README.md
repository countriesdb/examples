# Preselected Multi-select Example (CommonJS)

This example demonstrates how to use the CountriesDB widget with multi-select functionality and preselected values in a CommonJS environment.

## Features

- Country multi-select with preselected values (comma-separated country codes: `US,CA`)
- Subdivision multi-select with preselected values (comma-separated COUNTRY-CODE format: `US-CA,US-NY`)
- The widget dispatches `countriesWidget:update` events with `detail.selectedValues` as an array of selected codes
- Bundled with Browserify for browser compatibility

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key in `public/index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY'
   };
   ```

3. Build and run:
   ```bash
   npm run dev
   ```

   This will build the bundle and start a local server at `http://localhost:3000`.

## Project Structure

```
multi-select-preselected/
├── src/
│   └── widget.js          # Entry point that requires the widget
├── public/
│   ├── index.html         # HTML with preselected multi-select elements
│   └── bundle.js         # Generated bundle (created by build)
├── package.json
└── README.md
```

## How It Works

1. The widget is required in `src/widget.js`, which gets bundled by Browserify.
2. `window.CountriesDBConfig` is set in `index.html` before the bundle loads, allowing auto-init to read the configuration.
3. The widget automatically initializes and finds select elements with `multiple` attribute and `data-preselected` values.
4. The `data-preselected` attribute accepts comma-separated values:
   - For country selects: use country codes (e.g., `US,CA`)
   - For subdivision selects: use COUNTRY-CODE format (e.g., `US-CA,US-NY`)

