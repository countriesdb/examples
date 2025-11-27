#!/bin/bash

# Set your CountriesDB private API key here
API_KEY="your_private_api_key_here"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_private_api_key_here" ]; then
  echo "Error: Please set your COUNTRIESDB_PRIVATE_KEY in the script"
  exit 1
fi

# Multiple subdivision validation
echo "Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)"
RESPONSE=$(curl -s -X POST "https://api.countriesdb.com/api/validate/subdivision" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"country": "US", "code": ["US-CA", "US-NY", "US-TX"]}')

echo "Response: $RESPONSE"

# Check if all are valid
if echo "$RESPONSE" | jq -e '.results[] | select(.valid == false)' > /dev/null 2>&1; then
  echo "Some subdivisions are invalid"
  exit 1
fi

echo "All subdivisions are valid"

