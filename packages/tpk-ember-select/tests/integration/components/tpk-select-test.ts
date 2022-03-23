import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('selected', undefined);
    this.set('options', ['a', 'b', 'c']);
    this.set('selectElement', (e: string) => {
      this.set('selected', e);
    });

    await render(hbs`
    <TpkSelect @options={{this.options}} @selected={{this.selected}} @selectElement={{this.selectElement}} as |S|>
      <S.Label />
      <S.Container as |C|>
        <C.Button as |selected|>
            <span class="text-red-400">{{selected}}</span>
        </C.Button>
        <C.Options as |Opts|>
          <Opts as |Opt|>
            {{Opt}}
          </Opts>
        </C.Options>
      </S.Container>
    </TpkSelect>`);

    await this.pauseTest();

    assert.expect(0);
  });
});
