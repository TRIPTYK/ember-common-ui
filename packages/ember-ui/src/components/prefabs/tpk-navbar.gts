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
    onSidebarToggle?: () => void;
    currentUser?: {
      fullName: string;
    };
    onLogout?: () => void;
    logoutLabel?: string;
    profileRoute?: string;
    profileLabel?: string;
  };
  Blocks: {
    menu: [];
    default: [];
  };
}

const TpkNavbar: TOC<NavbarSignature> = <template>
  <nav class='tpk-navbar navbar bg-base-300'>
    <div class='navbar-start'>
      {{#if @drawerId}}
        <label
          for={{@drawerId}}
          aria-label='sidebar'
          class='tpk-navbar-toggle btn btn-ghost btn-square lg:hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke-linejoin='round'
            stroke-linecap='round'
            stroke-width='2'
            fill='none'
            stroke='currentColor'
            class='size-4'
          >
            <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
            <path d='M9 4v16'></path>
            <path d='M14 10l2 2l-2 2'></path>
          </svg>
        </label>
      {{/if}}
      {{#if @onSidebarToggle}}
        <button
          type='button'
          aria-label='toggle sidebar'
          class='tpk-navbar-toggle btn btn-ghost btn-square hidden lg:inline-flex'
          {{on 'click' @onSidebarToggle}}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke-linejoin='round'
            stroke-linecap='round'
            stroke-width='2'
            fill='none'
            stroke='currentColor'
            class='size-4'
          >
            <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
            <path d='M9 4v16'></path>
            <path d='M14 10l2 2l-2 2'></path>
          </svg>
        </button>
      {{/if}}
      <span class='tpk-navbar-title'>{{@title}}</span>
    </div>
    <div class='navbar-center'>
      <ul class='menu menu-horizontal hidden lg:flex'>
        {{#each @navbarItems as |item|}}
          <li>
            {{#if item.href}}
              <a href={{item.href}}>{{item.label}}</a>
            {{else if item.onClick}}
              <button type='button' {{on 'click' item.onClick}}>{{item.label}}</button>
            {{/if}}
          </li>
        {{/each}}
      </ul>
    </div>
    <div class='navbar-end'>
      {{#if @currentUser}}
        <div class='tpk-navbar-user-menu-dropdown dropdown dropdown-end'>
          <button
            type='button'
            tabindex='0'
            class='tpk-navbar-user-menu-toggle btn btn-ghost flex'
            aria-label='User menu'
          >
          <span class='tpk-navbar-user-name inline-block'>{{@currentUser.fullName}}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          </button>
          <ul tabindex='0' class='tpk-navbar-user-menu-content menu dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
            {{#if @profileRoute}}
              <li><LinkTo @route={{@profileRoute}}>{{if @profileLabel @profileLabel "My Profile"}}</LinkTo></li>
            {{/if}}
            {{#if (has-block "menu")}}
              {{yield to="menu"}}
            {{/if}}
            {{#if @onLogout}}
              <li><button type='button' {{on 'click' @onLogout}}>{{if @logoutLabel @logoutLabel "Logout"}}</button></li>
            {{/if}}
          </ul>
        </div>
      {{/if}}
    </div>
    {{yield}}
  </nav>
</template>;

export default TpkNavbar;
