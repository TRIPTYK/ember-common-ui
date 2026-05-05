import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, findAll, render, find, waitFor } from '@ember/test-helpers';
import { TableGenericUserWorker } from 'doc-app/tests/workers/table-generic';
import { setupMock, worker } from 'doc-app/tests/worker';
import TpkTableGenericPrefab from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import type { TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import TpkSelect from '@triptyk/ember-input/components/tpk-select';
import type { TOC } from '@ember/component/template-only';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import { selectChoose } from 'ember-power-select/test-support';
import stringify from 'doc-app/helpers/to-string';
import '@warp-drive/ember/install';
import { setupTest } from '../../../../test-helper';

const TpkSelectElement: TOC<
  TpkSelectSignature & {
    Args: {
      cellValue: string;
    };
  }
> = <template>
  <div data-test-table-generic-select>
    <TpkSelect
      @options={{@options}}
      @onChange={{@onChange}}
      @selected={{@cellValue}}
      @label=""
      as |S|
    >
      <S.Option as |O|>
        {{stringify O.option}}
      </S.Option>
    </TpkSelect>
  </div>
</template>;

describe('Integration | Component | Prefabs | Tpk-table-generic-prefab', () => {
  const baseTableParams: TableParams = {
    entity: 'user',
    pageSizes: [10, 30, 50, 75],
    defaultSortColumn: 'firstName',
    columns: [
      {
        field: 'lastName',
        headerName: 'Nom',
        sortable: true,
      },
      {
        field: 'firstName',
        headerName: 'Prénom',
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
      },
    ],
    actionMenu: [],
  };

  renderingTest('Render prefab table generic', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);
    await render(
      <template>
        <TpkTableGenericPrefab @tableParams={{baseTableParams}} />
      </template>,
    );
    expect(find('[data-test-table-generic-prefab]')).toBeTruthy();
  });

  renderingTest(
    'It has the same number of columns as the object',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);
      await render(
        <template>
          <TpkTableGenericPrefab @tableParams={{baseTableParams}} />
        </template>,
      );

      await waitFor('[data-test-table-generic-prefab] [data-test-row="1"] td');
      const columnsNumber = baseTableParams.columns.length;
      const columns = findAll(
        '[data-test-table-generic-prefab] [data-test-row="1"] td',
      ).length;
      expect(columns).toEqual(columnsNumber);
    },
  );

  renderingTest('It passes correctly the actionMenu', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const rowClickFn = vi.fn();
    const deleteFn = vi.fn();
    const actionMenu = [
      {
        action: () => {
          rowClickFn();
        },
        name: 'Edit',
      },
      {
        action: () => {
          deleteFn();
        },
        name: 'Delete',
      },
    ];
    const tableParams = {
      ...baseTableParams,
      actionMenu: actionMenu,
    };

    await render(
      <template>
        <TpkTableGenericPrefab @tableParams={{tableParams}} />
      </template>,
    );
    await waitFor('[data-test-actions-open-action]');
    const deleteButtons = findAll('[data-test-actions-open-action]');
    expect(deleteButtons.length).toBe(5);
    const editButtons = findAll('[data-test-actions-open-action]');
    expect(editButtons.length).toBe(5);
    await click('[data-test-actions-open-action]');

    await click('[data-test-actions-menu] li:first-child button');
    expect(rowClickFn).toHaveBeenCalledOnce();

    await click('[data-test-actions-open-action]');
    await click('[data-test-actions-menu] li:last-child button');
    expect(deleteFn).toHaveBeenCalledOnce();
  });

  renderingTest('it can sort by default', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);
    await render(
      <template>
        <TpkTableGenericPrefab @tableParams={{baseTableParams}} />
      </template>,
    );
    await waitFor('[data-test-table-generic-prefab] [data-test-row="1"]');
    const rowText = find(
      '[data-test-table-generic-prefab] [data-test-row="1"]',
    )!
      .textContent.replace(/\s+/g, ' ')
      .trim();
    expect(rowText).toContain('Leroy Simon info@triptyk.eu');
  });

  renderingTest('it passes a renderElement', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const tableParamsWithFunctions: TableParams = {
      entity: 'user',
      pageSizes: [10, 30, 50, 75],
      defaultSortColumn: 'firstName',
      columns: [
        {
          field: 'lastName',
          headerName: 'Nom',
          renderElement: (element: unknown) => {
            return `Mr ${String(element)}`;
          },
          sortable: true,
        },
        {
          field: 'firstName',
          headerName: 'Prénom',
          sortable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          sortable: false,
        },
      ],
      actionMenu: [],
    };
    await render(
      <template>
        <TpkTableGenericPrefab @tableParams={{tableParamsWithFunctions}} />
      </template>,
    );
    await waitFor(
      '[data-test-table-generic-prefab] [data-test-row="1"] td:nth-child(1)',
    );
    expect(
      find(
        '[data-test-table-generic-prefab] [data-test-row="1"] td:nth-child(1)',
      )!.textContent?.trim(),
    ).toBe('Mr Leroy');
  });

  renderingTest('it passes a component', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const emailOptions = ['info@triptyk.eu', 'loempia@triptyk.eu'];
    const onChange = vi.fn();

    const tableParamsWithFunctions: TableParams = {
      entity: 'user',
      pageSizes: [10, 30, 50, 75],
      defaultSortColumn: 'firstName',
      columns: [
        {
          field: 'lastName',
          headerName: 'Nom',
          sortable: true,
        },
        {
          field: 'firstName',
          headerName: 'Prénom',
          sortable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          sortable: false,
          component: 'selectEmail',
        },
      ],
      actionMenu: [],
    };

    await render(
      <template>
        <TpkTableGenericPrefab
          @tableParams={{tableParamsWithFunctions}}
          @columnsComponent={{hash
            selectEmail=(component
              TpkSelectElement
              options=emailOptions
              onChange=onChange
              data-test-table-generic-table=true
            )
          }}
        />
      </template>,
    );
    await waitFor(
      '[data-test-table-generic-prefab] td:nth-child(3) [data-test-table-generic-select]',
    );
    expect(
      find(
        '[data-test-table-generic-prefab] td:nth-child(3) [data-test-table-generic-select]',
      ),
    ).toBeTruthy();
    const selectSelector =
      '[data-test-table-generic-prefab] td:nth-child(3) [data-test-table-generic-select] .tpk-select-trigger';
    await selectChoose(selectSelector, 'loempia@triptyk.eu');

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toBe('loempia@triptyk.eu');
  });

  renderingTest(
    'it possible to click on row when rowClick was on tableParams',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClickFn = vi.fn();
      const tableParamsWithFunctions: TableParams = {
        entity: 'user',
        pageSizes: [10, 30, 50, 75],
        defaultSortColumn: 'firstName',
        rowClick: () => {
          rowClickFn();
        },
        columns: [
          {
            field: 'lastName',
            headerName: 'Nom',
            sortable: true,
          },
          {
            field: 'firstName',
            headerName: 'Prénom',
            sortable: true,
          },
        ],
        actionMenu: [],
      };

      await render(
        <template>
          <TpkTableGenericPrefab @tableParams={{tableParamsWithFunctions}} />
        </template>,
      );

      await waitFor('[data-test-table-generic-prefab] [data-test-row="1"]');
      const data = document.querySelector(
        '[data-test-table-generic-prefab] [data-test-row="1"]',
      ) as HTMLTableElement;
      await click(data);
      expect(rowClickFn).toHaveBeenCalledOnce();
    },
  );
});
