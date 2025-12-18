package com.countriesdb.examples.spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/validate")
public class ValidationController08 {
    private final CountriesDbClient client;

    public ValidationController08(CountriesDbClient client) {
        this.client = client;
    }

    // 8. Empty subdivision validation (for countries with no subdivisions like Antarctica)
    @PostMapping("/subdivision/empty")
    public ResponseEntity<?> validateEmptySubdivision(@RequestBody Map<String, String> payload) {
        String country = payload.get("country");
        if (country == null || country.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Country code is required"
            ));
        }
        
        Map<String, Object> result = client.validateSubdivision(Map.of(
            "country", country,
            "code", payload.getOrDefault("subdivision", "")
        ));
        
        if (!Boolean.TRUE.equals(result.get("valid"))) {
            return ResponseEntity.unprocessableEntity().body(result);
        }
        
        return ResponseEntity.ok(Map.of(
            "valid", true,
            "message", "Empty subdivision validated (country has no subdivisions)",
            "payload", payload
        ));
    }
}

