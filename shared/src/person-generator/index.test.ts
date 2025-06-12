import { faker } from '@faker-js/faker';
import {
  generatePeople,
  formatPeople,
  PersonField,
  PersonOutputFormat,
  DEFAULT_PERSON_TEMPLATE,
} from './index';

describe('Person Generator', () => {
  beforeAll(() => {
    faker.seed(123);
  });

  it('should generate the requested number of people', () => {
    const people = generatePeople(3, { fields: [PersonField.firstName] });
    expect(people).toHaveLength(3);
    expect(people[0]).toHaveProperty('firstName');
  });

  it('should return empty array for count <= 0', () => {
    expect(generatePeople(0)).toEqual([]);
  });

  it('should format people as JSON', () => {
    const people = generatePeople(1, { fields: [PersonField.firstName] });
    const json = formatPeople(people, PersonOutputFormat.JSON);
    expect(json).toContain('firstName');
  });

  it('should format people using custom template', () => {
    const people = generatePeople(1);
    const text = formatPeople(people, PersonOutputFormat.CUSTOM, '{{email}}');
    expect(text).toMatch(/@/);
  });

  it('should use default template when none provided', () => {
    const people = generatePeople(1);
    const text = formatPeople(people, PersonOutputFormat.CUSTOM);
    expect(text).toContain(' - ');
  });
});
