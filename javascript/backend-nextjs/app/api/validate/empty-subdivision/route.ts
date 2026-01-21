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

    if (!country) {
      return NextResponse.json(
        { error: 'Country code is required' },
        { status: 400 }
      );
    }

    const result = await validator.validateSubdivision(code || '', country);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


