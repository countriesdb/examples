## Backend Example – Spring Boot (RestClient)

Spring Boot application demonstrating CountriesDB validation API integration using Spring's `RestClient` (Spring 6+).

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Configuration

1. **Set your API key** in `src/main/java/com/countriesdb/examples/spring/CountriesDbClient.java`:
   ```java
   private static final String API_KEY = "YOUR_API_KEY";
   ```

2. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

   The server will start on `http://localhost:8080`

3. **Open the test page**:
   Navigate to `http://localhost:8080` in your browser to access an interactive test page with all 8 validation endpoints.

### Available Endpoints

This example includes 8 validation endpoints covering all validation scenarios:

#### 1. Basic Country Validation
```bash
curl -X POST http://localhost:8080/api/validate/country/basic \
  -H "Content-Type: application/json" \
  -d '{"country":"US"}'
```

#### 2. Country Validation with Follow Upward
```bash
curl -X POST http://localhost:8080/api/validate/country/follow-upward \
  -H "Content-Type: application/json" \
  -d '{"country":"US"}'
```

#### 3. Multiple Country Validation
```bash
curl -X POST http://localhost:8080/api/validate/country/multiple \
  -H "Content-Type: application/json" \
  -d '{"countries":["US","CA","MX"]}'
```

#### 4. Basic Subdivision Validation
```bash
curl -X POST http://localhost:8080/api/validate/subdivision/basic \
  -H "Content-Type: application/json" \
  -d '{"country":"US","subdivision":"US-CA"}'
```

#### 5. Subdivision Validation with Follow Related
```bash
curl -X POST http://localhost:8080/api/validate/subdivision/follow-related \
  -H "Content-Type: application/json" \
  -d '{"country":"FR","subdivision":"FR-40"}'
```

#### 6. Subdivision Validation with Allow Parent Selection
```bash
curl -X POST http://localhost:8080/api/validate/subdivision/allow-parent \
  -H "Content-Type: application/json" \
  -d '{"country":"FR","subdivision":"FR-ARA"}'
```

#### 7. Multiple Subdivision Validation
```bash
curl -X POST http://localhost:8080/api/validate/subdivision/multiple \
  -H "Content-Type: application/json" \
  -d '{"country":"US","subdivisions":["US-CA","US-NY","US-TX"]}'
```

#### 8. Empty Subdivision Validation (for countries without subdivisions)
```bash
curl -X POST http://localhost:8080/api/validate/subdivision/empty \
  -H "Content-Type: application/json" \
  -d '{"country":"AQ","subdivision":""}'
```

### Project Structure

- `CountriesDbClient` - Service component that handles HTTP requests to CountriesDB API using `RestClient` (API key hardcoded for examples)
- `ValidationController01-08` - Eight separate controllers, each demonstrating a different validation scenario
- `BackendSpringApplication` - Main Spring Boot application class

### Highlights

- Uses Spring's `RestClient` (Spring 6+) for HTTP requests
- API key hardcoded in `CountriesDbClient.java` for easy example setup
- Each controller demonstrates a specific validation use case
- Proper error handling with HTTP status codes (422 for validation failures)

### Building

```bash
mvn clean package
java -jar target/backend-java-spring-0.0.1-SNAPSHOT.jar
```
