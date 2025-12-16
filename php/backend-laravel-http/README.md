## Backend Example – PHP (Laravel Http)

This is a full Laravel application demonstrating how to use Laravel's `Http` facade to call CountriesDB validation endpoints.

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
- `/api/validate/country/basic` — `{ "code": "US" }`
- `/api/validate/country/follow-upward` — `{ "code": "GF" }`
- `/api/validate/country/multiple` — `{ "codes": ["US", "CA", "MX", "FR"] }`

**Subdivision Validation:**
- `/api/validate/subdivision/basic` — `{ "country": "US", "code": "US-CA" }`
- `/api/validate/subdivision/follow-related` — `{ "country": "FR", "code": "FR-40" }`
- `/api/validate/subdivision/allow-parent` — `{ "country": "FR", "code": "FR-ARA" }`
- `/api/validate/subdivision/multiple` — `{ "country": "US", "codes": ["US-CA", "US-NY", "US-TX"] }`
- `/api/validate/subdivision/empty` — `{ "country": "AQ" }`

### Testing

**Web Interface (Easiest):**
Visit `http://localhost:8000` in your browser to use the interactive test page with forms for all endpoints.

**cURL:**
```bash
curl -X POST http://localhost:8000/api/validate/country/basic \
  -H "Content-Type: application/json" \
  -d '{"code": "US"}'
```

### Code Examples

All routes are in `routes/api.php` and demonstrate using `Http::withToken()->post()` to call the CountriesDB API:

```php
use Illuminate\Support\Facades\Http;

$apiKey = config('services.countriesdb.private_key');

$response = Http::withToken($apiKey)
    ->post('https://api.countriesdb.com/api/validate/country', [
        'code' => 'US',
    ]);

return $response->json();
```

### Configuration

The API key is configured in `config/services.php` and loaded from the `COUNTRIESDB_PRIVATE_KEY` environment variable.
