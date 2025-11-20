import '@countriesdb/widget';

const COUNTRY_SELECTOR = 'select.country-selection[data-name="country_change"]';
const SUBDIVISION_SELECTOR = 'select.subdivision-selection[data-country="country_change"]';
const OUTPUT_SELECTOR = '#selection-output';
const UPDATE_EVENT = 'countriesWidget:update';

function renderOutput(prefix, select) {
  if (!select || !select.value) {
    return `${prefix}(none)`;
  }

  const option = select.options[select.selectedIndex] || {};
  const label = option.textContent || option.text || '';
  return `${prefix}${select.value} — ${label}`;
}

function updateOutput(countrySelect, subdivisionSelect, outputEl) {
  if (!outputEl) {
    return;
  }

  const countryText = renderOutput('Country: ', countrySelect);
  const subdivisionText = renderOutput(' | Subdivision: ', subdivisionSelect);
  outputEl.textContent = `${countryText}${subdivisionText}`;
}

function attachUpdateListeners() {
  const countrySelect = document.querySelector(COUNTRY_SELECTOR);
  const subdivisionSelect = document.querySelector(SUBDIVISION_SELECTOR);
  const outputEl = document.querySelector(OUTPUT_SELECTOR);

  if (!countrySelect || !subdivisionSelect || !outputEl) {
    return;
  }

  const handleUpdate = (event) => {
    const target = event.target;
    if (target === countrySelect) {
      // When country updates, only update the country part
      const countryText = renderOutput('Country: ', countrySelect);
      // Preserve subdivision text if it exists
      const subdivisionText = renderOutput(' | Subdivision: ', subdivisionSelect);
      outputEl.textContent = `${countryText}${subdivisionText}`;
    } else if (target === subdivisionSelect) {
      // When subdivision updates, update both
      updateOutput(countrySelect, subdivisionSelect, outputEl);
    }
  };

  countrySelect.addEventListener(UPDATE_EVENT, handleUpdate, true);
  subdivisionSelect.addEventListener(UPDATE_EVENT, handleUpdate, true);

  // Render the initial state once the widget populates defaults.
  updateOutput(countrySelect, subdivisionSelect, outputEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachUpdateListeners, { once: true });
} else {
  attachUpdateListeners();
}
