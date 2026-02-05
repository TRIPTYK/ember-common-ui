import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import EarthIcon from '../../assets/icons/earth.gts';
import BurgerIcon from '../../assets/icons/burger.gts';
import SidepageIcon from '../../assets/icons/sidepage.gts';

export interface NavbarItem {
  label: string;
  onClick?: (event: PointerEvent) => void;
  href?: string;
}

export interface Language {
  code: string;
  label: string;
}

interface NavbarSignature {
  Element: HTMLElement;
  Args: {
    title?: string;
    navbarItems?: NavbarItem[];
    drawerId?: string;
    onSidebarToggle?: () => void;
    languages?: Language[];
    onLocaleChange?: (locale: string) => void;
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
  <nav class='tpk-navbar'>
    <div class='navbar-start'>
      {{#if @drawerId}}
        <label
          for={{@drawerId}}
          aria-label='sidebar'
          class='tpk-navbar-toggle-drawer'
        >
          <BurgerIcon class='size-5' />
        </label>
      {{/if}}
      {{#if @onSidebarToggle}}
        <button
          type='button'
          aria-label='toggle sidebar'
          class='tpk-navbar-toggle'
          {{on 'click' @onSidebarToggle}}
        >
          <SidepageIcon class='size-5' />
        </button>
      {{/if}}
      <span class='tpk-navbar-title'>{{@title}}</span>
    </div>
    <div class='navbar-center'>
      <ul class='tpk-navbar-menu-horizontal'>
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
    <div class='navbar-end'>
      {{#if @currentUser}}
        <div class='tpk-navbar-user-menu-dropdown dropdown dropdown-end'>
          {{! template-lint-disable no-inline-styles }}
          <button
            type='button'
            class='tpk-navbar-user-menu-toggle'
            popovertarget='popover-user'
            style='anchor-name:--anchor-user'
          >
            <span class='tpk-navbar-user-name'>{{@currentUser.fullName}}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-4'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          </button>
          <ul
            popover
            id='popover-user'
            style='position-anchor:--anchor-user'
            class='tpk-navbar-user-menu-content'
          >
            {{#if @profileRoute}}
              <li><LinkTo @route={{@profileRoute}}>{{if
                    @profileLabel
                    @profileLabel
                    'My Profile'
                  }}</LinkTo></li>
            {{/if}}
            {{#if (has-block 'menu')}}
              {{yield to='menu'}}
            {{/if}}
            {{#if @onLogout}}
              <li><button type='button' {{on 'click' @onLogout}}>{{if
                    @logoutLabel
                    @logoutLabel
                    'Logout'
                  }}</button></li>
            {{/if}}
          </ul>
        </div>
      {{/if}}
      {{#if @onLocaleChange}}
        {{#if @languages}}
          <div class='tpk-navbar-locale-selector'>
            {{! template-lint-disable no-inline-styles }}
            <button
              type='button'
              class='tpk-navbar-locale-toggle'
              popovertarget='popover-language'
              style='anchor-name:--anchor-language'
              aria-label='Language selector'
            >
              <EarthIcon class='size-4' />
            </button>
            <ul
              class='tpk-navbar-locale-menu'
              popover
              id='popover-language'
              style='position-anchor:--anchor-language'
            >
              {{#each @languages as |language|}}
                <li>
                  <button
                    type='button'
                    {{on 'click' (fn @onLocaleChange language.code)}}
                  >
                    {{language.label}}
                  </button>
                </li>
              {{/each}}
            </ul>
          </div>
        {{/if}}
      {{/if}}
    </div>
    {{yield}}
  </nav>
</template>;

export default TpkNavbar;
