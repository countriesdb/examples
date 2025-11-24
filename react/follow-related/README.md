# CountriesDB React Basic Example

React-focused example that demonstrates how to control the CountriesDB widget from a React application using `@countriesdb/widget` directly.

## Overview

This example shows how to:
- Render the plain widget selects from React
- Dynamically import `@countriesdb/widget` which auto-initializes
- Listen for `countriesWidget:update` events to keep React state in sync

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

1. **Widget Configuration**: Sets `window.CountriesDBConfig` with your public key
2. **Dynamic Import**: Imports `@countriesdb/widget` which auto-initializes and populates the select elements
3. **Event Listening**: Listens for `countriesWidget:update` events to sync React state with widget changes

## Project Structure

- `src/App.tsx` - Main React component that integrates the widget
- `src/main.tsx` - React entry point
- `index.html` - HTML template
- `vite.config.ts` - Vite configuration

## Documentation Links

- [CountriesDB Documentation](https://countriesdb.com/docs)
- [CountriesDB Widget](https://countriesdb.com/docs/widgets)
- [CountriesDB Website](https://countriesdb.com)
