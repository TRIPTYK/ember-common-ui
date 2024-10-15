export function clearObjectValues(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          newObj[key] = obj[key].map((item: any) => {
            if (typeof item === 'object' && item !== null) {
              return clearObjectValues(item);
            } else {
              return null;
            }
          }).filter(item => item !== null);
        } else {
          newObj[key] = clearObjectValues(obj[key]);
        }
      } else if (typeof obj[key] === 'boolean') {
        newObj[key] = false;
      } else {
        newObj[key] = '';
      }
    }
  }

  return newObj;
}
