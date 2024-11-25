import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import TpkStepper from '@triptyk/ember-ui/components/tpk-stepper';
import type { TestContext } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

interface ThisTestContext extends TestContext {

}

module('Integration | Component | tpk-stepper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render<ThisTestContext>(<template>
    <TpkStepper @startStep={{undefined}} as |Stepper|>
        <Stepper.Stepper />
        <Stepper.Step as |S|>
          <S.Header>
            Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <Stepper.Step as |S|>
          <S.Header>
          Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
        </Stepper.Step>
    </TpkStepper>
    </template>);

    assert.dom('.tpk-stepper').exists();
    assert.dom('.tpk-stepper-step').exists();
    assert.dom('.tpk-stepper-stepper').exists();
    assert.dom('.tpk-stepper-step-header').exists();
    assert.dom('.tpk-stepper-step').hasAttribute('data-is-active', 'false');
  });

  test('start step', async function (assert) {
    await render<ThisTestContext>(<template>
    <TpkStepper @startStep={{2}} as |Stepper|>
        <Stepper.Stepper />
        <Stepper.Step as |S|>
          <S.Header>
            Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <Stepper.Step id="step-initial" as |S|>
          <S.Header>
          Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
        </Stepper.Step>
    </TpkStepper>
    </template>);

    assert.dom('#step-initial').hasAttribute('data-is-active', 'true');
  });

  test('it steps', async function (assert) {
    await render<ThisTestContext>(<template>
    <TpkStepper @startStep={{undefined}} as |Stepper|>
        <Stepper.Stepper />
        <Stepper.Step data-test-step="1" as |S|>
          <S.Header>
            Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <Stepper.Step data-test-step="2" as |S|>
          <S.Header>
          Step {{S.index}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
        </Stepper.Step>
        <button data-test-first  type='button' {{on 'click' (fn Stepper.goTo 1)}}>
          First
        </button>
        <button data-test-previous disabled={{Stepper.isFirst}} type='button' {{on 'click' Stepper.goToPrevious}}>
          Previous
        </button>
        <button data-test-next disabled={{Stepper.isLast}} type='button' {{on 'click' Stepper.goToNext}}>
          Next
        </button>
    </TpkStepper>
    </template>);
    await click('[data-test-first]');
    assert.dom('[data-test-step="1"]').hasAttribute('data-is-active', 'true');
    assert.dom('[data-test-step="2"]').hasAttribute('data-is-active', 'false');

    assert.dom('[data-test-next]').isEnabled();
    assert.dom('[data-test-previous]').isDisabled();

    await click('[data-test-next]');
    assert.dom('[data-test-step="1"]').hasAttribute('data-is-active', 'false');
    assert.dom('[data-test-step="2"]').hasAttribute('data-is-active', 'true');

    assert.dom('[data-test-next]').isDisabled();
    assert.dom('[data-test-previous]').isEnabled();
  });
});
