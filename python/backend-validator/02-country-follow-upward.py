"""Country validation with follow_upward example using countriesdb-validator package"""

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

# 2. Country validation with follow_upward
def main():
    try:
        print('Validating country code: US with follow_upward=True')
        result = validator.validate_country('US', follow_upward=True)
        print('Response:', json.dumps(result, indent=2))
        
        if not result['valid']:
            raise ValueError('Country validation failed')
        
        print('Country is valid')
    except Exception as exc:
        print(f'Validation failed: {exc}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()


