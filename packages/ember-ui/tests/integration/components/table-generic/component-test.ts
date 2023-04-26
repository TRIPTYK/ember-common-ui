import { module, test } from 'qunit';
import { setupApplicationTest, setupRenderingTest } from '../../../helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';
import { ServiceWorkerTestContext, setupMock } from '../../../worker';
import { TableGenericUserWorker } from '../../../workers/table-generic';
module('Integration | Component | table-generic', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ['fr-fr']);
  setupMock(hooks);

  test<ServiceWorkerTestContext>('it renders search input and table', async function (assert) {
    await TableGenericUserWorker(this.worker);
    assert.expect(0);
    this.set('onSearch', () => assert.ok(true, 'onSearch function called'));
    this.set('rowClick', () => assert.ok(true, 'rowClick function called'));
    this.set('deleteAction', () => console.log('je passe ici dragon'));

    await render(hbs`
      <TableGeneric
        @onSearch={{this.onSearch}}
        @rowClick={{this.rowClick}}
        @entity="user"
      as | TG |>
        <TG.SearchBar />
        <TG.Table as | Table |>
          <Table.Header as |Header|>
            <Header.Cell @sortable={{true}} @prop='firstName'>
              Prénom
            </Header.Cell>
            <Header.Cell @sortable={{true}} @prop='lastName'>
              Nom
            </Header.Cell>
            <Header.Cell @sortable={{false}} @prop='email'>
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
