require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 6. Subdivision validation with allow_parent_selection
puts 'Validating subdivision code: FR-ARA (country: FR, with allow_parent_selection)'
result = validator.validate_subdivision('FR-ARA', 'FR', follow_related: false, allow_parent_selection: true)

puts "Response: #{JSON.pretty_generate(result)}"

unless result[:valid]
  abort "❌ Subdivision validation failed: #{result[:message]}"
end

puts '✅ Subdivision is valid'

