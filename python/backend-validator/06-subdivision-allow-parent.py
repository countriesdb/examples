"""Subdivision validation with allow_parent example using countriesdb-validator package"""

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

# 6. Subdivision validation with allow_parent
def main():
    try:
        print('Validating subdivision code: FR-ARA for country: FR with allow_parent=True')
        result = validator.validate_subdivision('FR-ARA', 'FR', allow_parent=True)
        print('Response:', json.dumps(result, indent=2))
        
        if not result['valid']:
            raise ValueError('Subdivision validation failed')
        
        print('Subdivision is valid')
    except Exception as exc:
        print(f'Validation failed: {exc}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()


