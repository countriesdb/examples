// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

import { CountriesDBValidator } from '@countriesdb/validator';

if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

const validator = new CountriesDBValidator({
  apiKey: API_KEY,
});

// 8. Empty subdivision validation (for countries with no subdivisions like Antarctica)
async function main() {
  try {
    console.log('Validating empty subdivision code for country: AQ');
    const result = await validator.validateSubdivision('', 'AQ');
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (!result.valid) {
      throw new Error('Empty subdivision validation failed');
    }
    
    console.log('Empty subdivision is valid (country has no subdivisions)');
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();

