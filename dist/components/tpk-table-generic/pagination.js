import { a as _applyDecoratedDescriptor, _ as _defineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TableGenericPaginationComponent;
let TableGenericPaginationComponent = (_class = (_TableGenericPaginationComponent = class TableGenericPaginationComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "isPageSizeSelected", pageSize => {
      return this.args['paginationData'].pageSize === pageSize;
    });
  }
  get pageSizes() {
    return this.args.pageSizes || [50, 60, 70, 80, 90, 100];
  }
  get hasRows() {
    return this.args['paginationData'].totalRows !== 0;
  }
  get shouldDisablePrevious() {
    return this.args['paginationData'].isFirstPage || this.args['disabled'];
  }
  get shouldDisableNext() {
    return this.args['paginationData'].isLastPage || this.args['disabled'];
  }
  changePageSize(ev) {
    this.args['paginationActions'].changePageSize(ev.target.value);
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"{{@theme.pagination.controls}} tpk-table-pagination\" data-test-pagination ...attributes>\n      {{#if this.hasRows}}\n        <div class=\"yeti-table-pagination-buttons\">\n          <button type=\"button\" class=\"{{@theme.pagination.previous}}\n              yeti-table-pagination-controls-previous\" disabled={{this.shouldDisablePrevious}} title={{t \"global.previous\"}} {{on \"click\" @paginationActions.previousPage}} data-test-pagination-previous>\n            <img src=\"/ember-ui/icons/chevron-left.svg\" alt={{t \"global.previous\"}} />\n            <span class=\"sr-only\">\n              {{t \"global.previous\"}}\n            </span>\n          </button>\n          <button type=\"button\" class=\"{{@theme.pagination.next}}\n              yeti-table-pagination-controls-next\" disabled={{this.shouldDisableNext}} title={{t \"global.next\"}} {{on \"click\" @paginationActions.nextPage}} data-test-pagination-next>\n            <span class=\"sr-only\">\n              {{t \"global.next\"}}\n            </span>\n            <img src=\"/ember-ui/icons/chevron-right.svg\" alt={{t \"global.next\"}} />\n          </button>\n        </div>\n      {{/if}}\n      <div>\n        <div class=\"{{@theme.pagination.info}}\n            yeti-table-pagination-controls-page-info\" data-test-pagination-result>\n          {{@paginationData.pageStart}}\n          -\n          {{@paginationData.pageEnd}}\n          {{t \"global.on\"}}\n          {{@paginationData.totalRows}}\n          {{t \"global.results\"}}\n        </div>\n        <div class=\"{{@theme.pagination.pageSize}}\n            yeti-table-pagination-controls-page-size\">\n          {{t \"global.results_by_page\"}}:\n          <select disabled={{@disabled}} {{on \"change\" this.changePageSize}} data-test-pagination-select>\n            {{#each this.pageSizes as |pageSize|}}\n              <option value={{pageSize}} selected={{this.isPageSizeSelected pageSize}}>\n                {{pageSize}}\n              </option>\n            {{/each}}\n          </select>\n        </div>\n      </div>\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    t,
    on
  })
}), _TableGenericPaginationComponent), _TableGenericPaginationComponent), _applyDecoratedDescriptor(_class.prototype, "changePageSize", [action], Object.getOwnPropertyDescriptor(_class.prototype, "changePageSize"), _class.prototype), _class);

export { TableGenericPaginationComponent as default };
//# sourceMappingURL=pagination.js.map
