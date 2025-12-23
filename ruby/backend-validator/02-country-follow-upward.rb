require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 2. Country validation with follow_upward
puts 'Validating country code: US (with follow_upward)'
result = validator.validate_country('US', follow_upward: true)

puts "Response: #{JSON.pretty_generate(result)}"

unless result[:valid]
  abort "❌ Country validation failed: #{result[:message]}"
end

puts '✅ Country is valid'

