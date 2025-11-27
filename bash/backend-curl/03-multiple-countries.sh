#!/bin/bash

# Set your CountriesDB private API key here
API_KEY="your_private_api_key_here"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_private_api_key_here" ]; then
  echo "Error: Please set your COUNTRIESDB_PRIVATE_KEY in the script"
  exit 1
fi

# Multiple country validation
echo "Validating multiple country codes: US, CA, MX, FR"
RESPONSE=$(curl -s -X POST "https://api.countriesdb.com/api/validate/country" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"code": ["US", "CA", "MX", "FR"]}')

echo "Response: $RESPONSE"

# Check if all are valid
if echo "$RESPONSE" | jq -e '.results[] | select(.valid == false)' > /dev/null 2>&1; then
  echo "Some countries are invalid"
  exit 1
fi

echo "All countries are valid"

