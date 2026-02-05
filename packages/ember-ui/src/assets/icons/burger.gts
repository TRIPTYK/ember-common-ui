import type { TOC } from '@ember/component/template-only';

const BurgerIcon: TOC<{ Element: SVGSVGElement }> = <template>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='currentColor'
    ...attributes
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
    />
  </svg>
</template>;
export default BurgerIcon;
