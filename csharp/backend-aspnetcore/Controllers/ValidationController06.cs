using Microsoft.AspNetCore.Mvc;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController06 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController06(CountriesDbClient client)
    {
        _client = client;
    }

    // 6. Subdivision validation with allow_parent_selection
    [HttpPost("subdivision/allow-parent")]
    public async Task<IActionResult> ValidateSubdivisionAllowParent([FromBody] Dictionary<string, string> payload)
    {
        var country = payload.GetValueOrDefault("country");
        var subdivision = payload.GetValueOrDefault("subdivision");
        
        if (string.IsNullOrWhiteSpace(country))
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Country code is required"
            });
        }
        
        if (string.IsNullOrWhiteSpace(subdivision))
        {
            return BadRequest(new Dictionary<string, object>
            {
                ["valid"] = false,
                ["message"] = "Subdivision code is required"
            });
        }

        var result = await _client.ValidateSubdivisionAsync(new Dictionary<string, object>
        {
            ["country"] = country,
            ["code"] = subdivision,
            ["allow_parent_selection"] = true
        });

        if (!result.Valid)
        {
            return UnprocessableEntity(result);
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "Subdivision validated with allow_parent_selection",
            ["payload"] = payload
        });
    }
}

