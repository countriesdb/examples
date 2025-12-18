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
public class ValidationController03 {
    private final CountriesDbClient client;

    public ValidationController03(CountriesDbClient client) {
        this.client = client;
    }

    // 3. Multiple country validation
    @PostMapping("/country/multiple")
    public ResponseEntity<?> validateMultipleCountries(@RequestBody Map<String, List<String>> payload) {
        List<String> countries = payload.get("countries");
        if (countries == null || countries.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Countries list is required"
            ));
        }
        
        Map<String, Object> result = client.validateCountry(Map.of("code", countries));
        
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
            "message", "All countries validated",
            "payload", payload
        ));
    }
}

