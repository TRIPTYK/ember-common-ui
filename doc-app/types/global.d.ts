import '@glint/environment-ember-loose';
import { Registry as InputR } from '@triptyk/ember-input/template-registry';

import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry, InputR {
    // local entries
  }
}
