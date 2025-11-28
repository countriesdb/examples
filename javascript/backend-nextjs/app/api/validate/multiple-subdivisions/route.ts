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
    const { country, code } = body;

    if (!country || !code || !Array.isArray(code)) {
      return NextResponse.json(
        { error: 'Country and subdivision codes array are required' },
        { status: 400 }
      );
    }

    const results = await validator.validateSubdivisions(code, country);

    const invalid = results.find(r => !r.valid);
    if (invalid) {
      return NextResponse.json(
        { error: invalid.message || 'One or more subdivision codes are invalid', valid: false },
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


