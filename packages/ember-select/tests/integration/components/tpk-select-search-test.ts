/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import tpkSelectSearch from 'dummy/tests/pages/tpk-select-search';

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
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
        <S.Input @onInput={{this.onInput}} />
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

  test('it select default', async function (assert) {
    assert.expect(0);
  });

  test('Open combobox key Space does not close and select', async function (assert) {
    //open the selectBox
    await tpkSelectSearch.button.enter();

    await tpkSelectSearch.button.space();
    assert.strictEqual(tpkSelectSearch.button.isExpanded, 'true');
  });

  /**
   * Sets the value to the content of input.
      Closes the listbox.
   */
  test('Set value in the input when no option selected', async function (assert) {
    const fillValue = 'other';
    await tpkSelectSearch.button.click();
    assert.strictEqual(tpkSelectSearch.button.isExpanded, 'true');
    assert.strictEqual(tpkSelectSearch.isOpen, 'true');

    await tpkSelectSearch.input.fillIn(fillValue);
    await tpkSelectSearch.button.enter();

    assert.strictEqual(tpkSelectSearch.button.isExpanded, 'false');
    assert.strictEqual(tpkSelectSearch.isOpen, 'false');
    assert.strictEqual(tpkSelectSearch.button.text, fillValue);
  });
});
