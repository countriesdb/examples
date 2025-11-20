# Preselected Multi-select Example

This example demonstrates how to use the CountriesDB widget with multi-select functionality and preselected values.

## Features

- Country multi-select with preselected values (comma-separated country codes: `US,CA`)
- Subdivision multi-select with preselected values (comma-separated COUNTRY-CODE format: `US-CA,US-NY`)
- The widget dispatches `countriesWidget:update` events with `detail.selectedValues` as an array of selected codes

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

The `data-preselected` attribute accepts comma-separated values:
- For country selects: use country codes (e.g., `US,CA`)
- For subdivision selects: use COUNTRY-CODE format (e.g., `US-CA,US-NY`)

The widget will automatically preselect these values when the select is populated.

