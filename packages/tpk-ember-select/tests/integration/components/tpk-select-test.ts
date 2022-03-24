import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('selected', []);
    this.set('options', ['a', 'b', 'c']);
    this.set('selectElement', (e: string, alreadySelected: boolean) => {
      // eslint-disable-next-line ember/no-get
      const selected = this.get('selected') as string[];
      this.set(
        'selected',
        alreadySelected ? selected.filter((s) => s !== e) : [...selected, e]
      );
    });

    await render(hbs`
      <TpkSelect 
        @multiple={{true}} 
        @options={{this.options}} 
        @selected={{this.selected}} 
        @selectElement={{this.selectElement}} 
        as |S|>
        <S.Label />
        <S.Container as |C|>
          <C.Button as |selected|>
              <span class="text-red-400">{{selected}}</span>
          </C.Button>
          <C.Options as |Opts|>
            <Opts as |Opt|>
              <span class={{if Opt.isSelected "text-green-400"}}>{{Opt.option}}</span>
            </Opts>
          </C.Options>
        </S.Container>
      </TpkSelect>
    `);

    await this.pauseTest();

    assert.expect(0);
  });
});
