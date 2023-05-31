ember-stepper
==============================================================================

Headless stepper, no default style provided here.

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```zsh
ember install @triptyk/ember-stepper
```
OR
```zsh
pnpm add -D @triptyk/ember-stepper
```


## Usage

### ...@Args

```ts
interface TpkStepperArgs {
  startStep?: number;
  classless?: boolean;
}
```

```hbs
<TpkStepper ...@Args |Stepper|>
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
```

Each step has a "Header", this is the title of the steps. The content is transfered to the `TpkStepper::Stepper` using `#in-element`. It may be customised to your needs.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


## License

This project is licensed under the [MIT License](LICENSE.md).
