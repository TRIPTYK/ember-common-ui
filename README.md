# MONOREPO for our EMBER-UI

This repository contains our simplified ui for our ember projects .

You can find more documentation in the sub-projects.

- [@triptyk/ember-ui](https://github.com/TRIPTYK/ember-common-ui/tree/main/packages/ember-ui/README.md)
- [@triptyk/ember-input](https://github.com/TRIPTYK/ember-common-ui/tree/main/packages/ember-input/README.md)
- [@triptyk/ember-input-validation](https://github.com/TRIPTYK/ember-common-ui/tree/main/packages/ember-input-validation/README.md)

## HTML naming conventions

Every component has an HTML element with a class assigned to it.

The naming of the class follows this rule : 
> **Path of the component to kebab case**

Ex : 
  - `<TpkInput>` : .tpk-input
  - `<TpkInput::Label>` : .tpk-input-label
  - `<TpkInput::Input>` : .tpk-input-input

If you want no base class applied to the component, you can use the `@classless` argument.

##  Disclaimer

Versions *0.X.X* will not follow SemVer.