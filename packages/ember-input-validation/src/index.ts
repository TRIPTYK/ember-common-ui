import { buildRegistry } from 'ember-strict-application-resolver/build-registry';
import * as TpkFormServiceModule from './services/tpk-form.ts';

export function moduleRegistry() {
  return buildRegistry({
    './services/tpk-form': TpkFormServiceModule,
  })();
}
