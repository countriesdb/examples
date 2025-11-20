# ESM (ES Module) Preselection Example

This example demonstrates how to preselect specific countries and subdivisions using `@countriesdb/widget` with ES modules and rollup.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set your API key**:
   - Open `public/index.html`
   - Update `window.CountriesDBConfig` with your actual CountriesDB key
   - Get your key at [countriesdb.com](https://countriesdb.com)

3. **Build and run**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - The server will print the URL (usually `http://localhost:3000`)

## Project Structure

```
esm/preselection/
├── src/
│   └── widget.js     # ES Module entry (imports widget for bundling)
├── public/
│   ├── index.html    # HTML page with widget form and global config
│   └── bundle.js     # Bundled output (generated)
├── rollup.config.js  # Rollup bundler configuration
├── package.json
└── README.md
```

## How It Works

- The widget is bundled with rollup into `bundle.js`
- `window.CountriesDBConfig` is set in `index.html` before the bundle loads
- Auto-init reads the global config and initializes the widget automatically
- The country select has `data-preselected="US"` which preselects United States
- The subdivision select has `data-preselected="US-CA"` which preselects California


