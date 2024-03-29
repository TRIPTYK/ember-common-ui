import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tpk-stepper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('classless', true);
    this.set('startStep', undefined);

    await render(hbs`
    <TpkStepper @startStep={{this.startStep}} @classless={{this.classless}} as |Stepper|>
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
    `);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });

    this.set('classless', false);

    assert.dom('.tpk-stepper').exists();
    assert.dom('.tpk-stepper-step').exists();
    assert.dom('.tpk-stepper-stepper').exists();
    assert.dom('.tpk-stepper-step-header').exists();
    assert.dom('.tpk-stepper-step').hasAttribute('data-is-active', 'false');
  });

  test('start step', async function (assert) {
    this.set('startStep', 2);

    await render(hbs`
    <TpkStepper @startStep={{this.startStep}} @classless={{this.classless}} as |Stepper|>
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
    `);

    assert.dom('#step-initial').hasAttribute('data-is-active', 'true');
  });

  test('it steps', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('classless', true);
    this.set('startStep', undefined);

    await render(hbs`
    <TpkStepper @startStep={{this.startStep}} @classless={{this.classless}} as |Stepper|>
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
    `);
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
