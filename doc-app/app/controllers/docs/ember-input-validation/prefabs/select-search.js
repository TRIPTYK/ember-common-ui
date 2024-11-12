import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';

export default class DocsEmberInputValidationPrefabsSelectSearchController extends Controller {
  @tracked changeset = new ImmerChangeset({
    repository: undefined,
  });
  @tracked options = [];

  @restartableTask
  *onSearch(value) {
    yield timeout(300);
    const response = yield fetch(
      `https://api.github.com/search/repositories?q=${value}`,
    );
    const json = yield response.json();
    this.options = json.items.map((item) => ({
      name: item.full_name,
      toString() {
        return this.name;
      },
    }));
  }

  @action
  onChange(value) {
    this.changeset.set('repository', value);
  }
}
