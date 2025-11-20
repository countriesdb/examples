# HTML Nested Prefix Example

Demonstrates how to visually distinguish nested subdivisions using `data-nested1-prefix` and `data-nested2-prefix`.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the directory with your preferred static server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   # or
   php -S localhost:8000
   ```
3. Open the printed URL in your browser.

## How it works

- The country select is preselected to France (`data-preselected="FR"`) so nested levels show immediately.
- The subdivision select sets:
  - `data-nested1-prefix="→ "` for level-1 regions
  - `data-nested2-prefix="→→ "` for level-2 departments
  - `data-label` to customize the placeholder text
- The widget prepends the configured prefixes to subdivision names based on their nesting level.

