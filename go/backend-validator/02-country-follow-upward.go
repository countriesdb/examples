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

	// 2. Country validation with follow_upward
	fmt.Println("Validating country code: US (with follow_upward)")
	result, err := v.ValidateCountry(ctx, "US", validator.CountryOptions{
		FollowUpward: true,
	})
	if err != nil {
		log.Fatalf("Validation failed: %v", err)
	}

	jsonResult, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println("Response:", string(jsonResult))

	if !result.Valid {
		log.Fatal("❌ Country validation failed")
	}

	fmt.Println("✅ Country is valid")
}
