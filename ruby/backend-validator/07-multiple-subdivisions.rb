require 'bundler/setup'
require 'countriesdb-validator'
require 'json'

# Set your CountriesDB private API key here
api_key = 'YOUR_API_KEY' # Replace with your actual API key
if api_key == 'YOUR_API_KEY'
  abort 'Please set your API_KEY in the script'
end

validator = CountriesDB::Validator.new(api_key: api_key)

# 7. Multiple subdivision validation
codes = ['US-CA', 'US-NY', 'US-TX']
puts "Validating subdivision codes: #{codes.join(', ')} (country: US)"
results = validator.validate_subdivisions(codes, 'US', follow_related: false, allow_parent_selection: false)

puts "Response: #{JSON.pretty_generate(results)}"

results.each do |result|
  unless result[:valid]
    abort "❌ Subdivision #{result[:code]} validation failed: #{result[:message]}"
  end
end

puts '✅ All subdivisions are valid'

