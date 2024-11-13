# MONOREPO for our EMBER-UI

This repository contains our ui for our ember projects .

## Documentation 

🚧 - https://triptyk.github.io/ember-common-ui/

## Development

`pnpm i`
`pnpm run start`

All the tests are in the `doc-app`.

## HTML naming conventions

Every component has an HTML element with a class assigned to it.

The naming of the class follows this rule : 

> **Path of the component to kebab case**

Ex : 
  - `<TpkInput>` : .tpk-input
  - `<TpkInput::Label>` : .tpk-input-label
  - `<TpkInput::Input>` : .tpk-input-input

##  Disclaimer

Versions *0.X.X* does not follow SemVer.