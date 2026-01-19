import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { changesetGet, ImmerChangeset } from 'ember-immer-changeset';
import { object, string, array } from 'yup';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import DummyInput from 'doc-app/components/dummy-input';
import { setupIntl } from 'ember-intl/test-support';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { on } from '@ember/modifier';
import { concat, array as arrayHelper } from '@ember/helper';
import { setupComponent } from './generic-test-functions/setup-prefab-component';



module('Integration | Component | tpk-form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  test('TpkForm can invoke custom registered inputs from service', async function () {
    const tpkFormService = this.owner.lookup(
      'service:tpk-form',
    ) as unknown as TpkFormService;

    tpkFormService.TpkInput = DummyInput;

    await setupComponent();

    assert.dom(`[data-test-dummy-input="email"]`).exists();
  });

  test('it validates the changeset when a field is set if reactive is true', async function (assert) {
    const changeset = await setupComponent( {
      reactive: true,
      validationSchema: object().shape({
        email: string().email().required(),
      }),
    });

    assert.false(changeset.isInvalid);

    await fillIn('input[type="email"]', 'test');

    assert.true(changeset.isInvalid);
  });

  test('It executes the changeset when submit is triggered and changeset is valid', async function (assert) {
    const changeset = await setupComponent( {
      validationSchema: object().shape({
        email: string().email().required(),
      }),
    });

    assert.false(changeset.isInvalid);

    await fillIn('input[type="email"]', 'truc@gmail.com');

    await click('button[type="submit"]');

    assert.strictEqual(changeset.get('email'), 'truc@gmail.com');
  });

  test('It triggers @onSubmit with changeset as parameter when changeset is valid', async function (assert) {
    const changeset = await setupComponent( {
      validationSchema: object().shape({
        email: string().email().required(),
      }),
      onSubmit: (changeset) => {
        assert.strictEqual(changeset, changeset);
        assert.step('onSubmit');
      },
    });

    assert.false(changeset.isInvalid);

    await fillIn('input[type="email"]', 'truc@gmail.com');

    await click('button[type="submit"]');

    assert.verifySteps(['onSubmit']);
  });

  test('Should display an asterisk in the label upon initialization of the form and when adding an element', async function (assert) {
     const changeset = new ImmerChangeset({
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
      });
    const onSubmit = () => {};
    const reactive = true;
    const validationSchema = object({
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
      });
    const addLevel =  () => {
      changeset.set('levels', [
        ...changeset.get('levels'),
        {
          name: '',
          grade: 0,
        },
      ]);
    };

    await render(
      <template>
      <TpkForm
          @changeset={{changeset}} @validationSchema={{validationSchema}} @onSubmit={{onSubmit}}
          @reactive={{reactive}}
          @executeOnValid={{true}}
        as |F|>
          <F.TpkInputPrefab @label="Email" @type="email" @validationField="email" data-test-email />
          <F.TpkInputPrefab @label="Street" @validationField="address.street" data-test-address-street />
          <F.TpkInputPrefab @label="City" @validationField="address.city" data-test-address-city />
          {{#each (changesetGet changeset "levels") as |level index|}}
            <F.TpkInputPrefab @label="Level name" @validationField={{concat "levels." index ".name"}} data-test-level-name={{index}} />
            <F.TpkInputPrefab @label="Level grade" @validationField={{concat "levels." index ".grade"}} data-test-level-grade={{index}} />
          {{/each}}
          <F.TpkSelectPrefab @multiple={{true}} @label="Languages" @validationField="languages" @options={{arrayHelper "French" "English" "Dutch"}} />
          <button type="button" {{on "click" addLevel}} data-test-add-level>Add level</button>
          <button type="submit">Submit</button>
        </TpkForm>
      </template>
    );
    assert.dom('[data-test-email]').includesText('*');
    assert.dom('[data-test-address-street]').includesText('*');
    assert.dom('[data-test-address-city]').doesNotIncludeText('*');
    assert.dom('[data-test-level-name="0"]').includesText('*');
    assert.dom('[data-test-level-grade="0"]').doesNotIncludeText('*');
    assert.dom('[data-test-level-name]').exists({ count: 1 });
    await click('[data-test-add-level]');
    assert.dom('[data-test-level-grade]').exists({ count: 2 });
    assert.dom('[data-test-level-name="1"]').includesText('*');
    assert.dom('[data-test-level-grade="1"]').doesNotIncludeText('*');
  });
});
