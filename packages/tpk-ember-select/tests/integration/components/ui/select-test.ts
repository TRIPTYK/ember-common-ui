import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | ui/select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const options: {
      id: number;
      text: string;
      value: string | number;
    }[] = [
      { id: 1, text: 'Monkey D. Luffy', value: 1 },
      { id: 1, text: 'Joe Boy', value: 2 },
      { id: 2, text: 'Gol D. Roger', value: 5678 },
    ];
    const placeholder = 'Select a value';
    const label = 'Choose your captain';
    const key = 'text';
    this.set('options', options);
    this.set('placeholder', placeholder);
    this.set('label', label);
    this.set('key', key);
    await render(hbs`
      <Ui::Select 
        @label={{this.label}}
        @options={{this.options}}
        @placeholder={{this.placeholder}}
        @key={{this.key}}
      />
    `);
    assert
      .dom(document.querySelector('[data-test-select-label]'))
      .hasText(label);
    assert
      .dom(document.querySelector('[data-test-select-btn-content]'))
      .hasText(placeholder);

    await click('[data-test-select-btn]');

    assert.strictEqual(
      document.querySelectorAll('[data-test-select-option]').length,
      options.length
    );

    assert
      .dom(document.querySelectorAll('[data-test-select-option-content]')[0])
      .hasText(options[0][key]);
  });

  test('it selects', async function (assert) {
    const options: {
      id: number;
      text: string;
      value: string | number;
    }[] = [
      { id: 1, text: 'Monkey D. Luffy', value: 1 },
      { id: 1, text: 'Joe Boy', value: 2 },
      { id: 2, text: 'Gol D. Roger', value: 5678 },
    ];
    const placeholder = 'Select a value';
    const label = 'Choose your captain';
    const key = 'text';

    const setValue = (value: any) => {
      this.set('value', value.value);
    };

    this.set('options', options);
    this.set('placeholder', placeholder);
    this.set('label', label);
    this.set('key', key);
    this.set('key', key);
    this.set('value', '');
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Select 
        @label={{this.label}}
        @options={{this.options}}
        @placeholder={{this.placeholder}}
        @updateValue={{this.setValue}}
        @selectedValue={{this.value}}
        @key={{this.key}}
      />
    `);

    await click('[data-test-select-btn]');
    assert
      .dom(document.querySelectorAll('[data-test-select-option-content]')[0])
      .hasText(options[0][key]);

    await click(
      document.querySelectorAll('[data-test-select-option-content]')[0]
    );
    assert
      .dom(document.querySelector('[data-test-select-btn-content]'))
      .hasText(options[0][key]);
  });
});
