import { faker } from '@faker-js/faker';
import yaml from 'js-yaml';

/** Available person fields */
export enum PersonField {
  firstName = 'firstName',
  lastName = 'lastName',
  fullName = 'fullName',
  gender = 'gender',
  email = 'email',
  phone = 'phone',
  address = 'address',
  city = 'city',
  country = 'country',
  jobTitle = 'jobTitle',
  birthdate = 'birthdate'
}

/** Output format options */
export enum PersonOutputFormat {
  JSON = 'json',
  XML = 'xml',
  YML = 'yml',
  HTML = 'html',
  TEXT = 'txt',
  CUSTOM = 'custom'
}

/** Default selected fields */
export const DEFAULT_PERSON_FIELDS: PersonField[] = [
  PersonField.firstName,
  PersonField.lastName,
  PersonField.email
];

/** Person object type */
export interface Person {
  [key: string]: string;
}

/** Options for generating people */
export interface PersonGeneratorOptions {
  /** Fields to include in the output */
  fields: PersonField[];
}

/** Default custom template */
export const DEFAULT_PERSON_TEMPLATE =
  '{{firstName}} {{lastName}} - {{email}}';

/**
 * Generate a single person record
 * @param fields - Fields to include
 * @returns Person object with requested fields
 */
export function generatePerson(fields: PersonField[]): Person {
  const person: Person = {};

  for (const field of fields) {
    switch (field) {
      case PersonField.firstName:
        person.firstName = faker.person.firstName();
        break;
      case PersonField.lastName:
        person.lastName = faker.person.lastName();
        break;
      case PersonField.fullName:
        person.fullName = faker.person.fullName();
        break;
      case PersonField.gender:
        person.gender = faker.person.sex();
        break;
      case PersonField.email:
        person.email = faker.internet.email();
        break;
      case PersonField.phone:
        person.phone = faker.phone.number();
        break;
      case PersonField.address:
        person.address = faker.location.streetAddress();
        break;
      case PersonField.city:
        person.city = faker.location.city();
        break;
      case PersonField.country:
        person.country = faker.location.country();
        break;
      case PersonField.jobTitle:
        person.jobTitle = faker.person.jobTitle();
        break;
      case PersonField.birthdate:
        person.birthdate = faker.date.birthdate().toISOString().split('T')[0];
        break;
    }
  }

  return person;
}

/**
 * Generate multiple person records
 * @param count - Number of persons
 * @param options - Generator options
 * @returns Array of person objects
 */
export function generatePeople(
  count = 1,
  options: PersonGeneratorOptions = { fields: DEFAULT_PERSON_FIELDS }
): Person[] {
  try {
    if (count <= 0) return [];
    const fields = options.fields.length
      ? options.fields
      : DEFAULT_PERSON_FIELDS;

    const people: Person[] = [];
    for (let i = 0; i < count; i++) {
      people.push(generatePerson(fields));
    }
    return people;
  } catch (error) {
    throw new Error(
      `Person generation failed: ${(error as Error).message}`
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Format people records into various formats
 * @param people - Array of people
 * @param format - Output format
 * @param template - Custom template for CUSTOM format
 * @returns Formatted string
 */
export function formatPeople(
  people: Person[],
  format: PersonOutputFormat,
  template = DEFAULT_PERSON_TEMPLATE
): string {
  try {
    switch (format) {
      case PersonOutputFormat.JSON:
        return JSON.stringify(people, null, 2);
      case PersonOutputFormat.XML: {
        const items = people
          .map(
            (p) =>
              `<person>${Object.entries(p)
                .map(([k, v]) => `<${k}>${escapeHtml(v)}</${k}>`)
                .join('')}</person>`
          )
          .join('');
        return `<people>${items}</people>`;
      }
      case PersonOutputFormat.YML:
        return yaml.dump(people);
      case PersonOutputFormat.HTML: {
        const headers = Object.keys(people[0] || {});
        const head = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
        const rows = people
          .map(
            (p) =>
              `<tr>${headers
                .map((h) => `<td>${escapeHtml(p[h] ?? '')}</td>`)
                .join('')}</tr>`
          )
          .join('');
        return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
      }
      case PersonOutputFormat.TEXT:
        return people
          .map((p) => Object.values(p).join(' '))
          .join('\n');
      case PersonOutputFormat.CUSTOM:
        return people
          .map((p) =>
            template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => p[key] || '')
          )
          .join('\n');
      default:
        return JSON.stringify(people, null, 2);
    }
  } catch (error) {
    throw new Error(`Formatting failed: ${(error as Error).message}`);
  }
}
