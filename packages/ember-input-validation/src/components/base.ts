import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { type Changeset } from 'ember-immer-changeset';
import { isFieldError } from '../utils/is-field-error.ts';

export interface BaseValidationSignature {
  Args: {
    changeset: Changeset;
    validationField: string;
    mandatory?: boolean;
    requiredFields?: string[];
  };
  Blocks: {
    default: unknown[];
  };
}

export abstract class BaseValidationComponent<
  T extends BaseValidationSignature,
> extends Component<T> {
  constructor(owner: unknown, args: T['Args']) {
    super(owner, args);
    assert('@changeset is required', typeof args.changeset === 'object');
    assert(
      '@validationField is required',
      typeof args.validationField === 'string',
    );
  }

  get hasError() {
    return this.errors.length > 0;
  }

  get firstError(): Record<string, unknown> | undefined {
    return this.errors[0];
  }

  get mandatory(): boolean {
    if (this.args.mandatory !== undefined) {
      return this.args.mandatory;
    }

    const requiredFields = this.args.requiredFields;
    if (!requiredFields) {
      return false;
    }
    return requiredFields.includes(this.args.validationField);
  }

  // dotted path only
  get errors(): Record<string, unknown>[] {
    return (
      this.args.changeset.errors.filter((err) =>
        isFieldError(this.args.validationField, err.key as string),
      ) ?? []
    );
  }

  get value() {
    return this.args.changeset.get(this.args.validationField);
  }
}
