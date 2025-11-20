# Multi-select :update Example (CommonJS)

This example demonstrates how to listen to `countriesWidget:update` events with multi-select selects in a CommonJS environment.

## Features

- Multi-select country and subdivision selects
- Event handlers for both `countriesWidget:update` and native `change` events
- Uses `e.detail.selectedValues` array from the update event
- Displays selected values in real-time
- Bundled with Browserify for browser compatibility

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key in `public/index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY'
   };
   ```

3. Build and run:
   ```bash
   npm run dev
   ```

   This will build the bundle and start a local server at `http://localhost:3000`.

## Project Structure

```
update-multiselect/
├── src/
│   └── widget.js          # Requires widget and wires up event listeners
├── public/
│   ├── index.html         # HTML with multi-select elements
│   └── bundle.js          # Generated bundle (created by build)
├── package.json
└── README.md
```

## How It Works

1. The widget is required in `src/widget.js`, which gets bundled by Browserify.
2. `src/widget.js` also registers the `countriesWidget:update` and `change` event listeners for both selects.
3. `window.CountriesDBConfig` is set in `index.html` before the bundle loads, allowing auto-init to read the configuration.
4. Event handlers listen to both `countriesWidget:update` events (which provide `e.detail.selectedValues`) and native `change` events.
5. The output updates in real-time as selections change.

