import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import {
  click,
  fillIn,
  findAll,
  render,
  find,
  waitFor,
  waitUntil,
} from '@ember/test-helpers';
import { setupMock, worker } from 'doc-app/tests/worker';
import { TableGenericUserWorker } from 'doc-app/tests/workers/table-generic';
import TpkTableGeneric from '@triptyk/ember-ui/components/tpk-table-generic';
import stringify from 'doc-app/helpers/to-string';
import DeleteIcon from 'doc-app/assets/icons/delete.gts';
import TpkCheckbox from '@triptyk/ember-input/components/tpk-checkbox';
import { setupTest } from '../../../../test-helper';

describe('Integration | Component | table-generic', () => {
  const pageSize = 5;
  const pageSizes: number[] = [5, 10, 25];

  renderingTest('It renders search input and table', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const rowClick = vi.fn();
    const activeAction = vi.fn();
    const deleteAction = vi.fn();

    await render(
      <template>
        <TpkTableGeneric
          @rowClick={{rowClick}}
          @pageSize={{pageSize}}
          @pageSizes={{pageSizes}}
          @defaultSortColumn="-firstName"
          @entity="user"
          as |TG|
        >
          <TG.SearchBar />
          <TG.Table as |Table|>
            <Table.Header as |Header|>
              <Header.Cell
                @sortable={{true}}
                @prop="firstName"
                data-test-table="firstName"
              >
                Prénom
              </Header.Cell>
              <Header.Cell
                @sortable={{true}}
                @prop="lastName"
                data-test-table="lastName"
              >
                Nom
              </Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="email"
                data-test-table="email"
              >
                Email
              </Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="phone"
                data-test-table="phone"
              >
                Téléphone
              </Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="status"
                data-test-table="status"
              >
                Statut
              </Header.Cell>
            </Table.Header>
            <Table.Body as |Body element|>
              <Body.Cell>
                {{stringify element.firstName}}
              </Body.Cell>
              <Body.Cell>
                {{stringify element.lastName}}
              </Body.Cell>
              <Body.Cell>
                {{stringify element.email}}
              </Body.Cell>
              <Body.Cell>
                <div data-test-phone class="tpk-no-row-click">
                  {{stringify element.phone}}
                </div>
              </Body.Cell>
              <Body.Cell>
                <TpkCheckbox
                  @label=""
                  {{! @glint-ignore considering element.active has undefined or boolean as value}}
                  @checked={{element.active}}
                  @onChange={{activeAction}}
                  as |C|
                >
                  <C.Input data-test-checkbox />
                </TpkCheckbox>
              </Body.Cell>
              <Body.ActionMenu as |Action|>
                <Action
                  @icon={{component DeleteIcon}}
                  @action={{deleteAction}}
                  data-test-delete
                >
                  lustre
                </Action>
              </Body.ActionMenu>
            </Table.Body>
            <Table.Footer />
          </TG.Table>
        </TpkTableGeneric>
      </template>,
    );

    await waitFor('[data-test-row]');
    expect(find('input[type="search"]')).toBeTruthy();
    expect(find('.tpk-table-generic')).toBeTruthy();

    expect(find('thead th')?.textContent?.trim()).toBe('Prénom');
    expect(find('.tpk-table-pagination')).toBeTruthy();

    const rows = findAll('[data-test-row]');
    if (rows.length && rows[0]) {
      await click(rows[0]);
    }
    expect(rows.length).toBe(5);
    expect(rowClick).toHaveBeenCalledOnce();
  });

  renderingTest(
    'It can click on phone number without triggering rowClick',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-phone]');
      await click('[data-test-phone]');
      expect(rowClick).not.toHaveBeenCalled();
    },
  );

  renderingTest(
    'It can click on checkbox without triggering rowClick',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-checkbox]');
      await click('[data-test-checkbox]');
      expect(activeAction).toHaveBeenCalledOnce();
      expect(rowClick).not.toHaveBeenCalled();
    },
  );

  renderingTest(
    'It can sort firstName & lastName and cannot sort email',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-row]');
      expect(
        find('thead th[data-test-table="firstName"]')?.hasAttribute('role'),
      ).toBe(true);
      expect(
        find('thead th[data-test-table="lastName"]')?.hasAttribute('role'),
      ).toBe(true);
      expect(
        find('thead th[data-test-table="email"]')?.hasAttribute('role'),
      ).toBe(false);
      expect(
        find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
      ).toBe('Chad');
      await click('thead th[data-test-table="firstName"]');
      await waitUntil(
        () =>
          find('tbody tr:first-child td:first-of-type')?.textContent?.trim() ===
          'Simon',
      );
      expect(
        find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
      ).toBe('Simon');
    },
  );

  renderingTest('It triggers search', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const rowClick = vi.fn();
    const activeAction = vi.fn();
    const deleteAction = vi.fn();

    await render(
      <template>
        <TpkTableGeneric
          @rowClick={{rowClick}}
          @pageSize={{pageSize}}
          @pageSizes={{pageSizes}}
          @defaultSortColumn="-firstName"
          @entity="user"
          as |TG|
        >
          <TG.SearchBar />
          <TG.Table as |Table|>
            <Table.Header as |Header|>
              <Header.Cell
                @sortable={{true}}
                @prop="firstName"
                data-test-table="firstName"
              >Prénom</Header.Cell>
              <Header.Cell
                @sortable={{true}}
                @prop="lastName"
                data-test-table="lastName"
              >Nom</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="email"
                data-test-table="email"
              >Email</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="phone"
                data-test-table="phone"
              >Téléphone</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="status"
                data-test-table="status"
              >Statut</Header.Cell>
            </Table.Header>
            <Table.Body as |Body element|>
              <Body.Cell>{{stringify element.firstName}}</Body.Cell>
              <Body.Cell>{{stringify element.lastName}}</Body.Cell>
              <Body.Cell>{{stringify element.email}}</Body.Cell>
              <Body.Cell>
                <div data-test-phone class="tpk-no-row-click">{{stringify
                    element.phone
                  }}</div>
              </Body.Cell>
              <Body.Cell>
                <TpkCheckbox
                  @label=""
                  {{! @glint-ignore }}
                  @checked={{element.active}}
                  @onChange={{activeAction}}
                  as |C|
                >
                  <C.Input data-test-checkbox />
                </TpkCheckbox>
              </Body.Cell>
              <Body.ActionMenu as |Action|>
                <Action
                  @icon={{component DeleteIcon}}
                  @action={{deleteAction}}
                  data-test-delete
                >lustre</Action>
              </Body.ActionMenu>
            </Table.Body>
            <Table.Footer />
          </TG.Table>
        </TpkTableGeneric>
      </template>,
    );

    await waitFor('[data-test-row]');
    let rows = findAll('[data-test-row]');
    expect(rows.length).toBe(5);

    await fillIn('[data-test-tpk-input-input]', 'gig');
    await click('[data-test-search-submit]');
    await waitUntil(() => findAll('[data-test-row]').length === 1);

    rows = findAll('[data-test-row]');
    expect(rows.length).toBe(1);
    expect(
      find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
    ).toBe('Chad');
  });

  renderingTest(
    'It calls deleteAction method on delete button click',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-actions-open-action]');
      const deleteButton = findAll('[data-test-actions-open-action]');
      expect(deleteButton.length).toBe(5);
      await click('[data-test-actions-open-action]');
      await click('[data-test-delete] button');
      await click(deleteButton[0]!);
      expect(deleteAction).toHaveBeenCalledOnce();
    },
  );

  renderingTest('It renders pageSizes args', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const rowClick = vi.fn();
    const activeAction = vi.fn();
    const deleteAction = vi.fn();

    await render(
      <template>
        <TpkTableGeneric
          @rowClick={{rowClick}}
          @pageSize={{pageSize}}
          @pageSizes={{pageSizes}}
          @defaultSortColumn="-firstName"
          @entity="user"
          as |TG|
        >
          <TG.SearchBar />
          <TG.Table as |Table|>
            <Table.Header as |Header|>
              <Header.Cell
                @sortable={{true}}
                @prop="firstName"
                data-test-table="firstName"
              >Prénom</Header.Cell>
              <Header.Cell
                @sortable={{true}}
                @prop="lastName"
                data-test-table="lastName"
              >Nom</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="email"
                data-test-table="email"
              >Email</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="phone"
                data-test-table="phone"
              >Téléphone</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="status"
                data-test-table="status"
              >Statut</Header.Cell>
            </Table.Header>
            <Table.Body as |Body element|>
              <Body.Cell>{{stringify element.firstName}}</Body.Cell>
              <Body.Cell>{{stringify element.lastName}}</Body.Cell>
              <Body.Cell>{{stringify element.email}}</Body.Cell>
              <Body.Cell>
                <div data-test-phone class="tpk-no-row-click">{{stringify
                    element.phone
                  }}</div>
              </Body.Cell>
              <Body.Cell>
                <TpkCheckbox
                  @label=""
                  {{! @glint-ignore }}
                  @checked={{element.active}}
                  @onChange={{activeAction}}
                  as |C|
                >
                  <C.Input data-test-checkbox />
                </TpkCheckbox>
              </Body.Cell>
              <Body.ActionMenu as |Action|>
                <Action
                  @icon={{component DeleteIcon}}
                  @action={{deleteAction}}
                  data-test-delete
                >lustre</Action>
              </Body.ActionMenu>
            </Table.Body>
            <Table.Footer />
          </TG.Table>
        </TpkTableGeneric>
      </template>,
    );

    await waitFor('[data-test-pagination-select] option');
    const selectPageSizes = findAll('[data-test-pagination-select] option');
    for (const [index, option] of selectPageSizes.entries()) {
      expect((option as HTMLOptionElement).value).toBe(`${pageSizes[index]}`);
    }
  });

  renderingTest('It can change page', async ({ env }) => {
    setupTest(env.owner);
    setupMock();
    await TableGenericUserWorker(worker);

    const rowClick = vi.fn();
    const activeAction = vi.fn();
    const deleteAction = vi.fn();

    await render(
      <template>
        <TpkTableGeneric
          @rowClick={{rowClick}}
          @pageSize={{pageSize}}
          @pageSizes={{pageSizes}}
          @defaultSortColumn="-firstName"
          @entity="user"
          as |TG|
        >
          <TG.SearchBar />
          <TG.Table as |Table|>
            <Table.Header as |Header|>
              <Header.Cell
                @sortable={{true}}
                @prop="firstName"
                data-test-table="firstName"
              >Prénom</Header.Cell>
              <Header.Cell
                @sortable={{true}}
                @prop="lastName"
                data-test-table="lastName"
              >Nom</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="email"
                data-test-table="email"
              >Email</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="phone"
                data-test-table="phone"
              >Téléphone</Header.Cell>
              <Header.Cell
                @sortable={{false}}
                @prop="status"
                data-test-table="status"
              >Statut</Header.Cell>
            </Table.Header>
            <Table.Body as |Body element|>
              <Body.Cell>{{stringify element.firstName}}</Body.Cell>
              <Body.Cell>{{stringify element.lastName}}</Body.Cell>
              <Body.Cell>{{stringify element.email}}</Body.Cell>
              <Body.Cell>
                <div data-test-phone class="tpk-no-row-click">{{stringify
                    element.phone
                  }}</div>
              </Body.Cell>
              <Body.Cell>
                <TpkCheckbox
                  @label=""
                  {{! @glint-ignore }}
                  @checked={{element.active}}
                  @onChange={{activeAction}}
                  as |C|
                >
                  <C.Input data-test-checkbox />
                </TpkCheckbox>
              </Body.Cell>
              <Body.ActionMenu as |Action|>
                <Action
                  @icon={{component DeleteIcon}}
                  @action={{deleteAction}}
                  data-test-delete
                >lustre</Action>
              </Body.ActionMenu>
            </Table.Body>
            <Table.Footer />
          </TG.Table>
        </TpkTableGeneric>
      </template>,
    );

    await waitFor('[data-test-row]');
    const rows = document.querySelectorAll('[data-test-row]');
    expect(rows.length).toBe(5);

    expect(
      find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
    ).toBe('Chad');

    await click('.yeti-table-pagination-controls-next');
    await waitUntil(
      () =>
        find('tbody tr:first-child td:first-of-type')?.textContent?.trim() ===
        'Romain',
    );
    expect(rows.length).toBe(5);
    expect(
      find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
    ).toBe('Romain');

    await click('.yeti-table-pagination-controls-previous');
    await waitUntil(
      () =>
        find('tbody tr:first-child td:first-of-type')?.textContent?.trim() ===
        'Chad',
    );
    expect(
      find('tbody tr:first-child td:first-of-type')?.textContent?.trim(),
    ).toBe('Chad');
  });

  renderingTest(
    'Table does not create an additional column when no action is specified',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @entity="user"
            as |TG|
          >
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-row]');
      expect(
        find('thead th:last-child')?.hasAttribute(
          'data-test-action-menu-header',
        ),
      ).toBe(false);
    },
  );

  renderingTest(
    'Table creates an additional column when an action menu is yielded',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-row]');
      expect(
        find('thead th:last-child')?.hasAttribute(
          'data-test-action-menu-header',
        ),
      ).toBe(true);
    },
  );

  renderingTest(
    'Colspan of the footer is adjusted when an action menu is yielded',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();
      const activeAction = vi.fn();
      const deleteAction = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @defaultSortColumn="-firstName"
            @entity="user"
            as |TG|
          >
            <TG.SearchBar />
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="phone"
                  data-test-table="phone"
                >Téléphone</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="status"
                  data-test-table="status"
                >Statut</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
                <Body.Cell>
                  <div data-test-phone class="tpk-no-row-click">{{stringify
                      element.phone
                    }}</div>
                </Body.Cell>
                <Body.Cell>
                  <TpkCheckbox
                    @label=""
                    {{! @glint-ignore }}
                    @checked={{element.active}}
                    @onChange={{activeAction}}
                    as |C|
                  >
                    <C.Input data-test-checkbox />
                  </TpkCheckbox>
                </Body.Cell>
                <Body.ActionMenu as |Action|>
                  <Action
                    @icon={{component DeleteIcon}}
                    @action={{deleteAction}}
                    data-test-delete
                  >lustre</Action>
                </Body.ActionMenu>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-row]');
      expect(find('tfoot td')?.getAttribute('colspan')).toBe('6');
    },
  );

  renderingTest(
    'Colspan of the footer is reduced when no action menu is yielded',
    async ({ env }) => {
      setupTest(env.owner);
      setupMock();
      await TableGenericUserWorker(worker);

      const rowClick = vi.fn();

      await render(
        <template>
          <TpkTableGeneric
            @rowClick={{rowClick}}
            @pageSize={{pageSize}}
            @pageSizes={{pageSizes}}
            @entity="user"
            as |TG|
          >
            <TG.Table as |Table|>
              <Table.Header as |Header|>
                <Header.Cell
                  @sortable={{true}}
                  @prop="firstName"
                  data-test-table="firstName"
                >Prénom</Header.Cell>
                <Header.Cell
                  @sortable={{true}}
                  @prop="lastName"
                  data-test-table="lastName"
                >Nom</Header.Cell>
                <Header.Cell
                  @sortable={{false}}
                  @prop="email"
                  data-test-table="email"
                >Email</Header.Cell>
              </Table.Header>
              <Table.Body as |Body element|>
                <Body.Cell>{{stringify element.firstName}}</Body.Cell>
                <Body.Cell>{{stringify element.lastName}}</Body.Cell>
                <Body.Cell>{{stringify element.email}}</Body.Cell>
              </Table.Body>
              <Table.Footer />
            </TG.Table>
          </TpkTableGeneric>
        </template>,
      );
      await waitFor('[data-test-row]');
      expect(find('tfoot td')?.getAttribute('colspan')).toBe('3');
    },
  );
});
