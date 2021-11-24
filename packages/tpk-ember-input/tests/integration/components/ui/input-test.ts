import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fillIn from '@ember/test-helpers/dom/fill-in';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | ui/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const labelClass = 'labelou';
    const inputClass = 'check-i';
    const label = 'Label';
    const containerClass = 'check-c';
    const value = 'hey';
    const name = 'wlh';
    const mandatory = true;
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelClass', labelClass);
    this.set('inputClass', inputClass);
    this.set('containerClass', containerClass);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputClasses={{this.inputClass}}
        @labelClasses={{this.labelClass}}
        @containerClasses={{this.containerClass}}
        @label={{this.label}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        {{on "change" this.setValue}}
      />
    `);

    //Attr
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.value,
      value
    );
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.name,
      name
    );
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.id,
      name
    );

    // Class
    assert
      .dom(document.querySelector('[data-test-input-content]'))
      .hasClass(inputClass);
    assert
      .dom(document.querySelector('[data-test-input]'))
      .hasClass(containerClass);
    assert
      .dom(document.querySelector('[data-test-input-label]'))
      .hasClass(labelClass);

    assert.dom('[data-test-input-label]').hasText(`${label}*`);

    const newValue = 'wsh';
    await fillIn('[data-test-input-content]', newValue);
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.value,
      newValue
    );
  });

  test('it renders with limit', async function (assert) {
    const labelClass = 'labelou';
    const inputClass = 'check-i';
    const label = 'Label';
    const containerClass = 'check-c';
    const value = 'hey';
    const name = 'wlh';
    const limit = 100;
    const mandatory = true;
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('limit', limit);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelClass', labelClass);
    this.set('inputClass', inputClass);
    this.set('containerClass', containerClass);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputClasses={{this.inputClass}}
        @labelClasses={{this.labelClass}}
        @containerClasses={{this.containerClass}}
        @label={{this.label}}
        @limit={{this.limit}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        {{on "change" this.setValue}}
      />
    `);

    assert.dom(document.querySelector('[data-test-input-limit]')).exists();
    let actualSize = value.length;
    assert
      .dom(document.querySelector('[data-test-input-limit]'))
      .hasText(`Caractères : ${actualSize}/${limit}`);

    const newValue = 'wshlamiff';
    await fillIn('[data-test-input-content]', newValue);
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.value,
      newValue
    );
    actualSize = newValue.length;
    assert
      .dom(document.querySelector('[data-test-input-limit]'))
      .hasText(`Caractères : ${actualSize}/${limit}`);
  });

  test('it renders with password', async function (assert) {
    const labelClass = 'labelou';
    const inputClass = 'check-i';
    const label = 'Label';
    const containerClass = 'check-c';
    const value = 'hey';
    const name = 'wlh';
    const limit = 100;
    const password = true;
    const mandatory = true;
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('limit', limit);
    this.set('password', password);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelClass', labelClass);
    this.set('inputClass', inputClass);
    this.set('containerClass', containerClass);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputClasses={{this.inputClass}}
        @labelClasses={{this.labelClass}}
        @containerClasses={{this.containerClass}}
        @label={{this.label}}
        @password={{this.password}}
        @limit={{this.limit}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        type="password"
        {{on "change" this.setValue}}
      />
    `);
    assert
      .dom(document.querySelector('[data-test-input-password-button]'))
      .exists();
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.type,
      'password'
    );
    await click('[data-test-input-password-button]');
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.type,
      'text'
    );
    await click('[data-test-input-password-button]');
    assert.equal(
      (<HTMLInputElement>document.querySelector('[data-test-input-content]'))
        ?.type,
      'password'
    );
  });
});
