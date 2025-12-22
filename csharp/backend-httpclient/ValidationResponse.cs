using System.Text.Json.Serialization;

namespace BackendHttpClient;

public record ValidationResponse
{
    [JsonPropertyName("valid")]
    public bool Valid { get; init; }

    [JsonPropertyName("message")]
    public string? Message { get; init; }

    [JsonPropertyName("code")]
    public string? Code { get; init; }
}

public record MultiValidationResponse
{
    [JsonPropertyName("results")]
    public List<ValidationResponse>? Results { get; init; }
}

