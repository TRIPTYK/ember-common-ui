import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, fillIn, find, render } from '@ember/test-helpers';
import { object, string } from 'zod';
import ImmerChangeset from 'ember-immer-changeset';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import TpkFormService from 'doc-app/services/tpk-form';
import IntlService from 'ember-intl/services/intl';

describe('tpk-form', () => {
  renderingTest(
    'Should pass errors to the prefab inputs when the changeset is invalid upon submission',
    async (c) => {
      const changeset = new ImmerChangeset({});
      const schema = object({
        name: string().min(
          10,
          'Too small: expected string to have >=10 characters'
        ),
        email: string().email('Invalid email address'),
      });

      c.env.owner.register('service:tpk-form', TpkFormService);
      c.env.owner.register('service:intl', IntlService);
      c.env.owner.lookup('service:intl').setLocale('en-us');

      const onSubmit = () => {
        // no-op
      };

      await render(
        <template>
          <TpkForm
            @changeset={{changeset}}
            @validationSchema={{schema}}
            @onSubmit={{onSubmit}}
            @reactive={{true}}
            @autoScrollOnError={{true}}
            @removeErrorsOnSubmit={{true}}
            @executeOnValid={{true}}
            as |F|
          >
            <F.TpkInputPrefab
              data-test-name
              @label="test"
              @validationField="name"
            />
            <F.TpkInput
              @label="test"
              @type="email"
              @validationField="email"
              as |I|
            >
              <I.Label />
              <I.Input />
            </F.TpkInput>
            <button type="submit">Submit</button>
          </TpkForm>
        </template>
      );

      expect(changeset.isInvalid).toBe(false);

      await fillIn('[data-test-name] input', 't@g.com');

      await click('button[type="submit"]');

      expect(changeset.isInvalid).toBe(true);
      expect(find('[data-test-tpk-validation-errors]')).toBeTruthy();
      expect(find('[data-test-tpk-validation-errors]')?.textContent).toContain(
        'Too small: expected string to have >=10 characters'
      );
    }
  );
});
