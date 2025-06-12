import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { isFieldError } from '../utils/is-field-error.js';

class BaseValidationComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('@changeset is required', typeof args.changeset === 'object');
    assert('@validationField is required', typeof args.validationField === 'string');
  }
  get hasError() {
    return this.errors.length > 0;
  }
  get firstError() {
    return this.errors[0];
  }
  get mandatory() {
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
  get errors() {
    return this.args.changeset.errors.filter(err => isFieldError(this.args.validationField, err.key)) ?? [];
  }
  get value() {
    return this.args.changeset.get(this.args.validationField);
  }
}

export { BaseValidationComponent };
//# sourceMappingURL=base.js.map
