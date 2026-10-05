import { describe, expect, it } from 'vitest'
import { capitalizeFirstLetter } from './ui.js'

describe('capitalizeFirstLetter', () => {
  it('uppercases the first letter and lowercases the rest', () => {
    expect(capitalizeFirstLetter('new york')).toBe('New York')
  })
})
