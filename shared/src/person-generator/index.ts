import { faker } from '@faker-js/faker';
import jsYaml from 'js-yaml';

/**
 * Available output formats for person data
 */
export enum PersonOutputFormat {
  /** JSON format */
  JSON = 'json',
  /** XML format */
  XML = 'xml',
  /** Plain text format */
  TEXT = 'text',
  /** CSV format */
  CSV = 'csv',
  /** YAML format */
  YAML = 'yaml'
}

/**
 * Available person data fields
 */
export enum PersonField {
  /** Full name */
  FULL_NAME = 'fullName',
  /** First name */
  FIRST_NAME = 'firstName',
  /** Last name */
  LAST_NAME = 'lastName',
  /** Gender */
  GENDER = 'gender',
  /** Job title */
  JOB_TITLE = 'jobTitle',
  /** Job description */
  JOB_DESCRIPTION = 'jobDescription',
  /** Email address */
  EMAIL = 'email',
  /** Phone number */
  PHONE = 'phone',
  /** Address */
  ADDRESS = 'address',
  /** Birth date */
  BIRTH_DATE = 'birthDate',
  /** Bio/description */
  BIO = 'bio',
  /** Avatar URL */
  AVATAR = 'avatar'
}

/**
 * Options for person data generation
 */
export interface PersonGeneratorOptions {
  /** Output format */
  format: PersonOutputFormat;
  /** Fields to include */
  fields: PersonField[];
  /** Number of people to generate */
  count: number;
  /** Whether to include field names in text output */
  includeLabels: boolean;
}

/**
 * Default options for person generation
 */
export const DEFAULT_PERSON_GENERATOR_OPTIONS: PersonGeneratorOptions = {
  format: PersonOutputFormat.JSON,
  fields: [
    PersonField.FULL_NAME,
    PersonField.EMAIL,
    PersonField.PHONE,
    PersonField.ADDRESS,
    PersonField.JOB_TITLE
  ],
  count: 1,
  includeLabels: true
};

/**
 * Person data structure
 */
export interface Person {
  [PersonField.FULL_NAME]?: string;
  [PersonField.FIRST_NAME]?: string;
  [PersonField.LAST_NAME]?: string;
  [PersonField.GENDER]?: string;
  [PersonField.JOB_TITLE]?: string;
  [PersonField.JOB_DESCRIPTION]?: string;
  [PersonField.EMAIL]?: string;
  [PersonField.PHONE]?: string;
  [PersonField.ADDRESS]?: string;
  [PersonField.BIRTH_DATE]?: string;
  [PersonField.BIO]?: string;
  [PersonField.AVATAR]?: string;
}

/**
 * Generate a person object with specified fields
 * @param fields - Fields to include in the person object
 * @returns Person object with requested fields
 */
