// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

if (!API_KEY || API_KEY === 'your_private_api_key_here') {
  throw new Error('Please set your COUNTRIESDB_PRIVATE_KEY in the script');
}

async function request(path, body) {
  const response = await fetch(`https://api.countriesdb.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload.message || 'CountriesDB API error');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

// 3. Multiple country validation
async function main() {
  try {
    console.log('Validating multiple country codes: US, CA, MX, FR');
    const result = await request('/api/validate/country', {
      code: ['US', 'CA', 'MX', 'FR'],
    });
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.results && result.results.some(r => !r.valid)) {
      throw new Error('Some countries are invalid');
    }
    
    console.log('All countries are valid');
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();

