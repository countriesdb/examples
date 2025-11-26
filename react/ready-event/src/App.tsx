import { useEffect, useState } from 'react'

const COUNTRY_SELECT_NAME = 'country_ready'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

interface ReadyEventDetail {
  value: string
  selectedValues: string[]
  name: string | null
  country: string | null
  isSubdivision: boolean
  type?: 'country' | 'subdivision'
  phase: 'initial' | 'reload'
}

function App() {
  const [status, setStatus] = useState('Waiting for widget…')

  useEffect(() => {
    window.CountriesDBConfig = {
      publicKey: PUBLIC_KEY,
    }

    import('@countriesdb/widget').catch((err) => {
      console.error('Failed to load CountriesDB widget:', err)
    })

    const READY_EVENT = 'countriesWidget:ready'
    // Ready fires separately for each select: country fires once, subdivision fires on initial load + every reload

    let events: string[] = []

    const formatReady = (detail: ReadyEventDetail) => {
      const label = detail.type === 'country' ? 'Country select' : 'Subdivision select'
      return `${label} ready (${detail.phase}) — current value: ${detail.value || '(none)'}`
    }

    const handleReady = (event: Event) => {
      const customEvent = event as CustomEvent<ReadyEventDetail>
      const detail = customEvent.detail

      // Filter to only our selects
      if (detail.name !== COUNTRY_SELECT_NAME && detail.country !== COUNTRY_SELECT_NAME) {
        return
      }

      // Add event to list (keep last 5 events)
      events.push(formatReady(detail))
      if (events.length > 5) {
        events.shift()
      }

      // Show all events, each on a new line
      setStatus(events.length > 0 ? events.join('\n') : 'Waiting for widget…')
    }

    document.addEventListener(READY_EVENT, handleReady, true)

    return () => {
      document.removeEventListener(READY_EVENT, handleReady, true)
    }
  }, [])

  return (
    <div>
      <h1>CountriesDB React Example - Ready Event</h1>
      <p><code>countriesWidget:ready</code> fires separately for each select. The country select dispatches its own ready event as soon as its options are available, and each subdivision select dispatches another ready event every time it finishes loading data (initial load + every reload triggered by a country change).</p>

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
        <label htmlFor="subdivision-select">State / Province</label>
        <select
          id="subdivision-select"
          className="subdivision-selection"
          data-country={COUNTRY_SELECT_NAME}
          name="subdivision"
        />
      </div>

      <div id="ready-status" style={{ marginTop: '1rem', padding: '0.75rem', background: '#f7f7f9', borderRadius: '6px', whiteSpace: 'pre-line' }}>
        {status}
      </div>
    </div>
  )
}

export default App
