import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { fillIn, find, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationBic from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | Prefabs | tpk-validation-bic', () => {
  renderingTest(
    'let only letters uppercase character go through for 8 first character',
    async ({ env }) => {
      setupTest(env.owner);

      const immerChangeset = new ImmerChangeset({ bic: '' });

      await render(
        <template>
          <TpkValidationBic
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="bic"
          />
        </template>,
      );

      await fillIn('[data-test-tpk-bic-input]', '12121212');
      expect(immerChangeset.get('bic')).toBe('');
      await fillIn('[data-test-tpk-bic-input]', 'aaaaaaaa');
      expect(immerChangeset.get('bic')).toBe('AAAAAAAA');
      await fillIn('[data-test-tpk-bic-input]', 'SEBISSEB');
      expect(immerChangeset.get('bic')).toBe('SEBISSEB');
    },
  );

  renderingTest(
    '3 optional  character after first 8 accept accept uppercase letters and numbers',
    async ({ env }) => {
      setupTest(env.owner);

      const immerChangeset = new ImmerChangeset({ bic: '' });

      await render(
        <template>
          <TpkValidationBic
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="bic"
          />
        </template>,
      );

      await fillIn('[data-test-tpk-bic-input]', 'SEBISSEBA88');
      expect(immerChangeset.get('bic')).toBe('SEBISSEBA88');
    },
  );

  renderingTest(
    'It changes data-has-error attribute on error',
    async ({ env }) => {
      setupTest(env.owner);

      const immerChangeset = new ImmerChangeset({ bic: '' });

      await render(
        <template>
          <TpkValidationBic
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="bic"
          />
        </template>,
      );

      await assertDataHasErrorAttribute(immerChangeset, 'bic');
    },
  );

  renderingTest(
    'CSS classes exist and have been attached to the correct element',
    async ({ env }) => {
      setupTest(env.owner);

      const immerChangeset = new ImmerChangeset({ bic: '' });

      await render(
        <template>
          <TpkValidationBic
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="bic"
          />
        </template>,
      );

      assertTpkCssClassesExist('bic');
    },
  );

  renderingTest('@disabled disables the input', async ({ env }) => {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ bic: '' });

    await render(
      <template>
        <TpkValidationBic
          @label="label"
          @changeset={{immerChangeset}}
          @disabled={{true}}
          @validationField="bic"
        />
      </template>,
    );

    expect(find('[data-test-tpk-bic-input]')?.hasAttribute('disabled')).toBe(
      true,
    );
  });

  renderingTest.skip('Accessibility', async ({ env }) => {
    setupTest(env.owner);

    const immerChangeset = new ImmerChangeset({ bic: '' });

    await render(
      <template>
        <TpkValidationBic
          @label="label"
          @changeset={{immerChangeset}}
          @disabled={{false}}
          @validationField="bic"
        />
      </template>,
    );

    await a11yAudit();
  });
});
