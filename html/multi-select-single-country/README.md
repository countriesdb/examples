# Single Country with Multi-select Subdivisions (HTML)

Demonstrates how to pair a single-select country dropdown with a multi-select subdivision list that follows the selected country.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python, `npx serve`, PHP, etc.).
3. Open the URL printed by your server (e.g., http://localhost:8000).

## How it works

- The country select is a standard single-select with `data-name="country_single"`.
- The subdivision select uses `multiple` and links to the country with `data-country="country_single"`.
- When the user picks a country, the multi-select subdivision list updates automatically.
- Multi-select subdivision selects ignore `data-label`/`data-default-value`, so those attributes are omitted.

