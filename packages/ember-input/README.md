ember-select
==============================================================================

This addon will give you a simple input alternative in TailwindCSS


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple input


Installation
------------------------------------------------------------------------------

```zsh
ember install @triptyk/ember-input
```
OR
```zsh
pnpm add -D @triptyk/ember-input
```


Usage
------------------------------------------------------------------------------

### Common arguments

All the inputs in this addon accepts these arguments.

```ts
interface TpkBaseInputArgs {
  classless?: boolean;
  label?: string;
  value: unknown;
  changeEvent: 'input' | 'change';
  onChange?: (...args: unknown[]) => unknown;
}
```

### Tpk-Input

#### Special Args

- type : The input type

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

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
