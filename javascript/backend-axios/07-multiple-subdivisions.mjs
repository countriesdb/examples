// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

import axios from 'axios';

const API_BASE = 'https://api.countriesdb.com';


if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 7. Multiple subdivision validation
async function main() {
  try {
    console.log('Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)');
    const { data } = await client.post('/api/validate/subdivision', {
      country: 'US',
      code: ['US-CA', 'US-NY', 'US-TX'],
    });
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.results && data.results.some(r => !r.valid)) {
      throw new Error('Some subdivisions are invalid');
    }
    
    console.log('All subdivisions are valid');
  } catch (err) {
    console.error('Validation failed:', err.response?.data ?? err.message);
    process.exit(1);
  }
}

main();
