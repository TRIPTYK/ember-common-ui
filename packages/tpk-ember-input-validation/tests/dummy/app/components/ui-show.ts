import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { BufferedChangeset } from 'ember-changeset/types';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  validateLength,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';
import { action } from '@ember/object';

interface UiShowArgs {}

const validation = {
  name: [
    validatePresence(true),
    validateLength({
      min: 2,
    }),
  ],
  comment: [validatePresence(true)],
  firstname: [validatePresence(true)],
  hasDriverLicence: [validatePresence(true)],
  avatar: [validatePresence(true)],
};

export default class UiShow extends Component<UiShowArgs> {
  @tracked changeset: BufferedChangeset;

  @action submit(e: Event) {
    e.preventDefault();
    this.changeset.validate();
  }

  constructor(owner: unknown, args: UiShowArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        name: '',
        hasDriverLicence: '',
        files: undefined,
        firstname: '',
      },
      lookupValidator(validation),
      validation
    );
  }
}
