import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_multi'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedSubdivisions, setSelectedSubdivisions] = useState<string[]>([])

  useEffect(() => {
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
    }

    import('@countriesdb/widget').catch((err) => {
      console.error('Failed to load CountriesDB widget:', err)
    })

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<UpdateEventDetail>
      const detail = customEvent.detail
      
      if (detail.type === 'country') {
        setSelectedCountries(detail.selectedValues || [])
      }
      if (detail.isSubdivision) {
        setSelectedSubdivisions(detail.selectedValues || [])
      }
    }

    document.addEventListener('countriesWidget:update', handleUpdate)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate)
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Basic Multi-select</h1>
      <p>This example demonstrates multi-select for countries and subdivisions.</p>

      <div className="debug">
        <p>Selected countries: {selectedCountries.length > 0 ? selectedCountries.join(', ') : '—'}</p>
        <p>Selected subdivisions: {selectedSubdivisions.length > 0 ? selectedSubdivisions.join(', ') : '—'}</p>
      </div>

      <div className="form-group">
        <label htmlFor="country-select">Countries (select multiple)</label>
        <select
          id="country-select"
          className="country-selection"
          multiple
          data-name={COUNTRY_SELECT_NAME}
          name="country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subdivision-select">US States (select multiple)</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          multiple
          data-country-code="US"
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
