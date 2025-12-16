<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes demonstrate how to use Laravel's Http client to call
| CountriesDB validation endpoints.
|
*/

// 1. Basic country validation
Route::post('/validate/country/basic', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/country", [
            'code' => $request->input('code', 'US'),
        ]);
    
    return $response->json();
});

// 2. Country validation with follow_upward
Route::post('/validate/country/follow-upward', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/country", [
            'code' => $request->input('code', 'US'),
            'follow_upward' => true,
        ]);
    
    return $response->json();
});

// 3. Multiple country validation
Route::post('/validate/country/multiple', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/country", [
            'code' => $request->input('codes', ['US', 'CA', 'MX', 'FR']),
        ]);
    
    return $response->json();
});

// 4. Basic subdivision validation
Route::post('/validate/subdivision/basic', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/subdivision", [
            'country' => $request->input('country', 'US'),
            'code' => $request->input('code', 'US-CA'),
        ]);
    
    return $response->json();
});

// 5. Subdivision validation with follow_related
Route::post('/validate/subdivision/follow-related', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/subdivision", [
            'country' => $request->input('country', 'FR'),
            'code' => $request->input('code', 'FR-40'),
            'follow_related' => true,
        ]);
    
    return $response->json();
});

// 6. Subdivision validation with allow_parent_selection
Route::post('/validate/subdivision/allow-parent', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/subdivision", [
            'country' => $request->input('country', 'FR'),
            'code' => $request->input('code', 'FR-ARA'),
            'allow_parent_selection' => true,
        ]);
    
    return $response->json();
});

// 7. Multiple subdivision validation
Route::post('/validate/subdivision/multiple', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/subdivision", [
            'country' => $request->input('country', 'US'),
            'code' => $request->input('codes', ['US-CA', 'US-NY', 'US-TX']),
        ]);
    
    return $response->json();
});

// 8. Empty subdivision validation (for countries with no subdivisions)
Route::post('/validate/subdivision/empty', function (Request $request) {
    $apiKey = config('services.countriesdb.private_key');
    $apiUrl = config('services.countriesdb.api_url');
    
    $response = Http::withToken($apiKey)
        ->post("{$apiUrl}/api/validate/subdivision", [
            'country' => $request->input('country', 'AQ'),
            'code' => '',
        ]);
    
    return $response->json();
});
