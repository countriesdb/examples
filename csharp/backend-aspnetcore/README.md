## Backend Example – ASP.NET Core (HttpClient)

ASP.NET Core web application demonstrating CountriesDB validation API integration using `System.Net.Http.HttpClient`.

### Prerequisites

- .NET 10.0 SDK or higher (or .NET 8.0+)

### Configuration

1. **Set your API key** in `CountriesDbClient.cs`:
   ```csharp
   private const string API_KEY = "YOUR_API_KEY";
   ```

2. **Run the application**:
   ```bash
   dotnet run
   ```

   The server will start on `http://localhost:5000` (or `https://localhost:5001`)

3. **Open the test page**:
   Navigate to `http://localhost:5000` in your browser to access an interactive test page with all 8 validation endpoints.

### Available Endpoints

This example includes 8 validation endpoints covering all validation scenarios:

#### 1. Basic Country Validation
```bash
curl -X POST http://localhost:5000/api/validate/country/basic \
  -H "Content-Type: application/json" \
  -d '{"country":"US"}'
```

#### 2. Country Validation with Follow Upward
```bash
curl -X POST http://localhost:5000/api/validate/country/follow-upward \
  -H "Content-Type: application/json" \
  -d '{"country":"US"}'
```

#### 3. Multiple Country Validation
```bash
curl -X POST http://localhost:5000/api/validate/country/multiple \
  -H "Content-Type: application/json" \
  -d '{"countries":["US","CA","MX"]}'
```

#### 4. Basic Subdivision Validation
```bash
curl -X POST http://localhost:5000/api/validate/subdivision/basic \
  -H "Content-Type: application/json" \
  -d '{"country":"US","subdivision":"US-CA"}'
```

#### 5. Subdivision Validation with Follow Related
```bash
curl -X POST http://localhost:5000/api/validate/subdivision/follow-related \
  -H "Content-Type: application/json" \
  -d '{"country":"FR","subdivision":"FR-40"}'
```

#### 6. Subdivision Validation with Allow Parent Selection
```bash
curl -X POST http://localhost:5000/api/validate/subdivision/allow-parent \
  -H "Content-Type: application/json" \
  -d '{"country":"FR","subdivision":"FR-ARA"}'
```

#### 7. Multiple Subdivision Validation
```bash
curl -X POST http://localhost:5000/api/validate/subdivision/multiple \
  -H "Content-Type: application/json" \
  -d '{"country":"US","subdivisions":["US-CA","US-NY","US-TX"]}'
```

#### 8. Empty Subdivision Validation (for countries without subdivisions)
```bash
curl -X POST http://localhost:5000/api/validate/subdivision/empty \
  -H "Content-Type: application/json" \
  -d '{"country":"AQ","subdivision":""}'
```

### Project Structure

- `CountriesDbClient` - Service class that handles HTTP requests to CountriesDB API using `HttpClient` (API key hardcoded for examples)
- `ValidationController01-08` - Eight separate controllers, each demonstrating a different validation scenario
- `Program.cs` - Main application entry point
- `wwwroot/index.html` - Interactive test page for all endpoints

### Highlights

- Uses `System.Net.Http.HttpClient` for HTTP requests
- API key hardcoded in `CountriesDbClient.cs` for easy example setup
- Each controller demonstrates a specific validation use case
- Proper error handling with HTTP status codes (422 for validation failures)
- CORS enabled for local testing

### Building

```bash
dotnet build
dotnet run
```

