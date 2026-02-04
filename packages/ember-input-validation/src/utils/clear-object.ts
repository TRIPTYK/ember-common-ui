export function clearObjectValues(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const newObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          newObj[key] = obj[key]
            .map((item) => {
              if (typeof item === 'object' && item !== null) {
                return clearObjectValues(item as Record<string, unknown>);
              } else {
                return null;
              }
            })
            .filter((item) => item !== null);
        } else {
          newObj[key] = clearObjectValues(obj[key] as Record<string, unknown>);
        }
      } else if (typeof obj[key] === 'boolean') {
        newObj[key] = false;
      } else if (typeof obj[key] === 'number') {
        newObj[key] = 0;
      } else if (typeof obj[key] === 'string') {
        newObj[key] = '';
      } else if (typeof obj[key] === 'undefined') {
        newObj[key] = undefined;
      } else {
        newObj[key] = null;
      }
    }
  }

  return newObj;
}
