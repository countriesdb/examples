#!/bin/bash

# List countries via the Bearer-authenticated data API (server-to-server).
# Same private API key as validation; counts toward backend metered usage.

API_KEY="your_private_api_key_here"

if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_private_api_key_here" ]; then
  echo "Error: Please set your CountriesDB private API key in the script"
  exit 1
fi

echo "Fetching countries (GET /api/data/countries)"
RESPONSE=$(curl -s -X GET "https://api.countriesdb.com/api/data/countries?country_name_source=default" \
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
if [ "$COUNT" -lt 1 ]; then
  echo "Expected at least one country"
  exit 1
fi

echo "OK: received $COUNT countries"
