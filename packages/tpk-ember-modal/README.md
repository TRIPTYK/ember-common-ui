ember-modal
==============================================================================

This addon will give you a simple modal mechanic


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* You need tailwind v2 or above to use this simple textarea


Installation
------------------------------------------------------------------------------

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

- Auto inject div modal in body with id "tpk-modal" by default.
- Modal dialog, only 1 active at a time.
- Triggers @onClose on ESC key press.
- Completely customatizable with blocks

#### Integration example 

Arguments : 
  -  @title : The title of the modal
  -  @isOpen : The variable that toggles the modal
  -  @onClose : The function triggered when modal is closed  

```hbs
<Ui::Modal
  @title='My modal title'
  @isOpen={{this.isOpen}}
  @onClose={{this.isClosed}}
>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolorum
    hic sunt odio velit quo quasi dolores? Cumque, iusto iste qui obcaecati ex
    neque magni enim corporis, sed, magnam molestiae.
  </p>
</Ui::Modal>
```



For the extended syntax, [see examples](/packages/ember-modal/tests/dummy/app/components/ui-show.hbs).

Default tailwind style example : 

```css
.tpk-modal-content {
  @apply z-20 bg-white p-6 rounded-lg;
  width: 50vw;
}

.tpk-modal-content-head {
  @apply flex justify-between mb-8;
}

.tpk-modal-content-head > h3 {
  @apply text-2xl font-semibold;
}

.tpk-modal-container {
  @apply fixed px-4 py-4 top-0 right-0 left-0 bottom-0 flex items-center justify-center z-20;
}

.tpk-modal-cover {
  @apply absolute inset-0 bg-gray-500 opacity-75 z-10;
}
```

Structure of the component (Emmet like)
------------------------------------------------------------------------------

- Modal
  - div.tpk-modal-container
    - div.tpk-modal-cover
    - Modal::Content.tpk-modal-content
      - Modal::Content::Head.tpk-modal-content-head
        - h3
        - Modal::Content::Head::Button.tpk-modal-content-head-button
      - {{yield}}

  

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
