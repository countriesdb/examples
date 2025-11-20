# Hide Subdivision Type - Vite

This Vite example shows how to disable subdivision type display (e.g., "California" instead of "California (State)").

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `showSubdivisionType: false` to disable type display
4. The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `showSubdivisionType: false` disables subdivision type display in names
- `data-prefer-official` ensures we use official ISO subdivisions (required for this feature)
- Subdivision names will show as "California" instead of "California (State)"
- **Note:** This parameter only works for Official ISO subdivisions. For extended subdivision translations, the type is always included in the translation itself.

