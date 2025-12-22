package com.countriesdb.examples.httpclient;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

public final class App07 {
    private static final String API_BASE = "https://api.countriesdb.com";
    private static final String API_KEY = "YOUR_API_KEY";

    private App07() {}

    public static void main(String[] args) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        // 7. Multiple subdivision validation
        System.out.println("Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)");
        String result = call(client, "/api/validate/subdivision", """
            {"country":"US","code":["US-CA","US-NY","US-TX"]}
            """);
        System.out.println("Response: " + result);
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> data = mapper.readValue(result, new TypeReference<Map<String, Object>>() {});
        if (data.containsKey("results")) {
            List<Map<String, Object>> results = mapper.convertValue(data.get("results"), new TypeReference<List<Map<String, Object>>>() {});
            for (Map<String, Object> item : results) {
                if (!Boolean.TRUE.equals(item.get("valid"))) {
                    System.err.println("❌ Some subdivisions are invalid");
                    System.exit(1);
                }
            }
        }
        
        System.out.println("✅ All subdivisions are valid");
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

