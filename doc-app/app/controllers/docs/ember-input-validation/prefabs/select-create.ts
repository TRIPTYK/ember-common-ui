import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

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
}

interface ChangesetBisType {
  ceo: { firstname: string }[];
}

export default class DocsEmberInputValidationPrefabsSelectCreateController extends Controller {
  @tracked changeset = new ImmerChangeset<ChangesetType>({
    ceo: undefined,
  });

  @tracked changesetBis = new ImmerChangeset<ChangesetBisType>({
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
