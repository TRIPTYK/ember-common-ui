function isFieldError(field, errorKey) {
  const regex = new RegExp(`^${field.replaceAll('.', '\\.')}($|\\.|\\[)`);
  return regex.test(errorKey);
}

export { isFieldError };
//# sourceMappingURL=is-field-error.js.map
