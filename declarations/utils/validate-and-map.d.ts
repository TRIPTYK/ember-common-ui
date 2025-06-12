import type { Schema } from 'yup';
import { type ValidationError as ChangesetValidationError } from 'ember-immer-changeset';
export declare function validateAndMapErrors<T extends Schema>(schema: T, dto: unknown): Promise<ChangesetValidationError[]>;
export declare function validateOneAndMapErrors<T extends Schema>(path: string, schema: T, dto: unknown): Promise<ChangesetValidationError[]>;
export declare function jsonPathToDottedPath(e: string): string;
export declare function dottedPathToJsonPath(e: string): string;
//# sourceMappingURL=validate-and-map.d.ts.map