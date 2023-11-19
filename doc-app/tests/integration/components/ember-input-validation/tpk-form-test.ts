import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { pauseTest, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object } from 'yup';

module('Integration | Component | tpk-form', function (hooks) {
  setupRenderingTest(hooks);

  test('TpkForm', async function () {
    this.set('changeset', new ImmerChangeset({}));
    this.set('onSubmit', () => {});
    this.set('validationSchema', object().shape({}));

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
