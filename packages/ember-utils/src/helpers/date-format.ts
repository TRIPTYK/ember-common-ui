import { helper } from '@ember/component/helper';
import { format, parseISO } from 'date-fns';

export interface DateFormatSignature {
  Args: {
    Positional: [Date | string, string | undefined];
  };
  Return: string;
}

export default helper<DateFormatSignature>(function dateFormat([
  date,
  fmt,
]: DateFormatSignature['Args']['Positional']) {
  return format(
    typeof date === 'string' ? parseISO(date) : date,
    fmt ?? 'dd/MM/yyyy',
  );
});
