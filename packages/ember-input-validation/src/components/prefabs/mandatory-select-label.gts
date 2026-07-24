import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import type { PowerSelectLabelSignature } from 'ember-power-select/components/power-select/label';
import MandatorySelectLabelText from './mandatory-select-label-text.gts';

export interface MandatorySelectLabelSignature {
  Args: PowerSelectLabelSignature['Args'] & {
    mandatory?: boolean;
  };
  Element: HTMLLabelElement;
}

export default class MandatorySelectLabel extends Component<MandatorySelectLabelSignature> {
  @action
  onLabelClick(e: MouseEvent) {
    const select = this.args.select;
    if (!select) {
      return;
    }
    select.actions.labelClick(e);
  }

  <template>
    <label
      id={{@labelId}}
      class='ember-power-select-label'
      for={{@triggerId}}
      {{on 'click' this.onLabelClick}}
      ...attributes
    >
      <MandatorySelectLabelText
        @labelText={{@labelText}}
        @mandatory={{@mandatory}}
      />
    </label>
  </template>
}
