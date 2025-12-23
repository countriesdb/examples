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

# 4. Basic subdivision validation
begin
  puts 'Validating subdivision code: US-CA (country: US)'
  result = call(client, '/api/validate/subdivision', { country: 'US', code: 'US-CA' })
  puts "Response: #{JSON.pretty_generate(result)}"
  
  unless result['valid']
    raise 'Subdivision validation failed'
  end
  
  puts '✅ Subdivision is valid'
rescue => e
  puts "❌ Validation failed: #{e.message}"
  exit 1
end

