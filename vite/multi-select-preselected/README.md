# Preselected Multi-select Example (Vite)

This example demonstrates how to use the CountriesDB widget with multi-select functionality and preselected values in a Vite project.

## Features

- Country multi-select with preselected values (comma-separated country codes: `US,CA`)
- Subdivision multi-select with preselected values (comma-separated COUNTRY-CODE format: `US-CA,US-NY`)
- The widget dispatches `countriesWidget:update` events with `detail.selectedValues` as an array of selected codes
- Hot module replacement during development

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key in `index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY'
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
multi-select-preselected/
├── src/
│   └── main.js            # Entry point that imports the widget
├── index.html             # HTML with preselected multi-select elements
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
3. The widget automatically initializes and finds select elements with `multiple` attribute and `data-preselected` values.
4. The `data-preselected` attribute accepts comma-separated values:
   - For country selects: use country codes (e.g., `US,CA`)
   - For subdivision selects: use COUNTRY-CODE format (e.g., `US-CA,US-NY`)

