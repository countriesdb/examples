# Hide Subdivision Type - CommonJS

Demonstrates how to disable subdivision type display (e.g., "California" instead of "California (State)") using CommonJS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Replace `YOUR_PUBLIC_KEY` in `public/index.html`.

3. Build the bundle:
   ```bash
   npm run build
   ```

4. Serve the `public` folder:
   ```bash
   npm run dev
   ```

5. Visit the printed URL (usually `http://localhost:3000`).

## How it works

- `window.CountriesDBConfig` includes `showSubdivisionType: false` to disable type display
- The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)
- Subdivision names will show as "California" instead of "California (State)"
- **Note:** This parameter only works for Official ISO subdivisions. For extended subdivision translations, the type is always included in the translation itself.

