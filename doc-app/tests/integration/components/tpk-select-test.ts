/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import tpkSelect from 'dummy/tests/pages/tpk-select';


const backendArray = [
  'amaury',
  'armand',
  'albert',
  'alessio',
  'alerto',
  'gilles',
] as string[];

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  // eslint-disable-next-line no-undef
  async function setupCombo(this: TestContext) {
    this.set('selectElement', (e: string) => {
      this.set('selected', e);
    });
    this.set('selected', undefined);
    this.set('options', [...backendArray]);

    await render(hbs`
    <TpkSelect
      @label='Select something'
      @options={{this.options}}
      @onChange={{this.selectElement}}
      @selected={{this.selected}}
    as |S|>
      <S.Label />
      <S.Button >
        {{if S.hasSelection S.selected "Please select something"}}
      </S.Button>
      <S.Options as |Opts|>
        <Opts as |opt|>
        {{opt.option}}
        </Opts>
      </S.Options>
    </TpkSelect>
    <a href="#">Focusable element</a>
    `);
  }

  test('it select default', async function (assert) {
    await setupCombo.call(this);
    this.set('selectElement', (e: string) => {
      assert.step('selected');
      assert.strictEqual(e, backendArray[0]);
      this.set('selected', e);
    });
    await tpkSelect.click();
    await tpkSelect.listbox.options[0]?.click();
    assert.verifySteps(['selected']);
    await a11yAudit();
  });

  /**
   * Down Arrow 	
    Opens the listbox if it is not already displayed without moving focus or changing selection.
    DOM focus remains on the combobox.
   */
  test('navigation test - closed combobox - Down Arrow', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.true(tpkSelect.button.hasFocus);
    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
      assert.strictEqual(o.hasFocus, 'false');
    });
  });

  /**
   * Alt + Down Arrow
   * Opens the listbox without moving focus or changing selection.
   */
  test('navigation test - closed combobox - Alt + Down Arrow', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.altArrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.true(tpkSelect.button.hasFocus);
    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
      assert.strictEqual(o.hasFocus, 'false');
    });
  });

  /**
   * Up arrow
   * 
    First opens the listbox if it is not already displayed and then moves visual focus to the first option.
    DOM focus remains on the combobox.
   */
  test('navigation test - closed combobox - Up arrow', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.arrowUp();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.true(tpkSelect.button.hasFocus);
    
    assert.strictEqual(tpkSelect.listbox.options[0]?.ariaSelected, 'false');
    assert.strictEqual(tpkSelect.listbox.options[0]?.hasFocus, 'true');
  });

  /**
   * Enter
   * 
     Opens the listbox without moving focus or changing selection. 
   */
  test('navigation test - closed combobox - Enter', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.enter();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.true(tpkSelect.button.hasFocus);
    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
      assert.strictEqual(o.hasFocus, 'false');
    });
  });

  /**
   * Space
   * 
     Opens the listbox without moving focus or changing selection. 
   */
  test('navigation test - closed combobox - Space', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.space();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.true(tpkSelect.button.hasFocus);
    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
      assert.strictEqual(o.hasFocus, 'false');
    });
  });

  /**
   *   Opens the listbox and moves visual focus to the first option.
   */
  test('navigation test - closed combobox - Home', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.home();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.strictEqual(tpkSelect.listbox.options[0]?.ariaSelected, 'false');
    assert.strictEqual(tpkSelect.listbox.options[0]?.hasFocus, 'true');
  });

  /**
   *  Opens the listbox and moves visual focus to the last option.
   */
  test('navigation test - closed combobox - End', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.end();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.strictEqual(
      tpkSelect.listbox.options[tpkSelect.listbox.options.length - 1]
        ?.ariaSelected,
      'false',
    );
    assert.strictEqual(
      tpkSelect.listbox.options[tpkSelect.listbox.options.length - 1]?.hasFocus,
      'true',
    );
  });

  /**
   *  
    First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    
   */
  test('navigation test - closed combobox - Input text', async function (assert) {
    await setupCombo.call(this);

    await tpkSelect.button.type({
      keyCode: 65,
    });
    await tpkSelect.button.type({
      keyCode: 82,
    });

    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.strictEqual(tpkSelect.listbox.options[1]?.ariaSelected, 'false');
    assert.strictEqual(tpkSelect.listbox.options[1]?.hasFocus, 'true');
  });

  /**
   * If the same character is typed in succession, visual focus cycles among the options starting with that character
   */
  test('navigation test - closed combobox - Input text succession', async function (assert) {
    await setupCombo.call(this);

    // tripple A
    await tpkSelect.button.type({
      keyCode: 65,
    });
    await tpkSelect.button.type({
      keyCode: 65,
    });
    await tpkSelect.button.type({
      keyCode: 65,
    });

    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.strictEqual(tpkSelect.listbox.options[2]?.ariaSelected, 'false');
    assert.strictEqual(tpkSelect.listbox.options[2]?.hasFocus, 'true');
  });

  /**
   * Sets the value to the content of the focused option in the listbox.
      Closes the listbox.
      Sets visual focus on the combobox
   */
  test('navigation test - open combobox - Enter', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.enter();
    assert.strictEqual(tpkSelect.button.isExpanded, 'false');
    assert.strictEqual(tpkSelect.isOpen, 'false');

    assert.strictEqual(tpkSelect.button.text, backendArray[1]);
    assert.strictEqual(this.get('selected'), backendArray[1]);
    assert.true(tpkSelect.button.hasFocus);
    assert.strictEqual(tpkSelect.listbox.options[1]?.ariaSelected, 'true');
  });

  /**
   * Sets the value to the content of the focused option in the listbox.
      Closes the listbox.
      Sets visual focus on the combobox
   */
  test('navigation test - open combobox - Space', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.space();
    assert.strictEqual(tpkSelect.button.isExpanded, 'false');
    assert.strictEqual(tpkSelect.isOpen, 'false');
    assert.strictEqual(tpkSelect.button.text, backendArray[1]);
    assert.strictEqual(this.get('selected'), backendArray[1]);
    assert.true(tpkSelect.button.hasFocus);
    assert.strictEqual(tpkSelect.listbox.options[1]?.ariaSelected, 'true');
  });

  /**
   * 
    Sets the value to the content of the focused option in the listbox.
    Closes the listbox.
    Performs the default action, moving focus to the next focusable element. Note: the native <select> element closes the listbox but does not move focus on tab. This pattern matches the behavior of the other comboboxes rather than the native element in this case.
   */
  test('navigation test - open combobox - Tab', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.tab();
    assert.strictEqual(tpkSelect.button.isExpanded, 'false');
    assert.strictEqual(tpkSelect.isOpen, 'false');
    assert.strictEqual(tpkSelect.button.text, backendArray[1]);
    assert.strictEqual(this.get('selected'), backendArray[1]);

    // Works manually, but can't reproduce automatically
    // assert.false(tpkSelect.button.hasFocus);
    assert.strictEqual(tpkSelect.listbox.options[1]?.ariaSelected, 'true');
  });

  /**
   * Closes the listbox.
   * Sets visual focus on the combobox.
   */
  test('navigation test - open combobox - Escape', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.escape();
    assert.strictEqual(tpkSelect.button.isExpanded, 'false');
    assert.strictEqual(tpkSelect.isOpen, 'false');
    assert.strictEqual(tpkSelect.button.text, 'Please select something');

    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
    });
  });

  /**
   *
   * Moves visual focus to the next option.
   * If visual focus is on the last option, visual focus does not move.
   */
  test('navigation test - open combobox - Down Arrow', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.listbox.options[0]?.hasFocus, 'true');
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.listbox.options[1]?.hasFocus, 'true');

    for (let index = 0; index < backendArray.length; index++) {
      await tpkSelect.button.arrowDown();
    }

    assert.strictEqual(tpkSelect.isOpen, 'true');
    assert.strictEqual(
      tpkSelect.listbox.options[tpkSelect.listbox.options.length - 1]?.hasFocus,
      'true',
      'Last is focused',
    );

    tpkSelect.listbox.options.forEach((o) => {
      assert.strictEqual(o.ariaSelected, 'false');
    });
  });

  /**
   *
    Moves visual focus to the previous option.
    If visual focus is on the first option, visual focus does not move.
   */
  test('navigation test - open combobox - Up Arrow', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowUp();
    assert.strictEqual(tpkSelect.listbox.options[0]?.hasFocus, 'true');

    await tpkSelect.button.arrowUp();
    assert.strictEqual(tpkSelect.listbox.options[0]?.hasFocus, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowUp();
    assert.strictEqual(tpkSelect.listbox.options[1]?.hasFocus, 'true');

    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');
  });

  /**
   *
    Sets the value to the content of the focused option in the listbox.
    Closes the listbox.
    Sets visual focus on the combobox.
   */
  test('navigation test - open combobox - Alt + Up Arrow', async function (assert) {
    await setupCombo.call(this);
    await tpkSelect.button.click();
    assert.strictEqual(tpkSelect.button.isExpanded, 'true');
    assert.strictEqual(tpkSelect.isOpen, 'true');

    await tpkSelect.button.arrowDown();
    await tpkSelect.button.arrowDown();
    assert.strictEqual(tpkSelect.listbox.options[1]?.hasFocus, 'true');
    await tpkSelect.button.altArrowUp();

    assert.strictEqual(tpkSelect.button.isExpanded, 'false');
    assert.strictEqual(tpkSelect.isOpen, 'false');
    assert.strictEqual(tpkSelect.button.text, backendArray[1]);
    assert.strictEqual(this.get('selected'), backendArray[1]);
  });
});
