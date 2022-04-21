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
  date: [validatePresence(true)],
  country: [validatePresence(true)],
};

interface Option {
  username: string;
  id: number;
}

export default class UiShow extends Component<UiShowArgs> {
  @tracked changeset: BufferedChangeset;
  @tracked options: Option[] = [
    {
      username: 'Amaury',
      id: 1,
    },
    {
      username: 'Sebastien',
      id: 2,
    },
    {
      username: 'Coco',
      id: 3,
    },
    {
      username: 'Anthony Gonzalez',
      id: 4,
    },
  ];

  @action submit(e: Event) {
    e.preventDefault();
    this.changeset.validate();
  }

  @action
  onChange(e: Option) {
    this.changeset.set('country', e);
  }

  constructor(owner: unknown, args: UiShowArgs) {
    super(owner, args);
    this.changeset = Changeset(
      {
        name: '',
        hasDriverLicence: false,
        files: [],
        firstname: '',
        country: '',
        date: '',
        comment: '',
      },
      lookupValidator(validation),
      validation
    );
  }
}
