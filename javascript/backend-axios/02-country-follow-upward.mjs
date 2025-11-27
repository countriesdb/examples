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

// 2. Country validation with follow_upward
async function main() {
  try {
    console.log('Validating country code: US (with follow_upward)');
    const { data } = await client.post('/api/validate/country', { 
      code: 'US', 
      follow_upward: true 
    });
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (!data.valid) {
      throw new Error('Country validation failed');
    }
    
    console.log('Country is valid');
  } catch (err) {
    console.error('Validation failed:', err.response?.data ?? err.message);
    process.exit(1);
  }
}

main();
