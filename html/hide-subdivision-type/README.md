# Hide Subdivision Type - HTML

Demonstrates how to disable subdivision type display (e.g., "California" instead of "California (State)") by setting `show_subdivision_type=0` in the script URL.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The script URL includes `show_subdivision_type=0` to disable type display
- The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)
- Subdivision names will show as "California" instead of "California (State)"
- **Note:** This parameter only works for Official ISO subdivisions. For extended subdivision translations, the type is always included in the translation itself.

