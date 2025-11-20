# Force Language Example (CommonJS)

Browserify example showing how to force Spanish via the global `window.CountriesDBConfig` object.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Edit `public/index.html`:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY',
    forcedLanguage: 'es'
  };
</script>
```

## How it works

- `src/widget.js` simply requires `@countriesdb/widget`; Browserify emits `public/bundle.js`.
- Because `forcedLanguage` is set in the global config, every select initialized by the widget renders in Spanish.
- The HTML form is identical to the basic example—only the configuration changes.

