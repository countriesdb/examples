require 'bundler/setup'
require 'faraday'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

client = Faraday.new(
  url: 'https://api.countriesdb.com',
  headers: {
    'Authorization' => "Bearer #{api_key}",
    'Content-Type' => 'application/json'
  }
)

def call(client, path, payload)
  response = client.post(path, payload.to_json)
  body = JSON.parse(response.body)
  raise "Request failed: #{response.status} #{body}" unless response.success?

  body
end

# 3. Multiple country validation
begin
  puts 'Validating multiple country codes: US, CA, MX, FR'
  result = call(client, '/api/validate/country', { code: ['US', 'CA', 'MX', 'FR'] })
  puts "Response: #{JSON.pretty_generate(result)}"
  
  if result['results'] && result['results'].any? { |r| !r['valid'] }
    raise 'Some countries are invalid'
  end
  
  puts '✅ All countries are valid'
rescue => e
  puts "❌ Validation failed: #{e.message}"
  exit 1
end

