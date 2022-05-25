import Application, { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';

export function initialize(application: ApplicationInstance): void {
  let config = application.resolveRegistration('config:environment') as Record<
    string,
    any
  >;
  // eslint-disable-next-line ember/no-private-routing-service
  let app = getOwner(application.lookup('router:main')) as Application;
  const rootElement =
    typeof app.rootElement === 'string'
      ? document.querySelector(app.rootElement)!
      : app.rootElement;

  const div = document.createElement('div');

  div.setAttribute('id', config.modal?.id ?? 'tpk-modal');

  rootElement.appendChild(div);
}

export default {
  initialize,
};
