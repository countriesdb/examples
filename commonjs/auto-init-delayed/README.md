# Delayed Auto Init - CommonJS

Demonstrates how to disable automatic widget initialization and manually control when the widget loads using CommonJS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Replace `YOUR_PUBLIC_KEY` in `public/index.html`.

3. Build the bundle:
   ```bash
   npm run build
   ```

4. Serve the `public` folder:
   ```bash
   npm run dev
   ```

5. Visit the printed URL (usually `http://localhost:3000`).

## How it works

- `window.CountriesDBConfig` includes `autoInit: false` to disable automatic initialization
- The widget script loads but does NOT automatically populate the dropdowns
- The `window.CountriesWidgetLoad()` function is exposed for manual initialization
- Click the "LOAD SCRIPT" button to manually initialize the widget
- This is useful when you want to delay loading until specific conditions are met (user authentication, form validation, etc.)

## Use Cases

- Delay loading until user is authenticated
- Wait for form validation before loading
- Load only when a specific condition is met
- Reduce initial page load time by deferring widget initialization

