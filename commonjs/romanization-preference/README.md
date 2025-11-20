# Subdivision Romanization Preference - CommonJS

Demonstrates how to prefer specific romanization systems for official subdivisions using CommonJS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Replace `YOUR_PUBLIC_KEY` in `public/index.html`.

3. Build the bundle:
   ```bash
   npm run build
   ```

4. Serve the `public` folder:
   ```bash
   npm run dev
   ```

5. Visit the printed URL (usually `http://localhost:3000`).

## How it works

- `window.CountriesDBConfig` includes `subdivisionRomanizationPreference: 'un,bgn'` to prefer UN first, then BGN
- The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)
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

