# Follow Related Example (ESM)

This example demonstrates how to enable automatic navigation between related countries and territories using `followRelated` in the global configuration in an ES Modules environment.

## Features

- Enables automatic country switching when selecting subdivisions that are also countries
- Example: Selecting "Guam" from US subdivisions automatically switches the country to "Guam"
- Useful for handling complex country-territory relationships
- Bundled with Rollup for browser compatibility

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and followRelated in `public/index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       followRelated: true
   };
   ```

3. Build and run:
   ```bash
   npm run dev
   ```

   This will build the bundle and start a local server at `http://localhost:3000`.

## Project Structure

```
follow-related/
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
3. The `followRelated` option enables automatic navigation when selecting subdivisions that are also countries.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Single-select country + multi-select subdivision:** Partially supported (uses first related subdivision)
- **Multi-select country + any subdivision:** Not supported (disabled when country is multi-select)

