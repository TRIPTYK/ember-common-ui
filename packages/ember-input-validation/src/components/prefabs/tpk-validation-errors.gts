import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { htmlSafe as HS } from '@ember/template';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';

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
  @service declare intl: IntlService;

  htmlSafe = helper(function htmlSafe(params: [string]) {
    return HS(params.join());
  });

  get errorMessages() {
    return this.args.errors.map((error: { message: string; params: string[] }) => {
      if (error.message) {
        const translationExists = this.intl.exists(error.message);
        return HS(translationExists ? this.intl.t(error.message) : error.message);
      }
      return error;
    });
  }

  <template>
    <div class="tpk-validation-errors"
    data-test-tpk-validation-errors
    ...attributes>
      {{#each this.errorMessages as |error|}}
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
