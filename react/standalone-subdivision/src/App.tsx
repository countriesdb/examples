import { useEffect, useState } from 'react'

const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [usState, setUsState] = useState('')
  const [caProvince, setCaProvince] = useState('')

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
      const target = event.target as HTMLSelectElement
      
      if (detail.isSubdivision) {
        if (target.getAttribute('data-country-code') === 'US') {
          setUsState(detail.value || '')
        } else if (target.getAttribute('data-country-code') === 'CA') {
          setCaProvince(detail.value || '')
        }
      }
    }

    document.addEventListener('countriesWidget:update', handleUpdate)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate)
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Standalone Subdivision</h1>
      <p>This example demonstrates standalone subdivision selects without country selection.</p>

      <div className="debug">
        <p>Selected US State: {usState || '—'}</p>
        <p>Selected Canadian Province: {caProvince || '—'}</p>
      </div>

      <div className="form-group">
        <label htmlFor="us-state">US State</label>
        <select
          id="us-state"
          className="subdivision-selection"
          data-country-code="US"
          data-label="Select US state"
          name="us_state"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ca-province">Canadian Province</label>
        <select
          id="ca-province"
          className="subdivision-selection"
          data-country-code="CA"
          data-label="Select Canadian province"
          name="ca_province"
        />
      </div>
    </div>
  )
}

export default App
