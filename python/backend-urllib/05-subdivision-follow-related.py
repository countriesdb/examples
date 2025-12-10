"""Subdivision validation with follow_related example using urllib.request"""

import urllib.request
import urllib.parse
import json
import sys

# Set your CountriesDB private API key here
API_KEY = 'your_private_api_key_here'
API_BASE = 'https://api.countriesdb.com'

if not API_KEY or API_KEY == 'your_private_api_key_here':
    raise SystemExit('Please set your API_KEY in the script')

# 5. Subdivision validation with follow_related
def main():
    try:
        print('Validating subdivision code: FR-40 for country: FR (with follow_related)')
        url = f'{API_BASE}/api/validate/subdivision'
        
        data = json.dumps({
            'country': 'FR',
            'code': 'FR-40',
            'follow_related': True
        }).encode('utf-8')
        
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
            
            if not result.get('valid'):
                raise ValueError('Subdivision validation failed')
            
            print('Subdivision is valid')
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


