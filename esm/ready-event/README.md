# Ready Event (ESM)

Rollup + ES modules example that listens for `countriesWidget:ready` events.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Set `window.CountriesDBConfig.publicKey` in `public/index.html`.

## How it works

- `src/widget.js` imports the widget so Rollup outputs `public/bundle.js`, then adds a document-level `countriesWidget:ready` listener.
- The ready event fires separately for each select: the country select fires once when its options are available, and the subdivision select fires on initial load plus every time it reloads (when the country changes).
- The example displays which select is ready, the phase (initial or reload), and the current value.

