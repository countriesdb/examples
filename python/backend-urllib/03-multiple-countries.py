"""Multiple country validation example using urllib.request"""

import urllib.request
import urllib.parse
import json
import sys

# Set your CountriesDB private API key here
API_KEY = 'your_private_api_key_here'
API_BASE = 'https://api.countriesdb.com'

if not API_KEY or API_KEY == 'your_private_api_key_here':
    raise SystemExit('Please set your API_KEY in the script')

# 3. Multiple country validation
def main():
    try:
        codes = ['US', 'CA', 'MX', 'FR']
        print(f'Validating multiple country codes: {codes}')
        url = f'{API_BASE}/api/validate/country'
        
        data = json.dumps({'code': codes}).encode('utf-8')
        
        req = urllib.request.Request(
            url,
            data=data,
            headers={
                'Authorization': f'Bearer {API_KEY}',
                'Content-Type': 'application/json',
            }
        )
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print('Response:', json.dumps(result, indent=2))
            
            if result.get('results') and any(not r.get('valid') for r in result['results']):
                raise ValueError('Some countries are invalid')
            
            print('All countries are valid')
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode('utf-8')
        print(f'Request failed: {exc.code} {exc.reason}', file=sys.stderr)
        print(f'Response: {error_body}', file=sys.stderr)
        sys.exit(1)
    except Exception as exc:
        print(f'Validation failed: {exc}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()


