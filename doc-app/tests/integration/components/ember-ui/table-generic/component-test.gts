import { module, test } from 'qunit';
import { click, fillIn, findAll, render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupMock, worker } from 'doc-app/tests/worker';
import { TableGenericUserWorker } from 'doc-app/tests/workers/table-generic';
import { setupRenderingTest } from 'ember-qunit';
import TpkTableGeneric from '@triptyk/ember-ui/components/tpk-table-generic';

module('Integration | Component | table-generic', function (hooks) {
  setupRenderingTest(hooks);
  setupMock(hooks);
  setupIntl(hooks, 'fr-fr');

  const pageSize = 5;
  const pageSizes: number[] = [5, 10, 25];

  hooks.beforeEach(async function () {
    await TableGenericUserWorker(worker);
  });
  async function renderTableGeneric(
    assert: Assert
  ) {
    const rowClick = () => {
      assert.step('rowClick function called');
    };
    const deleteAction = () => {
      assert.step('delete function called');
    };

    await render(<template>
    <TpkTableGeneric
      @rowClick={{rowClick}}
      @pageSize={{pageSize}}
      @pageSizes={{pageSizes}}
      @defaultSortColumn="-firstName"
      @entity="user"
    as | TG |>
      <TG.SearchBar />
      <TG.Table as | Table |>
        <Table.Header as |Header|>
          <Header.Cell @sortable={{true}} @prop='firstName' data-test-table="firstName">
            Prénom
          </Header.Cell>
          <Header.Cell @sortable={{true}} @prop='lastName' data-test-table="lastName">
            Nom
          </Header.Cell>
          <Header.Cell @sortable={{false}} @prop='email' data-test-table="email">
            Email
          </Header.Cell>
        </Table.Header>
        <Table.Body as |Body element|>
          <Body.Cell>
            {{element.firstName}}
          </Body.Cell>
          <Body.Cell>
            {{element.lastName}}
          </Body.Cell>
          <Body.Cell>
            {{element.email}}
          </Body.Cell>
          <Body.ActionMenu as |Action|>
            <Action @icon="/assets/icons/delete.svg" @action={{deleteAction}} data-test-delete >
              lustre
            </Action>
          </Body.ActionMenu>
        </Table.Body>
        <Table.Footer />
      </TG.Table>
    </TpkTableGeneric>
  </template>);
  }

  async function renderTableGenericWithNoAction(
    assert: Assert
  ) {
    const rowClick = () => {
      assert.step('rowClick function called');
    };

    await render(<template>
    <TpkTableGeneric
      @rowClick={{rowClick}}
      @pageSize={{pageSize}}
      @pageSizes={{pageSizes}}
      @entity="user"
    as | TG |>
      <TG.Table as | Table |>
        <Table.Header as |Header|>
          <Header.Cell @sortable={{true}} @prop='firstName' data-test-table="firstName">
            Prénom
          </Header.Cell>
          <Header.Cell @sortable={{true}} @prop='lastName' data-test-table="lastName">
            Nom
          </Header.Cell>
          <Header.Cell @sortable={{false}} @prop='email' data-test-table="email">
            Email
          </Header.Cell>
        </Table.Header>
        <Table.Body as |Body element|>
          <Body.Cell>
            {{element.firstName}}
          </Body.Cell>
          <Body.Cell>
            {{element.lastName}}
          </Body.Cell>
          <Body.Cell>
            {{element.email}}
          </Body.Cell>
        </Table.Body>
        <Table.Footer />
      </TG.Table>
    </TpkTableGeneric>
  </template>);
  }

  test('It renders search input and table', async function (assert) {
    await renderTableGeneric(assert);
    assert.dom('input[type="search"]').exists();
    assert.dom('.tpk-table-generic').exists();

    assert.dom('thead th').hasText('Prénom', 'Table header ok');
    assert.dom('.tpk-table-pagination').exists('Table pagination ok');

    const rows = findAll('[data-test-row]');
    if (rows.length && rows[0]) {
      await click(rows[0]);
    }
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');
    assert.verifySteps(['rowClick function called']);
  });

  test('It can sort firstName & lastName and cannot sort email', async function (assert) {
    await renderTableGeneric(assert);
    assert.dom('thead th[data-test-table="firstName"]').hasAttribute('role');
    assert.dom('thead th[data-test-table="lastName"]').hasAttribute('role');
    assert
      .dom('thead th[data-test-table="email"]')
      .doesNotHaveAttribute('role');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
    await click('thead th[data-test-table="firstName"]');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Simon');
  });

  test('It triggers search', async function (assert) {
    await renderTableGeneric(assert);

    let rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');

    await fillIn('[data-test-tpk-input-input]', 'gig');
    await click('[data-test-search-submit]');
    rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 1, 'Correct number of rows rendered');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
  });

  test('It calls deleteAction method on delete button click', async function (assert) {
    await renderTableGeneric(assert);
    const deleteButton = findAll('[data-test-actions-open-action]');
    assert.strictEqual(
      deleteButton.length,
      5,
      'Correct number of delete buttons rendered',
    );
    await click('[data-test-actions-open-action]');
    await click('[data-test-delete] button');
    await click(deleteButton[0]!);
    assert.verifySteps(['delete function called']);
  });

  test('It renders pageSizes args', async function (assert) {
    await renderTableGeneric(assert);

    const selectPageSizes = findAll('[data-test-pagination-select] option');
    for (const [index, option] of selectPageSizes.entries()) {
      assert.dom(option).hasValue(`${pageSizes[index]}`);
    }
  });
  test('It can change page', async function (assert) {
    await renderTableGeneric(assert);

    const rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');

    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');

    await click('.yeti-table-pagination-controls-next');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Romain');

    await click('.yeti-table-pagination-controls-previous');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
  });
  test('Table does not create an additional column when no action is specified', async function (assert) {
    await renderTableGenericWithNoAction(assert);
    assert
      .dom('thead th:last-child')
      .doesNotHaveAttribute('data-test-action-menu-header');
  });
  test('Table creates an additional column when an action menu is yielded', async function (assert) {
    await renderTableGeneric(assert);
    assert
      .dom('thead th:last-child')
      .hasAttribute('data-test-action-menu-header');
  });
  test('Colspan of the footer is adjusted when an action menu is yielded', async function (assert) {
    await renderTableGeneric(assert);
    assert.dom('tfoot td').hasAttribute('colspan', '4');
  });
  test('Colspan of the footer is reduced when no action menu is yielded', async function (assert) {
    await renderTableGenericWithNoAction(assert);
    assert.dom('tfoot td').hasAttribute('colspan', '3');
  });
});
