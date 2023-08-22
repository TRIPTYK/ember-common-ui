import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';

export interface BaseValidationArgs {
  changeset: BufferedChangeset;
  validationField: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: unknown) => unknown;
}

export abstract class BaseValidationComponent<
  T extends BaseValidationArgs
> extends Component<T> {
  constructor(owner: unknown, args: T) {
    super(owner, args);
    assert('@changeset is required', typeof args.changeset === 'object');
    assert(
      '@validationField is required',
      typeof args.validationField === 'string'
    );
  }

  get hasError() {
    return this.errors.length > 0;
  }

  get firstError(): Record<string, unknown> {
    return this.errors[0];
  }

  get errors(): Record<string, unknown>[] {
    return (
      this.args.changeset.errors.filter((err) =>
        err.key.startsWith(this.args.validationField)
      ) ?? []
    );
  }

  get value() {
    return this.args.changeset.get(this.args.validationField);
  }
}
