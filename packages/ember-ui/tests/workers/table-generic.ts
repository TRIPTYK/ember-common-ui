import type { SetupWorker } from 'msw';
import { rest } from 'msw';
import fakeData from '../integration/components/table-generic/data/fake-data';

export async function TableGenericUserWorker(worker: SetupWorker) {
  worker.use(
    rest.get('http://localhost:4200/users', (req, res, ctx) => {
      let data;
      if (req.url.searchParams.get('sort') === 'firstName') {
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
      const pageNumber = req.url.searchParams.get('page[number]');
      if (pageNumber !== null && parseInt(pageNumber) === 2) {
        data = fakeData.secondPage;
      }

      return res(
        ctx.status(200),
        ctx.json({
          data,
          meta: { fetched: 1, total: 10 },
        })
      );
    })
  );
  await worker.start();
}

//http://localhost:4200/users?page%5Bsize%5D=2&page%5Bnumber%5D=2&sort=-updatedAt
