import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectSearchPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-search';
import type Owner from '@ember/owner';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';

export default class ErrorSelectSearchExample extends Component {
  @tracked changeset = new ImmerChangeset({
    repository: null,
  });

  @tracked options: unknown[] = [];

  onSearch = task(async (searchTerm: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockRepos = [
      { label: 'ember-common-ui', value: 'ember-common-ui' },
      { label: 'ember-power-select', value: 'ember-power-select' },
      { label: 'ember-concurrency', value: 'ember-concurrency' },
    ];

    this.options = mockRepos
      .filter((repo) =>
        repo.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((repo) => ({
        ...repo,
        toString() {
          return `${this.label}`;
        },
      }));
  });

  @action
  onChange(value: unknown) {
    if (!value) {
      this.changeset.addError({
        message: 'Please select a repository',
        value: 'err',
        originalValue: '',
        key: 'repository',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select a repository',
        value: 'err',
        originalValue: '',
        key: 'repository',
      });
    }, 0);
  }

  <template>
    <TpkSelectSearchPrefab
      @label="Select Search with Error"
      @options={{this.options}}
      @onSearch={{perform this.onSearch}}
      @changeset={{this.changeset}}
      @validationField="repository"
      @onChange={{this.onChange}}
    />
  </template>
}
