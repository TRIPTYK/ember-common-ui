import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

function configureDisplay(obj, format) {
  return {
    ...obj,
    toString() {
      return format(this);
    },
  };
}

export default class DocsEmberInputValidationPrefabsSelectCreateController extends Controller {
  @tracked changeset = new ImmerChangeset({
    ceo: undefined,
  });
  @tracked changesetBis = new ImmerChangeset({
    ceo: [],
  });

  @tracked options = [
    { firstname: 'Patrick' },
    { firstname: 'Romain' },
    { firstname: 'Gilles' },
  ].map((o) => configureDisplay(o, (option) => option.firstname));

  @action
  onCreate(value) {
    const newValue = configureDisplay(
      { firstname: value },
      (option) => option.firstname,
    );
    this.options = [...this.options, newValue];
    this.changeset.set('ceo', newValue);
  }

  @action
  onCreateBis(value) {
    console.log(value);
    const newValue = configureDisplay(
      { firstname: value },
      (option) => option.firstname,
    );
    this.options = [...this.options, newValue];
    this.changesetBis.set('ceo', [...this.changesetBis.get('ceo'), newValue]);
  }

  @action
  buildSuggestion(term) {
    return `Créer "${term}"...`;
  }

  @action
  showCreateWhen(term) {
    let existingOption = this.options.find((name) => name.firstname === term);
    return !existingOption;
  }
}
