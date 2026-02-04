import { helper } from '@ember/component/helper';
import { htmlSafe as HS, type SafeString } from '@ember/template';

export interface HtmlSafeSignature {
  Args: {
    Positional: [string];
  };
  Return: SafeString;
}

export default helper<HtmlSafeSignature>(function htmlSafe(params: [string]) {
  return HS(params.join());
});
