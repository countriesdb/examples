## Backend Example – Next.js App Router

This is a complete, runnable Next.js application demonstrating how to use the `@countriesdb/validator` package in Next.js App Router API routes.

### Prerequisites

- Node.js 18 or newer
- Next.js 16 or newer
- CountriesDB **private** API key

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your API key in each route file:
   ```typescript
   // Edit each file in app/api/validate/*/route.ts
   // Find this line near the top:
   const API_KEY = 'your_private_api_key_here';
   // Replace 'your_private_api_key_here' with your actual API key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the available API routes.

### API Routes

The app includes 8 API route handlers demonstrating all validation scenarios:

- `POST /api/validate/country` - Basic country validation
- `POST /api/validate/country-follow-upward` - Country validation with `followUpward` option
- `POST /api/validate/multiple-countries` - Multiple country validation
- `POST /api/validate/subdivision` - Basic subdivision validation
- `POST /api/validate/subdivision-follow-related` - Subdivision validation with `followRelated` option
- `POST /api/validate/subdivision-allow-parent` - Subdivision validation with `allowParentSelection` option
- `POST /api/validate/multiple-subdivisions` - Multiple subdivision validation
- `POST /api/validate/empty-subdivision` - Empty subdivision validation (for countries with no subdivisions)

### Project Structure

```
app/
  api/
    validate/
      country/
        route.ts
      country-follow-upward/
        route.ts
      multiple-countries/
        route.ts
      subdivision/
        route.ts
      subdivision-follow-related/
        route.ts
      subdivision-allow-parent/
        route.ts
      multiple-subdivisions/
        route.ts
      empty-subdivision/
        route.ts
  page.tsx
```

### Testing the Routes

You can test the API routes using curl, Postman, or any HTTP client:

```bash
# Basic country validation
curl -X POST http://localhost:3000/api/validate/country \
  -H "Content-Type: application/json" \
  -d '{"code": "US"}'

# Multiple countries
curl -X POST http://localhost:3000/api/validate/multiple-countries \
  -H "Content-Type: application/json" \
  -d '{"code": ["US", "CA", "MX"]}'
```

### Notes

- This is a complete Next.js application that you can run and test immediately.
- The validator handles all HTTP requests, error handling, and response parsing automatically.
- For production use, install the package in your Next.js project: `npm install @countriesdb/validator`


