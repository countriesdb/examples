require('@countriesdb/widget');

const loadBtn = document.getElementById('load-script-btn');

if (loadBtn) {
  loadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (typeof window.CountriesWidgetLoad === 'function') {
      window.CountriesWidgetLoad().catch(console.error);
    }
  });
}
