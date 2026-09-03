import { ZodObject, type ZodType } from 'zod';
import { type ValidationError as ChangesetValidationError } from 'ember-immer-changeset';
export declare function deepPickByPath<T extends ZodObject<any>>(schema: T, path: string): ZodType<unknown, unknown>;
export declare function validateAndMapErrors<T extends ZodObject>(schema: T, dto: unknown): Promise<ChangesetValidationError[]>;
export declare function validateOneAndMapErrors<T extends ZodObject>(path: string, schema: T, dto: unknown): Promise<ChangesetValidationError[]>;
export declare function jsonPathToDottedPath(e: string): string;
export declare function dottedPathToJsonPath(e: string): string;
//# sourceMappingURL=validate-and-map.d.ts.map