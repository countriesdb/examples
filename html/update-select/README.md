# :update Event (HTML)

Demonstrates how to listen for the custom `countriesWidget:update` event emitted by the widget whenever selections change (user action, GeoIP, preselection, reload).

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the directory with your preferred static server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   # or
   php -S localhost:8000
   ```
3. Open the URL printed by your server (for example, http://localhost:8000).

## How it works

- The country select uses `data-name="country_change"`.
- The subdivision select links to it with `data-country="country_change"`.
- A single listener handles `countriesWidget:update` for both selects and updates the output panel.
- The event is dispatched for user actions and widget-driven changes, so the output stays in sync even when values are preselected automatically.

