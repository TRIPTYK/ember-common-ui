import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class SidebarItemRenderer extends Component {
  get isGroup() {
    return this.args.item.type === 'group';
  }
  get isLink() {
    return this.args.item.type === 'link';
  }
  get isNotCollapsed() {
    return this.args.collapsed !== true;
  }
  // Getters pour accéder aux propriétés typées
  get linkItem() {
    return this.isLink ? this.args.item : null;
  }
  get groupItem() {
    return this.isGroup ? this.args.item : null;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.isLink}}\n  {{#if this.linkItem.route}}\n    <LinkTo @route={{this.linkItem.route}} @query={{hash}} class={{if @collapsed \"tooltip tooltip-right\"}} data-tip={{if this.linkItem.tooltip this.linkItem.tooltip this.linkItem.label}}>\n      {{#if this.linkItem.icon}}\n        <this.linkItem.icon class=\"tpk-sidebar-item-icon\" />\n      {{/if}}\n      {{#if this.isNotCollapsed}}\n        <span>{{this.linkItem.label}}</span>\n      {{/if}}\n    </LinkTo>\n  {{else if this.linkItem.onClick}}\n    <button type=\"button\" {{on \"click\" this.linkItem.onClick}} class={{if @collapsed \"tooltip tooltip-right\"}} data-tip={{if this.linkItem.tooltip this.linkItem.tooltip this.linkItem.label}}>\n      {{#if this.linkItem.icon}}\n        <this.linkItem.icon class=\"tpk-sidebar-item-icon\" />\n      {{/if}}\n      {{#if this.isNotCollapsed}}\n        <span>{{this.linkItem.label}}</span>\n      {{/if}}\n    </button>\n  {{/if}}\n{{else if this.isGroup}}\n  <details class=\"block\" open={{this.groupItem.isOpen}}>\n    <summary class={{if @collapsed \"tooltip tooltip-right\"}} data-tip={{if @collapsed (if this.groupItem.tooltip this.groupItem.tooltip this.groupItem.label)}}>\n      {{#if this.groupItem.icon}}\n        <this.groupItem.icon class=\"tpk-sidebar-item-icon\" />\n      {{/if}}\n      {{#if this.isNotCollapsed}}\n        {{this.groupItem.label}}\n      {{/if}}\n    </summary>\n    <ul>\n      {{#each this.groupItem.items as |subItem|}}\n        <li>\n          <SidebarItemRenderer @item={{subItem}} @collapsed={{@collapsed}} />\n        </li>\n      {{/each}}\n    </ul>\n  </details>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        LinkTo,
        hash,
        on,
        SidebarItemRenderer
      })
    }), this);
  }
}
class TpkSidebarComponent extends Component {
  handleToggle() {
    if (this.args.onCollapsedChange) {
      this.args.onCollapsedChange(!this.args.collapsed);
    }
  }
  static {
    n(this.prototype, "handleToggle", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"tpk-sidebar-drawer-side drawer-side is-drawer-close:overflow-visible\">\n  {{#if @drawerId}}\n    <label for={{@drawerId}} aria-label=\"close sidebar\" class=\"tpk-sidebar-drawer-overlay drawer-overlay lg:hidden\"></label>\n  {{/if}}\n  <div class=\"tpk-sidebar\n      {{if @collapsed \"collapsed\"}}\n      is-drawer-close:w-14 is-drawer-open:w-64\">\n    {{#if (has-block \"header\")}}\n      <div class=\"tpk-sidebar-header\">\n        {{yield to=\"header\"}}\n      </div>\n    {{/if}}\n    <ul class=\"tpk-sidebar-menu menu {{unless @collapsed \"overflow-y-auto\"}}\">\n      {{#each @sidebarItems as |item|}}\n        <li>\n          <SidebarItemRenderer @item={{item}} @collapsed={{@collapsed}} />\n        </li>\n      {{/each}}\n    </ul>\n    {{#if (has-block \"footer\")}}\n      <div class=\"tpk-sidebar-footer\">\n        {{yield to=\"footer\"}}\n      </div>\n    {{/if}}\n  </div>\n</div>", {
      strictMode: true,
      scope: () => ({
        SidebarItemRenderer
      })
    }), this);
  }
}

export { TpkSidebarComponent as default };
//# sourceMappingURL=tpk-sidebar.js.map
