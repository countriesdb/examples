# Prefer Official Subdivisions (CommonJS)

Shows how to force official ISO subdivisions globally via `window.CountriesDBConfig.preferOfficialSubdivisions` when bundling with Browserify.

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
    preferOfficialSubdivisions: true
  };
</script>
```

## How it works

- `src/widget.js` simply requires `@countriesdb/widget`; Browserify outputs `public/bundle.js`.
- Because `preferOfficialSubdivisions` is set globally, every subdivision select requests the official ISO list even if extended translations are available to the account.
- You can still add `data-prefer-official` on specific selects to opt-in manually; the global flag just applies the preference everywhere by default.

