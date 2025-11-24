import { useEffect, useState } from 'react'

const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')

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
    }

    document.addEventListener('countriesWidget:update', handleUpdate)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate)
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example</h1>
      <p>This example keeps React state in sync and logs all updates to the console.</p>

      <div className="debug">
        <p>Selected country: {selectedCountry || '—'}</p>
      </div>

      <div className="form-group">
        <label htmlFor="country-select">Country</label>
        <select
          id="country-select"
          className="country-selection"
          name="country"
        />
      </div>
    </div>
  )
}

export default App
