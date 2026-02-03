import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectSearchPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-search';
import { task } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';

export default class DisabledSelectSearchExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: {
      label: 'ember-common-ui',
      value: 'ember-common-ui',
      toString() {
        return `${this.label}`;
      },
    },
  });

  @tracked options: unknown[] = [];

  onSearch = task(async (searchTerm: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockRepos = [
      { label: 'ember-common-ui', value: 'ember-common-ui' },
      { label: 'ember-power-select', value: 'ember-power-select' },
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
      @label="Disabled Select Search"
      @options={{this.options}}
      @onSearch={{perform this.onSearch}}
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
