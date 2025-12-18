package com.countriesdb.examples.spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/addresses")
public class ValidationController {
    private final CountriesDbClient client;

    public ValidationController(CountriesDbClient client) {
        this.client = client;
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody AddressPayload payload) {
        Map<String, Object> summary = new HashMap<>();

        summary.put("country", client.validateCountry(Map.of(
            "code", payload.country(),
            "follow_upward", true
        )));

        summary.put("subdivision", client.validateSubdivision(Map.of(
            "country", payload.country(),
            "code", payload.subdivision(),
            "follow_related", true,
            "allow_parent_selection", true
        )));

        return ResponseEntity.ok(summary);
    }

    public record AddressPayload(String country, String subdivision) {}
}

