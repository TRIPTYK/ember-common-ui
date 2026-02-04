import type { Store } from '@warp-drive/core';
import type { TypeFromInstance } from '@warp-drive/core/types/record';

export function peekOrCreateRecord<T>(
  store: Store,
  recordType: TypeFromInstance<T>,
  recordId: string | undefined,
): T {
  if (!recordId) {
    return store.createRecord<T>(recordType, {} as never);
  }

  const record = store.peekRecord(recordType, recordId);

  if (record === null) {
    return store.createRecord<T>(recordType, {} as never);
  }

  return record;
}

export function peekOrFail<T>(
  store: Store,
  recordType: TypeFromInstance<T>,
  id: string,
): T {
  const record = store.peekRecord(recordType, id);
  if (!record) {
    throw new Error(
      `Record ${recordType} with identifier ${id} not found in store`,
    );
  }
  return record;
}
