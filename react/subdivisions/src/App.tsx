import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country1'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubdivision, setSelectedSubdivision] = useState('')

  useEffect(() => {
    // 1. Set widget config (autoInit runs by default)
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
    }

    // 2. Load widget bundle so it can populate the <select> elements
    import('@countriesdb/widget').catch((err) => {
      console.error('Failed to load CountriesDB widget:', err)
    })

    // 3. Listen for widget updates
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<UpdateEventDetail>
      const detail = customEvent.detail

      // Log raw event data
      console.log('Widget update:', detail)

      if (detail.type === 'country') {
        setSelectedCountry(detail.value || '')
      }

      if (detail.isSubdivision) {
        setSelectedSubdivision(detail.value || '')
      }
    }

    document.addEventListener('countriesWidget:update', handleUpdate)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate)
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Subdivisions</h1>
      <p>This example demonstrates country and subdivision selection with linked selects.</p>

      <div className="debug">
        <p>Selected country: {selectedCountry || '—'}</p>
        <p>Selected subdivision: {selectedSubdivision || '—'}</p>
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
        <label htmlFor="subdivision-select">State / Province</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
