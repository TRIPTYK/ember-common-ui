import {
  withDefaults,
  type WithLegacy,
} from '@warp-drive/legacy/model/migration-support';
import { Type } from '@warp-drive/core/types/symbols';

export const UserSchema = withDefaults({
  type: 'user',
  fields: [
    { name: 'email', kind: 'attribute' },
    { name: 'firstName', kind: 'attribute' },
    { name: 'lastName', kind: 'attribute' },
    { name: 'phone', kind: 'attribute' },
    { name: 'job', kind: 'attribute' },
    { name: 'country', kind: 'attribute' },
  ],
});

export type User = WithLegacy<{
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  job: string;
  country: string;
  [Type]: 'user';
}>;
