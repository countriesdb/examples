package com.countriesdb.examples.spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/validate")
public class ValidationController07 {
    private final CountriesDbClient client;

    public ValidationController07(CountriesDbClient client) {
        this.client = client;
    }

    // 7. Multiple subdivision validation
    @PostMapping("/subdivision/multiple")
    public ResponseEntity<?> validateMultipleSubdivisions(@RequestBody Map<String, Object> payload) {
        String country = (String) payload.get("country");
        if (country == null || country.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Country code is required"
            ));
        }
        
        @SuppressWarnings("unchecked")
        List<String> subdivisions = (List<String>) payload.get("subdivisions");
        if (subdivisions == null || subdivisions.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Subdivisions list is required"
            ));
        }
        
        Map<String, Object> result = client.validateSubdivision(Map.of(
            "country", country,
            "code", subdivisions
        ));
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> results = (List<Map<String, Object>>) result.get("results");
        if (results != null) {
            for (Map<String, Object> item : results) {
                if (!Boolean.TRUE.equals(item.get("valid"))) {
                    return ResponseEntity.unprocessableEntity().body(result);
                }
            }
        }
        
        return ResponseEntity.ok(Map.of(
            "valid", true,
            "message", "All subdivisions validated",
            "payload", payload
        ));
    }
}

