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
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Country code is required' },
        { status: 400 }
      );
    }

    const result = await validator.validateCountry(code);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.message || 'Invalid country code', valid: false },
        { status: 422 }
      );
    }

    return NextResponse.json({ valid: true, success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


