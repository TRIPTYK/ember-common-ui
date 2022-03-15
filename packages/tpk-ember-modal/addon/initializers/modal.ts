import Application from '@ember/application';

export function initialize(application: Application): void {
  let config = application.resolveRegistration('config:environment') as Record<
    string,
    any
  >;
  const rootElement =
    typeof application.rootElement === 'string'
      ? document.querySelector(application.rootElement)!
      : application.rootElement;

  const div = document.createElement('div');

  div.setAttribute('id', config.modal?.id ?? 'tpk-modal');

  rootElement.appendChild(div);
}

export default {
  initialize,
};
