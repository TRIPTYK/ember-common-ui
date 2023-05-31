ember-modal
==============================================================================

This addon will give you a simple list of stackable items


## Compatibility

* Ember.js v4.6 or above
* Ember CLI v4.6 or above
* Node.js v18 or above
* You need tailwind v2 or above

## Installation

```zsh
ember install @triptyk/ember-stack-list
```
OR
```zsh
pnpm add -D @triptyk/ember-stack-list
```


Usage
------------------------------------------------------------------------------
#### Features

-  List of foldable items
-  Customatizable foldable content.

#### Integration example 

Arguments : 
  -  @data : Array of data. Each value is a item in the list.
  -  @onRemove : Function called on removeButton click
  -  @onAdd : Function called on addButton click
  -  @titleForAdd : string displayed on addButton

```hbs
		 <TpkStackList
			@data={{this.data}}
			@onRemove={{this.onRemoveData}}
			@onAdd={{this.onAddData}}
			@titleForAdd={{this.titleForAdd}}
			as |S|
		>
			<S.Title as |T|>
				{{get T.item 'title'}}
			</S.Title>
			<S.Content as |C|>
				{{get C.item 'title'}}
			</S.Content>
		</TpkStackList>
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
