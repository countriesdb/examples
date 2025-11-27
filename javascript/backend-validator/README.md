## Backend Example – Node.js (@countriesdb/validator)

This example shows how to use the `@countriesdb/validator` package for server-side validation of country and subdivision codes.

### Prerequisites

- Node.js 18 or newer
- `npm install`
- CountriesDB **private** API key

### Setup

1. Edit any script and set your API key:
   ```bash
   # Open any script (e.g., 01-basic-country.mjs)
   # Find this line near the top:
   const API_KEY = 'your_private_api_key_here';
   # Replace 'your_private_api_key_here' with your actual API key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run any of the example scripts:
   ```bash
   node 01-basic-country.mjs
   node 02-country-follow-upward.mjs
   node 03-multiple-countries.mjs
   node 04-basic-subdivision.mjs
   node 05-subdivision-follow-related.mjs
   node 06-subdivision-allow-parent.mjs
   node 07-multiple-subdivisions.mjs
   node 08-empty-subdivision.mjs
   ```

This directory contains 8 example scripts demonstrating all validation scenarios using the `@countriesdb/validator` package:
1. **01-basic-country.mjs** - Basic country validation (single country, no options)
2. **02-country-follow-upward.mjs** - Country validation with `followUpward` option
3. **03-multiple-countries.mjs** - Multiple country validation
4. **04-basic-subdivision.mjs** - Basic subdivision validation (single subdivision, no options)
5. **05-subdivision-follow-related.mjs** - Subdivision validation with `followRelated` option
6. **06-subdivision-allow-parent.mjs** - Subdivision validation with `allowParentSelection` option
7. **07-multiple-subdivisions.mjs** - Multiple subdivision validation
8. **08-empty-subdivision.mjs** - Empty subdivision validation (for countries with no subdivisions)

### Files

- `01-basic-country.mjs` through `08-empty-subdivision.mjs` – Example scripts for each validation scenario.
- `package.json` – declares the scripts plus `@countriesdb/validator` dependency.

### Configuration

Set your private API key directly in each script by editing the `API_KEY` constant at the top of the file.

### Notes

- This example uses the official `@countriesdb/validator` package, which provides a clean TypeScript API for validation.
- The package handles all HTTP requests, error handling, and response parsing automatically.
- For production use, install the package in your project: `npm install @countriesdb/validator`

