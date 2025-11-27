#!/bin/bash

# Set your CountriesDB private API key here
API_KEY="your_private_api_key_here"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_private_api_key_here" ]; then
  echo "Error: Please set your COUNTRIESDB_PRIVATE_KEY in the script"
  exit 1
fi

# Subdivision validation with allow_parent_selection
echo "Validating subdivision code: FR-ARA (country: FR, with allow_parent_selection)"
RESPONSE=$(curl -s -X POST "https://api.countriesdb.com/api/validate/subdivision" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"country": "FR", "code": "FR-ARA", "allow_parent_selection": true}')

echo "Response: $RESPONSE"

# Check if valid
VALID=$(echo "$RESPONSE" | jq -r '.valid // false')
if [ "$VALID" != "true" ]; then
  echo "Validation failed"
  exit 1
fi

echo "Subdivision is valid"

