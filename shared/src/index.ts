import { sha256 } from 'js-sha256'

/**
 * Sample function that adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function test1(a: number, b: number): number {
    return a + b;
}

/**
 * Sample function that creates a SHA-256 hash
 * @returns The SHA-256 hash of a message
 */
export function test2(): string {
    return sha256('Message to hash');
}

// Export JSON formatter
export * from './json-formatter';

// Export Base64 codec
export * from './base64-codec';