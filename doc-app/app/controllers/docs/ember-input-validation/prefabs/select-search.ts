import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';
import type Owner from '@ember/owner';

interface Option {
  name: string;
  toString(): string;
}

interface Changeset {
  repository: Option | undefined;
  disabled: Option | undefined;
  error: Option | undefined;
}

export default class DocsEmberInputValidationPrefabsSelectSearchController extends Controller {
  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }

  changeset = new ImmerChangeset<Changeset>({
    repository: undefined,
    disabled: undefined,
    error: undefined,
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
