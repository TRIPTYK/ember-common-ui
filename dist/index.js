import { buildRegistry } from 'ember-strict-application-resolver/build-registry';

function moduleRegistry() {
  return buildRegistry({
    ...import.meta.glob('./services/**/*.{js,ts}', {
      eager: true
    })
  })();
}

export { moduleRegistry };
//# sourceMappingURL=index.js.map
