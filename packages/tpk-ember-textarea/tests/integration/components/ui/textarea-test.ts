import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | ui/textarea', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders with limit', async function (assert) {
    const cols = 4;
    const rows = 5;
    const limit = 10;
    const name = 'Limit';
    const label = 'Tell me something';
    const textareaStyle = 'love';
    const labelStyle = 'labelClass';
    const containerStyle = 'w-96';
    const value = 'incompétence';
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('limit', limit);
    this.set('cols', cols);
    this.set('name', name);
    this.set('rows', rows);
    this.set('label', label);
    this.set('textareaStyle', textareaStyle);
    this.set('labelStyle', labelStyle);
    this.set('containerStyle', containerStyle);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Textarea
        @labelStyle={{this.labelStyle}}
        @textareaStyle={{this.textareaStyle}}
        @containerStyle={{this.containerStyle}}
        @rows={{this.rows}}
        @cols={{this.cols}}
        @label={{this.label}}
        @name={{this.name}}
        @limit={{this.limit}}
        @value={{this.value}}
        {{on "change" this.setValue}}
      />
    `);

    assert.dom(document.querySelector('[data-test-textarea-limit]')).exists();
    let actualSize = value.length;
    assert
      .dom(document.querySelector('[data-test-textarea-limit]'))
      .hasText(`Caractères : ${actualSize}/${limit}`);

    const newValue = 'wshlamiff';
    await fillIn('[data-test-textarea-content]', newValue);
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-textarea-content]'))
        ?.value,
      newValue
    );
    actualSize = newValue.length;
    assert
      .dom(document.querySelector('[data-test-textarea-limit]'))
      .hasText(`Caractères : ${actualSize}/${limit}`);
  });
  test('it renders with error', async function (assert) {
    const cols = 4;
    const rows = 5;
    const name = 'Error';
    const label = 'Tell me something';
    const textareaStyle = 'love';
    const labelStyle = 'labelClass';
    const containerStyle = 'w-96';
    const value = 'incompétence';
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('cols', cols);
    this.set('name', name);
    this.set('rows', rows);
    this.set('label', label);
    this.set('textareaStyle', textareaStyle);
    this.set('labelStyle', labelStyle);
    this.set('containerStyle', containerStyle);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Textarea
        @labelStyle={{this.labelStyle}}
        @textareaStyle={{this.textareaStyle}}
        @containerStyle={{this.containerStyle}}
        @rows={{this.rows}}
        @cols={{this.cols}}
        @label={{this.label}}
        @name={{this.name}}
        @limit={{this.limit}}
        @value={{this.value}}
        @hasError={{true}}
        {{on "change" this.setValue}}
      >
        Because we have an error, we add a yield that contains an error
      </Ui::Textarea>
    `);

    assert
      .dom(document.querySelector('[data-test-container]'))
      .hasClass('error');
  });
  test('it renders with tooltip', async function (assert) {
    const cols = 4;
    const rows = 5;
    const name = 'Error';
    const label = 'Tell me something';
    const textareaStyle = 'love';
    const labelStyle = 'labelClass';
    const containerStyle = 'w-96';
    const infoTooltip = 'my custom message';
    const value = 'incompétence';
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('cols', cols);
    this.set('name', name);
    this.set('rows', rows);
    this.set('label', label);
    this.set('textareaStyle', textareaStyle);
    this.set('labelStyle', labelStyle);
    this.set('infoTooltip', infoTooltip);
    this.set('containerStyle', containerStyle);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Textarea
        @labelStyle={{this.labelStyle}}
        @textareaStyle={{this.textareaStyle}}
        @containerStyle={{this.containerStyle}}
        @rows={{this.rows}}
        @cols={{this.cols}}
        @label={{this.label}}
        @name={{this.name}}
        @limit={{this.limit}}
        @value={{this.value}}
        @infoTooltip={{this.infoTooltip}}
        {{on "change" this.setValue}}
      >
        Because we have an error, we add a yield that contains an error
      </Ui::Textarea>
    `);

    assert
      .dom(document.querySelector('[data-test-container]'))
      .hasClass('tooltipInfo');
  });
});
