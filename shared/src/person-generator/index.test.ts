import {
  generatePersons,
  DEFAULT_PERSON_GENERATOR_OPTIONS,
  PersonOutputFormat,
  formatPersons,
  PersonField
} from './index'

describe('Person Generator', () => {
  it('should generate the default number of persons', () => {
    const result = generatePersons()
    expect(result.length).toBe(DEFAULT_PERSON_GENERATOR_OPTIONS.count)
    const person = result[0]
    expect(person.firstName).toBeDefined()
    expect(person.lastName).toBeDefined()
  })

  it('should generate a custom number of persons', () => {
    const result = generatePersons({ count: 3 })
    expect(result.length).toBe(3)
  })

  it('should include only selected fields', () => {
    const result = generatePersons({ fields: [PersonField.Email, PersonField.Country] })
    const person = result[0]
    expect(Object.keys(person)).toEqual(['email', 'country'])
  })

  it('should format output as JSON', () => {
    const persons = generatePersons({ count: 2 })
    const output = formatPersons(persons, PersonOutputFormat.JSON)
    const parsed = JSON.parse(output)
    expect(parsed.length).toBe(2)
  })

  it('should format output as text', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.FullName] })
    const output = formatPersons(persons, PersonOutputFormat.TXT)
    expect(typeof output).toBe('string')
    expect(output.length).toBeGreaterThan(0)
  })
})
