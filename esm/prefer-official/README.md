# Prefer Official Subdivisions (ESM)

Rollup example showing how to set `preferOfficialSubdivisions` globally so every subdivision select uses official ISO data even if extended translations are available.

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
    preferOfficialSubdivisions: true
  };
</script>
```

## How it works

- `src/widget.js` imports the widget; Rollup emits `public/bundle.js`.
- Setting `preferOfficialSubdivisions` globally means all subdivision selects use official ISO names by default.
- You can still add `data-prefer-official` per select when you only want specific fields to use official data.

