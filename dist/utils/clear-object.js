function clearObjectValues(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          newObj[key] = obj[key].map(item => {
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

export { clearObjectValues };
//# sourceMappingURL=clear-object.js.map
