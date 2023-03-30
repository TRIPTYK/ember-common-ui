ember-modal
==============================================================================

This addon will give you a simple menu with visibility toggle


## Compatibility

* Ember.js v4.6 or above
* Ember CLI v4.6 or above
* Node.js v18 or above
* You need tailwind v2 or above to use this simple textarea


## Installation

```zsh
ember install @triptyk/ember-actions-menu
```
OR
```zsh
pnpm add -D @triptyk/ember-actions-menu
```


Usage
------------------------------------------------------------------------------
#### Features

-  Actions menu, visibility is toggled by a button
-  Close on ESC key press or click outside.
-  Customatizable Action.

#### Integration example 

Arguments : 
  -  @classless : Disable generated css classes

Yielded Component:

	Action:
		Arguments:
			- action: The function triggered when the action is clicked
			- icon: src of an image that would be displayed to the left of the action button

```hbs
  <TpkActionsMenu
    @classless={{false}}
		as |Action|
  >
		<Action
			@icon={{this.iconSrc}}
			@action={{this.action}}
		>
			ActionText
		</Action>
	</TpkActionsMenu>
```

Structure of the component (Emmet like)
------------------------------------------------------------------------------

- ActionsMenu
  - button.open_actions
		-img
  - ul
		- Action

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
You can also contact info@triptyk for more informations on how contributing on this project.


## License

This project is licensed under the [MIT License](LICENSE.md).
