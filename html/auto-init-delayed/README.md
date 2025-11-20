# Delayed Auto Init - HTML

Demonstrates how to disable automatic widget initialization and manually control when the widget loads by setting `auto_init=0` in the script URL.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The script URL includes `auto_init=0` to disable automatic initialization
- The widget script loads but does NOT automatically populate the dropdowns
- The `window.CountriesWidgetLoad()` function is exposed for manual initialization
- Click the "LOAD SCRIPT" button to manually initialize the widget
- This is useful when you want to delay loading until specific conditions are met (user authentication, form validation, etc.)

## Use Cases

- Delay loading until user is authenticated
- Wait for form validation before loading
- Load only when a specific condition is met
- Reduce initial page load time by deferring widget initialization

