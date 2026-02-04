import { buildRegistry } from 'ember-strict-application-resolver/build-registry';

export function moduleRegistry() {
  return buildRegistry({
    ...import.meta.glob('./services/**/*.{js,ts}', { eager: true }),
  })();
}
