# ISO Country Names - HTML

Demonstrates how to display ISO short names for countries (e.g., "United States of America") instead of localized names by setting `iso_country_names=1` in the script URL.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The script URL includes `iso_country_names=1` to enable ISO short names
- Country fields will show ISO short names (e.g., "United States of America") instead of localized names (e.g., "Estados Unidos" in Spanish)
- This only affects country fields; subdivision fields remain unchanged
- Sorting uses the displayed names

## Example

- **Without `iso_country_names=1`**: Countries show localized names based on browser language (e.g., "Estados Unidos" in Spanish)
- **With `iso_country_names=1`**: Countries always show ISO short names (e.g., "United States of America") regardless of browser language

