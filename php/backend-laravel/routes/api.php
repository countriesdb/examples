<?php

use CountriesDB\Validator\Rules\ValidCountry;
use CountriesDB\Validator\Rules\ValidSubdivision;
use CountriesDB\Validator\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes demonstrate how to proxy validation to CountriesDB.
| Each endpoint echoes the validated payload so you can see what was sent.
|
*/

// 1. Basic country validation
Route::post('/validate/country/basic', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string', new ValidCountry()],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Country validated',
        'payload' => $validated,
    ]);
});

// 2. Country validation with follow_upward
Route::post('/validate/country/follow-upward', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string', new ValidCountry(followUpward: true)],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Country validated with follow_upward',
        'payload' => $validated,
    ]);
});

// 3. Multiple country validation
Route::post('/validate/country/multiple', function (Request $request) {
    $validated = $request->validate([
        'countries' => ['required', 'array'],
        'countries.*' => ['required', 'string', new ValidCountry()],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'All countries validated',
        'payload' => $validated,
    ]);
});

// 4. Basic subdivision validation
Route::post('/validate/subdivision/basic', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string'],
        'subdivision' => ['required', 'string', new ValidSubdivision('country')],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Subdivision validated',
        'payload' => $validated,
    ]);
});

// 5. Subdivision validation with follow_related
Route::post('/validate/subdivision/follow-related', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string'],
        'subdivision' => ['required', 'string', new ValidSubdivision('country', followRelated: true)],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Subdivision validated with follow_related',
        'payload' => $validated,
    ]);
});

// 6. Subdivision validation with allow_parent_selection
Route::post('/validate/subdivision/allow-parent', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string'],
        'subdivision' => ['required', 'string', new ValidSubdivision('country', allowParentSelection: true)],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Subdivision validated with allow_parent_selection',
        'payload' => $validated,
    ]);
});

// 7. Multiple subdivision validation
Route::post('/validate/subdivision/multiple', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string'],
        'subdivisions' => ['required', 'array'],
        'subdivisions.*' => ['required', 'string', new ValidSubdivision('country')],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'All subdivisions validated',
        'payload' => $validated,
    ]);
});

// 8. Empty subdivision validation (for countries with no subdivisions)
Route::post('/validate/subdivision/empty', function (Request $request) {
    $validated = $request->validate([
        'country' => ['required', 'string'],
        'subdivision' => ['nullable', 'string', new ValidSubdivision('country')],
    ]);

    return response()->json([
        'valid' => true,
        'message' => 'Empty subdivision validated (country has no subdivisions)',
        'payload' => $validated,
    ]);
});

/*
|--------------------------------------------------------------------------
| Standalone Validator Routes
|--------------------------------------------------------------------------
|
| These routes demonstrate using the Validator class directly,
| giving you full control over validation logic and error handling.
|
*/

// 1. Standalone basic country validation
Route::post('/validate/standalone/country/basic', function (Request $request) {
    $code = $request->input('code');
    
    if (empty($code)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateCountry($code);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});

// 2. Standalone country validation with follow_upward
Route::post('/validate/standalone/country/follow-upward', function (Request $request) {
    $code = $request->input('code');
    
    if (empty($code)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateCountry($code, followUpward: true);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});

// 3. Standalone multiple country validation
Route::post('/validate/standalone/country/multiple', function (Request $request) {
    $codes = $request->input('codes', []);
    
    if (empty($codes) || !is_array($codes)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country codes array is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $results = $validator->validateCountries($codes);

    return response()->json(['results' => $results]);
});

// 4. Standalone basic subdivision validation
Route::post('/validate/standalone/subdivision/basic', function (Request $request) {
    $country = $request->input('country');
    $code = $request->input('code');

    if (empty($country)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    if (empty($code)) {
        return response()->json([
            'valid' => false,
            'message' => 'Subdivision code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateSubdivision($code, $country);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});

// 5. Standalone subdivision validation with follow_related
Route::post('/validate/standalone/subdivision/follow-related', function (Request $request) {
    $country = $request->input('country');
    $code = $request->input('code');

    if (empty($country)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    if (empty($code)) {
        return response()->json([
            'valid' => false,
            'message' => 'Subdivision code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateSubdivision($code, $country, followRelated: true);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});

// 6. Standalone subdivision validation with allow_parent_selection
Route::post('/validate/standalone/subdivision/allow-parent', function (Request $request) {
    $country = $request->input('country');
    $code = $request->input('code');

    if (empty($country)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    if (empty($code)) {
        return response()->json([
            'valid' => false,
            'message' => 'Subdivision code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateSubdivision($code, $country, allowParentSelection: true);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});

// 7. Standalone multiple subdivision validation
Route::post('/validate/standalone/subdivision/multiple', function (Request $request) {
    $country = $request->input('country');
    $codes = $request->input('codes', []);

    if (empty($country)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    if (empty($codes) || !is_array($codes)) {
        return response()->json([
            'valid' => false,
            'message' => 'Subdivision codes array is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $results = $validator->validateSubdivisions($codes, $country);

    return response()->json(['results' => $results]);
});

// 8. Standalone empty subdivision validation
Route::post('/validate/standalone/subdivision/empty', function (Request $request) {
    $country = $request->input('country');
    $code = $request->input('code', '');

    if (empty($country)) {
        return response()->json([
            'valid' => false,
            'message' => 'Country code is required',
        ], 422);
    }

    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url', 'https://api.countriesdb.com');
    
    $validator = new Validator($apiKey, $apiUrl);
    $result = $validator->validateSubdivision($code ?: null, $country);

    if (!$result['valid']) {
        return response()->json($result, 422);
    }

    return response()->json($result);
});


