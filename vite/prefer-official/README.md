# Prefer Official Subdivisions (Vite)

Vite example that forces official ISO subdivisions everywhere using `window.CountriesDBConfig.preferOfficialSubdivisions`.

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
    preferOfficialSubdivisions: true
  };
</script>
```

## How it works

- `src/main.js` imports the widget; auto-init reads the global config before mounting.
- With `preferOfficialSubdivisions` enabled, subdivision requests include `prefer_official=1` so the API returns the official ISO list.
- Add `data-prefer-official` per select if you only want certain fields to use official subdivisions while keeping others extended.

