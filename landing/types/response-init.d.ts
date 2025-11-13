export {};

declare global {
  interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
  }
}

