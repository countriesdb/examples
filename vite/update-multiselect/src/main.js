import '@countriesdb/widget';

const COUNTRY_SELECTOR = 'select.country-selection[data-name="country_multi_change"]';
const SUBDIVISION_SELECTOR = 'select.subdivision-selection[data-country-code="US"]';
const OUTPUT_SELECTOR = '#multi-selection-output';
const UPDATE_EVENT = 'countriesWidget:update';

function getSelectedValues(select) {
  return Array.from(select.selectedOptions)
    .map((option) => option.value)
    .filter((value) => value);
}

function updateOutput(countrySelect, subdivisionSelect, outputEl) {
  if (!outputEl) return;

  const countryValues = getSelectedValues(countrySelect);
  const subdivisionValues = getSelectedValues(subdivisionSelect);

  const countryText = 'Countries: ' + (countryValues.length > 0 ? countryValues.join(', ') : '(none)');
  const subdivisionText = ' | Subdivisions: ' + (subdivisionValues.length > 0 ? subdivisionValues.join(', ') : '(none)');
  outputEl.textContent = countryText + subdivisionText;
}

function attachUpdateListeners() {
  const countrySelect = document.querySelector(COUNTRY_SELECTOR);
  const subdivisionSelect = document.querySelector(SUBDIVISION_SELECTOR);
  const outputEl = document.querySelector(OUTPUT_SELECTOR);

  if (!countrySelect || !subdivisionSelect || !outputEl) return;

  function handleUpdate(event) {
    const target = event.target;
    const selectedValues = event.detail?.selectedValues || [];

    if (target === countrySelect) {
      // When country updates, only update the country part
      const countryText = 'Countries: ' + (selectedValues.length > 0 ? selectedValues.join(', ') : '(none)');
      // Preserve subdivision text if it exists
      const subdivisionValues = getSelectedValues(subdivisionSelect);
      const subdivisionText = ' | Subdivisions: ' + (subdivisionValues.length > 0 ? subdivisionValues.join(', ') : '(none)');
      outputEl.textContent = countryText + subdivisionText;
    } else if (target === subdivisionSelect) {
      // When subdivision updates, update both
      updateOutput(countrySelect, subdivisionSelect, outputEl);
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target === countrySelect || target === subdivisionSelect) {
      updateOutput(countrySelect, subdivisionSelect, outputEl);
    }
  }

  countrySelect.addEventListener(UPDATE_EVENT, handleUpdate, true);
  countrySelect.addEventListener('change', handleChange);
  subdivisionSelect.addEventListener(UPDATE_EVENT, handleUpdate, true);
  subdivisionSelect.addEventListener('change', handleChange);

  updateOutput(countrySelect, subdivisionSelect, outputEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachUpdateListeners, { once: true });
} else {
  attachUpdateListeners();
}
