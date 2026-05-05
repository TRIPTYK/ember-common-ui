import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { click, render, find } from '@ember/test-helpers';

import TpkStackList from '@triptyk/ember-ui/components/tpk-stack-list';
import { setupTest } from '../../../test-helper';
import { get } from '@ember/object';
import stringify from 'doc-app/helpers/to-string';

const titleForAdd = 'Ajouter une donnée';
const contentData = 'machin';

describe('Integration | Component | stack-list', () => {
  renderingTest('adding item', async ({ env }) => {
    setupTest(env.owner);
    const data: unknown[] = [];
    const onAddData = vi.fn();
    const onRemoveData = () => {};

    await render(
      <template>
        <TpkStackList
          @data={{data}}
          @onRemove={{onRemoveData}}
          @onAdd={{onAddData}}
          @titleForAdd={{titleForAdd}}
          as |S|
        >
          <S.Title as |T|>
            {{stringify (get T.item "title")}}
          </S.Title>
          <S.Content as |C|>
            {{stringify (get C.item "title")}}
          </S.Content>
        </TpkStackList>
      </template>,
    );

    await click('[data-test-add-stackList-item]');
    expect(onAddData).toHaveBeenCalledOnce();
  });

  renderingTest('toggle collapse with title', async ({ env }) => {
    setupTest(env.owner);
    const data = [
      {
        title: contentData,
      },
    ];
    const titleForAdd = 'Ajouter une donnée';
    const onAddData = () => {};
    const onRemoveData = () => {};

    await render(
      <template>
        <TpkStackList
          @data={{data}}
          @onRemove={{onRemoveData}}
          @onAdd={{onAddData}}
          @readOnly={{false}}
          @titleForAdd={{titleForAdd}}
          as |S|
        >
          <S.Title as |T|>
            {{stringify (get T.item "title")}}
          </S.Title>
          <S.Content as |C|>
            {{stringify (get C.item "title")}}
          </S.Content>
        </TpkStackList>
      </template>,
    );

    expect(find('[data-test-title-stackList-item]')?.textContent).not.toContain(
      contentData,
    );
    await click('[data-test-toggle-stackList-item]');
    expect(find('[data-test-title-stackList-item]')?.textContent).toContain(
      contentData,
    );
  });

  renderingTest('deleting item', async ({ env }) => {
    setupTest(env.owner);
    const data = [
      {
        title: contentData,
      },
    ];
    const onAddData = () => {};
    const onRemoveData = vi.fn();

    await render(
      <template>
        <TpkStackList
          @data={{data}}
          @onRemove={{onRemoveData}}
          @onAdd={{onAddData}}
          @titleForAdd={{titleForAdd}}
          as |S|
        >
          <S.Title as |T|>
            {{stringify (get T.item "title")}}
          </S.Title>
          <S.Content as |C|>
            {{stringify (get C.item "title")}}
          </S.Content>
        </TpkStackList>
      </template>,
    );

    await click('[data-test-delete-stackList-item]');
    expect(onRemoveData).toHaveBeenCalledOnce();
  });
});
