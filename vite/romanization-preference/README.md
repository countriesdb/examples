# Subdivision Romanization Preference - Vite

This Vite example shows how to prefer specific romanization systems for official subdivisions.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `subdivisionRomanizationPreference: 'un,bgn'` to prefer UN first, then BGN
4. The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `subdivisionRomanizationPreference: 'un,bgn'` prefers UN first, then BGN romanization systems
- When a preferred system is not available for a country, the widget falls back to the default official name
- This option is ignored when extended subdivisions are active

## Example

- **Belarus (BY)**: Select Belarus and look at subdivision BY-BR
  - With `subdivisionRomanizationPreference: 'un'`: Shows "Bresckaja voblasć" (UN X/6 2012)
  - With `subdivisionRomanizationPreference: 'gost,un'`: Shows "Brestskaja oblast'" (GOST 1983 = UN V/18 1987)

## Supported Values

- `bgn` - Matches BGN/PCGN family labels (e.g., "BGN/PCGN 1956")
- `pcgn` - Also part of BGN/PCGN family; treated the same as bgn
- `un` - Matches UN family labels (e.g., "UN V/18 1987")
- `iso` - Matches ISO family labels (e.g., "ISO 843:1997", "ISO 11940-2:2007")
- Country-specific tags like `elot`, `gost`, or national standard tags

You don't need to specify a default. If none of your listed systems are available, the default official name is used automatically.

