## Backend Example – Python (`requests`)

Uses Python 3.10+ with `requests` to call the CountriesDB validation endpoints.

### Setup

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Usage

1. Edit any of the example files (e.g., `01-basic-country.py`)
2. Set your API key: `API_KEY = 'your_private_api_key_here'`
3. Run the example: `python 01-basic-country.py`

### Files

- `01-basic-country.py` – Basic country validation
- `02-country-follow-upward.py` – Country validation with `follow_upward`
- `03-multiple-countries.py` – Multiple country validation
- `04-basic-subdivision.py` – Basic subdivision validation
- `05-subdivision-follow-related.py` – Subdivision validation with `follow_related`
- `06-subdivision-allow-parent.py` – Subdivision validation with `allow_parent_selection`
- `07-multiple-subdivisions.py` – Multiple subdivision validation
- `08-empty-subdivision.py` – Empty subdivision validation (for countries without subdivisions)
- `requirements.txt` – dependencies

### Notes

- All examples use direct API key configuration (no environment variables).
- Each example includes error handling and result checking.
- HTTP errors (non-2xx) are caught and displayed with status codes and response bodies.

