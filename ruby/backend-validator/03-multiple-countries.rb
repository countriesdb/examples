require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 3. Multiple country validation
codes = ['US', 'CA', 'MX', 'FR']
puts "Validating country codes: #{codes.join(', ')}"
results = validator.validate_countries(codes)

puts "Response: #{JSON.pretty_generate(results)}"

results.each do |result|
  unless result[:valid]
    abort "❌ Country #{result[:code]} validation failed: #{result[:message]}"
  end
end

puts '✅ All countries are valid'

