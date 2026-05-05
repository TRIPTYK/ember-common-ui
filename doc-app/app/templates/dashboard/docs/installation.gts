import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import { t } from 'ember-intl';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

const installEmberInput = `pnpm add @triptyk/ember-input @eonasdan/tempus-dominus`;

const installEmberInputValidation = `pnpm add @triptyk/ember-input-validation ember-immer-changeset`;

const installEmberUi = `pnpm add @triptyk/ember-ui`;

const installAll = `pnpm add @triptyk/ember-input @triptyk/ember-input-validation @triptyk/ember-ui @eonasdan/tempus-dominus ember-immer-changeset`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class InstallationDocs extends Component {
  <template>
    <DocPage
      @title={{t "docs.installation.title"}}
      @description={{t "docs.installation.description"}}
    >
      <DocSection @title={{t "docs.installation.all.title"}}>
        <p class="mb-4">{{t "docs.installation.all.description"}}</p>
        <CodeBlock @code={{installAll}} @language="bash" />
      </DocSection>
      <DocSection @title="@triptyk/ember-input">
        <p class="mb-4">{{t "docs.installation.emberInput.description"}}</p>
        <CodeBlock @code={{installEmberInput}} @language="bash" />
        <p class="mt-4 text-sm opacity-70">{{t
            "docs.installation.emberInput.peers"
          }}</p>
      </DocSection>
      <DocSection @title="@triptyk/ember-input-validation">
        <p class="mb-4">{{t
            "docs.installation.emberInputValidation.description"
          }}</p>
        <CodeBlock @code={{installEmberInputValidation}} @language="bash" />
        <p class="mt-4 text-sm opacity-70">{{t
            "docs.installation.emberInputValidation.peers"
          }}</p>
      </DocSection>
      <DocSection @title="@triptyk/ember-ui">
        <p class="mb-4">{{t "docs.installation.emberUi.description"}}</p>
        <CodeBlock @code={{installEmberUi}} @language="bash" />
        <p class="mt-4 text-sm opacity-70">{{t
            "docs.installation.emberUi.peers"
          }}</p>
      </DocSection>
    </DocPage>
  </template>
}
