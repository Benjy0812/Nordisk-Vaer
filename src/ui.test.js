import { describe, expect, it } from 'bun:test'
import {
  capitalizeFirstLetter,
  celsiusToFahrenheit,
  formatTemperature,
} from './ui.js'

describe('capitalizeFirstLetter', () => {
  it('uppercases the first letter and lowercases the rest', () => {
    expect(capitalizeFirstLetter('new york')).toBe('New York')
  })
})

describe('celsiusToFahrenheit', () => {
  it('converts Celsius to Fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
    expect(celsiusToFahrenheit(30)).toBe(86)
  })
})

describe('formatTemperature', () => {
  it('formats decimals length', () => {
    expect(formatTemperature(1.2345, 2)).toBe('1.23')
  })
})
