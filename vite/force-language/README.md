# Force Language Example (Vite)

Vite example that forces Spanish via `window.CountriesDBConfig`.

## Setup

```bash
npm install
npm run dev
```

Vite prints the preview URL (usually http://localhost:5173).

## Configure your key

Update `index.html`:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY',
    forcedLanguage: 'es'
  };
</script>
```

## How it works

- `src/main.js` imports `@countriesdb/widget`; auto-init reads the global config.
- Because `forcedLanguage` is set globally, all selects render Spanish labels.
- This approach matches bundler usage where configuration must be available before the widget initializes.

