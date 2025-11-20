# Vite Nested Prefix Example

Shows how to customize nested subdivision prefixes in a Vite setup.

## Setup

```bash
npm install
npm run dev
```

Vite prints the preview URL (usually http://localhost:5173).

## Configure your key

In `index.html`, set:

```html
<script>
  window.CountriesDBConfig = {
    publicKey: 'YOUR_PUBLIC_KEY'
  };
</script>
```

## How it works

- `src/main.js` imports the widget; auto-init uses `window.CountriesDBConfig`.
- The country select preselects France (`data-preselected="FR"`).
- The subdivision select specifies `data-nested1-prefix="→ "` and `data-nested2-prefix="→→ "` to visually indent nested options.
- `data-label` customizes the placeholder copy.

