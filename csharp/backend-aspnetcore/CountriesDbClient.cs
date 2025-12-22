using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace BackendAspNetCore;

public class CountriesDbClient
{
    private const string API_BASE = "https://api.countriesdb.com";
    private const string API_KEY = "YOUR_API_KEY"; // Hardcoded API key
    
    private readonly HttpClient _httpClient;

    public CountriesDbClient()
    {
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(API_BASE)
        };
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", API_KEY);
    }

    public async Task<ValidationResponse> ValidateCountryAsync(Dictionary<string, object> payload)
    {
        return await PostAsync("/api/validate/country", payload);
    }

    public async Task<ValidationResponse> ValidateSubdivisionAsync(Dictionary<string, object> payload)
    {
        return await PostAsync("/api/validate/subdivision", payload);
    }

    public async Task<MultiValidationResponse> ValidateCountriesAsync(Dictionary<string, object> payload)
    {
        return await PostMultiAsync("/api/validate/country", payload);
    }

    public async Task<MultiValidationResponse> ValidateSubdivisionsAsync(Dictionary<string, object> payload)
    {
        return await PostMultiAsync("/api/validate/subdivision", payload);
    }

    private async Task<ValidationResponse> PostAsync(string path, Dictionary<string, object> payload)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(path, payload);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            if (!response.IsSuccessStatusCode)
            {
                // Try to parse error response
                try
                {
                    var errorResult = JsonSerializer.Deserialize<ValidationResponse>(responseContent);
                    if (errorResult != null)
                    {
                        return errorResult;
                    }
                }
                catch
                {
                    // Fallback if parsing fails
                }
                
                return new ValidationResponse
                {
                    Valid = false,
                    Message = $"Request failed: {response.StatusCode}"
                };
            }
            
            var result = JsonSerializer.Deserialize<ValidationResponse>(responseContent);
            return result ?? new ValidationResponse { Valid = false };
        }
        catch (Exception ex)
        {
            return new ValidationResponse
            {
                Valid = false,
                Message = ex.Message
            };
        }
    }

    private async Task<MultiValidationResponse> PostMultiAsync(string path, Dictionary<string, object> payload)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(path, payload);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            if (!response.IsSuccessStatusCode)
            {
                return new MultiValidationResponse { Results = null };
            }
            
            var result = JsonSerializer.Deserialize<MultiValidationResponse>(responseContent);
            return result ?? new MultiValidationResponse { Results = null };
        }
        catch
        {
            return new MultiValidationResponse { Results = null };
        }
    }
}

