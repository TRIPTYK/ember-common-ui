import Component from '@glimmer/component';
import RouteTemplate from 'ember-route-template';
import type { RouteTemplateSignature } from 'doc-app/utils/route-template';
import type TableRoute from 'doc-app/routes/table';
import type UserModel from 'doc-app/models/user';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkTableGenericPrefab, { type TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';
import { hash } from '@ember/helper';

export interface TableRouteComponentSignature {}

class TableRouteComponent extends Component<RouteTemplateSignature<TableRoute>> {
  emailOptions = ['info@triptyk.eu','loempia@triptyk.eu'];

  tableParamsWithFunctions: TableParams = {
    entity: 'user',
    pageSizes: [10,30,50,75],
    defaultSortColumn: 'firstName',
    columns:[
      {
        field: 'firstName',
        headerName: 'Prénom',
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable:false,
        component : 'selectEmail',
      },
    ],
    actionMenu: [],
  };

  onUpdate = (selection: unknown, row: UserModel) => {
    row.set('email', selection as string);
    console.log(selection);
    console.log(row);
  }

  <template>
    <div class="flex justify-center items-center h-screen px-32">
      <TpkTableGenericPrefab
        @tableParams={{this.tableParamsWithFunctions}}
        @columnsComponent={{hash
          selectEmail=(component
            SelectTableRegister
              label="Email"
              options=this.emailOptions
              onUpdate=this.onUpdate
          )
        }}
      />
    </div>
  </template>
}

export default RouteTemplate(TableRouteComponent);

class SelectTableRegister extends Component<TpkSelectSignature & {
    Args: {
      cellValue: string,
      onUpdate: (selection: unknown, row: UserModel) => void,
      row: UserModel
    }
}> {

  onChange = (selection: unknown) => {
    this.args.onUpdate(selection, this.args.row);
  }

  <template>
    <div data-test-table-generic-select>
    <TpkSelectComponent  @options={{@options}} @onChange={{this.onChange}} @selected={{@cellValue}} @label="" as |S| >
      <S.Option as |O|>
        {{O.option}}
      </S.Option>
    </TpkSelectComponent>
    </div>
  </template>;
}
