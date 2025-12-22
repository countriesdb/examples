using Microsoft.AspNetCore.Mvc;

namespace BackendAspNetCore.Controllers;

[ApiController]
[Route("api/validate")]
public class ValidationController02 : ControllerBase
{
    private readonly CountriesDbClient _client;

    public ValidationController02(CountriesDbClient client)
    {
        _client = client;
    }

    // 2. Country validation with follow_upward
    [HttpPost("country/follow-upward")]
    public async Task<IActionResult> ValidateCountryFollowUpward([FromBody] Dictionary<string, string> payload)
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
            ["code"] = country,
            ["follow_upward"] = true
        });

        if (!result.Valid)
        {
            return UnprocessableEntity(result);
        }

        return Ok(new Dictionary<string, object>
        {
            ["valid"] = true,
            ["message"] = "Country validated with follow_upward",
            ["payload"] = payload
        });
    }
}

