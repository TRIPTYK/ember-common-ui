import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { ZodObject, ZodString } from 'zod';
import type z from 'zod';
type ResetPasswordSchema = ZodObject<{
    password: ZodString;
    confirmPassword: ZodString;
}>;
export interface TpkResetPasswordArgs {
    onSubmit: (data: z.infer<ResetPasswordSchema>, changeset: ImmerChangeset<z.infer<ResetPasswordSchema>>) => void;
    resetPasswordSchema: ResetPasswordSchema;
    initialValues?: z.infer<ResetPasswordSchema>;
    submitButtonText?: string;
}
export interface TpkResetPasswordSignature {
    Args: TpkResetPasswordArgs;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkResetPasswordComponent extends Component<TpkResetPasswordSignature> {
    changeset: ImmerChangeset<{
        password: string;
        confirmPassword: string;
    }>;
    get submitButtonText(): string;
}
export {};
//# sourceMappingURL=tpk-reset-password.d.ts.map