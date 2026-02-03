import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';

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
  tooltip?: string;
  icon?: TOC<{ Element: SVGSVGElement }>;
  items: SidebarItem[];
};

export type SidebarItem = SidebarLink | SidebarGroup;

interface SidebarItemRendererSignature {
  Element: HTMLLIElement;
  Args: {
    item: SidebarItem;
  };
}

class SidebarItemRenderer extends Component<SidebarItemRendererSignature> {
  get isGroup(): boolean {
    return this.args.item.type === 'group';
  }

  get isLink(): boolean {
    return this.args.item.type === 'link';
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
          class='is-drawer-close:tooltip is-drawer-close:tooltip-right'
          data-tip={{this.linkItem.tooltip}}
        >
          {{#if this.linkItem.icon}}
            <this.linkItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          <span class='is-drawer-close:hidden'>{{this.linkItem.label}}</span>
        </LinkTo>
      {{else if this.linkItem.onClick}}
        <button
          type='button'
          {{on 'click' this.linkItem.onClick}}
          class='is-drawer-close:tooltip is-drawer-close:tooltip-right'
          data-tip={{this.linkItem.tooltip}}
        >
          {{#if this.linkItem.icon}}
            <this.linkItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          <span class='is-drawer-close:hidden'>{{this.linkItem.label}}</span>
        </button>
      {{/if}}
    {{else if this.isGroup}}
      <details class='is-drawer-close:hidden'>
        <summary>
          {{#if this.groupItem.icon}}
            <this.groupItem.icon class='my-1.5 inline-block size-4' />
          {{/if}}
          {{this.groupItem.label}}
        </summary>
        <ul>
          {{#each this.groupItem.items as |subItem|}}
            <li>
              <SidebarItemRenderer @item={{subItem}} />
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
  };
  Blocks: {
    default: [];
  };
}

const TpkSidebar: TOC<SidebarSignature> = <template>
  <div class='drawer-side is-drawer-close:overflow-visible'>
    {{#if @drawerId}}
      <label
        for={{@drawerId}}
        aria-label='close sidebar'
        class='drawer-overlay'
      ></label>
    {{/if}}
    <div
      class='flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64'
    >
      <ul class='menu w-full grow'>
        {{#each @sidebarItems as |item|}}
          <li>
            <SidebarItemRenderer @item={{item}} />
          </li>
        {{/each}}
      </ul>
      {{yield}}
    </div>
  </div>
</template>;

export default TpkSidebar;
