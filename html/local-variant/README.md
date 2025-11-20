# Prefer Local Variant - HTML

Demonstrates how to display local variant names for official subdivisions when available by setting `prefer_local_variant=1` in the script URL.

## Setup

1. Replace `YOUR_PUBLIC_KEY` in `index.html`.
2. Serve the folder with any static server (Python `http.server`, `npx serve .`, PHP built-in server, etc.).
3. Visit the printed URL (usually `http://localhost:8000`).

## How it works

- The script URL includes `prefer_local_variant=1` to enable local variant preference
- The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)
- Local variants are alternative names that may be more familiar to users (e.g., "Cairo" instead of "Al Qāhirah")
- This option works alongside romanization preference: romanization system is selected first, then local variant is preferred if available
- If no local variant exists for the selected romanization system, the regular name is used
- This option only applies to official subdivisions (not extended ones)

## Example

- **Egypt (EG)**: Select Egypt and look at subdivisions:
  - EG-C: Shows "Cairo" (local variant) instead of "Al Qāhirah" (official name)
  - EG-ALX: Shows "Alexandria" instead of "Al Iskandarīyah"
  - EG-GZ: Shows "Giza" instead of "Al Jīzah"

## Combined with Romanization Preference

This option can be combined with `subdivision_romanization_preference`. The romanization system is selected first, then local variant is preferred if available for that system.

