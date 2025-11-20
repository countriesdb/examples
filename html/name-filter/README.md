# Name Filter - HTML

Demonstrates how to customize country and subdivision names on-the-fly using JavaScript callback functions.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- Define filter functions in the global scope (`window`) before loading the widget
- Reference the function names in the script URL parameters (`countryNameFilter` and `subdivisionNameFilter`)
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
- Filter functions must be defined in the global scope before the widget script loads
