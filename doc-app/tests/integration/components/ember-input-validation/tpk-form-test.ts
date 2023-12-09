import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { pauseTest, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object } from 'yup';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import DummyInput from 'dummy/components/dummy-input';

module('Integration | Component | tpk-form', function (hooks) {
  setupRenderingTest(hooks);

  test('TpkForm', async function () {
    this.set('changeset', new ImmerChangeset({}));
    this.set('onSubmit', () => {});
    this.set('validationSchema', object().shape({}));

    let tpkFormService = this.owner.lookup('service:tpk-form') as TpkFormService;

    tpkFormService.TpkInput = DummyInput;

    await render(
      hbs`<TpkForm @changeset={{this.changeset}} @validationSchema={{this.validationSchema}} @onSubmit={{this.onSubmit}} as |F|>
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
        <F.TpkInput @validationField="name" />
      </TpkForm>`,
    );

    await pauseTest()
  });
});
