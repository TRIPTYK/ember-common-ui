
import { http, passthrough } from 'msw';
import { setupWorker as MSWSetupWorker } from 'msw/browser';

export let worker: ReturnType<typeof MSWSetupWorker>;

export function setupWorker() {
  worker = MSWSetupWorker();
}

export function stopWorker() {
  for (const handler of worker.listHandlers()) {
    console.log('Registered handler:', handler);
  }
  worker.stop();
}

/**
 * Setups mocking using msw worker.
 * The worker can be accessed using this.get('worker')
 */
export function setupMock(hooks: NestedHooks) {
  hooks.beforeEach(async function () {
    worker.resetHandlers();
    worker.use(
      http.post('/write-coverage', (req) => {
        // The passthrough is for ember code coverage.
        return passthrough();
      }),
    );
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
