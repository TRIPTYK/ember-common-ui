import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | ui/textarea', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const cols = 4;
    const rows = 4;
    const label = 'textarea';
    const inputStyle = 'love';
    const labelStyle = 'dramix';
    const containerStyle = 'seb';
    const value = 'incompétence';
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('cols', cols);
    this.set('rows', rows);
    this.set('label', label);
    this.set('inputStyle', inputStyle);
    this.set('labelStyle', labelStyle);
    this.set('containerStyle', containerStyle);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Textarea
        @labelStyle={{this.labelStyle}}
        @inputStyle={{this.inputStyle}}
        @containerStyle={{this.containerStyle}}
        @rows={{this.rows}}
        @cols={{this.cols}}
        @label={{this.label}}
        @name={{this.name}}
        @value={{this.value}}
        {{on "change" this.setValue}}
      />
    `);

    assert.dom('[data-test-textarea]').hasClass(containerStyle);
    assert.dom('[data-test-textarea-label]').hasClass(labelStyle);
    assert.dom('[data-test-textarea-input]').hasClass(inputStyle);
    assert.dom('[data-test-textarea-label]').hasText(label);
    assert.equal(
      document
        .querySelector('[data-test-textarea-input]')
        ?.getAttribute('rows'),
      rows
    );
    assert.equal(
      document
        .querySelector('[data-test-textarea-input]')
        ?.getAttribute('cols'),
      cols
    );
    assert.dom('[data-test-textarea-input]').hasValue(value);
    const newValue = 'acceptance';
    await fillIn('[data-test-textarea-input]', newValue);
    assert.dom('[data-test-textarea-input]').hasValue(newValue);
  });
});
