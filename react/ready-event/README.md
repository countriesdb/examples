# Ready Event (React)

React + TypeScript example that listens for `countriesWidget:ready` events.

## Overview

This example shows how to:
- Render the plain widget selects from React
- Dynamically import `@countriesdb/widget` which auto-initializes
- Listen for `countriesWidget:ready` to know when each select finishes loading

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Update the public key in `src/App.tsx`:
```typescript
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## How It Works

1. **Widget Configuration**: Sets `window.CountriesDBConfig` with your public key.
2. **Dynamic Import**: Imports `@countriesdb/widget` which auto-initializes and populates the select elements.
3. **Ready Event Listening**: Subscribes to `countriesWidget:ready` which fires separately for each select.
4. **Event Details**: The ready event fires separately: the country select fires once when its options are available, and the subdivision select fires on initial load plus every time it reloads (when the country changes).

## Project Structure

- `src/App.tsx` - Main React component that integrates the widget
- `src/main.tsx` - React entry point
- `index.html` - HTML template
- `vite.config.ts` - Vite configuration

## Documentation Links

- [CountriesDB Documentation](https://countriesdb.com/docs)
- [CountriesDB Widget](https://countriesdb.com/docs/widgets)
- [CountriesDB Website](https://countriesdb.com)
