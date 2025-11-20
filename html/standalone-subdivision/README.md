# Standalone Subdivision Example

This example demonstrates how to use the CountriesDB widget with standalone subdivision selects using the `data-country-code` attribute. This allows subdivision selects to work independently without requiring a country select element.

## Features

- Standalone subdivision selects for specific countries
- Uses `data-country-code` to specify the country directly
- Custom labels for each select

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

The `data-country-code` attribute allows subdivision selects to work independently by specifying the country directly (e.g., "US", "CA", "GB"). The widget automatically loads subdivisions for the specified country without requiring a separate country select element.

