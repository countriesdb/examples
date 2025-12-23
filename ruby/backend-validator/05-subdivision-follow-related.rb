require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 5. Subdivision validation with follow_related
puts 'Validating subdivision code: FR-40 (country: FR, with follow_related)'
result = validator.validate_subdivision('FR-40', 'FR', follow_related: true, allow_parent_selection: false)

puts "Response: #{JSON.pretty_generate(result)}"

unless result[:valid]
  abort "❌ Subdivision validation failed: #{result[:message]}"
end

puts '✅ Subdivision is valid'

