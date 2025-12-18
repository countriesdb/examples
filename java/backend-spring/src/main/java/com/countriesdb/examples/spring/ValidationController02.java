package com.countriesdb.examples.spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/validate")
public class ValidationController02 {
    private final CountriesDbClient client;

    public ValidationController02(CountriesDbClient client) {
        this.client = client;
    }

    // 2. Country validation with follow_upward
    @PostMapping("/country/follow-upward")
    public ResponseEntity<?> validateCountryFollowUpward(@RequestBody Map<String, String> payload) {
        String country = payload.get("country");
        if (country == null || country.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Country code is required"
            ));
        }
        
        Map<String, Object> result = client.validateCountry(Map.of(
            "code", country,
            "follow_upward", true
        ));
        
        if (!Boolean.TRUE.equals(result.get("valid"))) {
            return ResponseEntity.unprocessableEntity().body(result);
        }
        
        return ResponseEntity.ok(Map.of(
            "valid", true,
            "message", "Country validated",
            "payload", payload
        ));
    }
}

