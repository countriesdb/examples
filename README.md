# CountriesDB Examples

Welcome to the CountriesDB reference examples. If you’re integrating the CountriesDB widget into your product, these projects show exactly how to wire it up using common toolchains. Every scenario is implemented the same way across stacks, so you can pick the one that mirrors your production environment.

These examples are meant to be **copy-paste friendly**, production-safe, and fully aligned with the official documentation on **[countriesdb.com](https://countriesdb.com)**. Whether you’re building a checkout form, KYC address flow, onboarding wizard, or admin panel, the code here demonstrates the recommended integration patterns.

> 🔐 **API key required:** every example expects a CountriesDB public key. Create an account at [countriesdb.com](https://countriesdb.com) to generate your key (test keys are available with limited functionality). Replace `YOUR_PUBLIC_KEY` in each snippet before running the demos.

## What's in this repository

CountriesDB provides a country and state/province dropdown widget with ISO 3166-1 and ISO 3166-2 data, multilingual support, and geolocation. This repository contains working examples you can copy and run immediately - no guesswork, no outdated snippets. Each example is available in HTML (for quick testing), ESM (for modern bundlers), CommonJS (for legacy setups), Vite (for fast development), and React (for React + TypeScript projects).

## Maintained stacks

| Stack  | Use it when… |
|--------|-------------|
| `html/` | You want copy-paste HTML + `<script>` snippets. No tooling, perfect for CMS drops, WordPress, Wix embeds, or quick prototypes. |
| `esm/`  | You ship Rollup/ESM bundles and want explicit control over widget loading and configuration. |
| `commonjs/` | Your front end still uses Browserify, older Webpack configs, or legacy CommonJS modules. |
| `vite/` | You use Vite (or other modern ESM-first tooling) and want the fastest dev cycle and best DX. |
| `react/` | You're building with React and want TypeScript-ready examples showing React patterns (hooks, state management, event handling). |

Each stack mirrors the same set of example directories (e.g. `basic`, `update-select`, `name-filter`, `auto-init-delayed`) so the official docs can link to identical behaviour across toolchains.

## Available examples

**Getting started:**
- `basic` - Simple country and subdivision dropdowns
- `preselection` - Preselecting country and subdivision values
- `standalone-subdivision` - Subdivision select without a country select
- `subdivisions` - Basic subdivision loading

**Multi-select:**
- `multi-select-basic` - Multi-select countries
- `multi-select-preselected` - Multi-select with preselected values
- `multi-select-single-country` - Multi-select with a single country code

**Events and updates:**
- `update-select` - Listen to `countriesWidget:update` events (single select)
- `update-multiselect` - Listen to `countriesWidget:update` events (multi-select)
- `ready-event` - Wait for `countriesWidget:ready` before wiring `countriesWidget:update`

**Customization:**
- `name-filter` - Custom name filtering for countries and subdivisions
- `custom-default-value` - Custom default option value
- `custom-label` - Custom default option label

**Language and naming:**
- `default-language` - Set default language for names
- `force-language` - Force a specific language
- `iso-country-names` - Use ISO country names
- `local-variant` - Prefer local name variants
- `romanization-preference` - Set romanization system preference

**Subdivision behavior:**
- `allow-parent-selection` - Allow selecting parent subdivisions
- `follow-related` - Follow related subdivisions
- `follow-upward` - Navigate upward to parent subdivisions
- `prefer-official` - Prefer official subdivisions (global setting)
- `prefer-official-per-select` - Prefer official subdivisions (per-select)
- `hide-subdivision-type` - Hide subdivision type names
- `nested-prefix` - Custom prefixes for nested subdivision levels

**Initialization:**
- `auto-init-delayed` - Manual widget initialization
- `disable-geolocation` - Disable automatic geolocation

## Layout

```
examples/
├── html/
│   └── <scenario>/              # Single-file HTML demos
├── esm/
│   └── <scenario>/              # Rollup projects that emit public/bundle.js
├── commonjs/
│   └── <scenario>/              # Browserify projects with src/widget.js → public/bundle.js
├── vite/
│   └── <scenario>/              # Vite projects with src/main.js
└── react/
    └── <scenario>/              # React + TypeScript projects with src/App.tsx
```

## Working locally

1. `cd examples/<stack>/<scenario>`
2. Follow the README inside that scenario.
3. For `esm/`, `commonjs/`, `vite`, and `react` projects, run `npm install` and follow the `npm run ...` instructions documented in the scenario README.

## Framework notes

CountriesDB works with all modern frameworks (React, Vue, Svelte, Angular, Next.js, Nuxt) because it initializes from plain HTML.  
Just render `<select>` elements with the correct classes and import the widget:

```js
import('@countriesdb/widget')
```

### React Examples

The `react/` directory contains TypeScript-ready React examples that demonstrate:
- Using React hooks (`useState`, `useEffect`) to manage widget state
- Listening to `countriesWidget:update` events to sync React state
- TypeScript type definitions for the widget API
- Common React patterns for form integration

Each React example is a standalone Vite + React + TypeScript project. See the [React examples README](./react/README.md) for a complete list of available scenarios and detailed setup instructions.


## About this repository

Every example here uses the same widget build that powers the live documentation on **[countriesdb.com](https://countriesdb.com)**, ensuring that code on GitHub matches what developers see on the official site.  

These examples are maintained by **[NAYEE LLC](https://nayee.net)** (the publisher of CountriesDB) and are updated in lockstep with each widget release to maintain consistency across documentation, npm, and integration guides.