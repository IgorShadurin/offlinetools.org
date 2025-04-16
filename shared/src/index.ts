import { sha256 } from 'js-sha256'

export function test1(a: number, b: number) {
    return a + b;
}

export function test2(): string {
    return sha256('Message to hash');
}