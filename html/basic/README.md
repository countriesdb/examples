# HTML Basic Example

This example demonstrates the simplest way to use the CountriesDB widget with just a script tag.

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

- The widget script is loaded from the CDN
- The `<select>` element with `class="country-selection"` is automatically populated
- No build step or configuration needed


