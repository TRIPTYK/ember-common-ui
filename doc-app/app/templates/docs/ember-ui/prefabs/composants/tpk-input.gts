import { action } from "@ember/object";
import TpkInputComponent from "@triptyk/ember-input/components/tpk-input";
import type { TpkInputInputComponentSignature } from "@triptyk/ember-input/components/tpk-input/input";
import { tracked } from "tracked-built-ins";

export type TpkInputSignature = {
  Args:TpkInputInputComponentSignature["Args"]
  blocks: {
    default: [];
  };
  Element: HTMLDivElement;
};

export default class TpkInput extends TpkInputComponent {
@tracked value: string | undefined = undefined;

@action
onChange(value: string | Date | number| null | undefined) {
  this.value = value as string;
}

<template>
  <TpkInput @value={{this.value}} @onChange={{this.onChange}}  @label="" as |I|>
    <I.Label />
    <I.Input />
  </TpkInput>

</template>;

}