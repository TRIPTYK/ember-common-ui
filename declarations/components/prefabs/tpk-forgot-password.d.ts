import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { ZodEmail, ZodObject } from 'zod';
import type z from 'zod';
type ForgotPasswordSchema = ZodObject<{
    email: ZodEmail;
}>;
export interface TpkForgotPasswordArgs {
    onSubmit: (data: z.infer<ForgotPasswordSchema>, changeset: ImmerChangeset<z.infer<ForgotPasswordSchema>>) => void;
    forgotPasswordSchema: ForgotPasswordSchema;
    initialValues?: z.infer<ForgotPasswordSchema>;
    submitButtonText?: string;
}
export interface TpkForgotPasswordSignature {
    Args: TpkForgotPasswordArgs;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkForgotPasswordComponent extends Component<TpkForgotPasswordSignature> {
    changeset: ImmerChangeset<{
        email: string;
    }>;
    get submitButtonText(): string;
}
export {};
//# sourceMappingURL=tpk-forgot-password.d.ts.map