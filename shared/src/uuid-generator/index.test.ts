import { 
  generateUUID, 
  generateMultipleUUIDs, 
  validateUUID, 
  getUUIDVersion, 
  formatUUID,
  UUIDVersion, 
  UUIDNamespace
} from './index';

describe('UUID Generator', () => {
  describe('generateUUID', () => {
    it('should generate a valid v4 UUID by default', () => {
      const uuid = generateUUID();
      expect(validateUUID(uuid)).toBe(true);
      expect(getUUIDVersion(uuid)).toBe(4);
    });

    it('should generate a valid v1 UUID when specified', () => {
      const uuid = generateUUID({ version: UUIDVersion.V1 });
      expect(validateUUID(uuid)).toBe(true);
      expect(getUUIDVersion(uuid)).toBe(1);
    });

    it('should generate a valid v5 UUID when specified with name and namespace', () => {
      const uuid = generateUUID({
        version: UUIDVersion.V5,
        name: 'test',
        namespace: UUIDNamespace.URL
      });
      expect(validateUUID(uuid)).toBe(true);
      expect(getUUIDVersion(uuid)).toBe(5);
    });

    it('should generate a valid v6 UUID when specified', () => {
      const uuid = generateUUID({ version: UUIDVersion.V6 });
      expect(validateUUID(uuid)).toBe(true);
      expect(getUUIDVersion(uuid)).toBe(6);
    });

    it('should generate a valid v7 UUID when specified', () => {
      const uuid = generateUUID({ version: UUIDVersion.V7 });
      expect(validateUUID(uuid)).toBe(true);
      expect(getUUIDVersion(uuid)).toBe(7);
    });

    it('should correctly return NIL UUID', () => {
      const uuid = generateUUID({ version: UUIDVersion.NIL });
      expect(uuid).toBe('00000000-0000-0000-0000-000000000000');
    });

    it('should correctly return MAX UUID', () => {
      const uuid = generateUUID({ version: UUIDVersion.MAX });
      expect(uuid).toBe('ffffffff-ffff-ffff-ffff-ffffffffffff');
    });

    it('should generate uppercase UUID when specified', () => {
      const uuid = generateUUID({ uppercase: true });
      expect(uuid).toBe(uuid.toUpperCase());
    });

    it('should generate UUID without hyphens when specified', () => {
      const uuid = generateUUID({ hyphens: false });
      expect(uuid).not.toContain('-');
      expect(uuid.length).toBe(32);
    });

    it('should throw error for v5 UUID without name', () => {
      expect(() => {
        generateUUID({ version: UUIDVersion.V5 });
      }).toThrow('Name is required for v5 UUIDs');
    });

    it('should throw error for v5 UUID with custom namespace but without customNamespace', () => {
      expect(() => {
        generateUUID({
          version: UUIDVersion.V5,
          name: 'test',
          namespace: UUIDNamespace.CUSTOM
        });
      }).toThrow('Custom namespace is required when namespace is set to CUSTOM');
    });
  });

  describe('generateMultipleUUIDs', () => {
    it('should generate multiple UUIDs with the specified count', () => {
      const count = 5;
      const uuids = generateMultipleUUIDs(count);
      expect(uuids).toHaveLength(count);
      uuids.forEach(uuid => {
        expect(validateUUID(uuid)).toBe(true);
      });
    });

    it('should return empty array for count <= 0', () => {
      expect(generateMultipleUUIDs(0)).toEqual([]);
      expect(generateMultipleUUIDs(-1)).toEqual([]);
    });
  });

  describe('validateUUID', () => {
    it('should validate correct UUIDs', () => {
      expect(validateUUID('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')).toBe(true);
    });

    it('should invalidate incorrect UUIDs', () => {
      expect(validateUUID('not-a-uuid')).toBe(false);
      expect(validateUUID('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1')).toBe(false); // Too short
      expect(validateUUID('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a111')).toBe(false); // Too long
    });
  });

  describe('getUUIDVersion', () => {
    it('should return correct version for valid UUIDs', () => {
      expect(getUUIDVersion('2c5ea4c0-4067-11e9-9bdd-2b0d7b3dcb6d')).toBe(1); // v1
      expect(getUUIDVersion('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')).toBe(4); // v4
    });

    it('should throw for invalid UUIDs', () => {
      expect(() => {
        getUUIDVersion('not-a-uuid');
      }).toThrow('Invalid UUID format');
    });
  });

  describe('formatUUID', () => {
    it('should format UUID to uppercase when specified', () => {
      const uuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
      expect(formatUUID(uuid, { uppercase: true, hyphens: true }))
        .toBe('9B1DEB4D-3B7D-4BAD-9BDD-2B0D7B3DCB6D');
    });

    it('should format UUID without hyphens when specified', () => {
      const uuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
      expect(formatUUID(uuid, { uppercase: false, hyphens: false }))
        .toBe('9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d');
    });

    it('should add hyphens to UUID when specified and they are missing', () => {
      const uuid = '9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d';
      expect(formatUUID(uuid, { uppercase: false, hyphens: true }))
        .toBe('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
    });

    it('should throw for invalid UUIDs', () => {
      expect(() => {
        formatUUID('not-a-uuid');
      }).toThrow('Invalid UUID format');
    });
  });
});
