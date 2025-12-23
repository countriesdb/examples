## Backend Example – Go (`validator-go` package)

Command-line examples that validate countries/subdivisions using the [`github.com/countriesdb/validator-go`](https://github.com/countriesdb/validator-go) package.

### Setup

1. **Set your API key:** Edit any of the example files (e.g., `01-basic-country.go`) and replace `YOUR_API_KEY` with your actual API key.

2. **Install dependencies:**
```bash
go mod tidy
```

3. **Run an example:**
```bash
go run 01-basic-country.go
go run 02-country-follow-upward.go
go run 03-multiple-countries.go
go run 04-basic-subdivision.go
go run 05-subdivision-follow-related.go
go run 06-subdivision-allow-parent.go
go run 07-multiple-subdivisions.go
go run 08-empty-subdivision.go
```

### Files

- `01-basic-country.go` – Basic country validation
- `02-country-follow-upward.go` – Country validation with `follow_upward`
- `03-multiple-countries.go` – Multiple country validation
- `04-basic-subdivision.go` – Basic subdivision validation
- `05-subdivision-follow-related.go` – Subdivision validation with `follow_related`
- `06-subdivision-allow-parent.go` – Subdivision validation with `allow_parent_selection`
- `07-multiple-subdivisions.go` – Multiple subdivision validation
- `08-empty-subdivision.go` – Empty subdivision validation
- `go.mod` – module definition with local package reference

### Notes

- These examples use the [`github.com/countriesdb/validator-go`](https://github.com/countriesdb/validator-go) package for validation.
- Running `go mod tidy` will automatically download the package from GitHub.
- For production use, install the package: `go get github.com/countriesdb/validator-go`

