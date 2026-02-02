// doc-app/app/components/doc/property-table.gts
import type { TOC } from '@ember/component/template-only';
import t from 'ember-intl/helpers/t';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface PropertyTableSignature {
  Args: {
    properties: Property[];
  };
}

const PropertyTable: TOC<PropertyTableSignature> = <template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead class="table-header">
        <tr>
          <th class="table-header-content">
            {{t "docs.propertyTable.name"}}
          </th>
          <th class="table-header-content">
            {{t "docs.propertyTable.type"}}
          </th>
          <th class="table-header-content">
            {{t "docs.propertyTable.required"}}
          </th>
          <th class="table-header-content">
            {{t "docs.propertyTable.description"}}
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        {{#each @properties as |prop|}}
          <tr>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600"
            >
              {{prop.name}}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500"
            >
              {{prop.type}}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              {{#if prop.required}}
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                >
                  {{t "docs.propertyTable.yes"}}
                </span>
              {{else}}
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                >
                  {{t "docs.propertyTable.no"}}
                </span>
              {{/if}}
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">
              {{prop.description}}
            </td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</template>;

export default PropertyTable;
