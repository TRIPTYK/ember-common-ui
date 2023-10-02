# MONOREPO for our EMBER-UI

This repository contains our simplified ui for our ember projects .

## Documentation 

🚧 - https://triptyk.github.io/ember-common-ui/

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

Versions *0.X.X* does not follow SemVer.