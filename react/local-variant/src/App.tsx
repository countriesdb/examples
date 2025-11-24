import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_local'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubdivision, setSelectedSubdivision] = useState('')

  useEffect(() => {
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
      preferLocalVariant: true,
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
      <h1>CountriesDB React Example - Prefer Local Variant</h1>
      <p>This example displays local variant names for official subdivisions when available.</p>

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
        <label htmlFor="subdivision-select">Subdivision</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          data-prefer-official
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
