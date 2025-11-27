// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

import { CountriesDBValidator } from '@countriesdb/validator';

if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

const validator = new CountriesDBValidator({
  apiKey: API_KEY,
});

// 5. Subdivision validation with follow_related
async function main() {
  try {
    console.log('Validating subdivision code: FR-40 (country: FR, with follow_related)');
    const result = await validator.validateSubdivision('FR-40', 'FR', {
      followRelated: true,
    });
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (!result.valid) {
      throw new Error('Subdivision validation failed');
    }
    
    console.log('Subdivision is valid');
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();

