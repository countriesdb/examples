const CUSTOM_COUNTRY_NAMES = {
  US: 'United States of America',
  EG: 'Egypt',
};

const CUSTOM_SUBDIVISION_NAMES = {
  'EG-C': 'Cairo City',
  'EG-ALX': 'Alexandria City',
};

function countryNameFilter(code, originalName) {
  if (code === 'CA' || code === 'GB') {
    return false;
  }

  return CUSTOM_COUNTRY_NAMES[code] || originalName;
}

function subdivisionNameFilter(code, originalName, language) {
  if (code === 'EG-GZ' || code === 'US-CA' || code === 'US-NY') {
    return false;
  }

  if (language === 'ar') {
    return originalName;
  }

  return CUSTOM_SUBDIVISION_NAMES[code] || originalName;
}

if (typeof window !== 'undefined') {
  const existingConfig = window.CountriesDBConfig || {};
  window.CountriesDBConfig = {
    ...existingConfig,
    publicKey: existingConfig.publicKey || 'YOUR_PUBLIC_KEY',
    countryNameFilter,
    subdivisionNameFilter,
  };
}

require('@countriesdb/widget');
