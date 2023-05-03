import { module, test } from 'qunit';

import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { FileObject } from '@triptyk/ember-ui/components/tpk-file-list/element';

module('Integration | Component | file-list/element', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render(hbs`
        <TpkFileList::Element @document={{this.document}} as |E|>
            <E.Download data-test-download-button />
            <E.Delete data-test-delete-button />
        </TpkFileList::Element>
      `);
  }

  test('@document is mandatory', async function (assert) {
    setupOnerror((e) => {
      assert.strictEqual(e.message, 'Assertion Failed: @document is mandatory');
      assert.step('error');
    });

    await renderComponent();

    assert.verifySteps(['error']);
  });

  test('Download should yield if component is not @disabled and document has a path', async function (assert) {
    this.set('document', {
      path: 'blah',
      filename: 'file.txt',
    } as FileObject);

    await renderComponent();

    assert.dom('[data-test-download-button]').exists();
  });

  test('Delete should yield if component is not @disabled', async function (assert) {
    this.set('document', {
      path: 'blah',
      filename: 'file.txt',
    } as FileObject);

    await renderComponent();

    assert.dom('[data-test-delete-button]').exists();
  });
});
