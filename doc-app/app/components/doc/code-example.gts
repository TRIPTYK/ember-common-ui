// doc-app/app/components/doc/code-example.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

interface CodeExampleSignature {
  Args: {
    title?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class CodeExampleComponent extends Component<CodeExampleSignature> {
  @service declare intl: IntlService;
  @tracked activeYield = 'demo';

  @action
  selectYield(yieldName: string) {
    this.activeYield = yieldName;
  }

  get isDemo() {
    return this.activeYield === 'demo';
  }

  get isTemplate() {
    return this.activeYield === 'template';
  }

  get isJavascript() {
    return this.activeYield === 'javascript';
  }

  get isTypescript() {
    return this.activeYield === 'typescript';
  }

  getTabClass(isActive: boolean): string {
    return isActive ? 'tab tab-active' : 'tab';
  }

  <template>
    <div class="code-example">
      <div class="component-preview not-prose text-base-content">
        <h3>{{@title}}</h3>
      </div>
      <div role="tablist" class="tabs tabs-lift mx-2 mt-2">
        {{#if (has-block "demo")}}
          {{! template-lint-disable link-href-attributes }}
          <button
            type="button"
            class={{this.getTabClass this.isDemo}}
            {{on "click" (fn this.selectYield "demo")}}
          >
            Basic usage
          </button>
        {{/if}}
        {{#if (has-block "template")}}
          <button
            type="button"
            class={{this.getTabClass this.isTemplate}}
            {{on "click" (fn this.selectYield "template")}}
          >
            Template
          </button>
        {{/if}}
        {{#if (has-block "javascript")}}
          <button
            type="button"
            class={{this.getTabClass this.isJavascript}}
            {{on "click" (fn this.selectYield "javascript")}}
          >
            Javascript
          </button>
        {{/if}}
        {{#if (has-block "typescript")}}
          <button
            type="button"
            class={{this.getTabClass this.isTypescript}}
            {{on "click" (fn this.selectYield "typescript")}}
          >
            Typescript
          </button>
        {{/if}}
      </div>
      <div class="tab-content">
        {{#if this.isDemo}}
          {{yield to="demo"}}
        {{/if}}
        {{#if this.isTemplate}}
          {{yield to="template"}}
        {{/if}}
        {{#if this.isJavascript}}
          {{yield to="javascript"}}
        {{/if}}
        {{#if this.isTypescript}}
          {{yield to="typescript"}}
        {{/if}}
      </div>
    </div>
  </template>
}
