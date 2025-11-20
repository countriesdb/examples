# Standalone Subdivision Example (Vite)

This example demonstrates how to use the CountriesDB widget with standalone subdivision selects using the `data-country-code` attribute in a Vite project.

## Features

- Standalone subdivision selects for specific countries
- Uses `data-country-code` to specify the country directly
- Custom labels for each select
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
standalone-subdivision/
├── src/
│   └── main.js            # Entry point that imports the widget
├── index.html             # HTML with select elements
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
3. The widget automatically initializes and finds select elements with `data-country-code` attributes.
4. Each subdivision select loads subdivisions for the specified country independently.

