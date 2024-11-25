import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, fillIn, render, type TestContext } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, array, Schema } from 'yup';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import DummyInput from 'doc-app/components/dummy-input';
import { setupIntl } from 'ember-intl/test-support';
import { timeout } from 'ember-concurrency';

interface ComponentTestContext extends TestContext {
  changeset: ImmerChangeset;
  onSubmit: () => void;
  validationSchema: Schema;
  reactive: boolean;
  removeErrorsOnSubmit: boolean;
}

module('Integration | Component | tpk-form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  async function setupComponent(
    this: TestContext,
    params?: {
      changeset?: ImmerChangeset;
      onSubmit?: (...args: unknown[]) => void;
      validationSchema?: Schema;
      reactive?: boolean;
      removeErrorsOnSubmit?: boolean;
      autoScrollOnError?: boolean;
    },
  ) {
    this.set('changeset', params?.changeset ?? new ImmerChangeset({}));
    this.set('onSubmit', params?.onSubmit ?? (() => {}));
    this.set('validationSchema', params?.validationSchema ?? object());
    this.set('reactive', params?.reactive);
    this.set('removeErrorsOnSubmit', params?.removeErrorsOnSubmit);
    this.set('autoScrollOnError', params?.autoScrollOnError);

    await render(
      hbs`<TpkForm
          @changeset={{this.changeset}}
          @validationSchema={{this.validationSchema}}
          @onSubmit={{this.onSubmit}}
          @reactive={{this.reactive}}
          @autoScrollOnError={{this.autoScrollOnError}}
          @removeErrorsOnSubmit={{this.removeErrorsOnSubmit}}
          @executeOnValid={{this.executeOnValid}}
        as |F|>
          <F.TpkInputPrefab @validationField="name" />
          <F.TpkInput anchorScrollUp="email" @type="email" @validationField="email" as |I|>
            <I.Label />
            <I.Input />
          </F.TpkInput>
          <button type="submit">Submit</button>
        </TpkForm>`,
    );
  }

  test('TpkForm can invoke custom registered inputs from service', async function () {
    const tpkFormService = this.owner.lookup(
      'service:tpk-form',
    ) as unknown as TpkFormService;

    tpkFormService.TpkInput = DummyInput;

    await setupComponent.call(this);

    assert.dom(`[data-test-dummy-input="email"]`).exists();
  });

  module('Autoscroll on error', function (hooks) {
    let originalScrollTo: () => void;
    let callCount = 0;

    hooks.beforeEach(function () {
      originalScrollTo = window.scrollTo;
      window.scrollTo = () => {
        callCount++;
      };
    });

    hooks.afterEach(function () {
      window.scrollTo = originalScrollTo;
      callCount = 0;
    });

    test<ComponentTestContext>('when autoScrollOnError is true, it scrolls the page to the first error', async function (assert) {
      await setupComponent.call(this, {
        validationSchema: object().shape({
          email: string().email().required(),
        }),
        autoScrollOnError: true,
      });

      this.changeset.addError({
        message: 'required',
        value: false,
        originalValue: true,
        key: 'email',
      });

      await timeout(50);
      assert.strictEqual(callCount, 1);
    });

    test<ComponentTestContext>('when autoScrollOnError is false, it does not scrolls the page to the first error', async function (assert) {
      await setupComponent.call(this, {
        validationSchema: object().shape({
          email: string().email().required(),
        }),
        autoScrollOnError: false,
      });

      this.changeset.addError({
        message: 'required',
        value: false,
        originalValue: true,
        key: 'email',
      });

      await timeout(50);
      assert.strictEqual(callCount, 0);
    });
  });

  test<ComponentTestContext>('it validates the changeset when a field is set if reactive is true', async function (assert) {
    await setupComponent.call(this, {
      reactive: true,
      validationSchema: object().shape({
        email: string().email().required(),
      }),
    });

    assert.false(this.changeset.isInvalid);

    await fillIn('input[type="email"]', 'test');

    assert.true(this.changeset.isInvalid);
  });

  test<ComponentTestContext>('It executes the changeset when submit is triggered and changeset is valid', async function (assert) {
    await setupComponent.call(this, {
      validationSchema: object().shape({
        email: string().email().required(),
      }),
    });

    assert.false(this.changeset.isInvalid);

    await fillIn('input[type="email"]', 'truc@gmail.com');

    await click('button[type="submit"]');

    assert.strictEqual(this.changeset.data['email'], 'truc@gmail.com');
  });

  test<ComponentTestContext>('It triggers @onSubmit with changeset as parameter when changeset is valid', async function (assert) {
    await setupComponent.call(this, {
      validationSchema: object().shape({
        email: string().email().required(),
      }),
      onSubmit: (changeset) => {
        assert.strictEqual(changeset, this.changeset);
        assert.step('onSubmit');
      },
    });

    assert.false(this.changeset.isInvalid);

    await fillIn('input[type="email"]', 'truc@gmail.com');

    await click('button[type="submit"]');

    assert.verifySteps(['onSubmit']);
  });

  test<ComponentTestContext>('Should display an asterisk in the label upon initialization of the form and when adding an element', async function (assert) {
    this.set(
      'changeset',
      new ImmerChangeset({
        email: '',
        address: {
          street: 'Chaussée de Binche 177A',
          city: 'Mons',
        },
        levels: [
          {
            name: 'Dev',
            grade: 10,
          },
        ],
        languages: ['French', 'English'],
      }),
    );
    this.set('onSubmit', () => {});
    this.set('reactive', true);
    this.set(
      'validationSchema',
      object({
        email: string().email().required(),
        address: object({
          street: string().required(),
          city: string(),
        }),
        levels: array().of(
          object({
            name: string().required(),
            grade: string(),
          }),
        ),
        languages: array().min(1),
      }),
    );
    this.set('reactive', true);
    this.set('addLevel', () => {
      this.changeset.set('levels', [
        ...this.changeset.get('levels'),
        {
          name: '',
          grade: '',
        },
      ]);
    });

    await render(
      hbs`<TpkForm
          @changeset={{this.changeset}} @validationSchema={{this.validationSchema}} @onSubmit={{this.onSubmit}}
          @reactive={{this.reactive}}
          @executeOnValid={{this.executeOnValid}}
        as |F|>
          <F.TpkInputPrefab @label="Email" @type="email" @validationField="email" data-test-email />
          <F.TpkInputPrefab @label="Street" @validationField="address.street" data-test-address-street />
          <F.TpkInputPrefab @label="City" @validationField="address.city" data-test-address-city />
          {{#each (changeset-get this.changeset "levels") as |level index|}}
            <F.TpkInputPrefab @label="Level name" @validationField={{concat "levels." index ".name"}} data-test-level-name={{index}} />
            <F.TpkInputPrefab @label="Level grade" @validationField={{concat "levels." index ".grade"}} data-test-level-grade={{index}} />
          {{/each}}
          <F.TpkSelectPrefab @multiple={{true}} @label="Languages" @validationField="languages" @options={{array "French" "English" "Dutch"}} />
          <button type="button" {{on "click" this.addLevel}} data-test-add-level>Add level</button>
          <button type="submit">Submit</button>
        </TpkForm>`,
    );
    assert.dom('[data-test-email] .tpk-label').includesText('*');
    assert.dom('[data-test-address-street] .tpk-label').includesText('*');
    assert.dom('[data-test-address-city] .tpk-label').doesNotIncludeText('*');
    assert.dom('[data-test-level-name="0"] .tpk-label').includesText('*');
    assert
      .dom('[data-test-level-grade="0"] .tpk-label')
      .doesNotIncludeText('*');
    assert.dom('[data-test-level-name]').exists({ count: 1 });
    await click('[data-test-add-level]');
    assert.dom('[data-test-level-grade]').exists({ count: 2 });
    assert.dom('[data-test-level-name="1"] .tpk-label').includesText('*');
    assert
      .dom('[data-test-level-grade="1"] .tpk-label')
      .doesNotIncludeText('*');
  });
});
