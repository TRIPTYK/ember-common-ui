import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TpkTableGenericPrefab from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import type { TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import TpkSelect from '@triptyk/ember-input/components/tpk-select';
import type { TOC } from '@ember/component/template-only';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import stringify from 'doc-app/helpers/to-string';
import EditIcon from 'doc-app/assets/icons/edit.gts';
import DeleteIcon from 'doc-app/assets/icons/delete.gts';

const TpkSelectElement: TOC<
  TpkSelectSignature & {
    Args: {
      cellValue: string;
    };
  }
> = <template>
  <div data-test-table-generic-select>
    <TpkSelect
      @options={{@options}}
      @onChange={{@onChange}}
      @selected={{@cellValue}}
      @label=""
      as |S|
    >
      <S.Option as |O|>
        {{stringify O.option}}
      </S.Option>
    </TpkSelect>
  </div>
</template>;

export default class TpkTableGenericPrefabExample extends Component {
  @tracked tableParams: TableParams = {
    entity: 'user',
    pageSizes: [10, 30, 50, 75],
    defaultSortColumn: 'firstName',
    rowClick: (element: unknown) => {
      console.log('Row clicked:', element);
    },
    columns: [
      {
        field: 'lastName',
        headerName: 'Nom',
        sortable: true,
      },
      {
        field: 'firstName',
        headerName: 'Prénom',
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        component: 'selectEmail',
      },
    ],
    actionMenu: [
      {
        icon: <template><EditIcon class="size-4" /></template> as TOC<{
          Element: SVGSVGElement;
        }>,
        action: (element: unknown) => {
          console.log('Edit clicked', element);
        },
        name: 'Edit',
      },
      {
        icon: <template><DeleteIcon class="size-4" /></template> as TOC<{
          Element: SVGSVGElement;
        }>,
        action: (element: unknown) => {
          console.log('Delete clicked', element);
        },
        name: 'Delete',
      },
    ],
  };

  emailOptions = ['info@triptyk.eu', 'loempia@triptyk.eu'];

  @action
  onEmailChange(selection: unknown) {
    console.log('Email changed:', selection);
  }

  @action
  onRowClick(element: unknown, e?: Event) {
    console.log('Row clicked:', element, e);
  }

  <template>
    <TpkTableGenericPrefab
      @tableParams={{this.tableParams}}
      @columnsComponent={{hash
        selectEmail=(component
          TpkSelectElement options=this.emailOptions onChange=this.onEmailChange
        )
      }}
    />
  </template>
}
