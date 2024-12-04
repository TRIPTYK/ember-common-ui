import { ImmerChangeset } from 'ember-immer-changeset';
import { object, type Schema } from 'yup';

export function initializeParams(params?: {
  changeset?: ImmerChangeset;
  onSubmit?: (...args: unknown[]) => void;
  validationSchema?: Schema;
  reactive?: boolean;
  removeErrorsOnSubmit?: boolean;
  autoScrollOnError?: boolean;
}) {
  return {
    changeset: params?.changeset ?? new ImmerChangeset({}),
    onSubmit: params?.onSubmit ?? (() => {}),
    validationSchema: params?.validationSchema ?? object(),
    reactive: params?.reactive,
    removeErrorsOnSubmit: params?.removeErrorsOnSubmit,
    autoScrollOnError: params?.autoScrollOnError,
    executeOnValid: true,
  };
}
