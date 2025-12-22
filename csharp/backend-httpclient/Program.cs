using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using BackendHttpClient;

const string API_BASE = "https://api.countriesdb.com";
const string API_KEY = "YOUR_API_KEY"; // Hardcoded API key - replace with your actual key

if (args.Length == 0)
{
    Console.WriteLine("Usage: dotnet run -- <example-number>");
    Console.WriteLine("Examples:");
    Console.WriteLine("  1 - Basic country validation");
    Console.WriteLine("  2 - Country with follow_upward");
    Console.WriteLine("  3 - Multiple country validation");
    Console.WriteLine("  4 - Basic subdivision validation");
    Console.WriteLine("  5 - Subdivision with follow_related");
    Console.WriteLine("  6 - Subdivision with allow_parent_selection");
    Console.WriteLine("  7 - Multiple subdivision validation");
    Console.WriteLine("  8 - Empty subdivision validation");
    Environment.Exit(1);
}

var example = args[0];
using var http = new HttpClient
{
    BaseAddress = new Uri(API_BASE)
};
http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", API_KEY);

try
{
    switch (example)
    {
        case "1":
            await RunExample1(http);
            break;
        case "2":
            await RunExample2(http);
            break;
        case "3":
            await RunExample3(http);
            break;
        case "4":
            await RunExample4(http);
            break;
        case "5":
            await RunExample5(http);
            break;
        case "6":
            await RunExample6(http);
            break;
        case "7":
            await RunExample7(http);
            break;
        case "8":
            await RunExample8(http);
            break;
        default:
            Console.Error.WriteLine($"Unknown example: {example}. Use 1-8.");
            Environment.Exit(1);
            break;
    }
}
catch (Exception ex)
{
    Console.Error.WriteLine($"❌ Validation failed: {ex.Message}");
    Environment.Exit(1);
}

async Task<string> PostAsync(HttpClient http, string path, object payload)
{
    var response = await http.PostAsJsonAsync(path, payload);
    var body = await response.Content.ReadAsStringAsync();
    if (!response.IsSuccessStatusCode)
    {
        throw new InvalidOperationException($"❌ Request failed: {response.StatusCode} -> {body}");
    }
    return body;
}

// 1. Basic country validation
async Task RunExample1(HttpClient http)
{
    Console.WriteLine("Validating country code: US");
    var result = await PostAsync(http, "/api/validate/country", new { code = "US" });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Country validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Country is valid");
}

// 2. Country validation with follow_upward
async Task RunExample2(HttpClient http)
{
    Console.WriteLine("Validating country code: US (with follow_upward)");
    var result = await PostAsync(http, "/api/validate/country", new { code = "US", follow_upward = true });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Country validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Country is valid");
}

// 3. Multiple country validation
async Task RunExample3(HttpClient http)
{
    Console.WriteLine("Validating multiple country codes: US, CA, MX, FR");
    var result = await PostAsync(http, "/api/validate/country", new { code = new[] { "US", "CA", "MX", "FR" } });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<MultiValidationResponse>(result);
    if (data?.Results != null)
    {
        foreach (var item in data.Results)
        {
            if (!item.Valid)
            {
                Console.Error.WriteLine("❌ Some countries are invalid");
                Environment.Exit(1);
            }
        }
    }
    
    Console.WriteLine("✅ All countries are valid");
}

// 4. Basic subdivision validation
async Task RunExample4(HttpClient http)
{
    Console.WriteLine("Validating subdivision code: US-CA (country: US)");
    var result = await PostAsync(http, "/api/validate/subdivision", new { country = "US", code = "US-CA" });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Subdivision validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Subdivision is valid");
}

// 5. Subdivision validation with follow_related
async Task RunExample5(HttpClient http)
{
    Console.WriteLine("Validating subdivision code: FR-40 (country: FR, with follow_related)");
    var result = await PostAsync(http, "/api/validate/subdivision", new { country = "FR", code = "FR-40", follow_related = true });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Subdivision validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Subdivision is valid");
}

// 6. Subdivision validation with allow_parent_selection
async Task RunExample6(HttpClient http)
{
    Console.WriteLine("Validating subdivision code: FR-ARA (country: FR, with allow_parent_selection)");
    var result = await PostAsync(http, "/api/validate/subdivision", new { country = "FR", code = "FR-ARA", allow_parent_selection = true });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Subdivision validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Subdivision is valid");
}

// 7. Multiple subdivision validation
async Task RunExample7(HttpClient http)
{
    Console.WriteLine("Validating multiple subdivision codes: US-CA, US-NY, US-TX (country: US)");
    var result = await PostAsync(http, "/api/validate/subdivision", new { country = "US", code = new[] { "US-CA", "US-NY", "US-TX" } });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<MultiValidationResponse>(result);
    if (data?.Results != null)
    {
        foreach (var item in data.Results)
        {
            if (!item.Valid)
            {
                Console.Error.WriteLine("❌ Some subdivisions are invalid");
                Environment.Exit(1);
            }
        }
    }
    
    Console.WriteLine("✅ All subdivisions are valid");
}

// 8. Empty subdivision validation (for countries with no subdivisions)
async Task RunExample8(HttpClient http)
{
    Console.WriteLine("Validating empty subdivision code for country: AQ");
    var result = await PostAsync(http, "/api/validate/subdivision", new { country = "AQ", code = "" });
    Console.WriteLine("Response: " + result);
    
    var data = JsonSerializer.Deserialize<ValidationResponse>(result);
    if (data == null || !data.Valid)
    {
        Console.Error.WriteLine("❌ Empty subdivision validation failed");
        Environment.Exit(1);
    }
    
    Console.WriteLine("✅ Empty subdivision is valid (country has no subdivisions)");
}

