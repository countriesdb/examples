## Backend Example – Ruby (Net::HTTP)

Command-line examples that validate countries/subdivisions using Ruby's built-in [Net::HTTP](https://ruby-doc.org/stdlib-3.2.0/libdoc/net/http/rdoc/Net/HTTP.html) library.

### Setup

1. **Set your API key:** Edit any of the example files (e.g., `01-basic-country.rb`) and replace `YOUR_API_KEY` with your actual API key.

2. **Install dependencies:**
```bash
bundle config set --local path 'vendor/bundle'
bundle install
```

3. **Run an example:**
```bash
ruby 01-basic-country.rb
ruby 02-country-follow-upward.rb
ruby 03-multiple-countries.rb
ruby 04-basic-subdivision.rb
ruby 05-subdivision-follow-related.rb
ruby 06-subdivision-allow-parent.rb
ruby 07-multiple-subdivisions.rb
ruby 08-empty-subdivision.rb
```

### Files

- `01-basic-country.rb` through `08-empty-subdivision.rb` – Example scripts for each validation scenario.
- `Gemfile` – Gem dependencies (Net::HTTP and JSON are part of Ruby's standard library).

### Notes

- These examples use Ruby's built-in [Net::HTTP](https://ruby-doc.org/stdlib-3.2.0/libdoc/net/http/rdoc/Net/HTTP.html) library for HTTP requests.
- Net::HTTP and JSON are part of Ruby's standard library, so no external gems are required.
- Running `bundle config set --local path 'vendor/bundle'` followed by `bundle install` will set up the local bundle environment.
- For production use, Net::HTTP is available by default in Ruby - no additional setup needed.




