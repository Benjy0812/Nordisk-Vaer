import { describe, expect, it } from 'bun:test'
import { capitalizeFirstLetter } from './ui.js'

describe('capitalizeFirstLetter', () => {
  it('uppercases the first letter and lowercases the rest', () => {
    expect(capitalizeFirstLetter('new york')).toBe('New York')
  })
})
