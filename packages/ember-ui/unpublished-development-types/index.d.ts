/* eslint-disable @typescript-eslint/no-explicit-any */
// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberIntlRegistry from 'ember-intl/template-registry';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends RenderModifiersRegistry,
      EmberInputRegistry,
      EmberIntlRegistry {
    'on-click-outside': any;
    YetiTable: any;
  }
}
