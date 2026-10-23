export interface Country {
  /** ISO 3166-1 alpha-2 code, e.g. `DE`. Also used to derive the flag. */
  code: string
  /** International dialling prefix, e.g. `+49`. */
  dialCode?: string
  /** Pre-computed flag glyph. Derived from `code` when omitted. */
  flag?: string
  /** Heading used for this country when `groupBy` is on. */
  group?: string
  /** Name shown in the list and on the trigger. */
  name: string
}

/**
 * The built-in list used when `<CountryPicker>` is rendered without a
 * `countries` prop. Kept in a module so the prop default can reference it —
 * `withDefaults` may only use values declared outside the setup scope.
 */
export const DEFAULT_COUNTRIES: Country[] = [
  { code: 'US', dialCode: '+1', group: 'Americas', name: 'United States' },
  { code: 'CA', dialCode: '+1', group: 'Americas', name: 'Canada' },
  { code: 'MX', dialCode: '+52', group: 'Americas', name: 'Mexico' },
  { code: 'BR', dialCode: '+55', group: 'Americas', name: 'Brazil' },
  { code: 'AR', dialCode: '+54', group: 'Americas', name: 'Argentina' },
  { code: 'GB', dialCode: '+44', group: 'Europe', name: 'United Kingdom' },
  { code: 'DE', dialCode: '+49', group: 'Europe', name: 'Germany' },
  { code: 'FR', dialCode: '+33', group: 'Europe', name: 'France' },
  { code: 'ES', dialCode: '+34', group: 'Europe', name: 'Spain' },
  { code: 'IT', dialCode: '+39', group: 'Europe', name: 'Italy' },
  { code: 'NL', dialCode: '+31', group: 'Europe', name: 'Netherlands' },
  { code: 'SE', dialCode: '+46', group: 'Europe', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', group: 'Europe', name: 'Norway' },
  { code: 'DK', dialCode: '+45', group: 'Europe', name: 'Denmark' },
  { code: 'IE', dialCode: '+353', group: 'Europe', name: 'Ireland' },
  { code: 'PL', dialCode: '+48', group: 'Europe', name: 'Poland' },
  { code: 'PT', dialCode: '+351', group: 'Europe', name: 'Portugal' },
  { code: 'CH', dialCode: '+41', group: 'Europe', name: 'Switzerland' },
  { code: 'AT', dialCode: '+43', group: 'Europe', name: 'Austria' },
  { code: 'BE', dialCode: '+32', group: 'Europe', name: 'Belgium' },
  { code: 'JP', dialCode: '+81', group: 'Asia-Pacific', name: 'Japan' },
  { code: 'CN', dialCode: '+86', group: 'Asia-Pacific', name: 'China' },
  { code: 'IN', dialCode: '+91', group: 'Asia-Pacific', name: 'India' },
  { code: 'SG', dialCode: '+65', group: 'Asia-Pacific', name: 'Singapore' },
  { code: 'AU', dialCode: '+61', group: 'Asia-Pacific', name: 'Australia' },
  { code: 'NZ', dialCode: '+64', group: 'Asia-Pacific', name: 'New Zealand' },
  { code: 'KR', dialCode: '+82', group: 'Asia-Pacific', name: 'South Korea' },
  { code: 'AE', dialCode: '+971', group: 'Middle East', name: 'United Arab Emirates' },
  { code: 'SA', dialCode: '+966', group: 'Middle East', name: 'Saudi Arabia' },
  { code: 'ZA', dialCode: '+27', group: 'Africa', name: 'South Africa' },
  { code: 'NG', dialCode: '+234', group: 'Africa', name: 'Nigeria' },
  { code: 'EG', dialCode: '+20', group: 'Africa', name: 'Egypt' },
  { code: 'KE', dialCode: '+254', group: 'Africa', name: 'Kenya' },
]
