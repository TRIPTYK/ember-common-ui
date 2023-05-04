import { module, test } from 'qunit';
import { click, fillIn, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { ServiceWorkerTestContext, setupMock } from '../../../worker';
import { TableGenericUserWorker } from '../../../workers/table-generic';
import { setupRenderingTest } from 'dummy/tests/helpers';

module('Integration | Component | table-generic', function (hooks) {
  setupRenderingTest(hooks);
  setupMock(hooks);
  const pageSize = 5;
  const pageSizes: number[] = [5, 10, 25];

  hooks.beforeEach<ServiceWorkerTestContext>(async function (assert) {
    await TableGenericUserWorker(this.worker);
    this.set('pageSize', pageSize);
    this.set('pageSizes', pageSizes);
    this.set('rowClick', () => {
      assert.step('rowClick function called');
    });
    this.set('deleteAction', () => {
      assert.step('delete function called');
    });
  });
  async function renderTableGeneric() {
    await render(hbs`
    <TableGeneric
      @rowClick={{this.rowClick}}
      @pageSize={{this.pageSize}}
      @pageSizes={{this.pageSizes}}
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
            <Action @icon="/assets/icons/delete.svg" @action={{this.deleteAction}} data-test-delete >
              lustre
            </Action>
          </Body.ActionMenu>
        </Table.Body>
      </TG.Table>
    </TableGeneric>
  `);
  }

  test<ServiceWorkerTestContext>('It renders search input and table', async function (assert) {
    assert.expect(7);
    await renderTableGeneric.call(this);

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

  test<ServiceWorkerTestContext>('It can sort firstName & lastName and cannot sort email', async function (assert) {
    assert.expect(5);
    await renderTableGeneric.call(this);

    assert.dom('thead th[data-test-table="firstName"]').hasAttribute('role');
    assert.dom('thead th[data-test-table="lastName"]').hasAttribute('role');
    assert
      .dom('thead th[data-test-table="email"]')
      .doesNotHaveAttribute('role');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
    await click('thead th[data-test-table="firstName"]');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Simon');
  });

  test<ServiceWorkerTestContext>('It triggers search', async function (assert) {
    assert.expect(3);
    await renderTableGeneric.call(this);

    let rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');

    await fillIn('[data-test-tpk-input-input]', 'gig');
    await click('[data-test-search-submit]');
    rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 1, 'Correct number of rows rendered');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
  });

  test<ServiceWorkerTestContext>('It calls deleteAction method on delete button click', async function (assert) {
    assert.expect(3);
    await renderTableGeneric.call(this);
    const deleteButton = findAll('[data-test-actions-open-action]');
    assert.strictEqual(
      deleteButton.length,
      5,
      'Correct number of delete buttons rendered'
    );
    await click('[data-test-actions-open-action]');
    await click('[data-test-delete] button');
    await click(deleteButton[0]!);
    assert.verifySteps(['delete function called']);
  });

  test<ServiceWorkerTestContext>('It renders pageSizes args', async function (assert) {
    await TableGenericUserWorker(this.worker);
    await renderTableGeneric.call(this);
    assert.expect(3);

    const selectPageSizes = findAll('[data-test-pagination-select] option');
    for (const [index, option] of selectPageSizes.entries()) {
      assert.dom(option).hasValue(`${pageSizes[index]}`);
    }
  });
  test<ServiceWorkerTestContext>('It can change page', async function (assert) {
    await TableGenericUserWorker(this.worker);
    await renderTableGeneric.call(this);
    assert.expect(5);

    let rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');

    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');

    await click('.yeti-table-pagination-controls-next');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Romain');

    await click('.yeti-table-pagination-controls-previous');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
  });
});
