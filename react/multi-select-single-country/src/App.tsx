import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_single'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [country, setCountry] = useState('')
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
        setCountry(detail.value || '')
        setSelectedSubdivisions([])
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
      <h1>CountriesDB React Example - Single Country with Multi-select Subdivisions</h1>
      <p>This example demonstrates single country selection with multi-select subdivisions.</p>

      <div className="debug">
        <p>Selected country: {country || '—'}</p>
        <p>Selected subdivisions: {selectedSubdivisions.length > 0 ? selectedSubdivisions.join(', ') : '—'}</p>
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
        <label htmlFor="subdivision-select">Subdivisions (select multiple)</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          multiple
          data-country={COUNTRY_SELECT_NAME}
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
