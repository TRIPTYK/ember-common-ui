import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';

export interface SidebarItem {
  label: string;
  tooltip?: string;
  icon?: TOC<{ Element: SVGSVGElement }>;
  route?: string;
  onClick?: (event: PointerEvent) => void;
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
            {{#if item.route}}
              <LinkTo
                @route={{item.route}}
                @query={{hash}}
                class='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                data-tip={{item.tooltip}}
              >
                {{#if item.icon}}
                  <item.icon class='my-1.5 inline-block size-4' />
                {{/if}}
                <span class='is-drawer-close:hidden'>{{item.label}}</span>
              </LinkTo>
            {{else if item.onClick}}
              <button
                type='button'
                {{on 'click' item.onClick}}
                class='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                data-tip={{item.tooltip}}
              >
                {{#if item.icon}}
                  <item.icon class='my-1.5 inline-block size-4' />
                {{/if}}
                <span class='is-drawer-close:hidden'>{{item.label}}</span>
              </button>
            {{/if}}
          </li>
        {{/each}}
      </ul>
      {{yield}}
    </div>
  </div>
</template>;

export default TpkSidebar;
