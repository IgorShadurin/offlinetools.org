/**
 * Supported fields for person data
 */
export enum PersonField {
  FirstName = 'firstName',
  LastName = 'lastName',
  FullName = 'fullName',
  Email = 'email',
  Phone = 'phone',
  Address = 'address',
  City = 'city',
  State = 'state',
  Country = 'country',
  Zip = 'zip',
  JobTitle = 'jobTitle'
}

/**
 * Output formats for person data
 */
export enum PersonOutputFormat {
  JSON = 'json',
  XML = 'xml',
  YAML = 'yml',
  HTML = 'html',
  TXT = 'txt'
}

/**
 * Options for generating person data
 */
export interface PersonGeneratorOptions {
  /** Number of persons to generate */
  count: number;
  /** Fields to include for each person */
  fields: PersonField[];
}

/** Default set of fields */
export const DEFAULT_PERSON_FIELDS: PersonField[] = [
  PersonField.FirstName,
  PersonField.LastName,
  PersonField.Email,
  PersonField.Phone,
  PersonField.Address,
  PersonField.City,
  PersonField.State,
  PersonField.Country,
  PersonField.Zip,
  PersonField.JobTitle
];

/** Default options for person generator */
export const DEFAULT_PERSON_GENERATOR_OPTIONS: PersonGeneratorOptions = {
  count: 1,
  fields: DEFAULT_PERSON_FIELDS
};

// sample data for random generation
const FIRST_NAMES = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Helen', 'Ivan', 'Judy'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const STREETS = ['Main St', 'Oak Ave', 'Pine Rd', 'Maple Dr', 'Cedar Ln'];
const CITIES = ['Springfield', 'Rivertown', 'Lakeside', 'Hillview', 'Fairview'];
const STATES = ['CA', 'NY', 'TX', 'FL', 'IL'];
const COUNTRIES = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
const JOB_TITLES = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer'];
const ZIPS = ['12345', '23456', '34567', '45678', '56789'];

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface FullPerson {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  jobTitle: string;
}

function generateFullPerson(): FullPerson {
  const first = randomOf(FIRST_NAMES);
  const last = randomOf(LAST_NAMES);
  const city = randomOf(CITIES);
  const state = randomOf(STATES);
  const country = randomOf(COUNTRIES);
  const street = `${Math.floor(Math.random() * 999)} ${randomOf(STREETS)}`;
  const zip = randomOf(ZIPS);
  return {
    firstName: first,
    lastName: last,
    fullName: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    phone: `555-${Math.floor(1000000 + Math.random() * 9000000)}`,
    address: street,
    city,
    state,
    country,
    zip,
    jobTitle: randomOf(JOB_TITLES)
  };
}

/**
 * Generate an array of person objects
 * @param options - Generation options
 * @returns Array of person objects
 */
export function generatePersons(
  options: Partial<PersonGeneratorOptions> = {}
): Record<string, string>[] {
  const { count, fields } = { ...DEFAULT_PERSON_GENERATOR_OPTIONS, ...options };
  if (count <= 0 || count > 1000) {
    throw new Error('Count must be between 1 and 1000');
  }
  const persons: Record<string, string>[] = [];
  for (let i = 0; i < count; i++) {
    const full = generateFullPerson();
    const filtered: Record<string, string> = {};
    for (const field of fields) {
      filtered[field] = full[field as keyof FullPerson];
    }
    persons.push(filtered);
  }
  return persons;
}

/**
 * Format generated persons as a string in the given format
 * @param persons - Array of persons
 * @param format - Output format
 * @returns Formatted string
 */
export function formatPersons(
  persons: Record<string, string>[],
  format: PersonOutputFormat
): string {
  switch (format) {
    case PersonOutputFormat.JSON:
      return JSON.stringify(persons, null, 2);
    case PersonOutputFormat.XML:
      return (
        '<persons>' +
        persons
          .map((p) => {
            const fields = Object.entries(p)
              .map(([k, v]) => `<${k}>${v}</${k}>`)
              .join('');
            return `<person>${fields}</person>`;
          })
          .join('') +
        '</persons>'
      );
    case PersonOutputFormat.YAML:
      return persons
        .map((p) =>
          Object.entries(p)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n')
        )
        .join('\n-\n');
    case PersonOutputFormat.HTML:
      return (
        '<table><thead><tr>' +
        Object.keys(persons[0] || {})
          .map((h) => `<th>${h}</th>`)
          .join('') +
        '</tr></thead><tbody>' +
        persons
          .map(
            (p) =>
              '<tr>' +
              Object.values(p)
                .map((v) => `<td>${v}</td>`)
                .join('') +
              '</tr>'
          )
          .join('') +
        '</tbody></table>'
      );
    case PersonOutputFormat.TXT:
      return persons
        .map((p) => Object.values(p).join(', '))
        .join('\n');
    default:
      return JSON.stringify(persons, null, 2);
  }
}


/**
 * Check if the File System Access API is supported
 */
export function isSavePickerSupported(): boolean {
  return typeof window !== 'undefined' && 'showSaveFilePicker' in window;
}

/**
 * Save text content using the File System Access API
 * @param data - text content to save
 * @param filename - suggested filename
 */
export async function saveTextWithPicker(data: string, filename: string): Promise<void> {
  try {
    // @ts-ignore
    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{ accept: { 'text/plain': ['.txt'] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(data);
    await writable.close();
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      throw error;
    }
  }
}

/**
 * Generate a download URL for the given text content
 */
export function generateTextDownloadUrl(content: string): { url: string; revoke: () => void } {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  return { url, revoke: () => URL.revokeObjectURL(url) };
}
