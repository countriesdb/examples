# Prefer Official Subdivisions (Per-Select) - HTML

Demonstrates how to use `data-prefer-official` on a specific subdivision select to show official ISO subdivisions instead of extended translations.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The subdivision select has the `data-prefer-official` attribute
- This makes only this specific select request official ISO subdivisions
- Other subdivision selects on the page (if any) will use the default behavior (extended if available)
- This attribute only works when your plan includes extended subdivisions

