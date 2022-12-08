/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it select default', async function (assert) {
    assert.expect(0);
    this.set('selectElement', (e: string) => {
      this.set('selected', e);
    });
    this.set('onInput', () => {
      this.set('options', ['c', 'b', 'a']);
    });
    this.set('selected', undefined);
    this.set('options', ['a', 'b', 'c']);

    await render(hbs`
    <TpkSelectSearch
      @label='Select something'
      @options={{this.options}}
      @onChange={{this.selectElement}}
      @selected={{this.selected}}
      class="tpk-select-search"
    as |S|>
      <S.Label />
      <div class="tpk-select-search-container">
        <S.Input @inputChanged={{this.onInput}} />
        <S.Button>
        <svg width="18" height="16" aria-hidden="true" focusable="false">
          <polygon class="arrow" stroke-width="0" fill-opacity="0.75" fill="currentcolor" points="3,6 15,6 9,14"></polygon>
        </svg>
        </S.Button>
      </div>
      <S.Options as |Opts|>
        <Opts as |opt|>
        {{opt.option}}
        </Opts>
      </S.Options>
    </TpkSelectSearch>
    <a href="#">Focusable element</a>
    `);
  });
});
