# Single Country with Multi-select Subdivisions (CommonJS)

Browserify example showing how to link a single-select country dropdown with a multi-select subdivision list.

## Setup

```bash
npm install
npm run dev
```

The `serve` command prints the preview URL (defaults to http://localhost:3000).

## Configure your key

Edit `public/index.html`:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY'
  };
</script>
```

## How it works

- The country select uses `data-name="country_single"`.
- The subdivision select uses `multiple` and `data-country="country_single"` to follow the selected country.
- Because the subdivision select is multi-select, there is no placeholder option—users immediately see the list once a country is chosen.
- `src/widget.js` simply requires `@countriesdb/widget`; auto-init does the rest.

