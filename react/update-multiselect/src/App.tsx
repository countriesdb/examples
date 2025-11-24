import { useEffect, useState, useRef } from 'react'

const COUNTRY_SELECT_NAME = 'country_multi_change'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

function App() {
  const [output, setOutput] = useState('Waiting for selections…')
  const countryRef = useRef<HTMLSelectElement>(null)
  const subdivisionRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
    }

    import('@countriesdb/widget').catch((err) => {
      console.error('Failed to load CountriesDB widget:', err)
    })

    const getSelectedValues = (select: HTMLSelectElement | null): string[] => {
      if (!select) return []
      return Array.from(select.selectedOptions)
        .map((option) => option.value)
        .filter((value) => value)
    }

    const updateOutput = () => {
      const countryValues = getSelectedValues(countryRef.current)
      const subdivisionValues = getSelectedValues(subdivisionRef.current)
      const countryText = 'Countries: ' + (countryValues.length > 0 ? countryValues.join(', ') : '(none)')
      const subdivisionText = ' | Subdivisions: ' + (subdivisionValues.length > 0 ? subdivisionValues.join(', ') : '(none)')
      setOutput(countryText + subdivisionText)
    }

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<UpdateEventDetail>
      const target = event.target as HTMLSelectElement
      const selectedValues = customEvent.detail?.selectedValues || []
      
      if (target === countryRef.current) {
        const countryText = 'Countries: ' + (selectedValues.length > 0 ? selectedValues.join(', ') : '(none)')
        const subdivisionValues = getSelectedValues(subdivisionRef.current)
        const subdivisionText = ' | Subdivisions: ' + (subdivisionValues.length > 0 ? subdivisionValues.join(', ') : '(none)')
        setOutput(countryText + subdivisionText)
      } else if (target === subdivisionRef.current) {
        updateOutput()
      }
    }

    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement
      if (target === countryRef.current || target === subdivisionRef.current) {
        updateOutput()
      }
    }

    const countryEl = countryRef.current
    const subdivisionEl = subdivisionRef.current

    if (countryEl) {
      countryEl.addEventListener('countriesWidget:update', handleUpdate, true)
      countryEl.addEventListener('change', handleChange)
    }
    if (subdivisionEl) {
      subdivisionEl.addEventListener('countriesWidget:update', handleUpdate, true)
      subdivisionEl.addEventListener('change', handleChange)
    }

    return () => {
      if (countryEl) {
        countryEl.removeEventListener('countriesWidget:update', handleUpdate, true)
        countryEl.removeEventListener('change', handleChange)
      }
      if (subdivisionEl) {
        subdivisionEl.removeEventListener('countriesWidget:update', handleUpdate, true)
        subdivisionEl.removeEventListener('change', handleChange)
      }
    }
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Update Multi-select</h1>
      <p>This example demonstrates listening to countriesWidget:update events with multi-select.</p>

      <div className="form-group">
        <label htmlFor="country-select">Countries (select multiple)</label>
        <select
          ref={countryRef}
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
          ref={subdivisionRef}
          id="subdivision-select"
          className="subdivision-selection"
          multiple
          data-country-code="US"
          name="subdivision"
        />
      </div>

      <div id="multi-selection-output" style={{ marginTop: '1rem', padding: '0.75rem', background: '#f7f7f9', borderRadius: '6px' }}>
        {output}
      </div>
    </div>
  )
}

export default App
