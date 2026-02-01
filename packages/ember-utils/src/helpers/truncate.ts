import { helper } from '@ember/component/helper';

export interface TruncateSignature {
  Args: {
    Positional: [string, number];
  };
  Return: string;
}

export function truncate(params: [string, number] /*, hash*/) {
  const sanitizeStr = params[0].replace(/<\/?[^>]+(>|$)/g, '');
  const max = params[1];

  const array = sanitizeStr
    .trim()
    .split(' ')
    .filter((str: string) => str !== '');
  const ellipsis = array.length > max ? '...' : '';

  return array.slice(0, max).join(' ') + ellipsis;
}

const truncateHelper = helper<TruncateSignature>(truncate);

export default truncateHelper;
