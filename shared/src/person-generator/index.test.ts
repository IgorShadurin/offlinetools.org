import { generatePersons, PersonFormat, PersonField } from './index';

function parseJson(str: string): Array<Record<string, string>> {
  return JSON.parse(str) as Array<Record<string, string>>;
}

describe('Person Generator', () => {
  it('generates one person in JSON by default', () => {
    const result = generatePersons();
    const data = parseJson(result);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0].firstName).toBeDefined();
    expect(data[0].lastName).toBeDefined();
  });

  it('respects count option', () => {
    const result = generatePersons({ count: 2 });
    const data = parseJson(result);
    expect(data.length).toBe(2);
  });

  it('supports txt format and field selection', () => {
    const result = generatePersons({
      count: 1,
      format: PersonFormat.TXT,
      fields: [PersonField.FirstName, PersonField.LastName]
    });
    expect(result.split('\n').length).toBe(1);
    expect(result.trim().split(' ').length).toBe(2);
  });

  it('supports custom template', () => {
    const result = generatePersons({
      format: PersonFormat.CUSTOM,
      customTemplate: '{{ firstName }} - {{ email }}',
      fields: [PersonField.FirstName, PersonField.Email]
    });
    expect(result).toMatch(/ - /);
  });

  it('throws for invalid count', () => {
    expect(() => generatePersons({ count: 0 })).toThrow('Count must be greater than 0');
  });
});
