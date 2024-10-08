/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import tpkSelect from 'dummy/tests/pages/tpk-select';

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  // eslint-disable-next-line no-undef
  async function setupCombo(this: TestContext) {
    this.set('selected', {
      id: '1',
      lastName: 'Doe',
      firstName: 'John',
    });
    this.set('options', [
      {
        id: '1',
        lastName: 'Doe',
        firstName: 'John',
      },
      {
        id: '2',
        lastName: 'Jane',
        firstName: 'Henri',
      },
      {
        id: '3',
        lastName: 'Fuzzy',
        firstName: 'Kim',
      },
    ]);
    this.set('onChange', (e: string) => {
      this.set('selected', e);
    });
    this.set('buildSuggestion', (e: string) => {
      return `Ajouter ${e}`;
    });
    await render(hbs`
    <TpkSelectCreate @label="Utilisateur" @options={{this.options}} @onChange={{this.onChange}} @onCreate={{this.onChange}} @buildSuggestion={{this.buildSuggestion}} @selected={{this.selected}} as |S|>
      <S.Option as |o|>
        {{o.option.firstName}} {{o.option.lastName}}
      </S.Option>
    </TpkSelectCreate>
    `);
  }

  test('it renders', async function (assert) {
    await setupCombo.call(this);
    await this.pauseTest();
  });
});
