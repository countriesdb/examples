## Backend Example – Ruby (Faraday)

Command-line examples that validate countries/subdivisions using [Faraday](https://lostisland.github.io/faraday/).

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
- `Gemfile` – Gem dependencies.

### Notes

- These examples use [Faraday](https://lostisland.github.io/faraday/) for HTTP requests.
- Running `bundle config set --local path 'vendor/bundle'` followed by `bundle install` will install the gems and their dependencies locally.
- For production use, add `gem 'faraday'` to your application's `Gemfile`.

