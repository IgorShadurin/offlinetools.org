import { Faker, en } from '@faker-js/faker';

/**
 * Fields available for person generation
 */
export enum PersonField {
  /** First name */
  FirstName = 'firstName',
  /** Last name */
  LastName = 'lastName',
  /** Full name */
  FullName = 'fullName',
  /** Email address */
  Email = 'email',
  /** Phone number */
  Phone = 'phone',
  /** Street address */
  Street = 'street',
  /** City */
  City = 'city',
  /** State or region */
  State = 'state',
  /** Postal code */
  ZipCode = 'zipCode',
  /** Country */
  Country = 'country'
}

/**
 * Supported output formats
 */
export enum PersonFormat {
  /** JSON format */
  JSON = 'json',
  /** XML format */
  XML = 'xml',
  /** YAML format */
  YML = 'yml',
  /** HTML format */
  HTML = 'html',
  /** Plain text format */
  TXT = 'txt',
  /** Custom template */
  CUSTOM = 'custom'
}

/**
 * Options for generating persons
 */
export interface PersonGeneratorOptions {
  /** Number of persons to generate */
  count?: number;
  /** Output format */
  format?: PersonFormat;
  /** Fields to include */
  fields?: PersonField[];
  /** Custom template for CUSTOM format */
  customTemplate?: string;
}

/** Default person generator options */
export const DEFAULT_PERSON_GENERATOR_OPTIONS: Required<PersonGeneratorOptions> = {
  count: 1,
  format: PersonFormat.JSON,
  fields: [
    PersonField.FirstName,
    PersonField.LastName,
    PersonField.Email,
    PersonField.Phone,
    PersonField.Street,
    PersonField.City,
    PersonField.State,
    PersonField.ZipCode,
    PersonField.Country
  ],
  customTemplate: '{{ firstName }} {{ lastName }}'
};

const faker = new Faker({ locale: [en] });

interface PersonData {
  [key: string]: string;
}

function generatePerson(): Record<PersonField, string> {
  return {
    [PersonField.FirstName]: faker.person.firstName(),
    [PersonField.LastName]: faker.person.lastName(),
    [PersonField.FullName]: faker.person.fullName(),
    [PersonField.Email]: faker.internet.email(),
    [PersonField.Phone]: faker.phone.number(),
    [PersonField.Street]: faker.location.streetAddress(),
    [PersonField.City]: faker.location.city(),
    [PersonField.State]: faker.location.state(),
    [PersonField.ZipCode]: faker.location.zipCode(),
    [PersonField.Country]: faker.location.country()
  };
}

function renderCustom(template: string, data: PersonData): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] ?? '');
}

/**
 * Generate person data and format according to options
 * @param options - Generation options
 * @returns Formatted person data string
 */
export function generatePersons(options: PersonGeneratorOptions = {}): string {
  try {
    const opts: Required<PersonGeneratorOptions> = {
      ...DEFAULT_PERSON_GENERATOR_OPTIONS,
      ...options,
      fields: options.fields ?? DEFAULT_PERSON_GENERATOR_OPTIONS.fields,
      customTemplate: options.customTemplate ?? DEFAULT_PERSON_GENERATOR_OPTIONS.customTemplate
    };

    if (opts.count <= 0) throw new Error('Count must be greater than 0');

    const persons: PersonData[] = [];
    for (let i = 0; i < opts.count; i++) {
      const p = generatePerson();
      const filtered: PersonData = {};
      for (const field of opts.fields) {
        filtered[field] = p[field];
      }
      persons.push(filtered);
    }

    switch (opts.format) {
      case PersonFormat.JSON:
        return JSON.stringify(persons, null, 2);
      case PersonFormat.XML: {
        const xmlItems = persons
          .map(p =>
            `<person>` +
            Object.entries(p)
              .map(([k, v]) => `<${k}>${escapeHtml(v)}</${k}>`)
              .join('') +
            `</person>`
          )
          .join('');
        return `<persons>${xmlItems}</persons>`;
      }
      case PersonFormat.YML: {
        return persons
          .map(p =>
            Object.entries(p)
              .map(([k, v]) => `${k}: ${v}`)
              .join('\n')
          )
          .join('\n---\n');
      }
      case PersonFormat.HTML: {
        const rows = persons
          .map(p =>
            '<tr>' +
            Object.values(p)
              .map(v => `<td>${escapeHtml(v)}</td>`)
              .join('') +
            '</tr>'
          )
          .join('');
        return `<table><tbody>${rows}</tbody></table>`;
      }
      case PersonFormat.TXT: {
        return persons
          .map(p => Object.values(p).join(' '))
          .join('\n');
      }
      case PersonFormat.CUSTOM: {
        return persons.map(p => renderCustom(opts.customTemplate, p)).join('\n');
      }
      default:
        return JSON.stringify(persons, null, 2);
    }
  } catch (error) {
    throw new Error(`Person generation failed: ${(error as Error).message}`);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
