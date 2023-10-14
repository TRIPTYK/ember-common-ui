import { action } from '@ember/object';
import { type BaseValidationSignature, BaseValidationComponent } from './base';
import { type ComponentLike } from '@glint/template';
import { assert } from '@ember/debug';
import TpkDatepickerInputComponent, {
  type FlatpickerArgs,
} from '@triptyk/ember-input/components/tpk-datepicker/input';
import TpkDatepickerLabelComponent from '@triptyk/ember-input/components/tpk-datepicker/label';

export interface TpkValidationDatepickerComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
  } & FlatpickerArgs;
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkDatepickerInputComponent>;
        Label: ComponentLike<typeof TpkDatepickerLabelComponent>;
        errors: TpkValidationDatepickerComponent['errors'];
        hasError: TpkValidationDatepickerComponent['hasError'];
        firstError: TpkValidationDatepickerComponent['firstError'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationDatepickerComponent extends BaseValidationComponent<TpkValidationDatepickerComponentSignature> {
  @action onChange(dates: Date[]) {
    if (dates.length === 0) return;
    const date =
      this.args.mode === 'multiple' || this.args.mode === 'range'
        ? dates
        : dates[0];
    if (this.args.onChange) {
      return this.args.onChange(date);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }

  get value() {
    assert(
      '@value must be a string, number, date or null',
      typeof super.value === 'string' ||
        typeof super.value === 'number' ||
        super.value instanceof Date ||
        super.value === null,
    );
    return super.value as never;
  }
}
