# Name Filter - ESM

Demonstrates how to customize country and subdivision names on-the-fly using JavaScript callback functions with ES modules.

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

- Define filter functions in the global scope (`window`) or pass them directly to `window.CountriesDBConfig`
- In this example, functions are defined in `window` and then passed to the config
- Filter functions can:
  - Return a custom name (string) to use as the display name
  - Return `null` or `undefined` to use the original name (fallback)
  - Return `false` to completely remove the item from the list

## Filter Function Parameters

**Country Filter:**
- `code` - Country code (e.g., "US")
- `originalName` - Name from server (already processed by romanization/local variant)
- `language` - Language selected by server
- `item` - Full country object from API

**Subdivision Filter:**
- `code` - Subdivision code (e.g., "EG-C")
- `originalName` - Name from server (already processed by romanization/local variant)
- `language` - Language selected by server
- `countryCode` - Country code extracted from subdivision code
- `item` - Full subdivision object from API

## Example Behavior

- **Country Filter:**
  - CA and GB are filtered out (removed from list)
  - US shows "United States of America" (custom name)
  - EG shows "Egypt" (custom name)
  - Other countries use original names

- **Subdivision Filter:**
  - EG-GZ, US-CA, US-NY are filtered out (removed from list)
  - EG-C shows "Cairo City" (custom name)
  - EG-ALX shows "Alexandria City" (custom name)
  - For Arabic language, uses original names
  - Other subdivisions use original names

## Notes

- Name filters override all other name sources (romanization, local variant, language preferences)
- When name filters are used, the widget automatically re-sorts options using Unicode-aware sorting
- You can also pass filter functions directly to `window.CountriesDBConfig` instead of defining them in `window` first



