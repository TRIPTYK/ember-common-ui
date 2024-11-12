/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
  options: string[];
  onCreate: (term: string) => void;
  buildSuggestions: (term: string) => string;
  showCreateWhen: (term: string) => boolean;
}

module(
  'Integration | Component | Prefabs | tpk-validation-select-create',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(this: ThisTestContext) {
      const changeset = new ImmerChangeset({
        name: undefined,
      });
      const options = ['Romain', 'Gilles', 'Amaury'];

      this.set('changeset', changeset);
      this.set('options', options);
      this.set('onCreate', (term: string) => {
        // eslint-disable-next-line ember/no-get
        this.changeset.set('name', term);
        this.set('options', [...options, term]);
      });
      this.set('buildSuggestions', (term: string) => {
        return `Créer "${term}"...`;
      });
      this.set('showCreateWhen', (term: string) => {
        const existingOption = options.find((name) => name === term);
        return !existingOption;
      });

      await render(
        hbs`<Prefabs::TpkValidationSelectCreate
          @placeholder="Entrez un nom"
          @label="Patron de Triptyk"
          @options={{this.options}}
          @changeset={{this.changeset}}
          @buildSuggestions={{this.buildSuggestions}}
          @showCreateWhen={{this.showCreateWhen}}
          @onCreate={{this.onCreate}}
          @validationField="name"
          class="custom-class"
        />`,
      );

      return changeset;
    }

    test('Applies the toString() method for displaying options', async function (this: ThisTestContext, assert) {
      await renderComponent.call(this);
      await click('.ember-power-select-trigger');
      assert.dom('.ember-power-select-option:first-child').hasText('Romain');
    });
  },
);
