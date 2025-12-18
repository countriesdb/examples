package com.countriesdb.examples.spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/validate")
public class ValidationController06 {
    private final CountriesDbClient client;

    public ValidationController06(CountriesDbClient client) {
        this.client = client;
    }

    // 6. Subdivision validation with allow_parent_selection
    @PostMapping("/subdivision/allow-parent")
    public ResponseEntity<?> validateSubdivisionAllowParent(@RequestBody Map<String, String> payload) {
        String country = payload.get("country");
        String subdivision = payload.get("subdivision");
        if (country == null || country.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Country code is required"
            ));
        }
        if (subdivision == null || subdivision.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "valid", false,
                "message", "Subdivision code is required"
            ));
        }
        
        Map<String, Object> result = client.validateSubdivision(Map.of(
            "country", country,
            "code", subdivision,
            "allow_parent_selection", true
        ));
        
        if (!Boolean.TRUE.equals(result.get("valid"))) {
            return ResponseEntity.unprocessableEntity().body(result);
        }
        
        return ResponseEntity.ok(Map.of(
            "valid", true,
            "message", "Subdivision validated",
            "payload", payload
        ));
    }
}

