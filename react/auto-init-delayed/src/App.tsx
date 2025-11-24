import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_delayed'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [country, setCountry] = useState('')
  const [subdivision, setSubdivision] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
      autoInit: false,
    }

    import('@countriesdb/widget').catch((err) => {
      console.error('Failed to load CountriesDB widget:', err)
    })

    // Set up event listener immediately to catch geolocated values
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<UpdateEventDetail>
      const detail = customEvent.detail
      if (detail.type === 'country') {
        setCountry(detail.value || '')
      }
      if (detail.isSubdivision) {
        setSubdivision(detail.value || '')
      }
    }

    document.addEventListener('countriesWidget:update', handleUpdate)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate)
  }, [])

  const handleLoad = async () => {
    if (typeof window.CountriesWidgetLoad === 'function') {
      await window.CountriesWidgetLoad()
      setLoaded(true)
    }
  }

  return (
    <div>
      <h1>CountriesDB React Example - Delayed Auto Init</h1>
      <p>This example disables automatic initialization and loads the widget manually.</p>

      <div className="debug">
        <p>Selected country: {country || '—'}</p>
        <p>Selected subdivision: {subdivision || '—'}</p>
      </div>

      <div className="form-group">
        <label htmlFor="country-select">Country</label>
        <select
          id="country-select"
          className="country-selection"
          data-name={COUNTRY_SELECT_NAME}
          name="country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subdivision-select">Subdivision</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          name="subdivision"
        />
      </div>

      <div className="form-group">
        <button onClick={handleLoad} disabled={loaded} style={{ padding: '0.75rem 1.5rem', backgroundColor: loaded ? '#48bb78' : '#3182ce', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: loaded ? 'not-allowed' : 'pointer' }}>
          {loaded ? 'LOADED' : 'LOAD SCRIPT'}
        </button>
      </div>
    </div>
  )
}

export default App
