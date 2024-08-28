import type { SetupWorker } from 'msw';
import type { TestContext } from '@ember/test-helpers';
export declare let worker: SetupWorker;
export interface ServiceWorkerTestContext extends TestContext {
    worker: SetupWorker;
}
export declare function setupWorker(): void;
export declare function stopWorker(): void;
/**
 * Setups mocking using msw worker.
 * The worker can be accessed using this.get('worker')
 */
export declare function setupMock(hooks: NestedHooks): void;
//# sourceMappingURL=worker.d.ts.map