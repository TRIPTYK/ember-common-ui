import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkTableGenericPrefabExample from 'doc-app/components/docs/ember-ui/prefabs/table-generic.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkTableGenericPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class TpkTableGenericPrefabDocs extends Component<TpkTableGenericPrefabDocsSignature> {
  @service declare intl: IntlService;

  tpkTableGenericPrefab = `
  <TpkTableGenericPrefab
    @tableParams={{hash
      entity="user"
      pageSizes=(array 10 30 50 75)
      defaultSortColumn="firstName"
      columns=(array
        (hash
          field="lastName"
          headerName="Nom"
          sortable=true
        )
        (hash
          field="firstName"
          headerName="Prénom"
          sortable=true
        )
        (hash
          field="email"
          headerName="Email"
          sortable=false
          component="selectEmail"
        )
      )
      actionMenu=(array
        (hash
          icon=(component EditIcon)
          action=this.onEdit
          name="Edit"
        )
        (hash
          icon=(component DeleteIcon)
          action=this.onDelete
          name="Delete"
        )
      )
      rowClick=this.onRowClick
    }}
    @columnsComponent={{hash
      selectEmail=(component
        TpkSelectElement
        options=this.emailOptions
        onChange=this.onEmailChange
      )
    }}
  />
  `;

  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-table-generic-prefab.title"}}
      @description={{t "ember-ui.prefabs.tpk-table-generic-prefab.description"}}
    >
      <DocSection
        @title={{t "ember-ui.prefabs.tpk-table-generic-prefab.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t
            "ember-ui.prefabs.tpk-table-generic-prefab.examples.basic"
          }}
        >
          <:demo>
            <TpkTableGenericPrefabExample />
          </:demo>
          <:template>
            <CodeBlock @code={{this.tpkTableGenericPrefab}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title="Properties">
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
