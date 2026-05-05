import { http, passthrough } from 'msw';
import { setupWorker as MSWSetupWorker } from 'msw/browser';

export let worker: ReturnType<typeof MSWSetupWorker>;

export async function setupWorker() {
  if (
    typeof navigator === 'undefined' ||
    !('serviceWorker' in navigator) ||
    worker
  ) {
    return;
  }
  const { setupWorker: MSWSetup } = await import('msw/browser');
  worker = MSWSetup();
  await worker.start({ onUnhandledRequest: 'bypass' });
}

export function stopWorker() {
  worker?.stop();
  worker = undefined as unknown as ReturnType<typeof MSWSetupWorker>;
}

export function setupMock() {
  worker?.resetHandlers();
  worker?.use(
    http.post('/write-coverage', () => {
      return passthrough();
    }),
  );
}

export function teardownMock() {
  worker?.resetHandlers();
}
