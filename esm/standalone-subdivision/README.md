# Standalone Subdivision Example (ESM)

This example demonstrates how to use the CountriesDB widget with standalone subdivision selects using the `data-country-code` attribute in an ES Modules environment.

## Features

- Standalone subdivision selects for specific countries
- Uses `data-country-code` to specify the country directly
- Custom labels for each select
- Bundled with Rollup for browser compatibility

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
standalone-subdivision/
├── src/
│   └── widget.js          # Entry point that imports the widget
├── public/
│   ├── index.html         # HTML with select elements
│   └── bundle.js          # Generated bundle (created by build)
├── rollup.config.js       # Rollup configuration
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/widget.js`, which gets bundled by Rollup.
2. `window.CountriesDBConfig` is set in `index.html` before the bundle loads, allowing auto-init to read the configuration.
3. The widget automatically initializes and finds select elements with `data-country-code` attributes.
4. Each subdivision select loads subdivisions for the specified country independently.

