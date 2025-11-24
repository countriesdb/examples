import { useEffect, useState, useRef } from 'react'

const COUNTRY_SELECT_NAME = 'country_change'
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

    const renderOutput = (prefix: string, select: HTMLSelectElement | null) => {
      if (!select || !select.value) return prefix + '(none)'
      const option = select.options[select.selectedIndex] || {}
      const text = option.text || ''
      return prefix + select.value + ' — ' + text
    }

    const updateOutput = () => {
      const countryText = renderOutput('Country: ', countryRef.current)
      const subdivText = renderOutput(' | Subdivision: ', subdivisionRef.current)
      setOutput(countryText + subdivText)
    }

    const handleUpdate = (event: Event) => {
      const target = event.target as HTMLSelectElement
      
      if (target === countryRef.current) {
        const countryText = renderOutput('Country: ', countryRef.current)
        const subdivText = renderOutput(' | Subdivision: ', subdivisionRef.current)
        setOutput(countryText + subdivText)
      } else if (target === subdivisionRef.current) {
        updateOutput()
      }
    }

    document.addEventListener('countriesWidget:update', handleUpdate, true)
    return () => document.removeEventListener('countriesWidget:update', handleUpdate, true)
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Update Select</h1>
      <p>This example demonstrates listening to countriesWidget:update events.</p>

      <div className="form-group">
        <label htmlFor="country-select">Country</label>
        <select
          ref={countryRef}
          id="country-select"
          className="country-selection"
          data-name={COUNTRY_SELECT_NAME}
          name="country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="subdivision-select">State / Province</label>
        <select
          ref={subdivisionRef}
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          name="subdivision"
        />
      </div>

      <div id="selection-output" style={{ marginTop: '1rem', padding: '0.75rem', background: '#f7f7f9', borderRadius: '6px' }}>
        {output}
      </div>
    </div>
  )
}

export default App
