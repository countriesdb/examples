# :update Event (ESM)

Rollup + ES modules example that listens for the `countriesWidget:update` event.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Set `window.CountriesDBConfig.publicKey` in `public/index.html`.

## How it works

- `src/widget.js` imports the widget so Rollup outputs `public/bundle.js`, then wires up the `countriesWidget:update` listeners.
- The module renders the current selections whenever either select updates, keeping the summary in sync.
- The event fires for user changes and automatic widget updates, keeping the UI in sync.

