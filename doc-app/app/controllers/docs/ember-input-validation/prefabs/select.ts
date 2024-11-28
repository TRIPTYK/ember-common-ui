import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

function configureDisplay<T>(obj: T, format: (obj: T) => string) {
  return {
    ...obj,
    toString() {
      return format(this);
    },
  };
}

export default class DocsEmberInputValidationPrefabsSelectController extends Controller {
  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }
  @tracked changeset = new ImmerChangeset({
    ceo: configureDisplay(
      { firstname: 'Patrick', lastname: 'Pagnoulle' },
      (option) => `${option.firstname} ${option.lastname}`,
    ),
    disabled: configureDisplay(
      { firstname: 'Tils', lastname: 'Abled' },
      (option) => `${option.firstname} ${option.lastname}`,
    ),
    error: configureDisplay(
      { firstname: 'Err', lastname: 'Aur' },
      (option) => `${option.firstname} ${option.lastname}`,
    ),
  });

  @tracked changesetBis = new ImmerChangeset({
    ceo: undefined,
  });

  @tracked changesetTris = new ImmerChangeset({
    ceo: [],
  });

  @tracked options = [
    { firstname: 'Patrick', lastname: 'Pagnoulle' },
    { firstname: 'Romain', lastname: 'Verliefden' },
    { firstname: 'Gilles', lastname: 'Bertrand' },
  ].map((o) =>
    configureDisplay(o, (option) => `${option.firstname} ${option.lastname}`),
  );
}
