import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type Owner from '@ember/owner';

function configureDisplay<T>(obj: T, format: (obj: T) => string) {
  return {
    ...obj,
    toString() {
      return format(this);
    },
  };
}

interface ChangesetType {
  ceo?: { firstname: string };
  disabled?: { firstname: string };
  error?: { firstname: string };
}

interface ChangesetBisType {
  ceo: { firstname: string }[];
}

export default class DocsEmberInputValidationPrefabsSelectCreateController extends Controller {
  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }

  changeset = new ImmerChangeset<ChangesetType>({
    ceo: undefined,
    disabled: undefined,
    error: undefined,
  });

  changesetBis = new ImmerChangeset<ChangesetBisType>({
    ceo: [],
  });

  @tracked options = [
    { firstname: 'Patrick' },
    { firstname: 'Romain' },
    { firstname: 'Gilles' },
  ].map((o) => configureDisplay(o, (option) => option.firstname));

  @action
  onCreate(value: string) {
    const newValue = configureDisplay(
      { firstname: value },
      (option) => option.firstname,
    );
    this.options = [...this.options, newValue];
    this.changeset.set('ceo', newValue);
  }

  @action
  onCreateBis(value: string) {
    console.log(value);
    const newValue = configureDisplay(
      { firstname: value },
      (option) => option.firstname,
    );
    this.options = [...this.options, newValue];
    this.changesetBis.set('ceo', [...this.changesetBis.get('ceo'), newValue]);
  }

  @action
  buildSuggestion(term: string) {
    return `Créer "${term}"...`;
  }

  @action
  showCreateWhen(term: string) {
    const existingOption = this.options.find((name) => name.firstname === term);
    return !existingOption;
  }
}
