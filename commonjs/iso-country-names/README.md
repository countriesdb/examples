# ISO Country Names - CommonJS

Demonstrates how to display ISO short names for countries (e.g., "United States of America") instead of localized names using CommonJS.

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

- `window.CountriesDBConfig` includes `isoCountryNames: true` to enable ISO short names
- Country fields will show ISO short names (e.g., "United States of America") instead of localized names (e.g., "Estados Unidos" in Spanish)
- This only affects country fields; subdivision fields remain unchanged
- Sorting uses the displayed names

## Example

- **Without `isoCountryNames: true`**: Countries show localized names based on browser language (e.g., "Estados Unidos" in Spanish)
- **With `isoCountryNames: true`**: Countries always show ISO short names (e.g., "United States of America") regardless of browser language

