# Prefer Local Variant - Vite

This Vite example shows how to display local variant names for official subdivisions when available.

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

## Configuration

1. Edit `index.html`
2. Replace `YOUR_PUBLIC_KEY` in `window.CountriesDBConfig`
3. The config includes `preferLocalVariant: true` to enable local variant preference
4. The subdivision select has `data-prefer-official` to use official ISO subdivisions (required for this feature)

## How it works

- `src/main.js` imports the widget; auto-init reads config from `window.CountriesDBConfig`
- `preferLocalVariant: true` makes the widget display local variant names when available
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

This option can be combined with `subdivisionRomanizationPreference`. The romanization system is selected first, then local variant is preferred if available for that system.

