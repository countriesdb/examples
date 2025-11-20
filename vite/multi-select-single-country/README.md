# Single Country with Multi-select Subdivisions (Vite)

Vite example linking a single-select country dropdown with a multi-select subdivision list.

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
    publicKey: 'YOUR_PUBLIC_KEY'
  };
</script>
```

## How it works

- `src/main.js` imports the widget so auto-init can run.
- Country select uses `data-name="country_single"`.
- Subdivision select uses `multiple` and `data-country="country_single"` to follow the selected country.
- Multi-select subdivision lists have no placeholder option by design; they update once the country changes.

