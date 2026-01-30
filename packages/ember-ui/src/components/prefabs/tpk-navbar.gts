import { on } from '@ember/modifier';
import type { TOC } from '@ember/component/template-only';

export interface NavbarItem {
  label: string;
  onClick?: (event: PointerEvent) => void;
  href?: string;
}

interface NavbarSignature {
  Element: HTMLElement;
  Args: {
    title?: string;
    navbarItems?: NavbarItem[];
    drawerId?: string;
    currentUser?: {
      fullName: string;
    };
  };
  Blocks: {
    default: [];
  };
}

const TpkNavbar: TOC<NavbarSignature> = <template>
  <nav class='navbar w-full bg-base-300'>
    {{#if @drawerId}}
      <label
        for={{@drawerId}}
        aria-label='open sidebar'
        class='btn btn-square btn-ghost'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          stroke-linejoin='round'
          stroke-linecap='round'
          stroke-width='2'
          fill='none'
          stroke='currentColor'
          class='my-1.5 inline-block size-4'
        ><path
            d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'
          ></path><path d='M9 4v16'></path><path
            d='M14 10l2 2l-2 2'
          ></path></svg>
      </label>
    {{/if}}
    <div class='px-4'>{{@title}}</div>
    <div class='flex-1'></div>
    <div class='hidden flex-none lg:block'>
      <ul class='menu menu-horizontal'>
        {{#each @navbarItems as |item|}}
          <li>
            {{#if item.href}}
              <a href={{item.href}}>{{item.label}}</a>
            {{else if item.onClick}}
              <button
                type='button'
                {{on 'click' item.onClick}}
              >{{item.label}}</button>
            {{/if}}
          </li>
        {{/each}}
      </ul>
    </div>
    {{#if @currentUser}}
      <div class='px-4'>
        {{@currentUser.fullName}}
      </div>
    {{/if}}
    {{yield}}
  </nav>
</template>;

export default TpkNavbar;
