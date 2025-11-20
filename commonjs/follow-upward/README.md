# Follow Upward Example (CommonJS)

This example demonstrates how to enable automatic navigation up the subdivision hierarchy using `followUpward` in the global configuration in a CommonJS environment.

## Features

- Enables automatic country switching to parent countries when selecting subdivisions that are also countries
- Example: Selecting "Guam" from subdivisions automatically switches the country to "United States" (Guam's parent)
- Useful for handling complex country-territory relationships where territories are both subdivisions and countries
- Bundled with Browserify for browser compatibility

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and followUpward in `public/index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       followUpward: true
   };
   ```

3. Build and run:
   ```bash
   npm run dev
   ```

   This will build the bundle and start a local server at `http://localhost:3000`.

## Project Structure

```
follow-upward/
├── src/
│   └── widget.js          # Entry point that requires the widget
├── public/
│   ├── index.html         # HTML with select elements and global config
│   └── bundle.js          # Generated bundle (created by build)
├── package.json
└── README.md
```

## How It Works

1. The widget is required in `src/widget.js`, which gets bundled by Browserify.
2. `window.CountriesDBConfig` is set in `index.html` before the bundle loads, allowing auto-init to read the configuration.
3. The `followUpward` option enables automatic navigation up the subdivision hierarchy when selecting subdivisions that are also countries.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Any multi-select scenario:** Not supported (completely disabled if either select has the multiple attribute)

