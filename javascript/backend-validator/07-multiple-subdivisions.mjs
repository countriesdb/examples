// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

import { CountriesDBValidator } from '@countriesdb/validator';

if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

const validator = new CountriesDBValidator({
  apiKey: API_KEY,
});

// 7. Multiple subdivision validation
async function main() {
  try {
    console.log('Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)');
    const results = await validator.validateSubdivisions(
      ['US-CA', 'US-NY', 'US-TX'],
      'US'
    );
    console.log('Response:', JSON.stringify(results, null, 2));
    
    if (results.some(r => !r.valid)) {
      throw new Error('Some subdivisions are invalid');
    }
    
    console.log('All subdivisions are valid');
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();

