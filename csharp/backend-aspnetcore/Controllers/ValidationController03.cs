using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController03 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController03(CountriesDbClient client)
    {
        _client = client;
    }

    // 3. Multiple country validation
    [HttpPost("country/multiple")]
    public async Task<IActionResult> ValidateMultipleCountries([FromBody] Dictionary<string, object> payload)
    {
        if (!payload.ContainsKey("countries") || payload["countries"] is not JsonElement countriesElement)
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Countries array is required"
            });
        }

        var countries = JsonSerializer.Deserialize<string[]>(countriesElement.GetRawText());
        if (countries == null || countries.Length == 0)
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "At least one country code is required"
            });
        }

        var result = await _client.ValidateCountriesAsync(new Dictionary<string, object>
        {
            ["code"] = countries
        });

        if (result.Results == null)
        {
            return UnprocessableEntity(new ValidationResponse { Valid = false, Message = "Validation failed" });
        }

        foreach (var item in result.Results)
        {
            if (!item.Valid)
            {
                return UnprocessableEntity(new
                {
                    valid = false,
                    message = item.Message ?? "Invalid country code",
                    results = result.Results
                });
            }
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "All countries validated",
            ["payload"] = payload
        });
    }
}

