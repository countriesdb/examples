# Follow Upward Example (Vite)

This example demonstrates how to enable automatic navigation up the subdivision hierarchy using `followUpward` in the global configuration in a Vite project.

## Features

- Enables automatic country switching to parent countries when selecting subdivisions that are also countries
- Example: Selecting "Guam" from subdivisions automatically switches the country to "United States" (Guam's parent)
- Useful for handling complex country-territory relationships where territories are both subdivisions and countries
- Hot module replacement during development

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and followUpward in `index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       followUpward: true
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
follow-upward/
├── src/
│   └── main.js            # Entry point that imports the widget
├── index.html             # HTML with select elements and global config
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
3. The `followUpward` option enables automatic navigation up the subdivision hierarchy when selecting subdivisions that are also countries.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Any multi-select scenario:** Not supported (completely disabled if either select has the multiple attribute)

