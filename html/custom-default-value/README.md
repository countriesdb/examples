# HTML Custom Default Value Example

Demonstrates how to change the value stored by the default option using `data-default-value`.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the file with any static server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```

## How it works

- `data-default-value="not_selected"` updates the value of the placeholder option.
- `data-preselected=""` keeps that placeholder selected until the user chooses.
- The subdivision select links to the country select via `data-country="country_default"`.

