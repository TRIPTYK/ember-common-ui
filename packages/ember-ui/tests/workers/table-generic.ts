import type { SetupWorker } from 'msw';
import { rest } from 'msw';
import fakeData from '../integration/components/table-generic/data/fake-data';

export async function TableGenericUserWorker(worker: SetupWorker) {
  worker.use(
    rest.get(
      'http://localhost:4200/users?page%5Bsize%5D=50&page%5Bnumber%5D=1&sort=-updatedAt',
      (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: fakeData.dataTest,
            meta: { fetched: 1, total: 1 },
          })
        );
      }
    )
  );
  await worker.start();
}
