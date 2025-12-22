using Microsoft.AspNetCore.Mvc;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController01 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController01(CountriesDbClient client)
    {
        _client = client;
    }

    // 1. Basic country validation
    [HttpPost("country/basic")]
    public async Task<IActionResult> ValidateBasicCountry([FromBody] Dictionary<string, string> payload)
    {
        var country = payload.GetValueOrDefault("country");
        if (string.IsNullOrWhiteSpace(country))
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Country code is required"
            });
        }

        var result = await _client.ValidateCountryAsync(new Dictionary<string, object>
        {
            ["code"] = country
        });

        if (!result.Valid)
        {
            return UnprocessableEntity(result);
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "Country validated",
            ["payload"] = payload
        });
    }
}

