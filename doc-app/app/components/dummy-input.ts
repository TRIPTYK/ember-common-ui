import Component from '@glimmer/component';

interface DummyInputSignature {
  Args: {
    validationField: string;
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class DummyInput extends Component<DummyInputSignature> {}
