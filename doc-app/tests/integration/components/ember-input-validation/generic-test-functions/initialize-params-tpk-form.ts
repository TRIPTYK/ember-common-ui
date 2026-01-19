import { ImmerChangeset } from 'ember-immer-changeset';
import { object, type Schema } from 'yup';

export interface TpkFormParams {
  changeset?: ImmerChangeset;
  onSubmit?: (...args: unknown[]) => void;
  validationSchema?: Schema;
  reactive?: boolean;
  removeErrorsOnSubmit?: boolean;
  autoScrollOnError?: boolean;
}

export function initializeParams(params?: TpkFormParams) {
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
