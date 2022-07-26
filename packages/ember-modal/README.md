ember-modal
==============================================================================

This addon will give you a simple stackable dialog system


## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple textarea


## Installation

```zsh
ember install @triptyk/ember-modal
```
OR
```zsh
pnpm add -D @triptyk/ember-modal
```


Usage
------------------------------------------------------------------------------
#### Features

-  Modal dialog, can stack on each other
-  Triggers @onClose on ESC key press or click outside.
-  Customatizable content.

#### Integration example 

Arguments : 
  -  @title : The title of the modal - needed for Accessibility (won't show by default visually)
  -  @isOpen : The variable that toggles the modal
  -  @onClose : The function triggered when modal is trying to get closed
  -  @classless : Disable generated css classes

```hbs
  <TpkModal
    @title='title'
    @isOpen={{this.open2}}
    @onClose={{this.closed2}}
    @classless={{false}}
    as |M|
  >
  <M.Content>
      <button type="button">Hello</button>
  </M.Content>
</TpkModal>
```



For the extended syntax, [see examples](/packages/ember-modal/tests/dummy/app/components/ui-show.hbs).

Structure of the component (Emmet like)
------------------------------------------------------------------------------

- Modal
  - div.tpk-modal-container
    - Modal::Content.tpk-modal-content

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


## License

This project is licensed under the [MIT License](LICENSE.md).
