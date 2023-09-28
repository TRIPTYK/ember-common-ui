import { setupWorker } from 'msw';

export const worker = (handlers) => setupWorker(...handlers);
