# How to install

```bash
pnpm add @triptyk/ember-input-validation
```

Install the peer dependencies if needed:

```bash
pnpm add @triptyk/ember-input
pnpm add ember-immer-changeset
```

## Importing types

Add the Glint template-registry to your global.d.ts file:

```ts
import "@glint/environment-ember-loose";
import type EmberInputValidationRegistry from "@triptyk/ember-input-validation/template-registry";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry extends EmberInputValidationRegistry {}
}
```
