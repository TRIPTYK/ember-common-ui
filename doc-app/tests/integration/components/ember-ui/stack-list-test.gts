import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import type { TestContext } from '@ember/test-helpers';
import TpkStackList from '@triptyk/ember-ui/components/tpk-stack-list';
import { get } from '@ember/object';

const titleForAdd = 'Ajouter une donnée';
const contentData = 'machin';

interface ThisTestContext extends TestContext {
}

module('Integration | Component | stack-list', function (this: ThisTestContext, hooks) {
  setupRenderingTest(hooks);

  test('adding item', async function (this: ThisTestContext, assert) {
    const data: unknown[] = [];
    const onAddData = () => {
      assert.step('onAddData');
    };
    const onRemoveData = () => {};

    await render<ThisTestContext>(
      <template>
      <TpkStackList
        @data={{data}}
        @onRemove={{onRemoveData}}
        @onAdd={{onAddData}}
        @titleForAdd={{titleForAdd}}
        as |S|
      >
        <S.Title as |T|>
          {{get T.item 'title'}}
        </S.Title>
        <S.Content as |C|>
          {{get C.item 'title'}}
        </S.Content>
      </TpkStackList>
      </template>
    );

    await click('[data-test-add-stackList-item]');
    assert.verifySteps(['onAddData']);
  });

  test('toggle collapse with title', async function (this: ThisTestContext, assert) {
    const data = [
      {
      title: contentData,
      },
    ];
    const titleForAdd = 'Ajouter une donnée';
    const onAddData = () => {};
    const onRemoveData = () => {};

    await render<ThisTestContext>(
      <template>
        <TpkStackList
          @data={{data}}
          @onRemove={{onRemoveData}}
          @onAdd={{onAddData}}
          @titleForAdd={{titleForAdd}}
          as |S|
        >
          <S.Title as |T|>
            {{get T.item 'title'}}
          </S.Title>
          <S.Content as |C|>
            {{get C.item 'title'}}
          </S.Content>
        </TpkStackList>
      </template>
    );

    assert
      .dom('[data-test-title-stackList-item]')
      .doesNotContainText(contentData);
    await click('[data-test-toggle-stackList-item]');
    assert.dom('[data-test-title-stackList-item]').containsText(contentData);
  });

  test('deleting item', async function (this: ThisTestContext, assert) {
    const data = [
      {
      title: contentData,
      },
    ];
    const onAddData = () => {};
    const onRemoveData = () => {
      assert.step('onRemoveData');
    };

    await render<ThisTestContext>(
      <template>
        <TpkStackList
          @data={{data}}
          @onRemove={{onRemoveData}}
          @onAdd={{onAddData}}
          @titleForAdd={{titleForAdd}}
          as |S|
        >
          <S.Title as |T|>
            {{get T.item 'title'}}
          </S.Title>
          <S.Content as |C|>
            {{get C.item 'title'}}
          </S.Content>
        </TpkStackList>
      </template>
    );

    await click('[data-test-delete-stackList-item]');
    assert.verifySteps(['onRemoveData']);
  });
});
