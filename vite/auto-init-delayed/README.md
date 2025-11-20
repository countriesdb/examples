# Delayed Auto Init - Vite

This Vite example shows how to disable automatic widget initialization and manually control when the widget loads.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `autoInit: false` to disable automatic initialization

## How it works

- `src/main.js` imports the widget; the widget reads config from `window.CountriesDBConfig`
- `autoInit: false` prevents automatic initialization when the script loads
- The `window.CountriesWidgetLoad()` function is exposed for manual initialization
- Click the "LOAD SCRIPT" button to manually initialize the widget
- This is useful when you want to delay loading until specific conditions are met (user authentication, form validation, etc.)

## Use Cases

- Delay loading until user is authenticated
- Wait for form validation before loading
- Load only when a specific condition is met
- Reduce initial page load time by deferring widget initialization

