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

	// 7. Multiple subdivision validation
	fmt.Println("Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)")
	result := call("/api/validate/subdivision", map[string]any{
		"country": "US",
		"code":    []string{"US-CA", "US-NY", "US-TX"},
	})

	var data map[string]any
	if err := json.Unmarshal([]byte(result), &data); err != nil {
		log.Fatalf("Failed to parse response: %v", err)
	}

	if results, ok := data["results"].([]any); ok {
		for _, item := range results {
			if itemMap, ok := item.(map[string]any); ok {
				if valid, ok := itemMap["valid"].(bool); !ok || !valid {
					log.Fatal("❌ Some subdivisions are invalid")
				}
			}
		}
	}

	fmt.Println("✅ All subdivisions are valid")
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
