import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import t from 'ember-intl/helpers/t';
import ChevronRightIcon from '../../assets/icons/chevron-right.js';
import ChevronLeftIcon from '../../assets/icons/chevron-left.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TableGenericPaginationComponent extends Component {
  isPageSizeSelected = pageSize => {
    return this.args['paginationData'].pageSize === pageSize;
  };
  guid = guidFor(this);
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
  static {
    n(this.prototype, "changePageSize", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{@theme.pagination.controls}} tpk-table-pagination\" data-test-pagination ...attributes>\n  {{#if this.hasRows}}\n    <div class=\"yeti-table-pagination-buttons\">\n      <button type=\"button\" class=\"{{@theme.pagination.previous}}\n          yeti-table-pagination-controls-previous\" disabled={{this.shouldDisablePrevious}} title={{t \"global.previous\"}} {{on \"click\" @paginationActions.previousPage}} data-test-pagination-previous>\n        <ChevronLeftIcon class=\"size-4\" />\n        <span class=\"sr-only\">\n          {{t \"global.previous\"}}\n        </span>\n      </button>\n      <button type=\"button\" class=\"{{@theme.pagination.next}}\n          yeti-table-pagination-controls-next\" disabled={{this.shouldDisableNext}} title={{t \"global.next\"}} {{on \"click\" @paginationActions.nextPage}} data-test-pagination-next>\n        <span class=\"sr-only\">\n          {{t \"global.next\"}}\n        </span>\n        <ChevronRightIcon class=\"size-4\" />\n      </button>\n    </div>\n  {{/if}}\n  <div>\n    <div class=\"{{@theme.pagination.info}}\n        yeti-table-pagination-controls-page-info\" data-test-pagination-result>\n      {{@paginationData.pageStart}}\n      -\n      {{@paginationData.pageEnd}}\n      {{t \"global.on\"}}\n      {{@paginationData.totalRows}}\n      {{t \"global.results\"}}\n    </div>\n    <div class=\"{{@theme.pagination.pageSize}}\n        yeti-table-pagination-controls-page-size\">\n      <label for=\"page-size-select-{{this.guid}}\">{{t \"global.results_by_page\"}}:</label>\n      <select id=\"page-size-select-{{this.guid}}\" disabled={{@disabled}} {{on \"change\" this.changePageSize}} data-test-pagination-select>\n        {{#each this.pageSizes as |pageSize|}}\n          <option value={{pageSize}} selected={{this.isPageSizeSelected pageSize}}>\n            {{pageSize}}\n          </option>\n        {{/each}}\n      </select>\n    </div>\n  </div>\n</div>", {
      strictMode: true,
      scope: () => ({
        t,
        on,
        ChevronLeftIcon,
        ChevronRightIcon
      })
    }), this);
  }
}

export { TableGenericPaginationComponent as default };
//# sourceMappingURL=pagination.js.map
