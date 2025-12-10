"""Multiple subdivision validation example using countriesdb-validator package"""

from validator import CountriesDBValidator
import json
import sys

# Set your CountriesDB private API key here
API_KEY = 'your_private_api_key_here'

if not API_KEY or API_KEY == 'your_private_api_key_here':
    raise SystemExit('Please set your API_KEY in the script')

validator = CountriesDBValidator({
    'api_key': API_KEY,
})

# 7. Multiple subdivision validation
def main():
    try:
        codes = ['US-CA', 'US-NY', 'US-TX']
        print(f'Validating subdivision codes: {codes} for country: US')
        results = validator.validate_subdivisions(codes, 'US')
        print('Response:', json.dumps(results, indent=2))
        
        for result in results:
            if not result['valid']:
                raise ValueError(f"Subdivision {result.get('code')} validation failed: {result.get('message')}")
        
        print('All subdivisions are valid')
    except Exception as exc:
        print(f'Validation failed: {exc}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()


