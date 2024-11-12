# How to install

```bash
ember install @triptyk/ember-ui
```

Install the peer dependencies if needed:

```bash
ember install @triptyk/ember-input
```

## Importing types

Add the Glint template-registry to your global.d.ts file:

```ts
import '@glint/environment-ember-loose';
import type EmberUIValidationRegistry from '@triptyk/ember-ui/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberUIRegistry {}
}
```
