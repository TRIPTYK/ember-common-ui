import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { htmlSafe as HS } from '@ember/template';
import { t } from 'ember-intl';

export interface TpkValidationErrorsComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;

  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationErrorsComponent extends Component<TpkValidationErrorsComponentSignature> {
  htmlSafe = helper(function htmlSafe(params: [string]) {
    return HS(params.join());
  });

  <template>
    <div class="tpk-validation-errors"
    ...attributes>
      {{#each @errors as |error|}}
        <span>
          {{#if error.message}}
            {{this.htmlSafe (t error.message error.params)}}
          {{else}}
            {{error}}
          {{/if}}
        </span>
      {{/each}}
    </div>
  </template>
}
