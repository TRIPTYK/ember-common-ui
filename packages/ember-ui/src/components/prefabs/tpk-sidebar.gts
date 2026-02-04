import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { action } from '@ember/object';

// Définir les types AVANT de les utiliser
export type SidebarLink = {
  type: 'link';
  label: string;
  tooltip?: string;
  icon?: TOC<{ Element: SVGSVGElement }>;
  route?: string;
  onClick?: (event: PointerEvent) => void;
};

export type SidebarGroup = {
  type: 'group';
  label: string;
  isOpen?: boolean;
  tooltip?: string;
  icon?: TOC<{ Element: SVGSVGElement }>;
  items: SidebarItem[];
};

export type SidebarItem = SidebarLink | SidebarGroup;

interface SidebarItemRendererSignature {
  Element: HTMLLIElement;
  Args: {
    item: SidebarItem;
    collapsed?: boolean;
  };
}

class SidebarItemRenderer extends Component<SidebarItemRendererSignature> {
  get isGroup(): boolean {
    return this.args.item.type === 'group';
  }

  get isLink(): boolean {
    return this.args.item.type === 'link';
  }

  get isNotCollapsed(): boolean {
    return this.args.collapsed !== true;
  }

  // Getters pour accéder aux propriétés typées
  get linkItem(): SidebarLink | null {
    return this.isLink ? (this.args.item as SidebarLink) : null;
  }

  get groupItem(): SidebarGroup | null {
    return this.isGroup ? (this.args.item as SidebarGroup) : null;
  }

  <template>
    {{#if this.isLink}}
      {{#if this.linkItem.route}}
        <LinkTo
          @route={{this.linkItem.route}}
          @query={{hash}}
          class={{if @collapsed "tooltip tooltip-right"}}
          data-tip={{if this.linkItem.tooltip this.linkItem.tooltip this.linkItem.label}}
        >
          {{#if this.linkItem.icon}}
            <this.linkItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          {{#if this.isNotCollapsed}}
            <span>{{this.linkItem.label}}</span>
          {{/if}}
        </LinkTo>
      {{else if this.linkItem.onClick}}
        <button
          type='button'
          {{on 'click' this.linkItem.onClick}}
          class={{if @collapsed "tooltip tooltip-right"}}
          data-tip={{if this.linkItem.tooltip this.linkItem.tooltip this.linkItem.label}}
        >
          {{#if this.linkItem.icon}}
            <this.linkItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          {{#if this.isNotCollapsed}}
            <span>{{this.linkItem.label}}</span>
          {{/if}}
        </button>
      {{/if}}
    {{else if this.isGroup}}
      <details class='block' open={{this.groupItem.isOpen}}>
        <summary class={{if @collapsed "tooltip tooltip-right"}} data-tip={{if @collapsed (if this.groupItem.tooltip this.groupItem.tooltip this.groupItem.label)}}>
          {{#if this.groupItem.icon}}
            <this.groupItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          {{#if this.isNotCollapsed}}
            {{this.groupItem.label}}
          {{/if}}
        </summary>
        <ul>
          {{#each this.groupItem.items as |subItem|}}
            <li>
              <SidebarItemRenderer @item={{subItem}} @collapsed={{@collapsed}} />
            </li>
          {{/each}}
        </ul>
      </details>
    {{/if}}
  </template>
}

interface SidebarSignature {
  Element: HTMLElement;
  Args: {
    sidebarItems?: SidebarItem[];
    drawerId?: string;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
  };
  Blocks: {
    header: [];
    default: [];
    footer: [];
  };
}

class TpkSidebarComponent extends Component<SidebarSignature> {
  @action
  handleToggle() {
    if (this.args.onCollapsedChange) {
      this.args.onCollapsedChange(!this.args.collapsed);
    }
  }

  <template>
  <div class='drawer-side is-drawer-close:overflow-visible h-full min-h-0 overflow lg:overflow-y-auto'>
    {{#if @drawerId}}
      <label
        for={{@drawerId}}
        aria-label='close sidebar'
        class='drawer-overlay lg:hidden'
      ></label>
    {{/if}}
    <div
      class='tpk-sidebar flex h-full min-h-0 flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 {{if @collapsed "lg:!w-14" "lg:!w-64"}}'
    >
      {{#if (has-block "header")}}
        <div class='tpk-sidebar-header w-full'>
          {{yield to="header"}}
        </div>
      {{/if}}
      <ul class='tpk-sidebar-menu menu flex-nowrap w-full grow {{unless @collapsed "overflow-y-auto"}}'>
        {{#each @sidebarItems as |item|}}
          <li>
            <SidebarItemRenderer @item={{item}} @collapsed={{@collapsed}} />
          </li>
        {{/each}}
      </ul>
      {{#if (has-block "footer")}}
        <div class='tpk-sidebar-footer w-full'>
          {{yield to="footer"}}
        </div>
      {{/if}}
    </div>
  </div>
</template>
}

export default TpkSidebarComponent;
