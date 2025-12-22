package com.countriesdb.examples.httpclient;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

public final class App08 {
    private static final String API_BASE = "https://api.countriesdb.com";
    private static final String API_KEY = "YOUR_API_KEY";

    private App08() {}

    public static void main(String[] args) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        // 8. Empty subdivision validation (for countries with no subdivisions like Antarctica)
        System.out.println("Validating empty subdivision code for country: AQ");
        String result = call(client, "/api/validate/subdivision", """
            {"country":"AQ","code":""}
            """);
        System.out.println("Response: " + result);
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> data = mapper.readValue(result, new TypeReference<Map<String, Object>>() {});
        if (!Boolean.TRUE.equals(data.get("valid"))) {
            System.err.println("❌ Empty subdivision validation failed");
            System.exit(1);
        }
        
        System.out.println("✅ Empty subdivision is valid (country has no subdivisions)");
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

