# MONOREPO for our EMBER-UI

This repository contains our ui for our ember projects .

## Documentation 

🚧 - https://triptyk.github.io/ember-common-ui/

## Development

`pnpm i`
`pnpm run start`

All the tests are in the `doc-app`.

## Release process

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

### Branches

| Branch | npm tag | Description |
|--------|---------|-------------|
| `main` | `latest` | Stable releases |
| `develop` | `alpha` | Pre-release builds |

### Adding a changeset

When your PR contains a user-facing change, run:

```sh
pnpm changeset
```

Follow the prompts to select affected packages and describe the change. Commit the generated `.changeset/*.md` file with your PR.

### How publishing works (CI)

On every push to `main` or `develop`, the release workflow either:
- **Opens/updates a "Version Packages" PR** — if unpublished changesets exist (bumps versions, updates changelogs)
- **Publishes to npm** — when that PR is merged

No manual publish step needed.

### Manual release (local)

```sh
# 1. Bump versions and update changelogs
pnpm version

# 2. Publish to npm
pnpm release
```

### Graduating from alpha to stable

When `develop` is ready for a stable release, run on the `develop` branch:

```sh
pnpm changeset pre exit
```

Then merge `develop` into `main`.

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
