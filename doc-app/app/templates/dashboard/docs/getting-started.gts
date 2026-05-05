import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import { t } from 'ember-intl';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

const basicFormCode = `
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import TpkForm from '@triptyk/ember-ui/components/prefabs/tpk-form';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';

const schema = object({ name: string().min(1) });
const changeset = new ImmerChangeset({ name: '' });

<TpkForm @changeset={{changeset}} @validationSchema={{schema}} @onSubmit={{this.onSubmit}}>
  <TpkInputPrefab @label="Name" @changeset={{changeset}} @validationField="name" />
  <button type="submit">Submit</button>
</TpkForm>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class GettingStartedDocs extends Component {
  <template>
    <DocPage
      @title={{t "docs.gettingStarted.title"}}
      @description={{t "docs.gettingStarted.description"}}
    >
      <DocSection @title={{t "docs.gettingStarted.packages.title"}}>
        <div class="prose max-w-none">
          <ul>
            <li>
              <strong>@triptyk/ember-input</strong>
              —
              {{t "docs.gettingStarted.packages.emberInput"}}
            </li>
            <li>
              <strong>@triptyk/ember-input-validation</strong>
              —
              {{t "docs.gettingStarted.packages.emberInputValidation"}}
            </li>
            <li>
              <strong>@triptyk/ember-ui</strong>
              —
              {{t "docs.gettingStarted.packages.emberUi"}}
            </li>
          </ul>
        </div>
      </DocSection>
      <DocSection @title={{t "docs.gettingStarted.quickStart.title"}}>
        <p class="mb-4">{{t "docs.gettingStarted.quickStart.description"}}</p>
        <CodeBlock @code={{basicFormCode}} @language="gts" />
      </DocSection>
    </DocPage>
  </template>
}
