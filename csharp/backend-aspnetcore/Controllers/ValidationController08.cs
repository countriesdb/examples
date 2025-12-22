using Microsoft.AspNetCore.Mvc;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController08 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController08(CountriesDbClient client)
    {
        _client = client;
    }

    // 8. Empty subdivision validation (for countries with no subdivisions)
    [HttpPost("subdivision/empty")]
    public async Task<IActionResult> ValidateEmptySubdivision([FromBody] Dictionary<string, string> payload)
    {
        var country = payload.GetValueOrDefault("country");
        var subdivision = payload.GetValueOrDefault("subdivision", "");
        
        if (string.IsNullOrWhiteSpace(country))
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Country code is required"
            });
        }

        var result = await _client.ValidateSubdivisionAsync(new Dictionary<string, object>
        {
            ["country"] = country,
            ["code"] = subdivision ?? ""
        });

        if (!result.Valid)
        {
            return UnprocessableEntity(result);
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "Empty subdivision validated (country has no subdivisions)",
            ["payload"] = payload
        });
    }
}

