# Allow Parent Selection - HTML

Demonstrates how to enable selection of parent subdivisions in multi-level administrative hierarchies by setting `allow_parent_selection=1` in the script URL.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The script URL includes `allow_parent_selection=1` to enable parent subdivision selection
- By default, users can only select the most nested subdivisions (the most specific ones)
- When enabled, users can also select parent subdivisions, which are more general administrative levels
- This is particularly useful for countries with complex administrative hierarchies (like France, United Kingdom, etc.) where you want to allow selection at different levels of specificity

