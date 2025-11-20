# HTML Custom Labels Example

This example demonstrates how to customize the placeholder labels for country and subdivision selects using the `data-label` attribute.

## Setup

1. **Get your API key** from [countriesdb.com](https://countriesdb.com)

2. **Update the script tag** in `index.html`:
   - Replace `YOUR_PUBLIC_KEY` with your actual CountriesDB public API key

3. **Serve the file**:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```

## How It Works

- Add `data-label="Your placeholder text"` to any select
- The widget uses this text for the default option instead of the built-in “Select country/state” label
- `data-preselected=""` ensures the default option remains selected until the user picks a value
- The subdivision select references the country select with `data-country="country_label"`

