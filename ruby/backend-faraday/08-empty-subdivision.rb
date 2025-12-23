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

# 8. Empty subdivision validation (for countries with no subdivisions like Antarctica)
begin
  puts 'Validating empty subdivision code for country: AQ'
  result = call(client, '/api/validate/subdivision', { country: 'AQ', code: '' })
  puts "Response: #{JSON.pretty_generate(result)}"
  
  unless result['valid']
    raise 'Empty subdivision validation failed'
  end
  
  puts '✅ Empty subdivision is valid (country has no subdivisions)'
rescue => e
  puts "❌ Validation failed: #{e.message}"
  exit 1
end

