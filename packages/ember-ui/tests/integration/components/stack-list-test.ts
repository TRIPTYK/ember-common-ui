/* eslint-disable max-statements */
/* eslint-disable ember/no-get */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const titleForAdd = 'Ajouter une donnée';
const contentData = 'machin';

module('Integration | Component | stack-list', function (hooks) {
  setupRenderingTest(hooks);
  /* jscpd:ignore-start */
  test('adding item', async function (assert) {
    this.set('data', []);
    this.set('titleForAdd', titleForAdd);
    this.set('onAddData', () => {
      const newData = [
        ...(this.get('data') as []),
        {
          title: contentData,
        },
      ];
      this.set('data', newData);
    });
    this.set('onRemoveData', (index: number) => {
      const newData = [...(this.get('data') as [])];
      newData.splice(index, 1);
      this.set('data', newData);
    });

    await render(hbs`
      <TpkStackList
        @data={{this.data}}
        @onRemove={{this.onRemoveData}}
        @onAdd={{this.onAddData}}
        @titleForAdd={{this.titleForAdd}}
        as |S|
      >
        <S.Title as |T|>
          {{get T.item 'title'}}
        </S.Title>
        <S.Content as |C|>
          {{get C.item 'title'}}
        </S.Content>
      </TpkStackList>
    `);

    assert.dom('[data-test-add-stackList-item]').containsText(titleForAdd);
    await click('[data-test-add-stackList-item]');
    assert.dom('[data-test-content-stackList-item]').containsText(contentData);
  });

  test('toggle collapse with title', async function (assert) {
    this.set('data', [
      {
        title: contentData,
      },
    ]);
    this.set('titleForAdd', titleForAdd);
    this.set('onAddData', () => {});
    this.set('onRemoveData', () => {});

    await render(hbs`
      <TpkStackList
        @data={{this.data}}
        @onRemove={{this.onRemoveData}}
        @onAdd={{this.onAddData}}
        @titleForAdd={{this.titleForAdd}}
        as |S|
      >
        <S.Title as |T|>
          {{get T.item 'title'}}
        </S.Title>
        <S.Content as |C|>
          {{get C.item 'title'}}
        </S.Content>
      </TpkStackList>
    `);

    assert
      .dom('[data-test-title-stackList-item]')
      .doesNotContainText(contentData);
    await click('[data-test-toggle-stackList-item]');
    assert.dom('[data-test-title-stackList-item]').containsText(contentData);
  });

  test('deleting item', async function (assert) {
    this.set('data', [
      {
        title: contentData,
      },
    ]);
    this.set('titleForAdd', titleForAdd);
    this.set('onAddData', () => {});
    this.set('onRemoveData', (index: number) => {
      const newData = [...(this.get('data') as [])];
      newData.splice(index, 1);
      this.set('data', newData);
    });

    await render(hbs`
      <TpkStackList
        @data={{this.data}}
        @onRemove={{this.onRemoveData}}
        @onAdd={{this.onAddData}}
        @titleForAdd={{this.titleForAdd}}
        as |S|
      >
        <S.Title as |T|>
          {{get T.item 'title'}}
        </S.Title>
        <S.Content as |C|>
          {{get C.item 'title'}}
        </S.Content>
      </TpkStackList>
    `);

    assert.dom('[data-test-content-stackList-item]').containsText(contentData);
    await click('[data-test-delete-stackList-item]');
    assert.dom('[data-test-content-stackList-item]').doesNotExist();
  });
  /* jscpd:ignore-end */
});
