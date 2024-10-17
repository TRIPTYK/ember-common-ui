import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';

function configureDisplay(obj, format) {
  return {
    ...obj,
    toString() {
      return format(this);
    },
  };
}

export default class DocsEmberInputValidationPrefabsSelectController extends Controller {
  @tracked changeset = new ImmerChangeset({
    ceo: configureDisplay(
      { firstname: 'Patrick', lastname: 'Pagnoulle' },
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
