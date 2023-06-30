# @triptyk/ember-ui

This addon will give you a simple input alternative in TailwindCSS


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```zsh
ember install @triptyk/ember-ui
```
OR
```zsh
pnpm add -D @triptyk/ember-ui
```

?
## Usage

### Common arguments

All the inputs in this addon accepts these arguments.

```ts
interface TpkBaseInputArgs {
  classless?: boolean;
  label?: string;
  value: unknown;
  changeEvent: 'input' | 'change';
  onChange?: (...args: unknown[]) => unknown;
  mask?: string;
  maskOptions?: IMask.AnyMaskedOptionsArray;
  unmaskValue?: boolean;
}
```

### Tpk-Input

#### Special Args

- type : The input type
- mask: Pattern for mask
- maskOptions: Options for mask (doc: https://imask.js.org/guide.html)
- unmaskValue: Need explanation ??? 🙄

#### No-Block version

```hbs
  <TpkInput
    ...@TpkInputArgs
  />
```

#### Block version

Yielded :
  - Label : Component
  - Input : Component
  - guid : string
  
```hbs
  <TpkInput
    ...@TpkInputArgs
  as |TI|>
    <TI.Input />
    <TI.Label />
  </TpkInput>
```

### Tpk-Textarea

#### Special arguments

- None

#### No-Block version

```hbs
  <TpkTextarea
    ...@TpkInputArgs
  />
```

#### Block version

Yielded :
  - Label : Component
  - Input : Component
  - guid : string

  
```hbs
  <TpkTextarea
    ...@TpkInputArgs
  as |TI|>
    <TI.Input />
    <TI.Label />
  </TpkTextarea>
```

### Tpk-File

#### Special arguments

- accept : accepted mimetypes

#### No-Block version

```hbs
  <TpkFile
    ...@TpkInputArgs
  />
```

#### Block version

Yielded :
  - Label : Component
  - Input : Component
  - guid : string
  - files : File[]
  
```hbs
  <TpkFile
    ...@TpkInputArgs
  as |TI|>
    <TI.Input />
    <TI.Label />
  </TpkFile>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


## License

This project is licensed under the [MIT License](LICENSE.md).
