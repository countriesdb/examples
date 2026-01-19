require 'bundler/setup'
require 'net/http'
require 'json'
require 'uri'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

def call(api_key, path, payload)
  uri = URI("https://api.countriesdb.com#{path}")
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Post.new(uri.path)
  request['Authorization'] = "Bearer #{api_key}"
  request['Content-Type'] = 'application/json'
  request.body = payload.to_json
  
  response = http.request(request)
  body = JSON.parse(response.body)
  raise "Request failed: #{response.code} #{body}" unless response.is_a?(Net::HTTPSuccess)
  
  body
end

# 3. Multiple country validation
begin
  puts 'Validating multiple country codes: US, CA, MX, FR'
  result = call(api_key, '/api/validate/country', { code: ['US', 'CA', 'MX', 'FR'] })
  puts "Response: #{JSON.pretty_generate(result)}"
  
  if result['results'] && result['results'].any? { |r| !r['valid'] }
    raise 'Some countries are invalid'
  end
  
  puts '✅ All countries are valid'
rescue => e
  puts "❌ Validation failed: #{e.message}"
  exit 1
end




