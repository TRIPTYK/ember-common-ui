import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | ui/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    const argsDTO = {
      label: 'coucou',
      name: 'simpson',
      value: 'trucmuche',
      checked: true,
      imageUrl: '/assets/icons/check.svg',
      containerStyle: 'bg-red-100',
      checkboxStyle: 'appearance-none w-14 h-14 bg-yellow-500',
      labelStyle: 'text-gray-600 text-3xl',
    };
    this.set('argsDTO', argsDTO);
    await render(hbs`<Ui::Checkbox
    @label={{this.argsDTO.label}}
    @checked={{this.argsDTO.checked}}
    @name={{this.argsDTO.name}}
    @value={{this.argsDTO.value}}
    @imageUrl={{this.argsDTO.imageUrl}}    
    @containerStyle={{this.argsDTO.containerStyle}}    
    @checkboxStyle={{this.argsDTO.checkboxStyle}}    
    @labelStyle={{this.argsDTO.labelStyle}}    
  />`);
    assert.dom('[data-test-checkbox-label]').hasText(argsDTO.label);
    // assert.dom('[data-test-checkbox-content]').
    assert.equal(
      find('[data-test-checkbox-content]')?.getAttribute('name'),
      argsDTO.name
    );
    assert.dom('[data-test-checkbox-content]').isChecked();
    assert.dom('[data-test-checkbox-content]').hasValue(argsDTO.value);
    assert.true(
      find('[data-test-checkbox-content]')
        ?.getAttribute('style')
        ?.includes(argsDTO.imageUrl)
    );
    assert.true(
      find('[data-test-checkbox-content]')
        ?.getAttribute('class')
        ?.includes(argsDTO.checkboxStyle)
    );
    assert.true(
      find('[data-test-checkbox-container]')
        ?.getAttribute('class')
        ?.includes(argsDTO.containerStyle)
    );
    assert.true(
      find('[data-test-checkbox-label]')
        ?.getAttribute('class')
        ?.includes(argsDTO.labelStyle)
    );

    // await this.pauseTest();

    // assert.equal(this.element.textContent?.trim(), '');
  });
  test('it checks', async function (assert) {
    const argsDTO = {
      label: 'coucou',
      name: 'simpson',
      value: 'trucmuche',
      checked: false,
      imageUrl: '/assets/icons/check.svg',
      containerStyle: 'bg-red-100',
      checkboxStyle: 'appearance-none w-14 h-14 bg-yellow-500',
      labelStyle: 'text-gray-600 text-3xl',
    };
    this.set('argsDTO', argsDTO);
    await render(hbs`<Ui::Checkbox
    @label={{this.argsDTO.label}}
    @checked={{this.argsDTO.checked}}
    @name={{this.argsDTO.name}}
    @value={{this.argsDTO.value}}
    @imageUrl={{this.argsDTO.imageUrl}}    
    @containerStyle={{this.argsDTO.containerStyle}}    
    @checkboxStyle={{this.argsDTO.checkboxStyle}}    
    @labelStyle={{this.argsDTO.labelStyle}}    
  />`);

    await click('[data-test-checkbox-content]');
    assert.dom('[data-test-checkbox-content]').isChecked();
  });
  test('it has error', async function (assert) {
    const argsDTO = {
      label: 'coucou',
      name: 'simpson',
      value: 'trucmuche',
      checked: false,
      imageUrl: '/assets/icons/check.svg',
      containerStyle: 'bg-red-100',
      checkboxStyle: 'appearance-none w-14 h-14 bg-yellow-500',
      labelStyle: 'text-gray-600 text-3xl',
    };
    this.set('argsDTO', argsDTO);
    await render(hbs`<Ui::Checkbox
    @label={{this.argsDTO.label}}
    @checked={{this.argsDTO.checked}}
    @name={{this.argsDTO.name}}
    @value={{this.argsDTO.value}}
    @imageUrl={{this.argsDTO.imageUrl}}    
    @containerStyle={{this.argsDTO.containerStyle}}    
    @checkboxStyle={{this.argsDTO.checkboxStyle}}    
    @labelStyle={{this.argsDTO.labelStyle}}   
    @hasError={{true}}
  />`);

    assert.dom('[data-test-checkbox]').hasClass('error');
  });
});
