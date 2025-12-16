<?php

require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpClient\HttpClient;

$apiKey = 'YOUR_API_KEY';
$baseUrl = 'https://api.countriesdb.com';

$client = HttpClient::create([
    'base_uri' => $baseUrl,
    'headers' => [
        'Authorization' => "Bearer {$apiKey}",
        'Content-Type' => 'application/json',
    ],
]);

function callEndpoint($client, string $path, array $payload): array
{
    $response = $client->request('POST', $path, ['json' => $payload]);
    $body = $response->getContent();

    if ($response->getStatusCode() >= 400) {
        fwrite(STDERR, "Request failed: {$response->getStatusCode()} -> {$body}\n");
        exit(1);
    }

    return json_decode($body, true, flags: JSON_THROW_ON_ERROR);
}

// 1. Basic country validation
try {
    echo "Validating country code: US\n";
    $result = callEndpoint($client, '/api/validate/country', ['code' => 'US']);
    echo "Response: " . json_encode($result, JSON_PRETTY_PRINT) . "\n";
    
    if (!($result['valid'] ?? false)) {
        throw new RuntimeException('Country validation failed');
    }
    
    echo "✅ Country is valid\n";
} catch (Exception $e) {
    fwrite(STDERR, "❌ Validation failed: {$e->getMessage()}\n");
    exit(1);
}

