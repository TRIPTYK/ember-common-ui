import { module, test } from 'qunit';
import { setupApplicationTest, setupRenderingTest } from '../../../helpers';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FakeData from './data/fake-data';
import { setupIntl } from 'ember-intl/test-support';
import { ServiceWorkerTestContext, setupMock } from '../../../worker';
import { TableGenericUserWorker } from '../../../workers/table-generic';
module('Integration | Component | table-generic', function (hooks) {
  setupApplicationTest(hooks);
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);
  setupMock(hooks);

  hooks.beforeEach(function () {
    this.set('headerTest', FakeData.headerTest),
      this.set('dataTest', FakeData.dataTest);
  });

  test<ServiceWorkerTestContext>('it renders search input and table', async function (assert) {
    await TableGenericUserWorker(this.worker);
    assert.expect(0);
    this.set('onSearch', () => assert.ok(true, 'onSearch function called'));
    this.set('rowClick', () => assert.ok(true, 'rowClick function called'));

    await render(hbs`
      <TableGeneric
        @onSearch={{this.onSearch}}
        @rowClick={{this.rowClick}}
        @entity="user"
      as | GT |>
        <GT.SearchBar />
        <GT.Table as | Table |>
          <Table.Header as |cellHeader|>
            <cellHeader>
              wesh
            </cellHeader>
            <cellHeader>
              Dene
            </cellHeader>
          </Table.Header>
          <Table.Body as |element Cell ActionMenu|>
            {{log element}}
            <Cell>
              {{element.lastName}}
            </Cell>
          </Table.Body>
        </GT.Table>
      </TableGeneric>
    `);

    await this.pauseTest();

    // assert.dom('input[type="search"]').exists();
    // await fillIn('input[type="search"]', 'test');

    // assert.dom('.tableYeti').exists();
    // assert.dom('thead th').hasText('Nom', 'Table header ok');
    // assert.dom('.yeti-table-pagination-controls').exists('Table pagination ok');
    // // await this.pauseTest();

    // // vérifier que les rows sont là avec les bonnes données.
    // const rows = document.querySelectorAll('[data-test-row]');
    // assert.strictEqual(rows.length, 5, 'Correct number of rows rendered');
  });
});
