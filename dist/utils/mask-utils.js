// feel free to complete this, this is not exhaustive

const maskSpecialCharDefinition = {
  '#': /[a-zA-Z]/,
  '&': /[0-9]/,
  '$': /[a-zA-Z0-9]/
};
function getMaskForPrefixOrDefault(_appended, dynamicMasked) {
  const mask = dynamicMasked.compiledMasks.find(mask => {
    return dynamicMasked.rawInputValue.slice(0, 2).toUpperCase() === mask.startsWith;
  });
  if (!mask) {
    return dynamicMasked.compiledMasks.find(mask => {
      return mask.default === true;
    });
  }
  return mask;
}

export { getMaskForPrefixOrDefault, maskSpecialCharDefinition };
//# sourceMappingURL=mask-utils.js.map
