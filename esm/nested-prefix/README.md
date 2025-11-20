# ESM Nested Prefix Example

Rollup-based example for customizing nested subdivision prefixes.

## Setup

```bash
npm install
npm run dev
```

`serve` will print the preview URL (defaults to http://localhost:3000).

## Configure your key

Set `publicKey` inside `public/index.html` before `bundle.js` loads.

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY'
  };
</script>
```

## How it works

- `src/widget.js` imports `@countriesdb/widget`; auto-init reads the global config.
- The country select is preselected to France (`data-preselected="FR"`).
- The subdivision select adds:
  - `data-nested1-prefix="→ "` (regions)
  - `data-nested2-prefix="→→ "` (departments)
  - `data-label` for the placeholder text.
- Rollup outputs `public/bundle.js`, which the HTML page loads.

