
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationSelect from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';
import { a11yAudit } from 'ember-a11y-testing/test-support';



module(
  'Integration | Component | Prefabs | tpk-validation-select',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function setChangeset(value?: string | object) {
      return new ImmerChangeset<
        {
          names?: string | object;
        }
      >({
        names: value,
      });
    }

    async function renderComponent({ options = [], changeset, disabled = false }: { options: unknown[], changeset: ImmerChangeset, disabled?: boolean }) {
      const onChange = () => {};
      await render(
        <template><TpkValidationSelect
          @placeholder="Entrez un nom"
          @label="Names"
          @options={{options}}
          @changeset={{changeset}}
          @validationField="names"
          @disabled={{disabled}}
          @onChange={{onChange}}
          class="custom-class"
        /></template>,
      );
    }

    test('Applies the toString() method for displaying options', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent( { options: [
        {
          toString() {
            return 'toString() method';
          },
        },
      ], changeset});
      await click('.ember-power-select-trigger');
      assert.dom('.ember-power-select-option').hasText('toString() method');
    });

    test('Applies the direct values from array for displaying options', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent({ options: [
        'Beatport',
        'Spotify',
        'Apple Music',
        'Deezer',
        'Soundcloud',
      ], changeset });
      await click('.ember-power-select-trigger');
      assert.dom('.ember-power-select-option').hasText('Beatport');
    });

    test('Applies the toString() method for displaying selected element', async function (assert) {
      const obj = {
        toString() {
          return 'toString() method';
        },
      };
      const changeset = await setChangeset(obj);
      await renderComponent({ options: [obj], changeset});
      await settled();
      assert
        .dom('.ember-power-select-selected-item')
        .hasText('toString() method');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent({ options: [], changeset });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent({ options: [], changeset });
      assert
        .dom('.tpk-select-container')
        .hasAttribute('data-has-error', 'false');

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });

      await settled();

      assert
        .dom('.tpk-select-container')
        .hasAttribute('data-has-error', 'true');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      const changeset = await setChangeset();
      await renderComponent({ options: [], changeset });

      assert.dom(`.tpk-select-container`).exists().hasAttribute(`data-test-tpk-prefab-select-container`);
      assert.dom(`.tpk-select-container .tpk-validation-errors`).exists()
      assert.dom(`.tpk-select-container .tpk-label`).exists();
    });

    test('@disabled disables the select', async function(assert) {
      const changeset = await setChangeset();
      await renderComponent({ options: [], changeset, disabled: true });
      assert.dom(`.ember-basic-dropdown-trigger`).hasAttribute('aria-disabled', 'true');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      const changeset = await setChangeset();
      await renderComponent({ options: [], changeset, disabled: true });
      await a11yAudit();
    });
  },
);
