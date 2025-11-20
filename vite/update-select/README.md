# :update Event (Vite)

Vite + ES modules example that listens for the `countriesWidget:update` event.

## Setup

```bash
npm install
npm run dev
```

Vite prints the preview URL (usually http://localhost:5173).

## Configure your key

Set `window.CountriesDBConfig.publicKey` in `index.html`.

## How it works

- `src/main.js` imports the widget so auto-init runs when the module loads, then registers the `countriesWidget:update` listeners.
- The bundled module renders the current selection state whenever either select changes.
- The event fires for user changes and automatic widget updates, keeping the summary in sync.

