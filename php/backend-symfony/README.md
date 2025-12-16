## Backend Example – PHP (Symfony HttpClient)

Simple CLI scripts that validate countries and subdivisions using [Symfony HttpClient](https://symfony.com/doc/current/http_client.html).

### Setup

```bash
composer install
```

Edit each script and replace `YOUR_API_KEY` with your actual API key, then run:

```bash
php 01-basic-country.php
php 02-country-follow-upward.php
php 03-multiple-countries.php
php 04-basic-subdivision.php
php 05-subdivision-follow-related.php
php 06-subdivision-allow-parent.php
php 07-multiple-subdivisions.php
php 08-empty-subdivision.php
```

### Files

- `composer.json` – pulls in `symfony/http-client`.
- `01-basic-country.php` through `08-empty-subdivision.php` – standalone scripts demonstrating various validation scenarios.
- Each script uses Symfony HttpClient to call the CountriesDB API.

### API Key

Replace `YOUR_API_KEY` in each script with your actual private API key from CountriesDB.

### Output

Each script prints the decoded JSON responses, so you can inspect `valid`, `message`, and `results` fields before wiring it into your Symfony/Laravel app.

