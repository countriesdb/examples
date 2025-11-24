import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_preset'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubdivision, setSelectedSubdivision] = useState('')

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
      <h1>CountriesDB React Example - Preselection</h1>
      <p>This example demonstrates preselecting countries and subdivisions.</p>

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
          data-preselected="US"
          name="country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subdivision-select">State / Province</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          data-preselected="US-CA"
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
