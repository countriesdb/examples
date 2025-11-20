# CommonJS Nested Prefix Example

Browserify example showing how to customize nested subdivision prefixes using `data-nested1-prefix` and `data-nested2-prefix`.

## Setup

```bash
npm install
npm run dev
```

`serve` will print the preview URL (defaults to http://localhost:3000).

## Configure your key

Edit `public/index.html` and set:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY'
  };
</script>
```

## How it works

- `src/widget.js` requires `@countriesdb/widget`; auto-init handles initialization.
- Browserify bundles to `public/bundle.js`.
- The country select is preselected to France so nested regions show immediately.
- The subdivision select sets:
  - `data-nested1-prefix="→ "` for regions
  - `data-nested2-prefix="→→ "` for departments
  - `data-label` for custom placeholder text

