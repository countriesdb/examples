# Basic Multi-select Example

This example demonstrates how to use the CountriesDB widget with multi-select functionality using the standard HTML `multiple` attribute.

## Features

- Country multi-select with `multiple` attribute
- Subdivision multi-select (standalone US states) with `multiple` attribute
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

The `multiple` attribute on select elements enables multi-select functionality. The widget will populate options as usual and dispatch `countriesWidget:update` events with `detail.selectedValues` as an array of selected codes. This works for both country and subdivision selects.

