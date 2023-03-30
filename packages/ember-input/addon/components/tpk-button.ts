import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { BaseUIComponentArgs } from './base';

interface TpkButtonArgs extends BaseUIComponentArgs {}

export default class TpkButton extends Component<TpkButtonArgs> {
  guid = guidFor(this);
}
