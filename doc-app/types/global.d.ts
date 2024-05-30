import '@glint/environment-ember-loose';


// Types for compiled templates
declare module 'doc-app/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}
