import Component from '@glimmer/component';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { ZodEmail, ZodObject, ZodString } from 'zod';
import type z from 'zod';
type LoginSchema = ZodObject<{
    email: ZodEmail;
    password: ZodString;
}>;
export interface TpkLoginArgs {
    onSubmit: (data: z.infer<LoginSchema>, changeset: ImmerChangeset<z.infer<LoginSchema>>) => void;
    loginSchema: LoginSchema;
    initialValues?: z.infer<LoginSchema>;
    submitButtonText?: string;
}
export interface TpkLoginSignature {
    Args: TpkLoginArgs;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class LoginForm extends Component<TpkLoginSignature> {
    changeset: ImmerChangeset<{
        email: string;
        password: string;
    }>;
    get submitButtonText(): string;
}
export {};
//# sourceMappingURL=tpk-login.d.ts.map