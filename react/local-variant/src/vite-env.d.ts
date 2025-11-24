/// <reference types="vite/client" />


declare module '@countriesdb/widget' {
  // Side-effect module - no exports, just initializes the widget
}
interface Country {
  iso_alpha_2: string
  iso_alpha_3?: string
  iso_numeric?: string
  name: string
  preselected?: boolean
  is_subdivision_of?: {
    parent_country_code: string
    subdivision_code: string
  } | null
  related_country_code?: string | null
  related_subdivision_code?: string | null
  [key: string]: unknown
}

interface Subdivision {
  id: number
  code: string
  name: string
  full_name?: string
  parent_id?: number | null
  preselected?: boolean
  is_subdivision_of?: {
    parent_country_code: string
    subdivision_code: string
  } | null
  related_country_code?: string | null
  related_subdivision_code?: string | null
  children?: Subdivision[]
  [key: string]: unknown
}

type CountryNameFilter = (
  code: string,
  originalName: string,
  language: string,
  item: Country
) => string | false | null | undefined

type SubdivisionNameFilter = (
  code: string,
  originalName: string,
  language: string,
  countryCode: string | null,
  item: Subdivision
) => string | false | null | undefined

interface UpdateEventDetail {
  value: string
  selectedValues: string[]
  name: string | null
  country: string | null
  isSubdivision: boolean
  type?: 'country' | 'subdivision'
  reason?: 'regular' | 'geoip' | 'preselected' | 'reload' | 'follow'
}

interface Window {
  CountriesDBConfig?: {
    publicKey?: string
    backendUrl?: string
    defaultLanguage?: string
    forcedLanguage?: string
    showSubdivisionType?: boolean
    followRelated?: boolean
    followUpward?: boolean
    allowParentSelection?: boolean
    isoCountryNames?: boolean
    preferOfficialSubdivisions?: boolean
    subdivisionRomanizationPreference?: string
    preferLocalVariant?: boolean
    countryNameFilter?: CountryNameFilter
    subdivisionNameFilter?: SubdivisionNameFilter
    autoInit?: boolean
  }
  CountriesWidgetLoad?: (options?: {
    publicKey?: string
    backendUrl?: string
    defaultLanguage?: string
    forcedLanguage?: string
    showSubdivisionType?: boolean
    followRelated?: boolean
    followUpward?: boolean
    allowParentSelection?: boolean
    isoCountryNames?: boolean
    preferOfficialSubdivisions?: boolean
    subdivisionRomanizationPreference?: string
    preferLocalVariant?: boolean
    countryNameFilter?: CountryNameFilter
    subdivisionNameFilter?: SubdivisionNameFilter
    autoInit?: boolean
    reload?: boolean
  }) => Promise<boolean>
}


