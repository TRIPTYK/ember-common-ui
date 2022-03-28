import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';

export interface BaseValidationArgs {
  changeset: BufferedChangeset;
  validationField: string;
  // Override change function
  onChange?: (value: unknown) => unknown;
}

export abstract class BaseValidationComponent<
  T extends BaseValidationArgs
> extends Component<T> {
  get hasError() {
    return this.errors.length > 0;
  }

  constructor(owner: unknown, args: T) {
    super(owner, args);
    assert('@changeset is required', typeof args.changeset === 'object');
    assert(
      '@validationField is required',
      typeof args.validationField === 'string'
    );
  }

  get firstError() {
    return this.errors[0];
  }

  get errors() {
    return (
      (this.args.changeset.errors.find(
        (err) => err.key === this.args.validationField
      )?.validation as unknown[]) ?? []
    );
  }
}
