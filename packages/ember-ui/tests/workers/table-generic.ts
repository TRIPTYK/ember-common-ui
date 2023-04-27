import type { SetupWorker } from 'msw';
import { rest } from 'msw';
import fakeData from '../integration/components/table-generic/data/fake-data';

export async function TableGenericUserWorker(worker: SetupWorker) {
  worker.use(
    rest.get('http://localhost:4200/users', (req, res, ctx) => {
      console.log(req.url.searchParams.get('filter'));
      console.log(req.url.searchParams.get('sort'));

      let data;
      if (req.url.searchParams.get('sort') === 'firstName') {
        console.log(req.url.searchParams.get('sort'));

        data = fakeData.dataTestSortedReversed;
      } else {
        data = fakeData.dataTestSorted;
      }
      for (const [key, value] of req.url.searchParams.entries()) {
        if (value.includes('gig')) {
          data = [
            {
              type: 'user',
              id: '1',
              attributes: {
                lastName: 'Giga',
                firstName: 'Chad',
                email: 'dev@triptyk.eu',
              },
            },
          ];
        }
      }
      return res(
        ctx.status(200),
        ctx.json({
          data,
          meta: { fetched: 1, total: 1 },
        })
      );
    })
  );
  await worker.start();
}
