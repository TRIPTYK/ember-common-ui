import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';

export interface BaseValidationArgs {
  changeset: BufferedChangeset;
  validationField: string;
}

export abstract class BaseValidationComponent<
  T extends BaseValidationArgs
> extends Component<T> {
  get hasError() {
    return this.errors.length > 0;
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
