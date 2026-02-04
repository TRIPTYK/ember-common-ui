// doc-app/app/components/doc/code-block.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { codeToHtml } from 'shiki';
import { htmlSafe } from '@ember/template';
import type Owner from '@ember/owner';

interface CodeBlockSignature {
  Args: {
    code: string;
    language?: string;
  };
}

export default class CodeBlockComponent extends Component<CodeBlockSignature> {
  @tracked copied = false;
  @tracked highlightedHtml = '';

  constructor(owner: Owner, args: CodeBlockSignature['Args']) {
    super(owner, args);
    void this.generateHighlightedCode();
  }

  async generateHighlightedCode() {
    try {
      const html = await codeToHtml(this.args.code, {
        lang: this.language,
        theme: 'catppuccin-frappe',
      });
      this.highlightedHtml = html;
    } catch (error) {
      console.error('Failed to highlight code:', error);
      this.highlightedHtml = `<pre><code>${this.args.code}</code></pre>`;
    }
  }

  @action
  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.args.code);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  get language() {
    const lang = this.args.language || 'typescript';
    const languageMap: Record<string, string> = {
      ts: 'typescript',
      gts: 'glimmer-ts',
      js: 'javascript',
    };
    return languageMap[lang] || lang;
  }

  get safeHtml() {
    return htmlSafe(this.highlightedHtml);
  }

  <template>
    <div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-block-language">{{this.language}}</span>
        <button
          type="button"
          class="code-block-copy-btn"
          {{on "click" this.copyCode}}
        >
          {{#if this.copied}}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          {{else}}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          {{/if}}
        </button>
      </div>
      <div class="code-block-content">
        {{this.safeHtml}}
      </div>
    </div>
  </template>
}
