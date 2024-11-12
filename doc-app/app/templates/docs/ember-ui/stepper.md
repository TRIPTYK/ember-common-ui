# Stepper

A component for a stepper.

<DocsDemo as |demo|>
  <demo.example @name="tpk-stepper.hbs">
     <TpkStepper @startStep={{1}} as |Stepper|>
        <Stepper.Stepper />
        <Stepper.Step data-test-step="1" as |S|>
          <S.Header>
            Step {{S.index}} {{if S.isActive 'active' 'inactive'}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <Stepper.Step data-test-step="2" as |S|>
          <S.Header>
          Step {{S.index}} {{if S.isActive 'active' 'inactive'}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <Stepper.Step data-test-step="3" as |S|>
          <S.Header>
          Step {{S.index}} {{if S.isActive 'active' 'inactive'}}
          </S.Header>
          <div>
            Content {{S.index}}
          </div>
      </Stepper.Step>
      <button data-test-first  type='button' {{on 'click' (fn Stepper.goTo 1)}}>
        First (1)
      </button>
      <button data-test-previous disabled={{Stepper.isFirst}} type='button' {{on 'click' Stepper.goToPrevious}}>
        Previous ({{Stepper.previousIndex}})
      </button>
      <button data-test-next disabled={{Stepper.isLast}} type='button' {{on 'click' Stepper.goToNext}}>
        Next ({{Stepper.nextIndex}})
      </button>
      <button data-test-next disabled={{Stepper.isLast}} type='button' {{on 'click' (fn Stepper.goTo Stepper.lastIndex)}}>
        Last ({{Stepper.lastIndex}})
      </button>
    </TpkStepper>
  </demo.example>
  <demo.snippet @name="tpk-stepper.hbs"/>
</DocsDemo>


