# Follow Related Example (Vite)

This example demonstrates how to enable automatic navigation between related countries and territories using `followRelated` in the global configuration in a Vite project.

## Features

- Enables automatic country switching when selecting subdivisions that are also countries
- Example: Selecting "Guam" from US subdivisions automatically switches the country to "Guam"
- Useful for handling complex country-territory relationships
- Hot module replacement during development

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your API key and followRelated in `index.html`:
   ```javascript
   window.CountriesDBConfig = {
       publicKey: 'YOUR_PUBLIC_KEY',
       followRelated: true
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
follow-related/
├── src/
│   └── main.js            # Entry point that imports the widget
├── index.html             # HTML with select elements and global config
├── package.json
└── README.md
```

## How It Works

1. The widget is imported in `src/main.js`, which Vite processes automatically.
2. `window.CountriesDBConfig` is set in `index.html` before the module loads, allowing auto-init to read the configuration.
3. The `followRelated` option enables automatic navigation when selecting subdivisions that are also countries.

**Multi-select compatibility:**
- **Single-select country + single-select subdivision:** Fully supported
- **Single-select country + multi-select subdivision:** Partially supported (uses first related subdivision)
- **Multi-select country + any subdivision:** Not supported (disabled when country is multi-select)

