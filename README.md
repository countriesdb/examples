# CountriesDB Examples

Welcome to the CountriesDB reference examples. If you’re integrating the CountriesDB widget into your product, these projects show exactly how to wire it up using the four most common toolchains. Every scenario (basic widget, `countriesWidget:update` events, dynamic filtering, delayed auto-init, geolocation behaviour, etc.) is implemented the same way across stacks, so you can pick the one that mirrors your production environment.

These examples are meant to be **copy-paste friendly**, production-safe, and fully aligned with the official documentation on **[countriesdb.com](https://countriesdb.com)**. Whether you’re building a checkout form, KYC address flow, onboarding wizard, or admin panel, the code here demonstrates the recommended integration patterns.

## Why these examples exist (SEO + context)

CountriesDB provides a **country and state/province dropdown widget** backed by verified ISO 3166-1 and ISO 3166-2 data with multilingual naming, geolocation support, and automatic population of `<select>` elements.  
Developers often search for:

- *“country state dropdown example”*  
- *“ISO-3166 country list JavaScript”*  
- *“country selector widget HTML”*  
- *“subdivision select examples”*  
- *“address form country state selector”*

This repository solves that by offering **real, runnable examples** in HTML, ESM, CommonJS, and Vite—mirroring the exact widget that ships on production websites using CountriesDB.

## Maintained stacks

| Stack  | Use it when… |
|--------|-------------|
| `html/` | You want copy-paste HTML + `<script>` snippets. No tooling, perfect for CMS drops, WordPress, Wix embeds, or quick prototypes. |
| `esm/`  | You ship Rollup/ESM bundles and want explicit control over widget loading and configuration. |
| `commonjs/` | Your front end still uses Browserify, older Webpack configs, or legacy CommonJS modules. |
| `vite/` | You use Vite (or other modern ESM-first tooling) and want the fastest dev cycle and best DX. |

Each stack mirrors the same set of example directories (e.g. `basic`, `update-select`, `name-filter`, `auto-init-delayed`) so the official docs can link to identical behaviour across toolchains.

## What these examples cover (SEO keywords included)

- ISO-compliant country and subdivision dropdowns  
- Multilingual name loading (`defaultLanguage`, `forcedLanguage`)  
- Preselect logic (`data-preselected`)  
- Dynamic subdivision loading using `data-country`  
- Custom filtering rules (`countryNameFilter`, `subdivisionNameFilter`)  
- Parent/child subdivision navigation  
- Integrating the widget into forms, checkout flows, and CRM admin tools  
- Using the widget with bundlers (ESM, CJS, Vite)  
- Auto-initialization and manual initialization patterns  
- Handling widget events, such as `countriesWidget:update`

These keywords help developers searching for practical implementation examples find this repo.

## Layout

```
examples/
├── html/
│   └── <scenario>/              # Single-file HTML demos
├── esm/
│   └── <scenario>/              # Rollup projects that emit public/bundle.js
├── commonjs/
│   └── <scenario>/              # Browserify projects with src/widget.js → public/bundle.js
└── vite/
    └── <scenario>/              # Vite projects with src/main.js
```

## Working locally

1. `cd examples/<stack>/<scenario>`
2. For `html/`, open the `.html` file in your browser (no install).
3. For `esm/`, `commonjs/`, `vite`: run `npm install`, then the command in the scenario README (usually `npm run dev` or `npm run build && npx serve public`).

## About this repository

Every example here uses the same widget build that powers the live documentation on **[countriesdb.com](https://countriesdb.com)**, ensuring that code on GitHub matches what developers see on the official site.  

These examples are maintained by **[NAYEE LLC](https://nayee.net)** — the publisher of CountriesDB — and are updated in lockstep with each widget release to maintain consistency across documentation, npm, and integration guides.