/**
 * API client for CountriesDB API
 */
class CountriesDBClient {
    /**
     * Fetch countries from the API
     */
    static async fetchCountries(options) {
        const { apiKey, backendUrl, shouldUseGeoIP = true, isoCountryNames = false, languageHeaders = {}, } = options;
        const base = `${backendUrl}/api/countries`;
        const params = [];
        if (!shouldUseGeoIP) {
            params.push('no_geoip=1');
        }
        if (isoCountryNames) {
            params.push('country_name_source=iso');
        }
        const url = params.length ? `${base}?${params.join('&')}` : base;
        return this.fetchFromApi(url, apiKey, languageHeaders);
    }
    /**
     * Fetch subdivisions for a specific country
     */
    static async fetchSubdivisions(options) {
        const { apiKey, backendUrl, countryCode, shouldUseGeoIP = true, preferOfficial = false, subdivisionRomanizationPreference, preferLocalVariant = false, languageHeaders = {}, } = options;
        if (!countryCode) {
            return { data: [], language: null };
        }
        const base = `${backendUrl}/api/countries/${countryCode}/subdivisions`;
        const params = [];
        if (!shouldUseGeoIP) {
            params.push('no_geoip=1');
        }
        if (subdivisionRomanizationPreference) {
            params.push(`subdivision_romanization_preference=${encodeURIComponent(subdivisionRomanizationPreference)}`);
        }
        if (preferLocalVariant) {
            params.push('prefer_local_variant=1');
        }
        if (preferOfficial) {
            params.push('prefer_official=1');
        }
        const url = params.length ? `${base}?${params.join('&')}` : base;
        return this.fetchFromApi(url, apiKey, languageHeaders);
    }
    /**
     * Generic API fetch method
     */
    static async fetchFromApi(url, apiKey, languageHeaders) {
        try {
            const response = await fetch(url, {
                headers: {
                    ...languageHeaders,
                    'X-API-KEY': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                let errorMessage = `HTTP Error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                }
                catch {
                    // Ignore JSON parse errors
                }
                throw new Error(errorMessage);
            }
            const data = (await response.json());
            const language = response.headers.get('X-Selected-Language') || null;
            return { data, language };
        }
        catch (error) {
            console.error(`Failed to fetch data from ${url}:`, error);
            throw error;
        }
    }
    /**
     * Get language headers from browser and config
     */
    static getLanguageHeaders(forcedLanguage, defaultLanguage) {
        const headers = {};
        if (forcedLanguage) {
            headers['X-Forced-Language'] = forcedLanguage;
        }
        if (defaultLanguage) {
            headers['X-Default-Language'] = defaultLanguage;
        }
        // Use browser's language preference
        if (typeof navigator !== 'undefined' && navigator.language) {
            headers['Accept-Language'] = navigator.language;
        }
        else {
            headers['Accept-Language'] = 'en';
        }
        return headers;
    }
}

/**
 * Utilities for building and working with subdivision trees
 */
/**
 * Build a tree structure from a flat list of subdivisions
 */
function buildSubdivisionTree(subdivisions) {
    const map = {};
    const roots = [];
    // Create map of all subdivisions
    subdivisions.forEach((item) => {
        map[item.id] = {
            ...item,
            children: [],
        };
    });
    // Build tree structure
    subdivisions.forEach((item) => {
        const node = map[item.id];
        if (item.parent_id && map[item.parent_id]) {
            map[item.parent_id].children.push(node);
        }
        else {
            roots.push(node);
        }
    });
    return roots;
}
/**
 * Flatten subdivision tree into HTML options
 */
function flattenSubdivisionOptions(nodes, level, prefixes, labelKey, language, allowParentSelection, subdivisionNameFilter) {
    let html = '';
    // Apply name filter and get display names
    const nodesWithDisplayNames = nodes
        .map((node) => {
        let displayName = node[labelKey] || node.name;
        const countryCode = node.code ? node.code.split('-')[0] : null;
        // Apply subdivisionNameFilter if provided
        if (subdivisionNameFilter && typeof subdivisionNameFilter === 'function') {
            const filteredName = subdivisionNameFilter(node.code, displayName, language, countryCode, node);
            if (filteredName === false) {
                return null; // Mark for filtering - remove this item
            }
            if (filteredName !== null && filteredName !== undefined) {
                displayName = filteredName;
            }
        }
        return { ...node, _displayName: displayName };
    })
        .filter((node) => node !== null);
    // Sort: use Unicode-aware sorting if subdivisionNameFilter was used
    const locale = subdivisionNameFilter && typeof subdivisionNameFilter === 'function' && language
        ? language
        : undefined;
    nodesWithDisplayNames.sort((a, b) => {
        if (locale) {
            return a._displayName.localeCompare(b._displayName, locale, {
                sensitivity: 'accent', // Case-insensitive, accent-sensitive
                ignorePunctuation: false,
            });
        }
        return a._displayName.localeCompare(b._displayName); // Default behavior
    });
    const prefix = level > 0 ? (prefixes[level] ?? '&nbsp;'.repeat(level * 2)) : '';
    const cssClass = `subdivision-level-${level}`;
    for (const node of nodesWithDisplayNames) {
        const hasChildren = node.children && node.children.length > 0;
        const displayName = node._displayName;
        const label = `${prefix}${displayName}`;
        if (hasChildren) {
            if (allowParentSelection) {
                html += `<option value="${node.code}" class="${cssClass}">${label}</option>`;
            }
            else {
                html += `<option disabled value="${node.code}" class="${cssClass}">${label}</option>`;
            }
            html += flattenSubdivisionOptions(node.children, level + 1, prefixes, labelKey, language, allowParentSelection, subdivisionNameFilter);
        }
        else {
            html += `<option value="${node.code}" class="${cssClass}">${label}</option>`;
        }
    }
    return html;
}
/**
 * Parse nesting prefixes from data attributes
 */
function parseNestingPrefixes(dataAttributes) {
    const prefixes = {};
    for (let lvl = 1; lvl <= 10; lvl++) {
        const key = `nested${lvl}Prefix`;
        const value = dataAttributes[key];
        if (value !== undefined) {
            prefixes[lvl] = value;
        }
        else {
            break;
        }
    }
    return prefixes;
}

/**
 * Name filtering utilities
 */
/**
 * Apply country name filter to a list of countries
 */
function applyCountryNameFilter(countries, filter, language) {
    if (!filter || typeof filter !== 'function') {
        return countries.map((c) => ({ ...c, _displayName: c.name }));
    }
    return countries
        .map((country) => {
        const filteredName = filter(country.iso_alpha_2, country.name, language, country);
        if (filteredName === false) {
            return null; // Skip this item
        }
        const displayName = filteredName !== null && filteredName !== undefined
            ? filteredName
            : country.name;
        return { ...country, _displayName: displayName };
    })
        .filter((c) => c !== null);
}
/**
 * Sort countries with Unicode-aware sorting
 */
function sortCountries(countries, language) {
    const locale = language;
    return [...countries].sort((a, b) => {
        {
            return a._displayName.localeCompare(b._displayName, locale, {
                sensitivity: 'accent', // Case-insensitive, accent-sensitive
                ignorePunctuation: false,
            });
        }
    });
}

/**
 * DOM manipulation utilities
 */
/**
 * Initialize a select element with default option
 */
function initializeSelect(select, fallbackLabel = 'Not Applicable', isSubdivision = false) {
    const isMultiple = select.hasAttribute('multiple');
    // For multi-select, don't add default option or use data-label/data-default-value
    if (isMultiple) {
        select.innerHTML = '';
        // Remove data-label and data-default-value for multi-select (they're ignored)
        if (select.dataset.label !== undefined) {
            delete select.dataset.label;
        }
        if (select.dataset.defaultValue !== undefined) {
            delete select.dataset.defaultValue;
        }
    }
    else {
        const dataLabel = select.dataset.label;
        const dataDefaultValue = select.dataset.defaultValue;
        const label = dataLabel || fallbackLabel;
        const defaultValue = dataDefaultValue ?? '';
        select.innerHTML = `<option value="${defaultValue}">${label}</option>`;
        if (dataLabel !== undefined) {
            select.dataset.label = dataLabel;
        }
        if (dataDefaultValue !== undefined) {
            select.dataset.defaultValue = dataDefaultValue;
        }
    }
    if (isSubdivision) {
        select.disabled = true;
    }
}
/**
 * Populate a select element with countries
 */
function populateCountrySelect(select, countries, language, countryNameFilter) {
    // Apply filter and get display names
    let filteredCountries = applyCountryNameFilter(countries, countryNameFilter, language);
    // Sort if filter was applied
    if (countryNameFilter) {
        filteredCountries = sortCountries(filteredCountries, language);
    }
    // Check for multi-select using both attribute and property
    const isMultiple = select.hasAttribute('multiple') || select.multiple;
    if (isMultiple) {
        // For multi-select, don't add default option (like old widget)
        select.innerHTML = '';
    }
    else {
        // Clear existing options (except default)
        const defaultOption = select.querySelector('option[value=""]') ||
            (select.dataset.defaultValue ? select.querySelector(`option[value="${select.dataset.defaultValue}"]`) : null);
        const defaultValue = select.dataset.defaultValue ?? '';
        // Keep default option if it exists
        select.innerHTML = defaultOption ? defaultOption.outerHTML : `<option value="${defaultValue}">${select.dataset.label || '&mdash;'}</option>`;
    }
    // Add country options
    filteredCountries.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.iso_alpha_2;
        option.textContent = country._displayName;
        select.appendChild(option);
    });
}
/**
 * Populate a select element with subdivisions
 */
function buildSubdivisionOptionsHTML(subdivisions, select, language, showSubdivisionType, allowParentSelection, subdivisionNameFilter) {
    const tree = buildSubdivisionTree(subdivisions);
    // Parse nesting prefixes from data attributes
    const dataAttributes = {};
    for (let lvl = 1; lvl <= 10; lvl++) {
        const key = `nested${lvl}Prefix`;
        const value = select.dataset[key];
        if (value !== undefined) {
            dataAttributes[`nested${lvl}Prefix`] = value;
        }
        else {
            break;
        }
    }
    const prefixes = parseNestingPrefixes(dataAttributes);
    const isMultiple = select.hasAttribute('multiple');
    const labelKey = showSubdivisionType ? 'full_name' : 'name';
    let html = '';
    // For multi-select, don't add default option
    if (!isMultiple) {
        const defaultLabel = select.dataset.label || '&mdash;';
        const defaultValue = select.dataset.defaultValue ?? '';
        html = `<option value="${defaultValue}">${defaultLabel}</option>`;
    }
    html += flattenSubdivisionOptions(tree, 0, prefixes, labelKey, language, allowParentSelection, subdivisionNameFilter);
    return html;
}
/**
 * Apply preselected value to a select element
 * Like old widget, reads the value from the select element itself to get current state
 */
function applyPreselectedValue(select, apiKey) {
    // Read from select element like old widget (line 740)
    const tempOnce = select.dataset._widgetTempPreselect;
    const permanent = select.getAttribute('data-preselected') || select.dataset.preselected;
    const chosen = (tempOnce !== undefined && tempOnce !== null && String(tempOnce).trim() !== '')
        ? tempOnce
        : permanent;
    if (!chosen || (typeof chosen === 'string' && chosen.trim() === '')) {
        return;
    }
    const value = String(chosen);
    const isMultiple = select.hasAttribute('multiple');
    if (isMultiple) {
        // For multi-select, parse comma-separated values
        const values = value
            .split(',')
            .map((v) => v.trim())
            .filter((v) => v !== '');
        // Select all matching options
        Array.from(select.options).forEach((option) => {
            option.selected = values.includes(option.value);
        });
    }
    else {
        // Single select: set single value
        select.value = value;
    }
    // Consume preselect so it's only applied once (like old widget)
    if (select.dataset._widgetTempPreselect !== undefined) {
        delete select.dataset._widgetTempPreselect;
    }
    if (select.dataset.preselected !== undefined) {
        delete select.dataset.preselected;
    }
    if (select.hasAttribute('data-preselected')) {
        select.removeAttribute('data-preselected');
    }
}
/**
 * Handle API error by showing error message in select
 */
function handleApiError(select, errorMessage, replace = false) {
    const message = errorMessage instanceof Error ? errorMessage.message : errorMessage;
    const defaultValue = select.dataset.defaultValue ?? '';
    // Add "Error: " prefix to match old widget behavior and test expectations
    const formattedMessage = message.startsWith('Error: ') ? message : `Error: ${message}`;
    if (replace) {
        select.innerHTML = `<option value="${defaultValue}" disabled>${formattedMessage}</option>`;
    }
    else {
        select.innerHTML += `<option value="${defaultValue}" disabled>${formattedMessage}</option>`;
    }
    // Ensure select is enabled so users can see the error
    select.disabled = false;
}

/**
 * Event system for widget updates
 */
/**
 * Dispatch a custom update event for widget changes
 */
function dispatchUpdateEvent(select, detail = {}) {
    let selectedValues = [];
    if (select.multiple) {
        // For multi-select, selectedOptions is a HTMLCollection, convert to array
        selectedValues = Array.from(select.selectedOptions || [])
            .map((opt) => opt.value)
            .filter((v) => v !== '');
    }
    else {
        // For single-select, use value
        selectedValues = select.value ? [select.value] : [];
    }
    const evt = new CustomEvent('countriesWidget:update', {
        bubbles: true,
        detail: {
            value: select.value || '',
            selectedValues,
            name: select.dataset.name || null,
            country: select.dataset.country || null,
            isSubdivision: select.classList.contains('subdivision-selection'),
            ...detail,
        },
    });
    select.dispatchEvent(evt);
}
/**
 * Check if an event was initiated by the widget (not user)
 */
function isWidgetInitiatedEvent(event) {
    return event.isWidgetInitiated === true;
}

/**
 * Follow logic for related and upward navigation
 */
/**
 * Trigger follow logic when a subdivision is selected
 */
async function triggerFollowLogic(select, apiKey, backendUrl, state, followRelated, followUpward, updateSubdivisionSelectFn, updateSubdivisionsFn) {
    if (!followRelated && !followUpward) {
        return;
    }
    const linkedCountrySelect = document.querySelector(`.country-selection[data-name="${select.dataset.country}"]`);
    // Only work if country is single-select (never when country is multi)
    if (!linkedCountrySelect || linkedCountrySelect.multiple) {
        return;
    }
    const allSubs = state.subdivisionsMap.get(select);
    if (!allSubs) {
        return;
    }
    // For follow_upward, only work if subdivision is single-select
    if (followUpward && select.multiple) {
        return;
    }
    const selectedCode = select.value;
    if (!selectedCode) {
        return;
    }
    const picked = allSubs.find((s) => s.code === selectedCode);
    if (!picked) {
        return;
    }
    // follow_related
    if (followRelated && picked.related_country_code) {
        const targetCountry = picked.related_country_code;
        const targetSubdivision = picked.related_subdivision_code;
        const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
        if (relatedSubsSelect && targetSubdivision) {
            relatedSubsSelect.dataset._widgetTempPreselect = targetSubdivision; // one-time preselect
        }
        if (linkedCountrySelect.value !== targetCountry) {
            // Directly set value like old widget did
            linkedCountrySelect.value = targetCountry;
            dispatchUpdateEvent(linkedCountrySelect, { type: 'country', reason: 'regular' });
            // Update all subdivision selects for the new country (like old widget)
            if (updateSubdivisionsFn) {
                await updateSubdivisionsFn(linkedCountrySelect, apiKey);
            }
            else if (relatedSubsSelect) {
                // Fallback: update just the one subdivision select
                await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, targetCountry);
            }
        }
        else {
            if (relatedSubsSelect && targetSubdivision) {
                await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, targetCountry);
            }
        }
    }
    // follow_upward
    if (followUpward && picked.is_subdivision_of) {
        const parentCode = picked.is_subdivision_of.parent_country_code;
        const parentSub = picked.is_subdivision_of.subdivision_code;
        if (parentSub) {
            const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
            // Only preselect if subdivision is single-select (follow_upward doesn't work with multi)
            if (relatedSubsSelect && !relatedSubsSelect.multiple) {
                relatedSubsSelect.dataset._widgetTempPreselect = parentSub; // one-time preselect
            }
        }
        if (linkedCountrySelect.value !== parentCode) {
            // Directly set value like old widget did
            linkedCountrySelect.value = parentCode;
            dispatchUpdateEvent(linkedCountrySelect, { type: 'country', reason: 'regular' });
            // Update all subdivision selects for the new country (like old widget)
            if (updateSubdivisionsFn) {
                await updateSubdivisionsFn(linkedCountrySelect, apiKey);
            }
            else {
                const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
                if (relatedSubsSelect) {
                    await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, parentCode);
                }
            }
        }
        else if (parentSub) {
            const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
            if (relatedSubsSelect && !relatedSubsSelect.multiple) {
                await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, parentCode);
            }
        }
    }
}
/**
 * Handle follow_related from subdivision change event
 */
async function handleFollowRelatedFromSubdivision(select, apiKey, backendUrl, state, followRelated, updateSubdivisionSelectFn) {
    if (!followRelated) {
        return;
    }
    const linkedCountrySelect = document.querySelector(`.country-selection[data-name="${select.dataset.country}"]`);
    // Only work if country is single-select (never when country is multi)
    if (!linkedCountrySelect || linkedCountrySelect.multiple) {
        return;
    }
    const allSubs = state.subdivisionsMap.get(select);
    if (!allSubs) {
        return;
    }
    // Get selected code (for multi-select, use first selected value)
    const selectedCode = select.multiple
        ? (select.selectedOptions[0]?.value || null)
        : select.value;
    if (!selectedCode) {
        return;
    }
    const picked = allSubs.find((s) => s.code === selectedCode);
    if (!picked || !picked.related_country_code) {
        return;
    }
    const targetCountry = picked.related_country_code;
    const targetSubdivision = picked.related_subdivision_code;
    const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
    if (relatedSubsSelect && targetSubdivision) {
        relatedSubsSelect.dataset.preselected = targetSubdivision;
    }
    if (linkedCountrySelect.value !== targetCountry) {
        // Directly set value like old widget did
        linkedCountrySelect.value = targetCountry;
        dispatchUpdateEvent(linkedCountrySelect, { type: 'country', reason: 'regular' });
        // Update all subdivision selects for the new country (like old widget)
        // Note: updateSubdivisionsFn is not available in handleFollowRelatedFromSubdivision,
        // so we update the subdivision select manually
        if (relatedSubsSelect) {
            await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, targetCountry);
        }
    }
    else {
        if (relatedSubsSelect && targetSubdivision) {
            await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, targetCountry);
        }
    }
}
/**
 * Handle follow_upward from subdivision change event
 */
async function handleFollowUpwardFromSubdivision(select, apiKey, backendUrl, state, followUpward, updateSubdivisionSelectFn) {
    if (!followUpward) {
        return;
    }
    // Disable for multi-select subdivisions
    if (select.multiple) {
        return;
    }
    const linkedCountrySelect = document.querySelector(`.country-selection[data-name="${select.dataset.country}"]`);
    // Only work if country is single-select (never when country is multi)
    if (!linkedCountrySelect || linkedCountrySelect.multiple) {
        return;
    }
    const allSubs = state.subdivisionsMap.get(select);
    if (!allSubs) {
        return;
    }
    const selectedCode = select.value;
    if (!selectedCode) {
        return;
    }
    const picked = allSubs.find((s) => s.code === selectedCode);
    if (!picked || !picked.is_subdivision_of) {
        return;
    }
    const parentCode = picked.is_subdivision_of.parent_country_code;
    const parentSub = picked.is_subdivision_of.subdivision_code;
    if (parentSub) {
        const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
        if (relatedSubsSelect) {
            relatedSubsSelect.dataset.preselected = parentSub;
        }
    }
    if (linkedCountrySelect.value !== parentCode) {
        // Directly set value like old widget did
        linkedCountrySelect.value = parentCode;
        dispatchUpdateEvent(linkedCountrySelect, { type: 'country', reason: 'follow' });
        // Update all subdivision selects for the new country (like old widget)
        // Note: updateSubdivisionsFn is not available in handleFollowUpwardFromSubdivision,
        // so we update the subdivision select manually
        const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
        if (relatedSubsSelect) {
            await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, parentCode);
        }
    }
    else if (parentSub) {
        const relatedSubsSelect = document.querySelector(`.subdivision-selection[data-country="${linkedCountrySelect.dataset.name}"]`);
        if (relatedSubsSelect) {
            await updateSubdivisionSelectFn(relatedSubsSelect, apiKey, parentCode);
        }
    }
}
/**
 * Handle follow_upward from country change event
 */
async function handleFollowUpwardFromCountry(select, apiKey, backendUrl, state, followUpward, updateSubdivisionSelectFn) {
    // Only works when country is single-select (never for multi-select)
    if (!followUpward || select.multiple) {
        return;
    }
    const countries = state.countriesMap.get(select);
    if (!countries) {
        return;
    }
    const chosen = select.value;
    if (!chosen) {
        return;
    }
    const picked = countries.find((c) => c.iso_alpha_2 === chosen);
    if (!picked || !picked.is_subdivision_of) {
        return;
    }
    const parentCode = picked.is_subdivision_of.parent_country_code;
    const parentSub = picked.is_subdivision_of.subdivision_code;
    if (select.value !== parentCode) {
        if (parentSub) {
            const linkedSubdivisionSelects = Array.from(document.querySelectorAll(`.subdivision-selection[data-country="${select.dataset.name}"]`));
            for (const s of linkedSubdivisionSelects) {
                // Only preselect if subdivision is single-select (follow_upward doesn't work with multi)
                if (!s.multiple) {
                    s.dataset.preselected = parentSub;
                }
            }
        }
        // Directly set value like old widget did
        select.value = parentCode;
        dispatchUpdateEvent(select, { type: 'country', reason: 'regular' });
        // Update all subdivision selects for the new country (like old widget)
        // Note: updateSubdivisionsFn is not available in handleFollowUpwardFromCountry,
        // so we update all subdivision selects manually
        const linkedSubdivisionSelects = Array.from(document.querySelectorAll(`.subdivision-selection[data-country="${select.dataset.name}"]`));
        for (const s of linkedSubdivisionSelects) {
            await updateSubdivisionSelectFn(s, apiKey, parentCode);
        }
    }
    else if (parentSub) {
        const linkedSubdivisionSelects = Array.from(document.querySelectorAll(`.subdivision-selection[data-country="${select.dataset.name}"]`));
        for (const s of linkedSubdivisionSelects) {
            // Only update if subdivision is single-select
            if (!s.multiple) {
                await updateSubdivisionSelectFn(s, apiKey, parentCode);
            }
        }
    }
}

/**
 * Widget initialization logic
 */
/**
 * Setup subdivision selection elements
 */
async function setupSubdivisionSelection(apiKey, backendUrl, state, config) {
    const subdivisionSelects = Array.from(document.querySelectorAll('.subdivision-selection'));
    for (const select of subdivisionSelects) {
        // Initialize with a default option
        initializeSelect(select, '&mdash;', true);
        // Linked country select (if any)
        const countryName = select.dataset.country;
        const linkedCountrySelect = countryName
            ? document.querySelector(`.country-selection[data-name="${countryName}"]`)
            : null;
        // Check if linked country select is multi-select (not allowed)
        if (linkedCountrySelect && linkedCountrySelect.hasAttribute('multiple')) {
            handleApiError(select, 'Cannot link to multi-select country. Use data-country-code instead.', true);
            continue;
        }
        // No direct link → maybe data-country-code
        if (!countryName || !linkedCountrySelect) {
            if (select.hasAttribute('data-country-code') &&
                select.dataset.countryCode) {
                await updateSubdivisionSelect(select, apiKey, backendUrl, state, config, select.dataset.countryCode);
            }
            else {
                handleApiError(select, 'No country select present');
            }
        }
        // Always dispatch an update event for user-initiated subdivision changes
        select.addEventListener('change', (event) => {
            if (isWidgetInitiatedEvent(event)) {
                return;
            }
            dispatchUpdateEvent(select, { type: 'subdivision', reason: 'regular' });
        });
        // --- follow_related (forward direction) ---
        select.addEventListener('change', async (event) => {
            if (isWidgetInitiatedEvent(event)) {
                return;
            }
            await handleFollowRelatedFromSubdivision(select, apiKey, backendUrl, state, config.followRelated, (s, key, code) => updateSubdivisionSelect(s, key, backendUrl, state, config, code));
        });
        // --- follow_upward (reverse direction) ---
        select.addEventListener('change', async (event) => {
            if (isWidgetInitiatedEvent(event)) {
                return;
            }
            await handleFollowUpwardFromSubdivision(select, apiKey, backendUrl, state, config.followUpward, (s, key, code) => updateSubdivisionSelect(s, key, backendUrl, state, config, code));
        });
    }
}
/**
 * Update subdivision select with data for a specific country
 */
async function updateSubdivisionSelect(select, apiKey, backendUrl, state, config, countryCode) {
    const preselectedValue = select.getAttribute('data-preselected') || select.dataset.preselected;
    // Check if this is a reload (select was already populated before)
    const isReload = state.subdivisionsMap.has(select);
    initializeSelect(select, '&mdash;', true);
    // Mark as initializing to prevent change events
    state.isInitializing.add(select);
    let effectiveCountryCode = countryCode;
    if (!effectiveCountryCode) {
        effectiveCountryCode = select.dataset.countryCode || '';
    }
    if (effectiveCountryCode) {
        let valueSetByWidget = false; // Track if a value was set by widget
        try {
            // Use GeoIP only if data-preselected attribute is not set at all
            const shouldUseGeoIP = preselectedValue === undefined || preselectedValue === null;
            // Check if this subdivision select prefers official subdivisions
            const preferOfficial = select.hasAttribute('data-prefer-official') ||
                config.preferOfficialSubdivisions;
            const languageHeaders = CountriesDBClient.getLanguageHeaders(config.forcedLanguage, config.defaultLanguage);
            const subdivisionsResult = await CountriesDBClient.fetchSubdivisions({
                apiKey,
                backendUrl,
                countryCode: effectiveCountryCode,
                shouldUseGeoIP,
                preferOfficial,
                subdivisionRomanizationPreference: config.subdivisionRomanizationPreference,
                preferLocalVariant: config.preferLocalVariant,
                languageHeaders,
            });
            const subdivisions = subdivisionsResult.data;
            const subdivisionsLanguage = subdivisionsResult.language || 'en';
            // Store in memory
            state.subdivisionsMap.set(select, subdivisions);
            state.subdivisionsLanguageMap.set(select, subdivisionsLanguage);
            if (subdivisions.length > 0) {
                // Populate <option>
                select.disabled = false;
                // Preserve data attributes before setting innerHTML (only for non-multi-select)
                const isMultiple = select.hasAttribute('multiple');
                const dataLabel = !isMultiple ? select.dataset.label : undefined;
                const dataDefaultValue = !isMultiple
                    ? select.dataset.defaultValue
                    : undefined;
                select.innerHTML = buildSubdivisionOptionsHTML(subdivisions, select, subdivisionsLanguage, config.showSubdivisionType, config.allowParentSelection, config.subdivisionNameFilter);
                // Restore data attributes after setting innerHTML
                if (!isMultiple) {
                    if (dataLabel !== undefined) {
                        select.dataset.label = dataLabel;
                    }
                    if (dataDefaultValue !== undefined) {
                        select.dataset.defaultValue = dataDefaultValue;
                    }
                }
                // Manual preselection wins
                // Check if preselected value exists (applyPreselectedValue will read it from select element)
                const hasPreselectedValue = (select.getAttribute('data-preselected') || select.dataset.preselected || select.dataset._widgetTempPreselect) !== undefined;
                if (hasPreselectedValue) {
                    applyPreselectedValue(select, apiKey);
                    dispatchUpdateEvent(select, {
                        type: 'subdivision',
                        reason: 'preselected',
                    });
                    valueSetByWidget = true;
                    await triggerFollowLogic(select, apiKey, backendUrl, state, config.followRelated, config.followUpward, (s, key, code) => updateSubdivisionSelect(s, key, backendUrl, state, config, code), (countrySelect, key) => updateSubdivisions(countrySelect, key, backendUrl, state, config));
                }
                else {
                    // Try GeoIP preselect
                    if (shouldUseGeoIP) {
                        const preselectedSubdivision = subdivisions.find((subdivision) => subdivision.preselected);
                        if (preselectedSubdivision) {
                            const isMultiple = select.hasAttribute('multiple');
                            if (isMultiple) {
                                // For multi-select, find and select the option
                                const option = Array.from(select.options).find((opt) => opt.value === preselectedSubdivision.code);
                                if (option) {
                                    option.selected = true;
                                }
                            }
                            else {
                                // Single select: set value directly
                                select.value = preselectedSubdivision.code;
                            }
                            dispatchUpdateEvent(select, {
                                type: 'subdivision',
                                reason: 'geoip',
                            });
                            valueSetByWidget = true;
                            await triggerFollowLogic(select, apiKey, backendUrl, state, config.followRelated, config.followUpward, (s, key, code) => updateSubdivisionSelect(s, key, backendUrl, state, config, code), (countrySelect, key) => updateSubdivisions(countrySelect, key, backendUrl, state, config));
                        }
                    }
                }
            }
            else {
                select.disabled = true;
            }
        }
        catch (error) {
            console.error('Failed to fetch subdivisions:', error);
            handleApiError(select, error);
        }
        finally {
            // Mark initialization as complete
            state.isInitializing.delete(select);
            // Only fire 'reload' if this is a reload, not initial load
            if (isReload && !valueSetByWidget) {
                dispatchUpdateEvent(select, {
                    type: 'subdivision',
                    reason: 'reload',
                });
            }
        }
    }
    else if (!select.dataset.country ||
        !document.querySelector(`.country-selection[data-name="${select.dataset.country}"]`)) {
        handleApiError(select, 'No country select present');
    }
}
/**
 * Update subdivisions for all linked subdivision selects when country changes
 */
async function updateSubdivisions(countrySelect, apiKey, backendUrl, state, config) {
    // Don't update subdivisions for multi-select countries (not supported)
    if (countrySelect.hasAttribute('multiple')) {
        return;
    }
    const selectedCountry = countrySelect.value;
    const linkedSubdivisionSelects = Array.from(document.querySelectorAll(`.subdivision-selection[data-country="${countrySelect.dataset.name}"]`));
    for (const select of linkedSubdivisionSelects) {
        await updateSubdivisionSelect(select, apiKey, backendUrl, state, config, selectedCountry);
    }
}
/**
 * Setup country selection elements
 */
async function setupCountrySelection(apiKey, backendUrl, state, config, subdivisionConfig) {
    const countrySelects = Array.from(document.querySelectorAll('.country-selection'));
    const seenNames = {}; // track data-name to detect duplicates
    for (const select of countrySelects) {
        const name = select.dataset.name;
        // Duplicates
        if (name && seenNames[name]) {
            select.removeAttribute('data-name');
            initializeSelect(select, '&mdash;');
            handleApiError(select, 'Duplicate field');
            continue;
        }
        if (name) {
            seenNames[name] = true;
        }
        // Note: Class renaming is now handled earlier in fixMisClassedElements()
        // This check is kept as a safety net but should not be needed
        // Initialize
        initializeSelect(select, '&mdash;');
        // Mark as initializing to prevent change events
        state.isInitializing.add(select);
        let valueSetByWidget = false; // Track if value was set by widget
        let loadedInitialSubdivisions = false; // Track if subdivisions were loaded
        try {
            const preselectedValue = select.getAttribute('data-preselected') || select.dataset.preselected;
            // Use GeoIP only if data-preselected attribute is not set at all
            const shouldUseGeoIP = preselectedValue === undefined || preselectedValue === null;
            const languageHeaders = CountriesDBClient.getLanguageHeaders(config.forcedLanguage, config.defaultLanguage);
            // Fetch & populate countries
            const countriesResult = await CountriesDBClient.fetchCountries({
                apiKey,
                backendUrl,
                shouldUseGeoIP,
                isoCountryNames: config.isoCountryNames,
                languageHeaders,
            });
            const countries = countriesResult.data;
            const countriesLanguage = countriesResult.language || 'en';
            state.countriesMap.set(select, countries);
            populateCountrySelect(select, countries, countriesLanguage, config.countryNameFilter);
            // Apply preselected (manual)
            // Check if preselected value exists (applyPreselectedValue will read it from select element)
            const hasPreselectedValue = (select.getAttribute('data-preselected') || select.dataset.preselected || select.dataset._widgetTempPreselect) !== undefined;
            if (hasPreselectedValue) {
                applyPreselectedValue(select, apiKey);
                dispatchUpdateEvent(select, { type: 'country', reason: 'preselected' });
                valueSetByWidget = true;
                // Load subdivisions after applying preselected value
                if (select.value &&
                    select.value !== (select.dataset.defaultValue || '')) {
                    // This will be handled by the updateSubdivisions call below
                    // We need to pass the config for subdivisions
                }
            }
            // GeoIP auto-select
            if (shouldUseGeoIP) {
                const preselectedCountry = countries.find((country) => country.preselected);
                if (preselectedCountry) {
                    select.value = preselectedCountry.iso_alpha_2;
                    dispatchUpdateEvent(select, { type: 'country', reason: 'geoip' });
                    valueSetByWidget = true;
                }
            }
            // If already chosen, load subdivisions
            if (!loadedInitialSubdivisions &&
                select.value &&
                select.value !== (select.dataset.defaultValue || '')) {
                // Subdivisions will be loaded by event handler
                loadedInitialSubdivisions = true;
            }
            // On change => update subdivisions
            select.addEventListener('change', async (event) => {
                if (isWidgetInitiatedEvent(event)) {
                    return;
                }
                // Dispatch update event for user-initiated country change
                dispatchUpdateEvent(select, { type: 'country', reason: 'regular' });
                // Update subdivisions
                await updateSubdivisions(select, apiKey, backendUrl, state, subdivisionConfig);
                const chosen = select.value;
                if (!chosen) {
                    return;
                }
                const stored = state.countriesMap.get(select) || [];
                const picked = stored.find((c) => c.iso_alpha_2 === chosen);
                if (!picked) {
                    return;
                }
                // followUpward from country perspective
                // Only works when country is single-select (never for multi-select)
                if (config.followUpward && !select.multiple && picked.is_subdivision_of) {
                    await handleFollowUpwardFromCountry(select, apiKey, backendUrl, state, config.followUpward, (s, key, code) => updateSubdivisionSelect(s, key, backendUrl, state, subdivisionConfig, code));
                }
            });
        }
        catch (error) {
            console.error('Failed to fetch countries:', error);
            handleApiError(select, error);
            // Handle subdivision errors
            if (select.dataset.name) {
                const linkedSubdivisionSelects = Array.from(document.querySelectorAll(`.subdivision-selection[data-country="${select.dataset.name}"]`));
                for (const s of linkedSubdivisionSelects) {
                    initializeSelect(s, '&mdash;');
                    handleApiError(s, error);
                }
            }
        }
        finally {
            // Mark initialization as complete
            state.isInitializing.delete(select);
            // If no preselected and no geoip selection happened, emit a regular update
            if (!valueSetByWidget) {
                dispatchUpdateEvent(select, { type: 'country', reason: 'regular' });
            }
        }
    }
}

/**
 * @countriesdb/widget
 *
 * Plain JavaScript widget for CountriesDB.
 * Provides DOM manipulation and auto-initialization for country/subdivision selects.
 */
// Global namespace to prevent double initialization
const NS_KEY = '__CountriesWidgetNS__';
/**
 * Main widget initialization function
 */
async function CountriesWidgetLoad(options = {}) {
    // Initialize namespace
    if (!window[NS_KEY]) {
        window[NS_KEY] = {
            initialized: false,
            initPromise: null,
            version: 0,
        };
    }
    const NS = window[NS_KEY];
    // Share the same promise across concurrent calls
    NS.initPromise = (async () => {
        // Wait for DOM if needed
        if (document.readyState === 'loading') {
            await new Promise((resolve) => {
                document.addEventListener('DOMContentLoaded', () => resolve(), {
                    once: true,
                });
            });
        }
        // Get configuration from options or script URL
        const config = getConfigFromOptionsOrScript(options);
        // Fix mis-classed elements early (DOM cleanup that should always happen)
        fixMisClassedElements();
        // Check for conflicting parameters
        if (config.followRelated && config.followUpward) {
            showParamConflictError();
            return false;
        }
        // Initialize widget state
        const state = {
            countriesMap: new WeakMap(),
            subdivisionsMap: new WeakMap(),
            subdivisionsLanguageMap: new WeakMap(),
            isInitializing: new Set(),
        };
        // Use empty string if publicKey is missing (will show error when API calls fail)
        const apiKey = config.publicKey || '';
        // Setup subdivisions first (they depend on countries)
        await setupSubdivisionSelection(apiKey, config.backendUrl, state, {
            followRelated: config.followRelated || false,
            followUpward: config.followUpward || false,
            showSubdivisionType: config.showSubdivisionType !== false,
            allowParentSelection: config.allowParentSelection || false,
            preferOfficialSubdivisions: config.preferOfficialSubdivisions || false,
            subdivisionRomanizationPreference: config.subdivisionRomanizationPreference,
            preferLocalVariant: config.preferLocalVariant || false,
            subdivisionNameFilter: config.subdivisionNameFilter,
        });
        const subdivisionConfig = {
            followRelated: config.followRelated || false,
            followUpward: config.followUpward || false,
            showSubdivisionType: config.showSubdivisionType !== false,
            allowParentSelection: config.allowParentSelection || false,
            preferOfficialSubdivisions: config.preferOfficialSubdivisions || false,
            subdivisionRomanizationPreference: config.subdivisionRomanizationPreference,
            preferLocalVariant: config.preferLocalVariant || false,
            forcedLanguage: config.forcedLanguage,
            defaultLanguage: config.defaultLanguage,
            subdivisionNameFilter: config.subdivisionNameFilter,
        };
        // Setup countries
        await setupCountrySelection(apiKey, config.backendUrl, state, {
            defaultLanguage: config.defaultLanguage,
            forcedLanguage: config.forcedLanguage,
            isoCountryNames: config.isoCountryNames || false,
            followRelated: config.followRelated || false,
            followUpward: config.followUpward || false,
            countryNameFilter: config.countryNameFilter,
        }, subdivisionConfig);
        // After countries are set up, update subdivisions for any preselected countries
        const countrySelects = Array.from(document.querySelectorAll('.country-selection'));
        for (const select of countrySelects) {
            if (select.value &&
                select.value !== (select.dataset.defaultValue || '')) {
                await updateSubdivisions(select, apiKey, config.backendUrl, state, subdivisionConfig);
            }
        }
        NS.initialized = true;
        return true;
    })();
    return NS.initPromise;
}
/**
 * Get configuration from options or script URL parameters
 */
function getConfigFromOptionsOrScript(options) {
    // Check for global config first (for bundled widgets that need config before auto-init)
    const globalConfig = typeof window !== 'undefined' && window.CountriesDBConfig
        ? window.CountriesDBConfig
        : null;
    // Try to get config from script URL (for backward compatibility with widget.blade.php)
    let scriptUrl = null;
    try {
        let loaderScript = null;
        // First try document.currentScript (works during script execution)
        // But only if it matches the widget pattern (not a bundled file)
        if (document.currentScript && document.currentScript instanceof HTMLScriptElement) {
            const src = document.currentScript.src;
            if (src && (src.includes('@countriesdb/widget') ||
                src.includes('widget/dist/index.js'))) {
                loaderScript = document.currentScript;
            }
        }
        // If currentScript didn't match, search for widget script
        if (!loaderScript) {
            // Only consider script tags that loaded the widget bundle
            const scripts = Array.from(document.getElementsByTagName('script'));
            loaderScript = scripts.find((s) => s.src && (s.src.includes('@countriesdb/widget') ||
                s.src.includes('widget/dist/index.js'))) || null;
        }
        if (loaderScript && loaderScript.src) {
            scriptUrl = new URL(loaderScript.src);
        }
    }
    catch {
        // Ignore errors
    }
    const config = {
        // Priority: options > globalConfig > scriptUrl params > defaults
        publicKey: options.publicKey ?? globalConfig?.publicKey ?? scriptUrl?.searchParams.get('public_key') ?? '',
        backendUrl: options.backendUrl ?? globalConfig?.backendUrl ?? scriptUrl?.searchParams.get('backend_url') ?? getBackendUrlFromScript(),
        defaultLanguage: options.defaultLanguage ?? globalConfig?.defaultLanguage ?? scriptUrl?.searchParams.get('default_language') ?? undefined,
        forcedLanguage: options.forcedLanguage ?? globalConfig?.forcedLanguage ?? scriptUrl?.searchParams.get('forced_language') ?? undefined,
        showSubdivisionType: options.showSubdivisionType !== undefined
            ? options.showSubdivisionType
            : globalConfig?.showSubdivisionType !== undefined
                ? globalConfig.showSubdivisionType
                : parseBoolean(scriptUrl?.searchParams.get('show_subdivision_type') ?? '1'),
        followRelated: options.followRelated !== undefined
            ? options.followRelated
            : globalConfig?.followRelated !== undefined
                ? globalConfig.followRelated
                : parseBoolean(scriptUrl?.searchParams.get('follow_related') ?? 'false'),
        followUpward: options.followUpward !== undefined
            ? options.followUpward
            : globalConfig?.followUpward !== undefined
                ? globalConfig.followUpward
                : parseBoolean(scriptUrl?.searchParams.get('follow_upward') ?? 'false'),
        allowParentSelection: options.allowParentSelection !== undefined
            ? options.allowParentSelection
            : globalConfig?.allowParentSelection !== undefined
                ? globalConfig.allowParentSelection
                : parseBoolean(scriptUrl?.searchParams.get('allow_parent_selection') ?? 'false'),
        isoCountryNames: options.isoCountryNames !== undefined
            ? options.isoCountryNames
            : globalConfig?.isoCountryNames !== undefined
                ? globalConfig.isoCountryNames
                : parseBoolean(scriptUrl?.searchParams.get('iso_country_names') ?? 'false'),
        preferOfficialSubdivisions: options.preferOfficialSubdivisions !== undefined
            ? options.preferOfficialSubdivisions
            : globalConfig?.preferOfficialSubdivisions !== undefined
                ? globalConfig.preferOfficialSubdivisions
                : parseBoolean(scriptUrl?.searchParams.get('prefer_official') ?? 'false'),
        subdivisionRomanizationPreference: options.subdivisionRomanizationPreference ||
            globalConfig?.subdivisionRomanizationPreference ||
            scriptUrl?.searchParams.get('subdivision_romanization_preference') ||
            undefined,
        preferLocalVariant: options.preferLocalVariant !== undefined
            ? options.preferLocalVariant
            : globalConfig?.preferLocalVariant !== undefined
                ? globalConfig.preferLocalVariant
                : parseBoolean(scriptUrl?.searchParams.get('prefer_local_variant') ?? 'false'),
        countryNameFilter: options.countryNameFilter ?? globalConfig?.countryNameFilter,
        subdivisionNameFilter: options.subdivisionNameFilter ?? globalConfig?.subdivisionNameFilter,
        autoInit: options.autoInit !== undefined
            ? options.autoInit
            : globalConfig?.autoInit !== undefined
                ? globalConfig.autoInit
                : parseBoolean(scriptUrl?.searchParams.get('auto_init') ?? 'true'),
    };
    // Resolve filter functions from global scope if specified by name
    if (scriptUrl) {
        const countryNameFilterName = scriptUrl.searchParams.get('countryNameFilter');
        if (countryNameFilterName && typeof window !== 'undefined') {
            const filter = window[countryNameFilterName];
            if (typeof filter === 'function') {
                config.countryNameFilter = filter;
            }
        }
        const subdivisionNameFilterName = scriptUrl.searchParams.get('subdivisionNameFilter');
        if (subdivisionNameFilterName && typeof window !== 'undefined') {
            const filter = window[subdivisionNameFilterName];
            if (typeof filter === 'function') {
                config.subdivisionNameFilter = filter;
            }
        }
    }
    return config;
}
/**
 * Get backend URL from script tag or use default
 */
function getBackendUrlFromScript() {
    try {
        let loaderScript = null;
        // First try document.currentScript (works during script execution)
        // But only if it matches the widget pattern (not a bundled file)
        if (document.currentScript && document.currentScript instanceof HTMLScriptElement) {
            const src = document.currentScript.src;
            if (src && (src.includes('@countriesdb/widget') ||
                src.includes('widget/dist/index.js'))) {
                loaderScript = document.currentScript;
            }
        }
        // If currentScript didn't match, search for widget script
        if (!loaderScript) {
            // Only consider script tags that loaded the widget bundle
            const scripts = Array.from(document.getElementsByTagName('script'));
            loaderScript = scripts.find((s) => s.src && (s.src.includes('@countriesdb/widget') ||
                s.src.includes('widget/dist/index.js'))) || null;
        }
        if (loaderScript && loaderScript.src) {
            const scriptUrl = new URL(loaderScript.src);
            const hostname = scriptUrl.hostname;
            // List of known CDN hostnames - if script is from a CDN, use default API
            const cdnHostnames = [
                'unpkg.com',
                'cdn.jsdelivr.net',
                'cdnjs.cloudflare.com',
                'jsdelivr.com',
                'cdn.jsdelivr.com',
            ];
            // If script is from a CDN, don't use its origin as backend URL
            if (cdnHostnames.some(cdn => hostname.includes(cdn))) {
                return 'https://api.countriesdb.com';
            }
            // Only use script origin if it's from the same domain (self-hosted widget)
            // This allows self-hosting the widget on the same domain as the API
            const scheme = scriptUrl.protocol;
            const host = scriptUrl.hostname;
            const port = scriptUrl.port ? `:${scriptUrl.port}` : '';
            return `${scheme}//${host}${port}`;
        }
    }
    catch {
        // Ignore errors
    }
    // Default to API domain (never use embedding site's domain)
    return 'https://api.countriesdb.com';
}
/**
 * Fix mis-classed elements (e.g., country-selection with subdivision-selection class)
 * This should happen early, before API calls, as it's just DOM cleanup
 */
function fixMisClassedElements() {
    const countrySelects = Array.from(document.querySelectorAll('.country-selection'));
    for (const select of countrySelects) {
        // Avoid conflict if mis-classed
        if (select.classList.contains('subdivision-selection')) {
            select.classList.remove('subdivision-selection');
            select.classList.add('subdivision-selection-removed');
        }
    }
}
/**
 * Parse boolean from string value
 */
function parseBoolean(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const lowered = String(value).trim().toLowerCase();
    return !(lowered === '0' || lowered === 'false');
}
/**
 * Show error when both follow_related and follow_upward are enabled
 */
function showParamConflictError() {
    const errorMessage = 'Cannot enable both follow_related and follow_upward';
    const countrySelects = Array.from(document.querySelectorAll('.country-selection'));
    for (const select of countrySelects) {
        handleApiError(select, errorMessage, true);
    }
    const subdivisionSelects = Array.from(document.querySelectorAll('.subdivision-selection'));
    for (const select of subdivisionSelects) {
        handleApiError(select, errorMessage, true);
    }
}
// Expose public loader
if (typeof window !== 'undefined') {
    window.CountriesWidgetLoad = CountriesWidgetLoad;
    // Auto-init if script URL has auto_init=true (or not set, default is true)
    // Use a function that waits for DOM to be ready and finds the script tag reliably
    (function checkAutoInit() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkAutoInit, { once: true });
            return;
        }
        // Find the script tag that loaded this widget
        let loaderScript = null;
        // First try document.currentScript (works during script execution)
        // But only if it matches the widget pattern (not a bundled file)
        if (document.currentScript && document.currentScript instanceof HTMLScriptElement) {
            const src = document.currentScript.src;
            if (src && (src.includes('@countriesdb/widget') ||
                src.includes('widget/dist/index.js'))) {
                loaderScript = document.currentScript;
            }
        }
        // If currentScript didn't match, search for widget script
        if (!loaderScript) {
            // Fallback: find script tag with @countriesdb/widget in src
            const scripts = Array.from(document.getElementsByTagName('script'));
            loaderScript = scripts.find((s) => s.src && (s.src.includes('@countriesdb/widget') ||
                s.src.includes('widget/dist/index.js'))) || null;
        }
        // Default to auto-init = true (only disable if explicitly set to false)
        let shouldAutoInit = true;
        const globalConfig = typeof window !== 'undefined'
            ? window.CountriesDBConfig || null
            : null;
        if (globalConfig && typeof globalConfig.autoInit !== 'undefined') {
            shouldAutoInit = !!globalConfig.autoInit;
        }
        else if (loaderScript && loaderScript.src) {
            try {
                const scriptUrl = new URL(loaderScript.src);
                const autoInit = scriptUrl.searchParams.get('auto_init');
                // Only disable if explicitly set to false/0
                shouldAutoInit = autoInit === null || autoInit === 'true' || autoInit === '1';
            }
            catch {
                // If URL parsing fails, default to true (auto-init enabled)
                shouldAutoInit = true;
            }
        }
        // Auto-init by default (unless explicitly disabled)
        if (shouldAutoInit) {
            // Use setTimeout to ensure script tag is fully processed
            setTimeout(() => {
                CountriesWidgetLoad().catch(console.error);
            }, 0);
        }
    })();
}

export { CountriesWidgetLoad as default };
//# sourceMappingURL=index.esm-ki5m0oJm.js.map
