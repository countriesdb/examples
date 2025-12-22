## Backend Example – .NET (HttpClient)

Minimal .NET console application that demonstrates CountriesDB validation API using `System.Net.Http.HttpClient`.

### Requirements

- .NET 10.0 SDK or higher (or .NET 8.0+)

### Setup

1. **Set your API key:** Edit `Program.cs` and replace `YOUR_API_KEY` with your actual API key.

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

### Examples

This project includes 8 examples covering all validation scenarios. Run any example directly using:

```bash
dotnet run -- <example-number>
```

#### 1. Basic Country Validation
```bash
dotnet run -- 1
```
Validates a single country code (`US`).

#### 2. Country with Follow Upward
```bash
dotnet run -- 2
```
Validates a country code with `follow_upward: true` to check parent-subdivision relationships.

#### 3. Multiple Country Validation
```bash
dotnet run -- 3
```
Validates multiple country codes in a single request (`US`, `CA`, `MX`, `FR`).

#### 4. Basic Subdivision Validation
```bash
dotnet run -- 4
```
Validates a single subdivision code (`US-CA` for country `US`).

#### 5. Subdivision with Follow Related
```bash
dotnet run -- 5
```
Validates a subdivision with `follow_related: true` to check for country redirects (`FR-40`).

#### 6. Subdivision with Allow Parent Selection
```bash
dotnet run -- 6
```
Validates a subdivision with `allow_parent_selection: true` to allow parent subdivisions (`FR-ARA`).

#### 7. Multiple Subdivision Validation
```bash
dotnet run -- 7
```
Validates multiple subdivision codes in a single request (`US-CA`, `US-NY`, `US-TX`).

#### 8. Empty Subdivision Validation
```bash
dotnet run -- 8
```
Validates an empty subdivision code for countries with no subdivisions (`AQ` - Antarctica).

### Quick Start

Run all examples sequentially:
```bash
for i in {1..8}; do
  echo "Running example $i..."
  dotnet run -- $i
  echo ""
done
```


### What it demonstrates

- Using `System.Net.Http.HttpClient` for HTTP requests
- JSON serialization/deserialization with `System.Text.Json`
- All CountriesDB validation endpoints and parameters
- Error handling and response parsing

Perfect for ASP.NET Core, minimal APIs, or any .NET backend that prefers the standard HTTP client.
