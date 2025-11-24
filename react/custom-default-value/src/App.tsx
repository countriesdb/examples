import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_default'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('not_selected')
  const [selectedSubdivision, setSelectedSubdivision] = useState('not_selected')

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
      <h1>CountriesDB React Example - Custom Default Value</h1>
      <p>This example demonstrates custom default values for select elements.</p>

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
          data-default-value="not_selected"
          data-preselected="not_selected"
          name="country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subdivision-select">State / Province</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          data-default-value="not_selected"
          data-preselected="not_selected"
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
