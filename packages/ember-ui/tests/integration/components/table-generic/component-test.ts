import { module, test } from 'qunit';
import { setupRenderingTest } from '../../../helpers';
import { click, fillIn, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';
import { ServiceWorkerTestContext, setupMock } from '../../../worker';
import { TableGenericUserWorker } from '../../../workers/table-generic';
module('Integration | Component | table-generic', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);
  setupMock(hooks);

  hooks.beforeEach(async function (assert) {
    assert.step('onSearch function called');
    assert.step('rowClick function called');
    this.set('onSearch', () => {
      assert.step('onSearch function called');
    });
    this.set('rowClick', () => {
      assert.step('rowClick function called');
    });
    this.set('deleteAction', () => console.log('je passe ici'));
  });
  async function renderTableGeneric() {
    await render(hbs`
    <TableGeneric
      @onSearch={{this.onSearch}}
      @rowClick={{this.rowClick}}
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
            <Action @icon="/assets/icons/delete.svg" @action={{this.deleteAction}} >
              lustre
            </Action>
          </Body.ActionMenu>
        </Table.Body>
      </TG.Table>
    </TableGeneric>
  `);
  }

  test<ServiceWorkerTestContext>('it renders search input and table', async function (assert) {
    await TableGenericUserWorker(this.worker);
    assert.expect(8);
    await renderTableGeneric.call(this);
    assert.verifySteps([
      'onSearch function called',
      'rowClick function called',
    ]);

    assert.dom('input[type="search"]').exists();
    await fillIn('input[type="search"]', 'test');

    assert.dom('.tableYeti').exists();
    assert.dom('thead th').hasText('Prénom', 'Table header ok');
    assert.dom('.yeti-table-pagination-controls').exists('Table pagination ok');

    const rows = findAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');
  });

  test<ServiceWorkerTestContext>('test sortable of column', async function (assert) {
    await TableGenericUserWorker(this.worker);

    await renderTableGeneric.call(this);
    assert.expect(8);
    assert.verifySteps([
      'onSearch function called',
      'rowClick function called',
    ]);
    assert
      .dom('thead th[data-test-table="firstName"]')
      .exists('Sort button for firstName exists');
    assert
      .dom('thead th[data-test-table="lastName"]')
      .exists('Sort button for lastName exists');
    assert
      .dom('thead th[data-test-table="email"]')
      .exists('Sort button for email does not exist');

    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');

    await click('thead th[data-test-table="firstName"]');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Simon');
  });

  test<ServiceWorkerTestContext>('test search', async function (assert) {
    await TableGenericUserWorker(this.worker);

    await renderTableGeneric.call(this);
    assert.expect(6);
    assert.verifySteps([
      'onSearch function called',
      'rowClick function called',
    ]);
    let rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');

    await fillIn('[data-test-tpk-input-input]', 'gig');
    await click('[data-test-search-submit]');
    rows = document.querySelectorAll('[data-test-row]');
    assert.strictEqual(rows.length, 1, 'Correct number of rows rendered');
    assert.dom('tbody tr:first-child td:first-of-type').hasText('Chad');
  });

  test<ServiceWorkerTestContext>('test pagination', async function (assert) {
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
