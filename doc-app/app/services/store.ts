import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';
import { UserSchema } from 'doc-app/models/user';

const Store = useLegacyStore({
  linksMode: false,
  legacyRequests: true,
  modelFragments: true,
  cache: JSONAPICache,
  schemas: [UserSchema],
});

export default Store;

export type Store = InstanceType<typeof Store>;
