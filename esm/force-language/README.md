# Force Language Example (ESM)

Rollup example that forces Spanish via `window.CountriesDBConfig`.

## Setup

```bash
npm install
npm run dev
```

`serve` prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Update `public/index.html`:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY',
    forcedLanguage: 'es'
  };
</script>
```

## How it works

- `src/widget.js` imports the widget; Rollup outputs `public/bundle.js`.
- Because `forcedLanguage` is part of the global config, the widget loads Spanish labels automatically.
- Any additional selects on the page will also render in Spanish while this config is active.

