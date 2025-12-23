require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 8. Empty subdivision validation (for countries without subdivisions)
puts 'Validating empty subdivision for country: AQ'
result = validator.validate_subdivision('', 'AQ', follow_related: false, allow_parent_selection: false)

puts "Response: #{JSON.pretty_generate(result)}"

unless result[:valid]
  abort "❌ Subdivision validation failed: #{result[:message]}"
end

puts '✅ Empty subdivision is valid (country has no subdivisions)'

