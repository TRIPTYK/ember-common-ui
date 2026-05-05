import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, fillIn, render, find, findAll } from '@ember/test-helpers';
import { changesetGet, ImmerChangeset } from 'ember-immer-changeset';
import { object, string, array, email, number } from 'zod';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import DummyInput from 'doc-app/components/dummy-input';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { on } from '@ember/modifier';
import { concat, array as arrayHelper } from '@ember/helper';
import { setupComponent } from './generic-test-functions/setup-prefab-component';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-form', () => {
  renderingTest(
    'TpkForm can invoke custom registered inputs from service',
    async ({ env }) => {
      setupTest(env.owner);

      const tpkFormService = env.owner.lookup(
        'service:tpk-form',
      ) as unknown as TpkFormService;

      tpkFormService.TpkInput = DummyInput as never;

      await setupComponent();

      expect(find(`[data-test-dummy-input="email"]`)).toBeTruthy();
    },
  );

  renderingTest(
    'it validates the changeset when a field is set if reactive is true',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = await setupComponent({
        reactive: true,
        validationSchema: object({
          email: email(),
        }),
      });

      expect(changeset.isInvalid).toBe(false);

      await fillIn('input[type="email"]', 'test');

      expect(changeset.isInvalid).toBe(true);
    },
  );

  renderingTest(
    'the error message is formatted correctly when reactive is true',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = await setupComponent({
        reactive: true,
        validationSchema: object({
          name: string().min(
            5,
            'First name must be at least 5 characters long',
          ),
        }),
      });

      await fillIn('[data-test-name] input', 't');
      expect(changeset.isInvalid).toBe(true);

      expect(
        find('[data-test-tpk-validation-errors]')?.textContent?.trim(),
      ).toBe('First name must be at least 5 characters long');
    },
  );

  renderingTest(
    'it sets correct error path when single field is errored in reactive=true',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = await setupComponent({
        reactive: true,
        validationSchema: object({
          email: email(),
        }),
      });

      await fillIn('input[type="email"]', 'test');
      expect(changeset.errors.some((e) => e.key === 'email')).toBe(true);
    },
  );

  renderingTest(
    'It executes the changeset when submit is triggered and changeset is valid',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = await setupComponent({
        validationSchema: object({
          email: email(),
        }),
      });

      expect(changeset.isInvalid).toBe(false);

      await fillIn('input[type="email"]', 'truc@gmail.com');

      await click('button[type="submit"]');

      expect(changeset.get('email')).toBe('truc@gmail.com');
    },
  );

  renderingTest(
    'It triggers @onSubmit with changeset as parameter when changeset is valid',
    async ({ env }) => {
      setupTest(env.owner);

      const onSubmit = vi.fn();

      const changeset = await setupComponent({
        validationSchema: object({
          email: email(),
        }),
        onSubmit,
      });

      expect(changeset.isInvalid).toBe(false);

      await fillIn('input[type="email"]', 'truc@gmail.com');

      await click('button[type="submit"]');

      expect(onSubmit).toHaveBeenCalledOnce();
    },
  );

  renderingTest(
    'Should pass errors to the prefab inputs when the changeset is invalid upon submission',
    async ({ env }) => {
      setupTest(env.owner);

      const changeset = await setupComponent({
        validationSchema: object({
          name: string().length(10),
        }),
      });

      expect(changeset.isInvalid).toBe(false);

      await fillIn('[data-test-name] input', 't@g.com');

      await click('button[type="submit"]');

      expect(changeset.isInvalid).toBe(true);
      expect(find('[data-test-tpk-validation-errors]')).toBeTruthy();
      expect(
        find('[data-test-tpk-validation-errors]')?.textContent?.trim(),
      ).toBeTruthy();
    },
  );

  renderingTest(
    'Should display an asterisk in the label upon initialization of the form and when adding an element',
    async ({ env }) => {
      setupTest(env.owner);

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
        email: email(),
        address: object({
          street: string().min(1),
          city: string(),
        }),
        levels: array(
          object({
            name: string().min(1),
            grade: number(),
          }),
        ),
        languages: array(string()).min(1),
      });
      const addLevel = () => {
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
            @changeset={{changeset}}
            @validationSchema={{validationSchema}}
            @onSubmit={{onSubmit}}
            @reactive={{reactive}}
            @executeOnValid={{true}}
            as |F|
          >
            <F.TpkInputPrefab
              @label="Email"
              @type="email"
              @validationField="email"
              data-test-email
            />
            <F.TpkInputPrefab
              @label="Street"
              @validationField="address.street"
              data-test-address-street
            />
            <F.TpkInputPrefab
              @label="City"
              @validationField="address.city"
              data-test-address-city
            />
            {{#each (changesetGet changeset "levels") as |level index|}}
              <F.TpkInputPrefab
                @label="Level name"
                @validationField={{concat "levels." index ".name"}}
                data-test-level-name={{index}}
              />
              <F.TpkInputPrefab
                @label="Level grade"
                @validationField={{concat "levels." index ".grade"}}
                data-test-level-grade={{index}}
              />
            {{/each}}
            <F.TpkSelectPrefab
              @multiple={{true}}
              @label="Languages"
              @validationField="languages"
              @options={{arrayHelper "French" "English" "Dutch"}}
            />
            <button
              type="button"
              {{on "click" addLevel}}
              data-test-add-level
            >Add level</button>
            <button type="submit">Submit</button>
          </TpkForm>
        </template>,
      );
      expect(find('[data-test-email]')?.textContent).toContain('*');
      expect(find('[data-test-address-street]')?.textContent).toContain('*');
      expect(find('[data-test-address-city]')?.textContent).not.toContain('*');
      expect(find('[data-test-level-name="0"]')?.textContent).toContain('*');
      expect(find('[data-test-level-grade="0"]')?.textContent).not.toContain(
        '*',
      );
      expect(findAll('[data-test-level-name]').length).toBe(1);
      await click('[data-test-add-level]');
      expect(findAll('[data-test-level-grade]').length).toBe(2);
      expect(find('[data-test-level-name="1"]')?.textContent).toContain('*');
      expect(find('[data-test-level-grade="1"]')?.textContent).not.toContain(
        '*',
      );
    },
  );
});
