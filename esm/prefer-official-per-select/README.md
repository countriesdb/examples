# Prefer Official Subdivisions (Per-Select) - ESM

Demonstrates how to use `data-prefer-official` on a specific subdivision select to show official ISO subdivisions instead of extended translations, using ES modules.

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

- The subdivision select has the `data-prefer-official` attribute
- This makes only this specific select request official ISO subdivisions
- Other subdivision selects on the page (if any) will use the default behavior (extended if available)
- This attribute only works when your plan includes extended subdivisions

