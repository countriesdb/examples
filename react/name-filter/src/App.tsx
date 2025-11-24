import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_custom'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubdivision, setSelectedSubdivision] = useState('')

  useEffect(() => {
    // Country name filter function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const countryNameFilter: CountryNameFilter = (code, originalName, _language, _item) => {
      // Filter out certain countries
      if (code === 'CA' || code === 'GB') {
        return false // Remove these countries from the list
      }
      
      // Custom name map
      const customNames: Record<string, string> = {
        'US': 'United States of America',
        'EG': 'Egypt'
      }
      
      // Return custom name if exists, otherwise use original
      return customNames[code] || originalName
    }
    
    // Subdivision name filter function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const subdivisionNameFilter: SubdivisionNameFilter = (code, originalName, language, _countryCode, _item) => {
      // Filter out certain subdivisions
      if (code === 'EG-GZ' || code === 'US-CA' || code === 'US-NY') {
        return false // Remove these subdivisions from the list
      }
      
      // Custom name map
      const customNames: Record<string, string> = {
        'EG-C': 'Cairo City',
        'EG-ALX': 'Alexandria City'
      }
      
      // Language-specific customization
      if (language === 'ar') {
        return originalName // Use original for Arabic
      }
      
      return customNames[code] || originalName
    }

    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
      countryNameFilter,
      subdivisionNameFilter,
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
      <h1>CountriesDB React Example - Name Filter</h1>
      <p>This example demonstrates custom name filtering using JavaScript callback functions.</p>

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
          name="subdivision"
        />
      </div>
    </div>
  )
}

export default App
