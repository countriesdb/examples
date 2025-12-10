"""Empty subdivision validation example using countriesdb-validator package"""

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

# 8. Empty subdivision validation (for countries without subdivisions)
def main():
    try:
        print('Validating empty subdivision for country: AQ (Antarctica)')
        result = validator.validate_subdivision('', 'AQ')
        print('Response:', json.dumps(result, indent=2))
        
        if not result['valid']:
            raise ValueError('Subdivision validation failed')
        
        print('Empty subdivision is valid (country has no subdivisions)')
    except Exception as exc:
        print(f'Validation failed: {exc}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()


