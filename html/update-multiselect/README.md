# Multi-select :update Example

This example demonstrates how to listen to `countriesWidget:update` events with multi-select selects.

## Features

- Multi-select country and subdivision selects
- Event handlers for both `countriesWidget:update` and native `change` events
- Uses `e.detail.selectedValues` array from the update event
- Displays selected values in real-time

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

The example listens to both `countriesWidget:update` events (which provide `e.detail.selectedValues` as an array) and native `change` events (which require manually extracting values from `selectedOptions`). This ensures the output updates correctly for both widget-initiated and user-initiated changes.

