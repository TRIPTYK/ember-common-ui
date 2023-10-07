import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { rest } from 'msw';
import config from 'dummy/config/environment';

export default class ApplicationRoute extends Route {
  @service intl;

  async beforeModel() {
    this.intl.setLocale(['en-us']);
    // @ts-ignore
    const { worker } = await import('/worker.js');
    await worker([
      rest.get('/users', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            meta: {
              total: 1,
              page: 1,
            },
            data: [
              {
                type: 'user',
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'john.doe@example.com',
                },
              },
            ],
          }),
        );
      }),
    ]).start({
      serviceWorker: {
        url: `${config.rootURL}mockServiceWorker.js`,
      },
    });
  }
}
