/**
 * Type declarations for Google Analytics gtag
 */

// Declare gtag as a function
interface GTagFunction {
  (command: 'config', targetId: string, config?: Record<string, any>): void;
  (command: 'set', config: Record<string, any>): void;
  (command: 'event', eventName: string, eventParams?: Record<string, any>): void;
  (command: 'js', date: Date): void;
  (command: 'consent', consentArg: 'default' | 'update', consentParams: Record<string, any>): void;
}

// Extend Window interface
interface Window {
  gtag: GTagFunction;
  dataLayer: any[];
}

// Declare global gtag function
declare const gtag: GTagFunction; 