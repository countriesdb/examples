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

	// 7. Multiple subdivision validation
	codes := []string{"US-CA", "US-NY", "US-TX"}
	fmt.Printf("Validating subdivision codes: %v (country: US)\n", codes)
	results, err := v.ValidateSubdivisions(ctx, codes, "US", validator.SubdivisionOptions{
		AllowParentSelection: false,
	})
	if err != nil {
		log.Fatalf("Validation failed: %v", err)
	}

	jsonResult, _ := json.MarshalIndent(results, "", "  ")
	fmt.Println("Response:", string(jsonResult))

	for _, result := range results {
		if !result.Valid {
			log.Fatalf("❌ Subdivision %s validation failed: %s", result.Code, result.Message)
		}
	}

	fmt.Println("✅ All subdivisions are valid")
}
