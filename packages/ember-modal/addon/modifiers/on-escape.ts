import Modifier from 'ember-modifier';

interface onEscapeModifierArgs {
  positional: [Function];
  named: {
    relative: boolean;
  };
}

export default class OnEscapeModifier extends Modifier<onEscapeModifierArgs> {
  // eslint-disable-next-line no-unused-vars
  eh?: (this: Document, ev: KeyboardEvent) => any;

  didInstall(): void {
    const [fn] = this.args.positional;
    const eh = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        fn();
      }
    };
    this.eh = eh;
    document.addEventListener('keydown', eh);
  }

  willDestroy(): void {
    if (this.eh) {
      document.removeEventListener('keydown', this.eh);
    }
  }
}
