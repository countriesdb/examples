# Follow Upward Example

This example demonstrates how to enable automatic navigation up the subdivision hierarchy using `followUpward` in the global configuration.

## Features

- Enables automatic country switching to parent countries when selecting subdivisions that are also countries
- Example: Selecting "Guam" from subdivisions automatically switches the country to "United States" (Guam's parent)
- Useful for handling complex country-territory relationships where territories are both subdivisions and countries

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

The `followUpward` option in `window.CountriesDBConfig` enables automatic navigation up the subdivision hierarchy. When you select a subdivision that is also a country (like Guam, Puerto Rico, etc.), the widget automatically changes the country selection to the parent country of that subdivision.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Any multi-select scenario:** Not supported (completely disabled if either select has the multiple attribute)

