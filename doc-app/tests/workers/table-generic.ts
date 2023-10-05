import type { SetupWorker } from 'msw';
import { rest } from 'msw';
import fakeData from '../integration/components/table-generic/data/fake-data';

export async function TableGenericUserWorker(worker: SetupWorker) {
  worker.use(
    rest.get('http://localhost:4200/users', (req, res, ctx) => {
      let data;
      const sort = req.url.searchParams.get('sort');
      const search = req.url.searchParams.get('filter[search]');
      const pageNumber = req.url.searchParams.get('page[number]');

      if (sort !== null && sort === 'firstName') {
        data = fakeData.dataTestSortedReversed;
      } else {
        data = fakeData.dataTestSorted;
      }

      if (search !== null && search.includes('gig')) {
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
      if (pageNumber !== null && parseInt(pageNumber) === 2) {
        data = fakeData.secondPage;
      }

      return res(
        ctx.status(200),
        ctx.json({
          data,
          meta: { fetched: data.length, total: 10 },
        })
      );
    })
  );
  await worker.start();
}

//http://localhost:4200/users?page%5Bsize%5D=2&page%5Bnumber%5D=2&sort=-updatedAt
