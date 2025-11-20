# HTML Preselection Example

This example demonstrates how to preselect specific countries and subdivisions using the `data-preselected` attribute.

## Setup

1. **Get your API key** from [countriesdb.com](https://countriesdb.com)

2. **Update the script tag** in `index.html`:
   - Replace `YOUR_PUBLIC_KEY` with your actual CountriesDB public API key

3. **Open the page**:
   - Simply open `index.html` in your browser
   - Or use any static file server:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx serve .
     
     # PHP
     php -S localhost:8000
     ```

## How It Works

- The country select has `data-preselected="US"` which preselects United States
- The subdivision select has `data-preselected="US-CA"` which preselects California
- The widget automatically sets these values when it initializes
- This is useful when you want to set default values instead of using geolocation


