import { http } from 'msw';
import fakeData from '../integration/components/ember-ui/table-generic/data/fake-data';
import type { setupWorker } from 'msw/browser';

export async function TableGenericUserWorker(
  worker: ReturnType<typeof setupWorker>
) {
  worker.use(
    http.get('http://localhost:4200/users', (req) => {
      let data;

      const sort = new URL(req.request.url).searchParams.get('sort');
      const search = new URL(req.request.url).searchParams.get(
        'filter[search]'
      );
      const pageNumber = new URL(req.request.url).searchParams.get(
        'page[number]'
      );

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

      return Response.json({
        data,
        meta: { fetched: data.length, total: 10 },
      });
    })
  );
  await worker.start();
}

//http://localhost:4200/users?page%5Bsize%5D=2&page%5Bnumber%5D=2&sort=-updatedAt