function generatePerson(fields: PersonField[]): Person {
  const person: Person = {};

  fields.forEach(field => {
    switch (field) {
      case PersonField.FULL_NAME:
        person[field] = faker.person.fullName();
        break;
      case PersonField.FIRST_NAME:
        person[field] = faker.person.firstName();
        break;
      case PersonField.LAST_NAME:
        person[field] = faker.person.lastName();
        break;
      case PersonField.GENDER:
        person[field] = faker.person.gender();
        break;
      case PersonField.JOB_TITLE:
        person[field] = faker.person.jobTitle();
        break;
      case PersonField.JOB_DESCRIPTION:
        person[field] = faker.person.jobDescriptor();
        break;
      case PersonField.EMAIL:
        person[field] = faker.internet.email();
        break;
      case PersonField.PHONE:
        person[field] = faker.phone.number();
        break;
      case PersonField.ADDRESS:
        person[field] = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`;
        break;
      case PersonField.BIRTH_DATE:
        person[field] = faker.date.birthdate().toISOString().split('T')[0];
        break;
      case PersonField.BIO:
        person[field] = faker.person.bio();
        break;
      case PersonField.AVATAR:
        person[field] = faker.image.avatar();
        break;
    }
  });

  return person;
}

/**
 * Generate multiple people
 * @param count - Number of people to generate
 * @param fields - Fields to include in each person
 * @returns Array of generated person objects
 */
function generatePeople(count: number, fields: PersonField[]): Person[] {
  if (count <= 0) {
    throw new Error('Count must be greater than 0');
  }

  return Array.from({ length: count }, () => generatePerson(fields));
}

/**
 * Convert person data to JSON format
 * @param people - Array of person objects
 * @returns JSON string representation
 */
function toJSON(people: Person[]): string {
  return JSON.stringify(people, null, 2);
}

/**
 * Convert person data to XML format
 * @param people - Array of person objects
 * @returns XML string representation
 */
function toXML(people: Person[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<people>\n';
  
  people.forEach(person => {
    xml += '  <person>\n';
    Object.entries(person).forEach(([key, value]) => {
      xml += `    <${key}>${escapeXml(String(value))}</${key}>\n`;
    });
    xml += '  </person>\n';
  });
  
  xml += '</people>';
  return xml;
}

/**
 * Convert person data to TEXT format
 * @param people - Array of person objects
 * @param includeLabels - Whether to include field labels
 * @returns Formatted text string
 */
function toText(people: Person[], includeLabels: boolean): string {
  return people.map(person => {
    const entries = Object.entries(person);
    return entries.map(([key, value]) => {
      return includeLabels ? `${key}: ${value}` : `${value}`;
    }).join('\n');
  }).join('\n\n');
}

/**
 * Convert person data to CSV format
 * @param people - Array of person objects
 * @returns CSV string representation
 */
function toCSV(people: Person[]): string {
  if (people.length === 0) {
    return '';
  }
  
  const keys = Array.from(
    new Set(people.flatMap(person => Object.keys(person)))
  );
  
  let csv = keys.join(',') + '\n';
  
  people.forEach(person => {
    const row = keys.map(key => {
      const value = person[key as PersonField];
      if (value === undefined) {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csv += row.join(',') + '\n';
  });
  
  return csv;
}

/**
 * Convert person data to YAML format
 * @param people - Array of person objects
 * @returns YAML string representation
 */
function toYAML(people: Person[]): string {
  return jsYaml.dump(people);
}

/**
 * Escape special XML characters
 * @param str - String to escape
 * @returns Escaped string
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate person data with specified options
 * @param options - Person generation options
 * @returns Generated person data in the specified format
 * @throws Error if generation fails
 */
export function generatePersonData(
  options: Partial<PersonGeneratorOptions> = {}
): string {
  try {
    const mergedOptions: PersonGeneratorOptions = {
      ...DEFAULT_PERSON_GENERATOR_OPTIONS,
      ...options,
    };

    const people = generatePeople(mergedOptions.count, mergedOptions.fields);
    
    switch (mergedOptions.format) {
      case PersonOutputFormat.JSON:
        return toJSON(people);
      case PersonOutputFormat.XML:
        return toXML(people);
      case PersonOutputFormat.TEXT:
        return toText(people, mergedOptions.includeLabels);
      case PersonOutputFormat.CSV:
        return toCSV(people);
      case PersonOutputFormat.YAML:
        return toYAML(people);
      default:
        return toJSON(people); // Default to JSON
    }
  } catch (error) {
    throw new Error(`Failed to generate person data: ${(error as Error).message}`);
  }
}

/**
 * List all available person fields with descriptions
 * @returns Array of person fields with descriptions
 */
export function getPersonFields(): { field: PersonField; description: string }[] {
  return [
    { field: PersonField.FULL_NAME, description: 'Full name' },
    { field: PersonField.FIRST_NAME, description: 'First name' },
    { field: PersonField.LAST_NAME, description: 'Last name' },
    { field: PersonField.GENDER, description: 'Gender' },
    { field: PersonField.JOB_TITLE, description: 'Job title' },
    { field: PersonField.JOB_DESCRIPTION, description: 'Job description' },
    { field: PersonField.EMAIL, description: 'Email address' },
    { field: PersonField.PHONE, description: 'Phone number' },
    { field: PersonField.ADDRESS, description: 'Address' },
    { field: PersonField.BIRTH_DATE, description: 'Birth date' },
    { field: PersonField.BIO, description: 'Bio/description' },
    { field: PersonField.AVATAR, description: 'Avatar URL' }
  ];
}
