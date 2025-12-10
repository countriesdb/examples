from __future__ import annotations

import json
import sys

import requests

# Set your CountriesDB private API key here
API_KEY = "your_private_api_key_here"
API_BASE = "https://api.countriesdb.com"

if not API_KEY or API_KEY == "your_private_api_key_here":
    raise SystemExit("Please set your API_KEY in the script")

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}


def call_api(path: str, payload: dict) -> dict:
    response = requests.post(f"{API_BASE}{path}", headers=HEADERS, json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


# 2. Country validation with follow_upward
def main() -> None:
    try:
        print("Validating country code: US (with follow_upward)")
        result = call_api("/api/validate/country", {"code": "US", "follow_upward": True})
        print("Response:", json.dumps(result, indent=2))
        
        if not result.get("valid"):
            raise ValueError("Country validation failed")
        
        print("Country is valid")
    except requests.HTTPError as exc:
        print("Request failed:", exc.response.text, file=sys.stderr)
        sys.exit(1)
    except Exception as exc:
        print(f"Validation failed: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

