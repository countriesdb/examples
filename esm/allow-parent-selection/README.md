# Allow Parent Selection - ESM

Demonstrates how to enable selection of parent subdivisions in multi-level administrative hierarchies using ES modules.

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

- `window.CountriesDBConfig` includes `allowParentSelection: true` to enable parent subdivision selection
- By default, users can only select the most nested subdivisions (the most specific ones)
- When enabled, users can also select parent subdivisions, which are more general administrative levels
- This is particularly useful for countries with complex administrative hierarchies (like France, United Kingdom, etc.) where you want to allow selection at different levels of specificity

