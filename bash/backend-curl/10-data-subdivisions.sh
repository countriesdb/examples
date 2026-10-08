#!/bin/bash

# List subdivisions for a country via the Bearer-authenticated data API.

API_KEY="your_private_api_key_here"
COUNTRY="${1:-US}"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_private_api_key_here" ]; then
  echo "Error: Please set your CountriesDB private API key in the script"
  exit 1
fi

echo "Fetching subdivisions for ${COUNTRY} (GET /api/data/countries/${COUNTRY}/subdivisions)"
RESPONSE=$(curl -s -X GET "https://api.countriesdb.com/api/data/countries/${COUNTRY}/subdivisions" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Accept: application/json" \
  -H "Accept-Language: en")

echo "Response (truncated): ${RESPONSE:0:200}..."

TYPE=$(echo "$RESPONSE" | jq -r 'if type == "array" then "array" else type end')
if [ "$TYPE" != "array" ]; then
  echo "Expected a JSON array, got: $TYPE"
  exit 1
fi

COUNT=$(echo "$RESPONSE" | jq 'length')
echo "OK: received $COUNT subdivisions (may be 0 for some countries/plans)"
