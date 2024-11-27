import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';

interface Option {
  name: string;
  toString(): string;
}

interface Changeset {
  repository: Option | undefined;
}

export default class DocsEmberInputValidationPrefabsSelectSearchController extends Controller {
  @tracked changeset = new ImmerChangeset<Changeset>({
    repository: undefined,
  });
  @tracked options: Option[] = [];

  @restartableTask
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  *onSearch(value: string): any {
    yield timeout(300);
    const response = yield fetch(
      `https://api.github.com/search/repositories?q=${value}`,
    );
    const json: { items: { full_name: string }[] } = yield response.json();
    this.options = json.items.map((item) => ({
      name: item.full_name,
      toString() {
        return this.name;
      },
    }));
  }

  @action
  onChange(value: Option) {
    this.changeset.set('repository', value);
  }
}
