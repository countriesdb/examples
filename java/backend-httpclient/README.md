## Backend Example – Java (java.net.http.HttpClient)

Minimal Maven project that demonstrates CountriesDB validation API using the JDK HTTP client (`java.net.http.HttpClient`).

### Requirements

- Java 17+ (LTS release - required for text blocks and modern features)
- Maven 3.8.3+ (3.9.0+ recommended - fully compatible with Java 17)

### Setup

1. **Set your API key:** Edit any of the `App*.java` files and replace `YOUR_API_KEY` with your actual API key.

2. Compile the project:
   ```bash
   mvn compile
   ```

### Examples

This project includes 8 examples covering all validation scenarios:

#### 1. Basic Country Validation
```bash
mvn compile exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App01
```
Validates a single country code (`US`).

**Note:** The `compile` goal ensures classes are built before running. You can also compile once with `mvn compile` and then run examples individually.

#### 2. Country with Follow Upward
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App02
```
Validates a country code with `follow_upward: true` to check parent-subdivision relationships.

#### 3. Multiple Country Validation
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App03
```
Validates multiple country codes in a single request (`US`, `CA`, `MX`, `FR`).

#### 4. Basic Subdivision Validation
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App04
```
Validates a single subdivision code (`US-CA` for country `US`).

#### 5. Subdivision with Follow Related
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App05
```
Validates a subdivision with `follow_related: true` to check for country redirects (`FR-40`).

#### 6. Subdivision with Allow Parent Selection
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App06
```
Validates a subdivision with `allow_parent_selection: true` to allow parent subdivisions (`FR-ARA`).

#### 7. Multiple Subdivision Validation
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App07
```
Validates multiple subdivision codes in a single request (`US-CA`, `US-NY`, `US-TX`).

#### 8. Empty Subdivision Validation
```bash
mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App08
```
Validates an empty subdivision code for countries with no subdivisions (`AQ` - Antarctica).

### Quick Start

First, compile the project:
```bash
mvn compile
```

Then run all examples sequentially:
```bash
for i in {1..8}; do
  echo "Running App0$i..."
  mvn exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App0$i
  echo ""
done
```

**Tip:** You can also combine compile and exec in one command:
```bash
mvn compile exec:java -Dexec.mainClass=com.countriesdb.examples.httpclient.App01
```

### What it demonstrates

- Using `java.net.http.HttpClient` (JDK 11+) for HTTP requests
- JSON serialization/deserialization with Jackson
- All CountriesDB validation endpoints and parameters
- Error handling and response parsing

Perfect for Spring Boot, Quarkus, Micronaut, or any Java backend that prefers a zero-dependency JDK client.
