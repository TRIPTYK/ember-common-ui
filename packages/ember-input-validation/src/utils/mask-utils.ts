interface CompiledMasks {
  mask: string,
  definition?: Record<string, string>, 
  startsWith: string,
  default: boolean,
  lazy?: boolean,
}

// feel free to complete this, this is not exhaustive
export interface DynamicMasked {
  rawInputValue: string,
  compiledMasks: CompiledMasks[],
}

export const maskSpecialCharDefinition = {
  '#': /[A-Z]/,
  '&': /[0-9]/,
  '$': /[A-Z0-9]/,
}

export function getMaskForPrefixOrDefault(_appended: string, dynamicMasked: DynamicMasked) {
  const mask =  dynamicMasked.compiledMasks.find(mask => {
    return dynamicMasked.rawInputValue.slice(0, 2) === mask.startsWith;
  })

  if (!mask) {
    return dynamicMasked.compiledMasks.find(mask => {
      return mask.default === true;
    })
  }

  return mask;
}
