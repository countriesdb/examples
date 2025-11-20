# Multi-select :update Example (Vite)

This example demonstrates how to listen to `countriesWidget:update` events with multi-select selects in a Vite project.

## Features

- Multi-select country and subdivision selects
- Event handlers for both `countriesWidget:update` and native `change` events
- Uses `e.detail.selectedValues` array from the update event
- Displays selected values in real-time
- Hot module replacement during development

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key in `index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY'
   };
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   This will start Vite's development server, typically at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

   The built files will be in the `dist/` directory.

## Project Structure

```
update-multiselect/
├── src/
│   └── main.js            # Imports widget and wires up event listeners
├── index.html             # HTML with multi-select elements
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `src/main.js` also registers the `countriesWidget:update` and `change` event listeners for both selects.
3. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
4. Event handlers listen to both `countriesWidget:update` events (which provide `e.detail.selectedValues`) and native `change` events.
5. The output updates in real-time as selections change.

