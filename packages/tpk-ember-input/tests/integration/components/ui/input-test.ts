import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fillIn from '@ember/test-helpers/dom/fill-in';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | ui/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const labelStyle = 'labelou';
    const inputStyle = 'check-i';
    const label = 'Label';
    const containerStyle = 'check-c';
    const value = 'hey';
    const name = 'wlh';
    const mandatory = true;
    const setValue = (value: string) => {
      this.set('value', value);
    };

    this.set('value', value);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelStyle', labelStyle);
    this.set('inputStyle', inputStyle);
    this.set('containerStyle', containerStyle);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputStyle={{this.inputStyle}}
        @labelStyle={{this.labelStyle}}
        @containerStyle={{this.containerStyle}}
        @label={{this.label}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        @updateValue={{this.setValue}}
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
    // await this.pauseTest();
    // Class
    assert
      .dom(document.querySelector('[data-test-input-content]'))
      .hasClass(inputStyle);
    assert
      .dom(document.querySelector(`[data-test-input]`))
      .hasClass(containerStyle);
    assert
      .dom(document.querySelector('[data-test-input-label]'))
      .hasClass(labelStyle);

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
    const labelStyle = 'labelou';
    const inputStyle = 'check-i';
    const label = 'Label';
    const containerStyle = 'check-c';
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
    this.set('labelStyle', labelStyle);
    this.set('inputStyle', inputStyle);
    this.set('containerStyle', containerStyle);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputStyle={{this.inputStyle}}
        @labelStyle={{this.labelStyle}}
        @containerStyle={{this.containerStyle}}
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
    const labelStyle = 'labelou';
    const inputStyle = 'check-i';
    const label = 'Label';
    const containerStyle = 'check-c';
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
    this.set('labelStyle', labelStyle);
    this.set('inputStyle', inputStyle);
    this.set('containerStyle', containerStyle);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputStyle={{this.inputStyle}}
        @labelStyle={{this.labelStyle}}
        @containerStyle={{this.containerStyle}}
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
  test('it renders with error', async function (assert) {
    const labelStyle = 'labelou';
    const inputStyle = 'check-i';
    const label = 'Label';
    const containerStyle = 'check-c';
    const value = 'hey';
    const name = 'error';
    const password = false;
    const mandatory = false;
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('password', password);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelStyle', labelStyle);
    this.set('inputStyle', inputStyle);
    this.set('containerStyle', containerStyle);
    this.set('name', name);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputStyle={{this.inputStyle}}
        @labelStyle={{this.labelStyle}}
        @containerStyle={{this.containerStyle}}
        @label={{this.label}}
        @password={{this.password}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        @hasError={{true}}
        {{on "change" this.setValue}}
      >
        Because we have an error, we add a yield that contains an error
      </Ui::Input>
    `);
    assert
      .dom(document.querySelector('[data-test-container]'))
      .hasClass('error');
  });
  test('it renders with tooltip', async function (assert) {
    const labelStyle = 'labelou';
    const inputStyle = 'check-i';
    const label = 'Label';
    const containerStyle = 'check-c';
    const value = 'hey';
    const name = 'error';
    const password = false;
    const mandatory = false;
    const infoTooltip = 'my custom message';
    const setValue = (event: InputEvent) => {
      const value: string = (event.target as HTMLInputElement).value;
      this.set('value', value);
    };

    this.set('value', value);
    this.set('password', password);
    this.set('label', label);
    this.set('mandatory', mandatory);
    this.set('labelStyle', labelStyle);
    this.set('inputStyle', inputStyle);
    this.set('containerStyle', containerStyle);
    this.set('name', name);
    this.set('infoTooltip', infoTooltip);
    this.set('setValue', setValue);

    await render(hbs`
      <Ui::Input
        @inputStyle={{this.inputStyle}}
        @labelStyle={{this.labelStyle}}
        @containerStyle={{this.containerStyle}}
        @label={{this.label}}
        @password={{this.password}}
        @value={{this.value}}
        @name={{this.name}}
        @mandatory={{this.mandatory}}
        @infoTooltip={{this.infoTooltip}}
        {{on "change" this.setValue}}
      />
    `);
    assert
      .dom(document.querySelector('[data-test-container]'))
      .hasClass('tooltipInfo');
  });
});
