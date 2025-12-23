package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

var (
	apiKey  = "YOUR_API_KEY" // Hardcoded API key - replace with your actual key
	baseURL = "https://api.countriesdb.com"
)

func main() {

	// 6. Subdivision validation with allow_parent_selection
	fmt.Println("Validating subdivision code: FR-ARA (country: FR, with allow_parent_selection)")
	result := call("/api/validate/subdivision", map[string]any{
		"country":                "FR",
		"code":                   "FR-ARA",
		"allow_parent_selection": true,
	})

	var data map[string]any
	if err := json.Unmarshal([]byte(result), &data); err != nil {
		log.Fatalf("Failed to parse response: %v", err)
	}

	if valid, ok := data["valid"].(bool); !ok || !valid {
		log.Fatal("❌ Subdivision validation failed")
	}

	fmt.Println("✅ Subdivision is valid")
}

func call(path string, payload map[string]any) string {
	body, _ := json.Marshal(payload)
	req, err := http.NewRequest(http.MethodPost, baseURL+path, bytes.NewBuffer(body))
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	out, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 400 {
		log.Fatalf("❌ Request failed (%d): %s", resp.StatusCode, out)
	}

	fmt.Println("Response:", string(out))
	return string(out)
}
