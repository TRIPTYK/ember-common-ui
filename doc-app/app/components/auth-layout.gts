import type { TOC } from '@ember/component/template-only';

interface AuthLayoutSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

<template>
  <div class="auth-layout">
    <div class="auth-layout-content">
      {{yield}}
    </div>
  </div>
</template> satisfies TOC<AuthLayoutSignature>;
