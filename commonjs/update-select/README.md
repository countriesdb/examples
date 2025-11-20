# :update Event (CommonJS)

Listen for `countriesWidget:update` in a Browserify bundle.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Edit `public/index.html` and set `window.CountriesDBConfig.publicKey`.

## How it works

- `src/widget.js` requires the widget so Browserify outputs `public/bundle.js`, then registers the `countriesWidget:update` listeners.
- The bundled script renders the current selections, keeping the summary in sync with user actions and automatic updates.
- The event fires for both user-initiated changes and automatic updates (GeoIP, reload, preselection).

