require('@countriesdb/widget');

const READY_EVENT = 'countriesWidget:ready';
const STATUS_SELECTOR = '#ready-status';
const TARGET_NAME = 'country_ready';
// Ready fires separately for each select: country fires once, subdivision fires on initial load + every reload

let events = [];

function updateStatus() {
  const el = document.querySelector(STATUS_SELECTOR);
  if (el) {
    el.innerHTML = events.length > 0 ? events.join('<br>') : 'Waiting for widget…';
  }
}

function formatReady(detail) {
  const label = detail.type === 'country' ? 'Country select' : 'Subdivision select';
  return `${label} ready (${detail.phase}) — current value: ${detail.value || '(none)'}`;
}

document.addEventListener(
  READY_EVENT,
  (event) => {
    const detail = event.detail || {};
    // Filter to only our selects
    if (detail.name !== TARGET_NAME && detail.country !== TARGET_NAME) {
      return;
    }

    // Add event to list (keep last 5 events)
    events.push(formatReady(detail));
    if (events.length > 5) {
      events.shift();
    }

    updateStatus();
  },
  true
);
