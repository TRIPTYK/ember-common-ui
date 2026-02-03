import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectSearchPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-search';
import { task } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';

export default class BasicSelectSearchExample extends Component {
  @tracked changeset = new ImmerChangeset({
    repository: null,
  });

  @tracked options: unknown[] = [];

  onSearch = task(async (searchTerm: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockRepos = [
      { label: 'ember-common-ui', value: 'ember-common-ui' },
      { label: 'ember-power-select', value: 'ember-power-select' },
      { label: 'ember-concurrency', value: 'ember-concurrency' },
      { label: 'ember-cli', value: 'ember-cli' },
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

  <template>
    <TpkSelectSearchPrefab
      @label="Find your favorite ember repository on Github"
      @options={{this.options}}
      @onSearch={{perform this.onSearch}}
      @changeset={{this.changeset}}
      @validationField="repository"
    />
  </template>
}
