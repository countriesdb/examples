package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/countriesdb/validator-go"
)

func main() {
	// Set your CountriesDB private API key here
	apiKey := "YOUR_API_KEY" // Replace with your actual API key
	if apiKey == "YOUR_API_KEY" {
		log.Fatal("Please set your API_KEY in the script")
	}

	v, err := validator.NewValidator(apiKey)
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()

	// 3. Multiple country validation
	codes := []string{"US", "CA", "MX", "FR"}
	fmt.Printf("Validating country codes: %v\n", codes)
	results, err := v.ValidateCountries(ctx, codes, validator.CountryOptions{})
	if err != nil {
		log.Fatalf("Validation failed: %v", err)
	}

	jsonResult, _ := json.MarshalIndent(results, "", "  ")
	fmt.Println("Response:", string(jsonResult))

	for _, result := range results {
		if !result.Valid {
			log.Fatalf("❌ Country %s validation failed: %s", result.Code, result.Message)
		}
	}

	fmt.Println("✅ All countries are valid")
}
