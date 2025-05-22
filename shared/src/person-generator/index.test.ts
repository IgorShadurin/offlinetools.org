/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  generatePersonData, 
  PersonOutputFormat, 
  PersonField, 
  DEFAULT_PERSON_GENERATOR_OPTIONS 
} from './index';
import jsYaml from 'js-yaml';

declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;

describe('Person Generator', () => {
  describe('generatePersonData', () => {
    it('should generate person data with default options', () => {
      const result = generatePersonData();
      
      expect(() => JSON.parse(result)).not.toThrow();
      
      const parsed = JSON.parse(result) as Array<Record<string, unknown>>;
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(DEFAULT_PERSON_GENERATOR_OPTIONS.count);
      
      const person = parsed[0] as Record<string, unknown>;
      DEFAULT_PERSON_GENERATOR_OPTIONS.fields.forEach(field => {
        expect(person).toHaveProperty(field);
      });
    });
    
    it('should generate data in JSON format', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.JSON,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 2
      });
      
      const parsed = JSON.parse(result) as Array<Record<string, unknown>>;
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(2);
      
      parsed.forEach((person: Record<string, unknown>) => {
        expect(person).toHaveProperty(PersonField.FULL_NAME);
        expect(person).toHaveProperty(PersonField.EMAIL);
      });
    });
    
    it('should generate data in XML format', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.XML,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 1
      });
      
      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(result).toContain('<people>');
      expect(result).toContain('<person>');
      expect(result).toContain(`<${PersonField.FULL_NAME}>`);
      expect(result).toContain(`<${PersonField.EMAIL}>`);
    });
    
    it('should generate data in TEXT format with labels', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.TEXT,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 1,
        includeLabels: true
      });
      
      expect(result).toContain(`${PersonField.FULL_NAME}:`);
      expect(result).toContain(`${PersonField.EMAIL}:`);
    });
    
    it('should generate data in TEXT format without labels', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.TEXT,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 1,
        includeLabels: false
      });
      
      expect(result).not.toContain(`${PersonField.FULL_NAME}:`);
      expect(result).not.toContain(`${PersonField.EMAIL}:`);
      expect(result.split('\n').length).toBe(2); // Just the values
    });
    
    it('should generate data in CSV format', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.CSV,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 2
      });
      
      const lines = result.split('\n');
      expect(lines.length).toBe(4); // Header + 2 data rows + empty line
      expect(lines[0]).toBe(`${PersonField.FULL_NAME},${PersonField.EMAIL}`);
      expect(lines[1]).toContain(','); // Data has comma separator
    });
    
    it('should generate data in YAML format', () => {
      const result = generatePersonData({ 
        format: PersonOutputFormat.YAML,
        fields: [PersonField.FULL_NAME, PersonField.EMAIL],
        count: 1
      });
      
      const parsed = jsYaml.load(result) as Array<Record<string, unknown>>;
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(1);
      
      const person = parsed[0] as Record<string, unknown>;
      expect(person).toHaveProperty(PersonField.FULL_NAME);
      expect(person).toHaveProperty(PersonField.EMAIL);
    });
    
    it('should throw an error for invalid count', () => {
      expect(() => {
        generatePersonData({ count: 0 });
      }).toThrow('Count must be greater than 0');
      
      expect(() => {
        generatePersonData({ count: -1 });
      }).toThrow('Count must be greater than 0');
    });
    
    it('should generate all available person fields', () => {
      const allFields = Object.values(PersonField);
      
      const result = generatePersonData({ 
        fields: allFields,
        count: 1
      });
      
      const person = JSON.parse(result)[0] as Record<string, unknown>;
      
      allFields.forEach(field => {
        expect(person).toHaveProperty(field);
        expect(person[field]).not.toBeUndefined();
      });
    });
  });
});
