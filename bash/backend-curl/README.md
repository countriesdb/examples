# Backend Example – Bash (cURL)

This example shows how to call the CountriesDB validation API from bash using `curl`.

## Prerequisites

- `curl` installed
- `jq` installed (for JSON parsing)
- CountriesDB **private** API key

## Setup

1. Edit any script and set your API key:
   ```bash
   # Open any script (e.g., 01-basic-country.sh)
   # Find this line near the top:
   API_KEY="your_private_api_key_here"
   # Replace "your_private_api_key_here" with your actual API key
   ```

2. Run any example:
   ```bash
   bash 01-basic-country.sh
   ```

## Examples

This directory contains 8 example scripts demonstrating all validation scenarios:

1. **01-basic-country.sh** - Basic country validation (single country, no options)
2. **02-country-follow-upward.sh** - Country validation with `follow_upward` option
3. **03-multiple-countries.sh** - Multiple country validation
4. **04-basic-subdivision.sh** - Basic subdivision validation (single subdivision, no options)
5. **05-subdivision-follow-related.sh** - Subdivision validation with `follow_related` option
6. **06-subdivision-allow-parent.sh** - Subdivision validation with `allow_parent_selection` option
7. **07-multiple-subdivisions.sh** - Multiple subdivision validation
8. **08-empty-subdivision.sh** - Empty subdivision validation (for countries with no subdivisions)

## Configuration

Set your private API key directly in each script by editing the `API_KEY` variable at the top of the file.

## Notes

- All scripts check the `valid` field in the response and exit with error code 1 if validation fails.
- For production you should add proper error handling and logging as needed.

