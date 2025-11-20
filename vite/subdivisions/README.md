# Vite Subdivisions Example

This example shows how to use `@countriesdb/widget` inside a Vite project with subdivisions (states/provinces).

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure the widget**:
   - Open `index.html`
   - Update `window.CountriesDBConfig` with your `publicKey`
   - Get your key at [countriesdb.com](https://countriesdb.com)

3. **Run the dev server**:
   ```bash
   npm run dev
   ```

4. **Open the browser**:
   - Visit the URL printed by Vite (usually `http://localhost:5173`)

## How it Works

- `src/main.js` imports `@countriesdb/widget`; auto-init handles the rest
- `index.html` contains the form markup and defines `window.CountriesDBConfig` before the module script loads
- The country and subdivision selects are linked via `data-country` attribute
- When a country is selected, the subdivision select is automatically populated
- Vite bundles everything and serves it with hot-reload for easy development
