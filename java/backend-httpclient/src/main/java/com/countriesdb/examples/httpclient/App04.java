package com.countriesdb.examples.httpclient;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

public final class App04 {
    private static final String API_BASE = "https://api.countriesdb.com";
    private static final String API_KEY = "YOUR_API_KEY";

    private App04() {}

    public static void main(String[] args) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        // 4. Basic subdivision validation
        System.out.println("Validating subdivision code: US-CA (country: US)");
        String result = call(client, "/api/validate/subdivision", """
            {"country":"US","code":"US-CA"}
            """);
        System.out.println("Response: " + result);
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> data = mapper.readValue(result, new TypeReference<Map<String, Object>>() {});
        if (!Boolean.TRUE.equals(data.get("valid"))) {
            System.err.println("❌ Subdivision validation failed");
            System.exit(1);
        }
        
        System.out.println("✅ Subdivision is valid");
    }

    private static String call(HttpClient client, String path, String jsonBody) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_BASE + path))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() >= 400) {
            throw new IllegalStateException("❌ Request failed: " + response.statusCode() + " -> " + response.body());
        }

        return response.body();
    }
}

