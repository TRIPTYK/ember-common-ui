import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  click,
  fillIn,
  pauseTest,
  render,
  type TestContext,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'yup';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import DummyInput from 'dummy/components/dummy-input';

interface ComponentTestContext extends TestContext {
  changeset: ImmerChangeset;
  onSubmit: () => void;
  validationSchema: any;
  reactive: boolean;
  removeErrorsOnSubmit: boolean;
}

module('Integration | Component | tpk-form', function (hooks) {
  setupRenderingTest(hooks);

  async function setupComponent(
    this: TestContext,
    params?: {
      changeset?: ImmerChangeset;
      onSubmit?: (...args: unknown[]) => void;
      validationSchema?: any;
      reactive?: boolean;
      removeErrorsOnSubmit?: boolean;
    },
  ) {
    this.set('changeset', params?.changeset ?? new ImmerChangeset({}));
    this.set('onSubmit', params?.onSubmit ?? (() => {}));
    this.set('validationSchema', params?.validationSchema ?? object());
    this.set('reactive', params?.reactive);
    this.set('removeErrorsOnSubmit', params?.removeErrorsOnSubmit);

    await render(
      hbs`<TpkForm
          @changeset={{this.changeset}} @validationSchema={{this.validationSchema}} @onSubmit={{this.onSubmit}}
          @reactive={{this.reactive}}
          @removeErrorsOnSubmit={{this.removeErrorsOnSubmit}}
          @executeOnValid={{this.executeOnValid}}
        as |F|>
          <F.TpkInput @validationField="name" />
          <F.TpkInput @type="email" @validationField="email" as |I|>
            <I.Label />
            <I.Input />
          </F.TpkInput>
          <button type="submit">Submit</button>
        </TpkForm>`,
    );
  }

  test('TpkForm can invoke custom registered inputs from service', async function () {
    let tpkFormService = this.owner.lookup(
      'service:tpk-form',
    ) as TpkFormService;

    tpkFormService.TpkInput = DummyInput;

    await setupComponent.call(this);

    assert.dom(`[data-test-dummy-input="name"]`).exists();
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
});
