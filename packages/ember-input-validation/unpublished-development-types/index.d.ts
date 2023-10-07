// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@triptyk/ember-input/components/tpk-checkbox';
import '@triptyk/ember-input/components/tpk-datepicker';
import '@triptyk/ember-input/components/tpk-file';
import '@triptyk/ember-input/components/tpk-input';
import '@triptyk/ember-input/components/tpk-radio';
import '@triptyk/ember-input/components/tpk-select';
import '@triptyk/ember-input/components/tpk-textarea';
import '@triptyk/ember-input/components/tpk-select-search';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
