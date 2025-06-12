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

  it('should format output as XML', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.FirstName] })
    const output = formatPersons(persons, PersonOutputFormat.XML)
    expect(output.startsWith('<persons>')).toBe(true)
    expect(output.includes('<person>')).toBe(true)
  })

  it('should format output as YAML', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.Email] })
    const output = formatPersons(persons, PersonOutputFormat.YAML)
    expect(output).toContain('email:')
  })

  it('should format output as HTML', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.FullName] })
    const output = formatPersons(persons, PersonOutputFormat.HTML)
    expect(output.startsWith('<table>')).toBe(true)
    expect(output).toContain('<td>')
  })

  it('should format output as text', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.FullName] })
    const output = formatPersons(persons, PersonOutputFormat.TXT)
    expect(typeof output).toBe('string')
    expect(output.length).toBeGreaterThan(0)
  })

  it('should format output using a custom template', () => {
    const persons = generatePersons({ count: 1, fields: [PersonField.FirstName] })
    const output = formatPersons(persons, PersonOutputFormat.CUSTOM, 'Name: {{firstName}}')
    expect(output.startsWith('Name: ')).toBe(true)
  })
})
