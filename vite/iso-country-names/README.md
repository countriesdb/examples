# ISO Country Names - Vite

This Vite example shows how to display ISO short names for countries (e.g., "United States of America") instead of localized names.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `isoCountryNames: true` to enable ISO short names

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `isoCountryNames: true` makes country fields show ISO short names (e.g., "United States of America") instead of localized names (e.g., "Estados Unidos" in Spanish)
- This only affects country fields; subdivision fields remain unchanged
- Sorting uses the displayed names

## Example

- **Without `isoCountryNames: true`**: Countries show localized names based on browser language (e.g., "Estados Unidos" in Spanish)
- **With `isoCountryNames: true`**: Countries always show ISO short names (e.g., "United States of America") regardless of browser language

