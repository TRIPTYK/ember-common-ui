# MONOREPO for our EMBER-UI

This repository contains our ui for our ember projects .

## Documentation 

🚧 - https://triptyk.github.io/ember-common-ui/

## Development

`pnpm i`
`pnpm run start`

All the tests are in the `doc-app`.

## Publish

`pnpm lerna version <version>`
`pnpm recursive publish`

##  Disclaimer

Versions *0.X.X* does not follow SemVer.


## Architecture

```
doc-app/
  app/
    routes/
      docs/
        ember-input-validation/
          prefabs/
            input.ts          # Route qui charge les données
    templates/
      docs/
        ember-input-validation/
          prefabs/
            input.hbs         # Template de la page
    components/
      doc-page.gts            # Layout principal de page doc
      code-example.gts        # Composant avec onglets Template/Result/Code
      usage-example.gts       # Wrapper pour les exemples
      markdown-content.gts    # Pour le contenu texte (optionnel)
  translations/
    en-us.yaml
    fr-fr.yaml
```
