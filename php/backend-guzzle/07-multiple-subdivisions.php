<?php

require __DIR__ . '/vendor/autoload.php';

$apiKey = 'YOUR_API_KEY';
$baseUrl = 'https://api.countriesdb.com';

$client = new GuzzleHttp\Client([
    'base_uri' => $baseUrl,
    'headers' => [
        'Authorization' => "Bearer {$apiKey}",
        'Content-Type' => 'application/json',
    ],
    'http_errors' => false,
]);

function callEndpoint(GuzzleHttp\Client $client, string $path, array $payload): array
{
    $response = $client->post($path, ['json' => $payload]);
    $body = (string) $response->getBody();

    if ($response->getStatusCode() >= 400) {
        fwrite(STDERR, "Request failed: {$response->getStatusCode()} -> {$body}\n");
        exit(1);
    }

    return json_decode($body, true, flags: JSON_THROW_ON_ERROR);
}

// 7. Multiple subdivision validation
try {
    echo "Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)\n";
    $result = callEndpoint($client, '/api/validate/subdivision', [
        'country' => 'US',
        'code' => ['US-CA', 'US-NY', 'US-TX'],
    ]);
    echo "Response: " . json_encode($result, JSON_PRETTY_PRINT) . "\n";
    
    if (isset($result['results']) && in_array(false, array_column($result['results'], 'valid'), true)) {
        throw new RuntimeException('Some subdivisions are invalid');
    }
    
    echo "✅ All subdivisions are valid\n";
} catch (Exception $e) {
    fwrite(STDERR, "❌ Validation failed: {$e->getMessage()}\n");
    exit(1);
}
