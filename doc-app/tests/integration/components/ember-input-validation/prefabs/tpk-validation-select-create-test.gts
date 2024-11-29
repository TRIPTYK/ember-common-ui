
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationSelectCreate from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';
import { a11yAudit } from 'ember-a11y-testing/test-support';



module(
  'Integration | Component | Prefabs | tpk-validation-select-create',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(params?: { disabled: boolean }) {
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

      await render(
        <template>
        <TpkValidationSelectCreate
          @placeholder="Entrez un nom"
          @label="Patron de Triptyk"
          @options={{options}}
          @changeset={{changeset}}
          @buildSuggestion={{buildSuggestions}}
          @showCreateWhen={{showCreateWhen}}
          @disabled={{params.disabled}}
          @onChange={{onChange}}
          @onCreate={{onCreate}}
          @validationField="name"
          class="custom-class"
        /></template>
      );

      return changeset;
    }

    test('Applies the toString() method for displaying options', async function ( assert) {
      await renderComponent();
      await click('.ember-power-select-trigger');
      assert.dom('.ember-power-select-option:first-child').hasText('Romain');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponent();

      assert.dom(`.tpk-select-create-container`).exists().hasAttribute(`data-test-tpk-prefab-select-create-container`);
      assert.dom(`.tpk-select-create-container .tpk-validation-errors`).exists()
      assert.dom(`.tpk-select-create-container .tpk-select-create-label`).exists();
    });

    test('@disabled disables the select', async function(assert) {
      await renderComponent({ disabled: true });
      assert.dom(`.ember-basic-dropdown-trigger`).hasAttribute('aria-disabled', 'true');
    });

    //  Got an error on accessibility... but cannot change it because it depends of power-select-with-create
    test('Accessibility', async function (assert) {
      assert.expect(0);
      await renderComponent();
      await a11yAudit();
    });
  },
);
