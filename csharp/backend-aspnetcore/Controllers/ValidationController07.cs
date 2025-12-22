using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController07 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController07(CountriesDbClient client)
    {
        _client = client;
    }

    // 7. Multiple subdivision validation
    [HttpPost("subdivision/multiple")]
    public async Task<IActionResult> ValidateMultipleSubdivisions([FromBody] Dictionary<string, object> payload)
    {
        var country = payload.GetValueOrDefault("country")?.ToString();
        if (string.IsNullOrWhiteSpace(country))
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Country code is required"
            });
        }

        if (!payload.ContainsKey("subdivisions") || payload["subdivisions"] is not JsonElement subdivisionsElement)
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Subdivisions array is required"
            });
        }

        var subdivisions = JsonSerializer.Deserialize<string[]>(subdivisionsElement.GetRawText());
        if (subdivisions == null || subdivisions.Length == 0)
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "At least one subdivision code is required"
            });
        }

        var result = await _client.ValidateSubdivisionsAsync(new Dictionary<string, object>
        {
            ["country"] = country,
            ["code"] = subdivisions
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
                    message = item.Message ?? "Invalid subdivision code",
                    results = result.Results
                });
            }
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "All subdivisions validated",
            ["payload"] = payload
        });
    }
}

