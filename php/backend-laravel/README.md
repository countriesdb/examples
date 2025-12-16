## Backend Example – PHP (Laravel Validation Rules)

This is a full Laravel application demonstrating how to use the [`countriesdb/validator`](https://packagist.org/packages/countriesdb/validator) package's Laravel validation rules (`ValidCountry` and `ValidSubdivision`).

### Quick Start

1. Install dependencies: `composer install`
2. Copy environment file: `cp .env.example .env`
3. Set your API key in `.env`: `COUNTRIESDB_PRIVATE_KEY=your_key_here`
4. Generate app key: `php artisan key:generate`
5. Start the server: `php artisan serve`
6. Open your browser: `http://localhost:8000` to test all endpoints with the web interface

### Sample Endpoints

All endpoints accept POST requests with JSON payloads:

**Country Validation:**
- `/api/validate/country/basic` — `{ "country": "US" }`
- `/api/validate/country/follow-upward` — `{ "country": "GF" }`
- `/api/validate/country/multiple` — `{ "countries": ["US", "CA", "MX"] }`

**Subdivision Validation:**
- `/api/validate/subdivision/basic` — `{ "country": "US", "subdivision": "US-CA" }`
- `/api/validate/subdivision/follow-related` — `{ "country": "FR", "subdivision": "FR-40" }`
- `/api/validate/subdivision/allow-parent` — `{ "country": "FR", "subdivision": "FR-ARA" }`
- `/api/validate/subdivision/multiple` — `{ "country": "US", "subdivisions": ["US-CA", "US-NY"] }`
- `/api/validate/subdivision/empty` — `{ "country": "AQ", "subdivision": null }`

### Testing

**Web Interface (Easiest):**
Visit `http://localhost:8000` in your browser to use the interactive test page. The page demonstrates both validation rules and standalone validator usage.

**cURL:**
```bash
curl -X POST http://localhost:8000/api/validate/country/basic \
  -H "Content-Type: application/json" \
  -d '{"country": "US"}'
```

### Code Examples

All routes are in `routes/api.php` and demonstrate using the package's validation rules:

```php
use CountriesDB\Validator\Rules\ValidCountry;
use CountriesDB\Validator\Rules\ValidSubdivision;

// In a FormRequest or route closure
$validated = $request->validate([
    'country' => ['required', 'string', new ValidCountry()],
    'subdivision' => ['required', 'string', new ValidSubdivision('country')],
]);
```

### Configuration

Add to `config/services.php`:

```php
'countriesdb' => [
    'private_key' => env('COUNTRIESDB_PRIVATE_KEY'),
    'api_url' => 'https://api.countriesdb.com',
],
```

### Package

This example uses the [`countriesdb/validator`](https://packagist.org/packages/countriesdb/validator) package, which provides:
- `ValidCountry` - Laravel validation rule for country codes
- `ValidSubdivision` - Laravel validation rule for subdivision codes
- `Validator` - Standalone validator class for manual validation

See the [package documentation](https://packagist.org/packages/countriesdb/validator) for more details.
