# @triptyk/ember-input

This addon will give you a simple input alternative in TailwindCSS


## Compatibility

* Ember.js v4.4 or above
* Ember CLI v4.4 or above
* Node.js v16 or above


## Installation

```zsh
ember install @triptyk/ember-input
```
OR
```zsh
pnpm add -D @triptyk/ember-input
```


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

### TpkSelect

```hbs
<TpkSelect
  @label='Select something'
  @options={{this.options}}
  @onChange={{this.selectElement}}
  @selected={{this.selected}}
as |S|>
  <S.Label />
  <S.Button >
    {{if S.hasSelection S.selected "Please select something"}}
  </S.Button>
  <S.Options as |Opts|>
    <Opts as |opt|>
    {{opt.option}}
    </Opts>
  </S.Options>
</TpkSelect>
```

### TpkSelectSearch

```hbs
<TpkSelectSearch
  @label='Select something'
  @options={{this.options}}
  @onChange={{this.selectElement}}
  @selected={{this.selected}}
  class="tpk-select-search"
as |S|>
  <S.Label />
  <div class="tpk-select-search-container">
    <S.Input @onInput={{this.onInput}} />
    <S.Button>
    <svg width="18" height="16" aria-hidden="true" focusable="false">
      <polygon class="arrow" stroke-width="0" fill-opacity="0.75" fill="currentcolor" points="3,6 15,6 9,14"></polygon>
    </svg>
    </S.Button>
  </div>
  <S.Options as |Opts|>
    <Opts as |opt|>
    {{opt.option}}
    </Opts>
  </S.Options>
</TpkSelectSearch>
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


## License

This project is licensed under the [MIT License](LICENSE.md).
