
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationSelectCreate from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';

interface ThisTestContext extends TestContext {
}

module(
  'Integration | Component | Prefabs | tpk-validation-select-create',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(this: ThisTestContext) {
      const changeset = new ImmerChangeset<
        {
          name: string | undefined;
        }
      >({
        name: undefined,
      });
      const options = ['Romain', 'Gilles', 'Amaury'];

      const onCreate = (term: unknown) => {
        changeset.set('name', term as string);
        options.push(term as string);
      };

      const onChange = () => {};

      const buildSuggestions = (term: string) => {
        return `Créer "${term}"...`;
      };

      const showCreateWhen = (term: string) => {
        const existingOption = options.find((name) => name === term);
        return !existingOption;
      };

      await render<ThisTestContext>(
        <template>
        <TpkValidationSelectCreate
          @placeholder="Entrez un nom"
          @label="Patron de Triptyk"
          @options={{options}}
          @changeset={{changeset}}
          @buildSuggestion={{buildSuggestions}}
          @showCreateWhen={{showCreateWhen}}
          @onChange={{onChange}}
          @onCreate={{onCreate}}
          @validationField="name"
          class="custom-class"
        /></template>
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
