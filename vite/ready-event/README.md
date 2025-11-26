# Ready Event (Vite)

Vite + ES modules example that listens for `countriesWidget:ready` events.

## Setup

```bash
npm install
npm run dev
```

Vite prints the preview URL (usually http://localhost:5173).

## Configure your key

Set `window.CountriesDBConfig.publicKey` in `index.html`.

## How it works

- `src/main.js` imports the widget, sets up a document-level `countriesWidget:ready` listener, and filters for the demo selects.
- The ready event fires separately for each select: the country select fires once when its options are available, and the subdivision select fires on initial load plus every time it reloads (when the country changes).
- The example displays which select is ready, the phase (initial or reload), and the current value.

