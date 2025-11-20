# Follow Related Example

This example demonstrates how to enable automatic navigation between related countries and territories using `followRelated` in the global configuration.

## Features

- Enables automatic country switching when selecting subdivisions that are also countries
- Example: Selecting "Guam" from US subdivisions automatically switches the country to "Guam"
- Useful for handling complex country-territory relationships

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

The `followRelated` option in `window.CountriesDBConfig` enables automatic navigation. When you select a subdivision that is also a country (like Guam, Puerto Rico, etc.), the widget automatically changes the country selection to that territory.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Single-select country + multi-select subdivision:** Partially supported (uses first related subdivision)
- **Multi-select country + any subdivision:** Not supported (disabled when country is multi-select)

