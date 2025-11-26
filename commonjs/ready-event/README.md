# Ready Event (CommonJS)

Listen for `countriesWidget:ready` in a Browserify bundle.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Edit `public/index.html` and set `window.CountriesDBConfig.publicKey`.

## How it works

- `src/widget.js` requires the widget so Browserify outputs `public/bundle.js`, then listens for `countriesWidget:ready`.
- The ready event fires separately for each select: the country select fires once when its options are available, and the subdivision select fires on initial load plus every time it reloads (when the country changes).
- The example displays which select is ready, the phase (initial or reload), and the current value.

