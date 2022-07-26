import Component from '@glimmer/component';

interface UiModalContentArgs {
  onClose: () => void;
  classless: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiModalContent extends Component<UiModalContentArgs> {}
