// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

import { CountriesDBValidator } from '@countriesdb/validator';

if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

const validator = new CountriesDBValidator({
  apiKey: API_KEY,
});

// 2. Country validation with follow_upward
async function main() {
  try {
    console.log('Validating country code: US (with follow_upward)');
    const result = await validator.validateCountry('US', {
      followUpward: true,
    });
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (!result.valid) {
      throw new Error('Country validation failed');
    }
    
    console.log('Country is valid');
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();

