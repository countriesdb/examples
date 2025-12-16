package com.countriesdb.examples.httpclient;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

public final class App05 {
    private static final String API_BASE = "https://api.countriesdb.com";
    private static final String API_KEY = "YOUR_API_KEY";

    private App05() {}

    public static void main(String[] args) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        // 5. Subdivision validation with follow_related
        System.out.println("Validating subdivision code: FR-40 (country: FR, with follow_related)");
        String result = call(client, "/api/validate/subdivision", """
            {"country":"FR","code":"FR-40","follow_related":true}
            """);
        System.out.println("Response: " + result);
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> data = mapper.readValue(result, Map.class);
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

