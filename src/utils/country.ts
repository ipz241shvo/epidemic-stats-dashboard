import type { CountryStat } from '../types/country'

export function getCountryCode(country: Pick<CountryStat, 'country' | 'countryInfo'>): string {
  return country.countryInfo.iso2 ?? country.country
}