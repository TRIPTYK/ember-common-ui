# How to install

```bash
ember install @triptyk/ember-input
```

Install the peer dependencies if needed:

```bash
ember install ember-flatpickr
```


## Importing types

Add the Glint template-registry to your global.d.ts file:

```ts
import '@glint/environment-ember-loose';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberInputRegistry {}
}
```
