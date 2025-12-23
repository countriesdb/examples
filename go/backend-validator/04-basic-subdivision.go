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

	// 4. Basic subdivision validation
	fmt.Println("Validating subdivision code: US-CA (country: US)")
	result, err := v.ValidateSubdivision(ctx, "US-CA", "US", validator.SubdivisionOptions{
		FollowRelated:        false,
		AllowParentSelection: false,
	})
	if err != nil {
		log.Fatalf("Validation failed: %v", err)
	}

	jsonResult, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println("Response:", string(jsonResult))

	if !result.Valid {
		log.Fatal("❌ Subdivision validation failed")
	}

	fmt.Println("✅ Subdivision is valid")
}
