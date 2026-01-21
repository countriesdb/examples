import { NextRequest, NextResponse } from 'next/server';
import { CountriesDBValidator } from '@countriesdb/validator';

// Set your CountriesDB private API key here
const API_KEY = 'your_private_api_key_here';

const validator = new CountriesDBValidator({
  apiKey: API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code: codes } = body;

    if (!codes || !Array.isArray(codes)) {
      return NextResponse.json(
        { error: 'Country codes array is required' },
        { status: 400 }
      );
    }

    const results = await validator.validateCountries(codes);
    // Pass through validator response directly
    return NextResponse.json({ results });
  } catch (error: any) {
    // Surface validator/network errors
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


