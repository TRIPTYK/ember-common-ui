import { on } from '@ember/modifier';
import type { TOC } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

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
    onLogout?: () => void;
    profileRoute?: string;
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
      <div class='flex items-center gap-2'>
        <span class='hidden lg:inline-block'>{{@currentUser.fullName}}</span>
        <div class='dropdown dropdown-end'>
          <button
            type='button'
            class='btn btn-ghost btn-circle avatar'
            aria-label='User menu'
          >
            <div class='w-10 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='size-10'
              >
                <path
                  fill-rule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
          </button>
          <ul
            tabindex='0'
            class='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {{#if @profileRoute}}
              <li><LinkTo @route={{@profileRoute}}>My Profile</LinkTo></li>
            {{/if}}
            {{#if @onLogout}}
              <li><button
                  type='button'
                  {{on 'click' @onLogout}}
                >Logout</button></li>
            {{/if}}
          </ul>
        </div>
      </div>
    {{/if}}
    {{yield}}
  </nav>
</template>;

export default TpkNavbar;
