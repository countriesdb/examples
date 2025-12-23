require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 4. Basic subdivision validation
puts 'Validating subdivision code: US-CA'
result = validator.validate_subdivision('US-CA', 'US', follow_related: false, allow_parent_selection: false)

puts "Response: #{JSON.pretty_generate(result)}"

unless result[:valid]
  abort "❌ Subdivision validation failed: #{result[:message]}"
end

puts '✅ Subdivision is valid'

