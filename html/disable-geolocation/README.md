# HTML Disable Geolocation Example

This example shows how to disable the default GeoIP-based preselection so the widget leaves both selects blank until the user makes a choice.

## Setup

1. **Get your API key** from [countriesdb.com](https://countriesdb.com)

2. **Update the script tag** in `index.html`:
   - Replace `YOUR_PUBLIC_KEY` with your CountriesDB public API key

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

- Setting `data-preselected=""` on a select disables GeoIP preselection for that select
- The country select uses `data-name="country_no_geo"` so the subdivision select can reference it
- The subdivision select uses `data-country="country_no_geo"` and also sets `data-preselected=""`
- Both selects render with their default placeholder option until the user picks a value


