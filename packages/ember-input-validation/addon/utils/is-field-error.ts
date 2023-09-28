export function isFieldError(field: string, errorKey: string): boolean {
  const regex = new RegExp(`^${field.replaceAll('.', '\\.')}($|\\.|\\[)`);
  return regex.test(errorKey);
}
