package com.countriesdb.examples.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class CountriesDbClient {
    private static final String API_BASE = "https://api.countriesdb.com";
    private static final String API_KEY = "YOUR_API_KEY";
    
    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CountriesDbClient() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);

        this.restClient = RestClient.builder()
            .baseUrl(API_BASE)
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(headers))
            .build();
    }

    public Map<String, Object> validateCountry(Map<String, Object> payload) {
        return post("/api/validate/country", payload);
    }

    public Map<String, Object> validateSubdivision(Map<String, Object> payload) {
        return post("/api/validate/subdivision", payload);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> post(String path, Map<String, Object> payload) {
        try {
            return restClient.post()
                .uri(path)
                .body(payload)
                .retrieve()
                .body(Map.class);
        } catch (org.springframework.web.client.HttpClientErrorException.UnprocessableEntity e) {
            // Handle 422 errors gracefully - parse the error response body
            try {
                String responseBody = e.getResponseBodyAsString();
                if (responseBody != null && !responseBody.isEmpty()) {
                    return objectMapper.readValue(responseBody, Map.class);
                }
            } catch (Exception parseException) {
                // Fallback if parsing fails
            }
            return Map.of(
                "valid", false,
                "message", e.getMessage() != null ? e.getMessage() : "Validation failed"
            );
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            // Handle other 4xx errors
            try {
                String responseBody = e.getResponseBodyAsString();
                if (responseBody != null && !responseBody.isEmpty()) {
                    return objectMapper.readValue(responseBody, Map.class);
                }
            } catch (Exception parseException) {
                // Fallback if parsing fails
            }
            return Map.of(
                "valid", false,
                "message", e.getMessage() != null ? e.getMessage() : "Request failed"
            );
        }
    }
}

