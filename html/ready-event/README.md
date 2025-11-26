# Ready Event (HTML)

Demonstrates how to listen for the custom `countriesWidget:ready` event that fires separately for each select whenever the widget finishes populating options.

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

- The country select uses `data-name="country_ready"` and the subdivision select links to it with `data-country="country_ready"`.
- A document-level listener waits for `countriesWidget:ready` and filters for this form's selects.
- The ready event fires separately for each select: the country select fires once when its options are available, and the subdivision select fires on initial load plus every time it reloads (when the country changes).
- The example displays which select is ready, the phase (initial or reload), and the current value.

